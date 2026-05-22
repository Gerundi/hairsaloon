<?php
declare(strict_types=1);

function lead_guard_digits(string $phone): string
{
    return preg_replace('/\D/', '', $phone) ?? '';
}

function lead_guard_normalize_phone(string $phone): ?string
{
    $d = lead_guard_digits($phone);
    if (strlen($d) === 11 && substr($d, 0, 1) === '7') {
        return $d;
    }
    if (strlen($d) === 10 && substr($d, 0, 1) === '9') {
        return '7' . $d;
    }
    return null;
}

function lead_guard_suspicious_phone(string $normalized): bool
{
    if (strlen($normalized) !== 11) {
        return true;
    }
    $local = substr($normalized, 1);
    if (preg_match('/^(\d)\1{9}$/', $local)) {
        return true;
    }
    if ($local === '1234567890' || $local === '0123456789') {
        return true;
    }
    return false;
}

function lead_guard_timing_ok(?int $formStartedAt): ?string
{
    if ($formStartedAt === null || $formStartedAt <= 0) {
        return 'Откройте форму заново и отправьте заявку ещё раз.';
    }
    $elapsed = (int) (microtime(true) * 1000) - $formStartedAt;
    if ($elapsed < 8000) {
        return 'Подождите несколько секунд перед отправкой.';
    }
    if ($elapsed > 7200000) {
        return 'Сессия формы устарела. Обновите страницу.';
    }
    return null;
}

function lead_guard_client_ip(): string
{
    if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
        return trim((string) $_SERVER['HTTP_CF_CONNECTING_IP']);
    }
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $parts = explode(',', (string) $_SERVER['HTTP_X_FORWARDED_FOR']);
        return trim($parts[0]);
    }
    return trim((string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0'));
}

function lead_guard_rate_check(string $ip, int $windowSeconds = 600): bool
{
    $dir = __DIR__ . '/.lead-rate';
    if (!is_dir($dir)) {
        return true;
    }
    $key = hash('sha256', $ip);
    $file = $dir . '/' . $key . '.json';
    $now = time();

    if (!is_readable($file)) {
        return true;
    }
    $raw = file_get_contents($file);
    $data = json_decode($raw ?: 'null', true);
    if (is_array($data) && isset($data['ts']) && ($now - (int) $data['ts']) < $windowSeconds) {
        return false;
    }
    return true;
}

function lead_guard_rate_record(string $ip): void
{
    $dir = __DIR__ . '/.lead-rate';
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
    $key = hash('sha256', $ip);
    $file = $dir . '/' . $key . '.json';
    file_put_contents($file, json_encode(['ts' => time()], JSON_UNESCAPED_UNICODE), LOCK_EX);
}

function lead_guard_verify_turnstile(string $token, string $secret, string $remoteIp): bool
{
    $post = http_build_query([
        'secret' => $secret,
        'response' => $token,
        'remoteip' => $remoteIp,
    ]);

    $ctx = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $post,
            'timeout' => 12,
        ],
    ]);

    $response = @file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false, $ctx);
    if ($response === false) {
        return false;
    }
    $data = json_decode($response, true);
    return is_array($data) && !empty($data['success']);
}
