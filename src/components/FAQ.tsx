import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Как проходит консультация?",
    a: "Консультация проводится в двух форматах: офлайн в клинике или онлайн по фото/видео для иногородних. Обсуждаются этапы процедуры, предполагаемое количество графтов и цена.",
  },
  {
    q: "Есть ли рассрочка?",
    a: "Да, мы сотрудничаем с банком Тинькофф и предоставляем рассрочку или кредит на процедуры.",
  },
  {
    q: "Есть ли гарантия?",
    a: "Да, мы предоставляем официальную гарантию результата, прописанную в договоре. Мы отвечаем за качество пересадки, приживаемость и итоговый результат.",
  },
  {
    q: "С какими зонами вы работаете?",
    a: "Мы специализируемся на пересадке волос у мужчин и женщин, а также на восстановлении бровей и формировании бороды с естественным результатом.",
  },
  {
    q: "Что входит в стоимость?",
    a: "В стоимость включены консультация, индивидуальный план трансплантации, проведение процедуры и послеоперационное сопровождение. Итоговая цена фиксируется в договоре до начала лечения — без скрытых платежей.",
  },
  {
    q: "Сколько длится процедура?",
    a: "Процедура занимает один день, независимо от объёма пересадки. Используется современная технология FUE.",
  },
  {
    q: "Какой результат можно ожидать?",
    a: "Клиника гарантирует приживаемость до 98%. Результат зафиксирован в официальном договоре.",
  },
];

const FAQ = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive font-body text-sm font-medium tracking-wider uppercase mb-4">
            Вопросы
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Ответы на вопросы
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between bg-card rounded-xl p-6 border border-border hover:border-olive/30 transition-all duration-300 text-left"
              >
                <span className="font-display text-lg font-semibold text-foreground pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-olive shrink-0 transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-card border border-t-0 border-border rounded-b-xl px-6 pb-6"
                >
                  <p className="text-muted-foreground font-body leading-relaxed pt-2">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
