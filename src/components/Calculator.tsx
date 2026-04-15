import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useSiteContent } from "@/contexts/SiteContentContext";

const Calculator = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSiteContent();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const phonePrefix = "+7 ";
  const [phone, setPhone] = useState(phonePrefix);
  const [submitted, setSubmitted] = useState(false);

  const answerLabels: Record<string, string> = {
    zone: "Зона",
    gender: "Пол",
    previous: "Ранее проводилось восстановление",
    city: "Город консультации",
  };

  const buildMessage = () => {
    const parts: string[] = [];
    parts.push(content.calculator.introMessage);
    parts.push("");

    const entries = Object.entries(answers).filter(
      ([, v]) => typeof v === "string" && v.trim().length > 0,
    );
    if (entries.length) {
      parts.push(content.calculator.answerListTitle);
      for (const [k, v] of entries) {
        parts.push(`- ${answerLabels[k] ?? k}: ${v}`);
      }
      parts.push("");
    }

    parts.push(`Мой номер: ${phone.trim()}`);
    return parts.join("\n");
  };

  const questions = content.calculator.questions;

  const handleSelect = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setTimeout(() => setStep(questions.length), 300);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="calculator" className="py-24 bg-warm-gradient" ref={ref}>
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/15 text-gold font-body text-sm font-medium tracking-[0.14em] uppercase mb-4">
            {content.calculator.sectionBadge}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            {content.calculator.title}
          </h2>
          <p className="text-lg text-muted-foreground font-body">{content.calculator.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card rounded-3xl p-8 md:p-12 shadow-warm border border-olive/30"
        >
          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  i <= step ? "bg-olive" : "bg-border"
                }`}
              />
            ))}
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                {content.calculator.finalTitle}
              </h3>
              <p className="text-muted-foreground font-body mb-6">
                {content.calculator.finalDescription}
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                <a
                  href={`https://t.me/+${content.calculator.phoneE164}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-olive/30 bg-background px-5 py-3 font-body font-semibold hover:border-olive/40 transition-colors"
                  onClick={() => {
                    navigator.clipboard?.writeText(buildMessage()).catch(() => undefined);
                  }}
                >
                  {content.calculator.telegramText}
                </a>
                <a
                  href={`https://wa.me/${content.calculator.phoneE164}?text=${encodeURIComponent(buildMessage())}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-olive/30 bg-background px-5 py-3 font-body font-semibold hover:border-olive/40 transition-colors"
                >
                  {content.calculator.whatsappText}
                </a>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(buildMessage());
                      window.open(content.calculator.maxUrl, "_blank", "noreferrer");
                    } catch {
                      window.open(content.calculator.maxUrl, "_blank", "noreferrer");
                    }
                  }}
                  className="inline-flex items-center justify-center rounded-xl border border-olive/30 bg-background px-5 py-3 font-body font-semibold hover:border-olive/40 transition-colors"
                >
                  {content.calculator.maxText}
                </button>
              </div>

              <p className="text-xs text-muted-foreground font-body mt-4">
                {content.calculator.phoneCaption} <span className="font-phone">{content.calculator.phoneDisplay}</span>
              </p>
              <p className="text-xs text-muted-foreground font-body mt-2">
                {content.calculator.messengerHint}
              </p>
            </div>
          ) : step < questions.length ? (
            <div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-6">
                {questions[step].title}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {questions[step].options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(questions[step].key, opt)}
                    className={`p-4 rounded-xl border text-left font-body font-medium transition-all duration-300 ${
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
                Шаг {step + 1} из {questions.length + 1}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl font-display font-semibold text-foreground mb-6">
                {content.calculator.finalFormTitle}
              </h3>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  const next = e.target.value;
                  setPhone(next.startsWith(phonePrefix) ? next : phonePrefix);
                }}
                onFocus={() => {
                  if (!phone.startsWith(phonePrefix)) setPhone(phonePrefix);
                }}
                placeholder="+7 (___) ___ __ __"
                className="w-full px-5 py-4 rounded-xl border border-olive/30 bg-background font-body font-phone text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-olive/30 mb-4"
                required
              />
              <button
                type="submit"
                className="w-full py-4 bg-gold text-primary font-body font-bold text-lg rounded-xl hover:bg-gold-light transition-colors shadow-gold"
              >
                {content.calculator.finalFormButton}
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
