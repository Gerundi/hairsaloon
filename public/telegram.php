<?php
/**
 * Приём заявки с формы сайта (JSON) → Telegram.
 * Антибот: honeypot, Turnstile, rate limit по IP, проверка телефона.
 * Конфиг: telegram.local.php (см. telegram.local.example.php)
 */
declare(strict_types=1);

require_once __DIR__ . '/lead-guard.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed'], JSON_UNESCAPED_UNICODE);
    exit;
}

$configPath = __DIR__ . '/telegram.local.php';
if (!is_readable($configPath)) {
    http_response_code(503);
    echo json_encode(['error' => 'Заявки не настроены: создайте telegram.local.php'], JSON_UNESCAPED_UNICODE);
    exit;
}

/** @var array{token?: string, chat_id?: string, turnstile_secret?: string, rate_window_seconds?: int} $config */
$config = require $configPath;
$token = isset($config['token']) ? trim((string) $config['token']) : '';
$chatId = isset($config['chat_id']) ? trim((string) $config['chat_id']) : '';
$turnstileSecret = isset($config['turnstile_secret']) ? trim((string) $config['turnstile_secret']) : '';
$rateWindow = isset($config['rate_window_seconds']) ? (int) $config['rate_window_seconds'] : 600;

if ($token === '' || $chatId === '') {
    http_response_code(503);
    echo json_encode(['error' => 'В telegram.local.php не заданы token и chat_id'], JSON_UNESCAPED_UNICODE);
    exit;
}

$clientIp = lead_guard_client_ip();
if (!lead_guard_rate_check($clientIp, max(60, $rateWindow))) {
    http_response_code(429);
    echo json_encode(['error' => 'С одного адреса можно отправить одну заявку раз в 10 минут. Попробуйте позже.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: 'null', true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Некорректный JSON'], JSON_UNESCAPED_UNICODE);
    exit;
}

$honeypot = isset($data['company_website']) ? trim((string) $data['company_website']) : '';
if ($honeypot !== '') {
    http_response_code(201);
    echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

$formStartedAt = isset($data['formStartedAt']) ? (int) $data['formStartedAt'] : null;
$timingErr = lead_guard_timing_ok($formStartedAt);
if ($timingErr !== null) {
    http_response_code(400);
    echo json_encode(['error' => $timingErr], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($turnstileSecret !== '') {
    $turnstileToken = isset($data['turnstileToken']) ? trim((string) $data['turnstileToken']) : '';
    if ($turnstileToken === '' || !lead_guard_verify_turnstile($turnstileToken, $turnstileSecret, $clientIp)) {
        http_response_code(403);
        echo json_encode(['error' => 'Проверка безопасности не пройдена. Обновите страницу.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

$phone = isset($data['phone']) ? trim((string) $data['phone']) : '';
$answers = isset($data['answers']) && is_array($data['answers']) ? $data['answers'] : [];

$zone = isset($answers['zone']) ? trim((string) $answers['zone']) : '';
$gender = isset($answers['gender']) ? trim((string) $answers['gender']) : '';
$previous = isset($answers['previous']) ? trim((string) $answers['previous']) : '';
$city = isset($answers['city']) ? trim((string) $answers['city']) : '';

if ($phone === '' || $zone === '' || $gender === '' || $previous === '' || $city === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Заполните все поля'], JSON_UNESCAPED_UNICODE);
    exit;
}

$normalized = lead_guard_normalize_phone($phone);
if ($normalized === null || lead_guard_suspicious_phone($normalized)) {
    http_response_code(400);
    echo json_encode(['error' => 'Укажите корректный мобильный номер России.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$displayPhone = '+' . $normalized;

$h = static function (string $s): string {
    return htmlspecialchars($s, ENT_QUOTES | ENT_HTML5, 'UTF-8');
};

$text = "<b>Новая заявка с сайта MediHairTour</b>\n\n"
    . "<b>Зона пересадки:</b> " . $h($zone) . "\n"
    . "<b>Пол:</b> " . $h($gender) . "\n"
    . "<b>Ранее хирургическое восстановление волос:</b> " . $h($previous) . "\n"
    . "<b>Город консультации:</b> " . $h($city) . "\n"
    . "<b>Телефон:</b> " . $h($displayPhone);

$payload = json_encode([
    'chat_id' => $chatId,
    'text' => $text,
    'parse_mode' => 'HTML',
    'disable_web_page_preview' => true,
], JSON_UNESCAPED_UNICODE);

$url = 'https://api.telegram.org/bot' . $token . '/sendMessage';

$ch = curl_init($url);
if ($ch === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка инициализации запроса'], JSON_UNESCAPED_UNICODE);
    exit;
}

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json; charset=utf-8'],
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_TIMEOUT => 15,
]);

$response = curl_exec($ch);
$errno = curl_errno($ch);
curl_close($ch);

if ($errno !== 0 || $response === false) {
    http_response_code(502);
    echo json_encode(['error' => 'Не удалось связаться с Telegram'], JSON_UNESCAPED_UNICODE);
    exit;
}

$tg = json_decode($response, true);
if (!is_array($tg) || empty($tg['ok'])) {
    http_response_code(502);
    $desc = is_array($tg) && isset($tg['description']) ? (string) $tg['description'] : 'unknown';
    error_log('Telegram sendMessage: ' . $desc);
    echo json_encode(['error' => 'Не удалось отправить заявку. Попробуйте позже.'], JSON_UNESCAPED_UNICODE);
    exit;
}

lead_guard_rate_record($clientIp);

http_response_code(201);
echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
