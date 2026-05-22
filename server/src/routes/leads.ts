import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  buildTelegramMessage,
  leadBodySchema,
  normalizeRussianMobile,
  isSuspiciousPhone,
  validateFormTiming,
  verifyTurnstile,
} from "../lib/lead-guard";

const RATE_WINDOW_MS = Number(process.env.LEAD_RATE_WINDOW_MS ?? 10 * 60 * 1000);
const RATE_MAX = Number(process.env.LEAD_RATE_MAX ?? 1);

const telegramLimiter = rateLimit({
  windowMs: RATE_WINDOW_MS,
  max: RATE_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "С одного адреса можно отправить одну заявку раз в 10 минут. Попробуйте позже." },
});

export const leadsRouter = Router();

leadsRouter.post("/telegram", telegramLimiter, async (req, res) => {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY?.trim();

  if (!token || !chatId) {
    return res.status(503).json({
      error: "Заявки временно недоступны (не настроен Telegram).",
    });
  }

  const parsed = leadBodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Проверьте заполнение всех полей.",
      details: parsed.error.flatten(),
    });
  }

  const { phone, answers, company_website, turnstileToken, formStartedAt } = parsed.data;

  if (company_website && company_website.trim() !== "") {
    return res.status(201).json({ ok: true });
  }

  const timingError = validateFormTiming(formStartedAt);
  if (timingError) {
    return res.status(400).json({ error: timingError });
  }

  const normalized = normalizeRussianMobile(phone);
  if (!normalized || isSuspiciousPhone(normalized)) {
    return res.status(400).json({ error: "Укажите корректный мобильный номер России." });
  }

  if (turnstileSecret) {
    if (!turnstileToken) {
      return res.status(400).json({ error: "Подтвердите, что вы не робот." });
    }
    const ip = (req.headers["cf-connecting-ip"] as string) || req.ip;
    const ok = await verifyTurnstile(turnstileToken, turnstileSecret, ip);
    if (!ok) {
      return res.status(403).json({ error: "Проверка безопасности не пройдена. Обновите страницу." });
    }
  } else if (process.env.NODE_ENV === "production" && !turnstileSecret) {
    console.warn("TURNSTILE_SECRET_KEY not set in production — captcha disabled");
  }

  const displayPhone = `+${normalized}`;
  const text = buildTelegramMessage(displayPhone, answers);

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const tgJson = (await tgRes.json()) as { ok?: boolean; description?: string };

    if (!tgRes.ok || !tgJson.ok) {
      console.error("Telegram sendMessage failed:", tgRes.status, tgJson);
      return res.status(502).json({
        error: "Не удалось отправить заявку. Попробуйте позже или позвоните нам.",
      });
    }

    return res.status(201).json({ ok: true });
  } catch (e) {
    console.error("Telegram request error:", e);
    return res.status(502).json({
      error: "Не удалось отправить заявку. Попробуйте позже.",
    });
  }
});
