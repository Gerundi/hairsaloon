import { z } from "zod";

const leadAnswersSchema = z.object({
  zone: z.string().min(1).max(500),
  gender: z.string().min(1).max(120),
  previous: z.string().min(1).max(200),
  city: z.string().min(1).max(200),
});

export const leadBodySchema = z.object({
  phone: z.string().min(8).max(40),
  answers: leadAnswersSchema,
  company_website: z.string().max(0).optional(),
  turnstileToken: z.string().min(1).optional(),
  formStartedAt: z.number().optional(),
});

export type LeadPayload = z.infer<typeof leadBodySchema>;

export function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, "");
}

/** Нормализованный RU mobile: 7XXXXXXXXXX или null */
export function normalizeRussianMobile(phone: string): string | null {
  const d = digitsOnly(phone);
  if (d.length === 11 && d.startsWith("7")) return d;
  if (d.length === 10 && d.startsWith("9")) return `7${d}`;
  return null;
}

export function isSuspiciousPhone(normalized: string): boolean {
  if (normalized.length !== 11) return true;
  const local = normalized.slice(1);
  if (/^(\d)\1{9}$/.test(local)) return true;
  if (/^0123456789$/.test(local) || local === "1234567890") return true;
  if (/^0{10}$/.test(local)) return true;
  return false;
}

const MIN_FORM_SECONDS = 8;
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000;

export function validateFormTiming(formStartedAt?: number): string | null {
  if (formStartedAt == null || !Number.isFinite(formStartedAt)) {
    return "Откройте форму заново и отправьте заявку ещё раз.";
  }
  const elapsed = Date.now() - formStartedAt;
  if (elapsed < MIN_FORM_SECONDS * 1000) {
    return "Подождите несколько секунд перед отправкой.";
  }
  if (elapsed > MAX_FORM_AGE_MS) {
    return "Сессия формы устарела. Обновите страницу.";
  }
  return null;
}

export async function verifyTurnstile(
  token: string,
  secret: string,
  remoteIp?: string,
): Promise<boolean> {
  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

export function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function buildTelegramMessage(phone: string, answers: z.infer<typeof leadAnswersSchema>): string {
  const lines = [
    "<b>Новая заявка с сайта MediHairTour</b>",
    "",
    `<b>Зона пересадки:</b> ${escapeHtml(answers.zone)}`,
    `<b>Пол:</b> ${escapeHtml(answers.gender)}`,
    `<b>Ранее хирургическое восстановление волос:</b> ${escapeHtml(answers.previous)}`,
    `<b>Город консультации:</b> ${escapeHtml(answers.city)}`,
    `<b>Телефон:</b> ${escapeHtml(phone.trim())}`,
  ];
  return lines.join("\n");
}
