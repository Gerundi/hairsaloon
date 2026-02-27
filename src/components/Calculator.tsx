import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const Calculator = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      key: "zone",
      title: "На какую зону вы хотите пересадить волосы?",
      options: ["Голова", "Борода", "Брови", "Шрамы"],
    },
    {
      key: "gender",
      title: "Укажите ваш пол",
      options: ["Мужчина", "Женщина"],
    },
    {
      key: "previous",
      title: "Проводилось ли ранее хирургическое восстановление волос?",
      options: ["Да, проводилось", "Нет, не проводилось", "Не помню"],
    },
    {
      key: "city",
      title: "В каком городе удобнее посетить консультацию?",
      options: ["Сочи", "Пятигорск", "Севастополь", "Другой"],
    },
  ];

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
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/15 text-gold font-body text-sm font-medium tracking-wider uppercase mb-4">
            Скидка 5% за прохождение опроса
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Рассчитаем стоимость
          </h2>
          <p className="text-lg text-muted-foreground font-body">за 15 минут</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card rounded-3xl p-8 md:p-12 shadow-warm border border-border"
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
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">Спасибо!</h3>
              <p className="text-muted-foreground font-body">Мы свяжемся с вами в ближайшее время.</p>
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
                        : "bg-background border-border hover:border-olive/40 text-foreground"
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
                Готово! Оставьте номер телефона для связи
              </h3>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (___) ___ __ __"
                className="w-full px-5 py-4 rounded-xl border border-border bg-background font-body text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-olive/30 mb-4"
                required
              />
              <button
                type="submit"
                className="w-full py-4 bg-gold text-primary font-body font-bold text-lg rounded-xl hover:bg-gold-light transition-colors shadow-gold"
              >
                Узнать результат
              </button>
              <p className="text-xs text-muted-foreground font-body mt-4 text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Calculator;
