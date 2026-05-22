import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import TurnstileWidget from "@/components/TurnstileWidget";
import PromoBanner from "@/components/PromoBanner";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() ?? "";

const Calculator = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSiteContent();
  const formStartedAtRef = useRef(Date.now());
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const phonePrefix = "+7 ";
  const [phone, setPhone] = useState(phonePrefix);
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const questions = content.calculator.questions;
  const totalSteps = questions.length + 1;
  const turnstileRequired = Boolean(TURNSTILE_SITE_KEY);

  useEffect(() => {
    formStartedAtRef.current = Date.now();
  }, []);

  const digitsOnly = (value: string) => value.replace(/\D/g, "");

  const isPhoneValid = (value: string) => {
    const d = digitsOnly(value);
    if (d.length === 11 && d.startsWith("7")) {
      const local = d.slice(1);
      if (/^(\d)\1{9}$/.test(local)) return false;
      if (local === "1234567890") return false;
      return true;
    }
    if (d.length === 10 && d.startsWith("9")) {
      const local = d;
      if (/^(\d)\1{9}$/.test(local)) return false;
      return true;
    }
    return false;
  };

  const handleSelect = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setTimeout(() => setStep(questions.length), 300);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError(null);
    setSubmitError(null);

    if (!isPhoneValid(phone)) {
      setPhoneError("Введите корректный номер мобильного телефона России (например +7 988 736 41 00).");
      return;
    }

    const requiredKeys = ["zone", "gender", "previous", "city"] as const;
    for (const key of requiredKeys) {
      if (!answers[key]?.trim()) {
        setSubmitError("Ответьте на все вопросы опроса.");
        return;
      }
    }

    if (turnstileRequired && !turnstileToken) {
      setSubmitError("Подождите проверку «Я не робот» или обновите страницу.");
      return;
    }

    setSubmitting(true);
    try {
      const leadSubmitUrl =
        import.meta.env.VITE_LEAD_SUBMIT_URL?.trim() ||
        (import.meta.env.PROD ? "/telegram.php" : "/api/leads/telegram");

      const res = await fetch(leadSubmitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone.trim(),
          answers: {
            zone: answers.zone,
            gender: answers.gender,
            previous: answers.previous,
            city: answers.city,
          },
          company_website: honeypot,
          turnstileToken: turnstileToken ?? undefined,
          formStartedAt: formStartedAtRef.current,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setSubmitError(
          typeof data.error === "string" ? data.error : "Не удалось отправить заявку. Попробуйте ещё раз.",
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Нет связи с сервером. Проверьте интернет и попробуйте снова.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="calculator" className="py-24 bg-warm-gradient" ref={ref}>
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/15 text-gold font-body text-sm font-medium tracking-[0.14em] uppercase mb-4">
            {content.calculator.sectionBadge}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            {content.calculator.title}
          </h2>
          <p className="text-lg text-muted-foreground font-body">{content.calculator.subtitle}</p>
        </motion.div>

        <PromoBanner variant="inline" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card rounded-3xl p-8 md:p-12 shadow-warm border border-olive/30"
        >
          {!submitted ? (
            <div className="flex gap-2 mb-8">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                    i <= step ? "bg-olive" : "bg-border"
                  }`}
                />
              ))}
            </div>
          ) : null}

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl" aria-hidden>
                  ✓
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                {content.calculator.finalTitle}
              </h3>
              <p className="text-muted-foreground font-body">{content.calculator.finalDescription}</p>
            </div>
          ) : step < questions.length ? (
            <div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-6">
                {questions[step].title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {questions[step].options.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => handleSelect(questions[step].key, opt)}
                    className={`p-4 rounded-xl border text-left font-body font-medium text-sm sm:text-base transition-all duration-300 ${
                      answers[questions[step].key] === opt
                        ? "bg-olive text-primary-foreground border-olive"
                        : "bg-background border-olive/30 hover:border-olive/40 text-foreground"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground font-body mt-4">
                Вопрос {step + 1} из {questions.length}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative">
              <p className="text-sm text-muted-foreground font-body mb-4">
                Шаг {questions.length + 1} из {totalSteps}: номер телефона
              </p>
              <h3 className="text-xl font-display font-semibold text-foreground mb-6">
                {content.calculator.finalFormTitle}
              </h3>

              {/* Honeypot: скрыто от людей, боты часто заполняют */}
              <div
                className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
                aria-hidden="true"
                tabIndex={-1}
              >
                <label htmlFor="company_website">Сайт компании</label>
                <input
                  id="company_website"
                  name="company_website"
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              <input
                type="tel"
                value={phone}
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={phoneError ? true : undefined}
                onChange={(e) => {
                  const next = e.target.value;
                  setPhone(next.startsWith(phonePrefix) ? next : phonePrefix);
                  if (phoneError) setPhoneError(null);
                }}
                onFocus={() => {
                  if (!phone.startsWith(phonePrefix)) setPhone(phonePrefix);
                }}
                placeholder="+7 (___) ___ __ __"
                className={`w-full px-5 py-4 rounded-xl border bg-background font-body font-phone text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-olive/30 mb-2 ${
                  phoneError ? "border-destructive" : "border-olive/30"
                }`}
                required
              />
              {phoneError ? (
                <p className="text-sm text-destructive font-body mb-4" role="alert">
                  {phoneError}
                </p>
              ) : null}

              {turnstileRequired ? (
                <div className="my-4">
                  <TurnstileWidget
                    siteKey={TURNSTILE_SITE_KEY}
                    onToken={(t) => {
                      setTurnstileToken(t);
                      if (submitError?.includes("робот")) setSubmitError(null);
                    }}
                    onExpire={() => setTurnstileToken(null)}
                    onError={() => {
                      setTurnstileToken(null);
                      setSubmitError("Не удалось загрузить проверку. Обновите страницу.");
                    }}
                  />
                </div>
              ) : null}

              {submitError ? (
                <p className="text-sm text-destructive font-body mb-4 text-center" role="alert">
                  {submitError}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={submitting || (turnstileRequired && !turnstileToken)}
                className="w-full mt-4 py-4 bg-gold text-primary font-body font-bold text-lg rounded-xl hover:bg-gold-light transition-colors shadow-gold disabled:opacity-60 disabled:pointer-events-none"
              >
                {submitting ? "Отправка…" : content.calculator.finalFormButton}
              </button>
              <p className="text-xs text-muted-foreground font-body mt-4 text-center">
                {content.calculator.privacyText}
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Calculator;
