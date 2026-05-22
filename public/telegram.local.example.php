<?php
/**
 * Скопируйте этот файл как telegram.local.php рядом с telegram.php (в корне сайта / в dist после сборки)
 * и подставьте токен бота и chat_id. Файл telegram.local.php не должен попадать в публичный git.
 */
return [
    'token' => 'ВАШ_ТОКЕН_ОТ_BOTFATHER',
    'chat_id' => '-1003983441710',
    // Cloudflare Turnstile — секрет с панели Turnstile (публичный site key — в VITE_TURNSTILE_SITE_KEY при сборке)
    'turnstile_secret' => '',
    // Лимит: 1 заявка с IP раз в N секунд (по умолчанию 600 = 10 минут)
    'rate_window_seconds' => 600,
];
