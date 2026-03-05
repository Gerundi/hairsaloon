import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 bg-secondary" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive font-body text-sm font-medium tracking-wider uppercase mb-6">
              О клинике
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
              MediHairTour —<br />
              <span className="text-gradient">ваш путь к результату</span>
            </h2>
            <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6">
              Опытные врачи проведут анализ выпадения волос, поставят диагноз и проведут лечение или пересадку с использованием лучшей аппаратуры и новейших технологий.
            </p>
            <p className="text-lg text-muted-foreground font-body leading-relaxed mb-8">
              Наша команда высококвалифицированных специалистов-трансплантологов практикует более 10 лет. Клиника MediHairTour принимает пациентов в двух городах — Сочи и Пятигорске.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-card rounded-xl px-5 py-3 shadow-warm">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="font-body font-medium text-foreground">Метод FUE</span>
              </div>
              <div className="flex items-center gap-3 bg-card rounded-xl px-5 py-3 shadow-warm">
                <div className="w-3 h-3 rounded-full bg-gold" />
                <span className="font-body font-medium text-foreground">Без шрамов</span>
              </div>
              <div className="flex items-center gap-3 bg-card rounded-xl px-5 py-3 shadow-warm">
                <div className="w-3 h-3 rounded-full bg-olive" />
                <span className="font-body font-medium text-foreground">За 1 день</span>
              </div>
              <div className="flex items-center gap-3 bg-card rounded-xl px-5 py-3 shadow-warm">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="font-body font-medium text-foreground">Пожизненная гарантия</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-card rounded-3xl p-10 text-foreground shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-border border-l-4 border-l-gold">
              <h3 className="text-2xl font-display font-bold mb-6 text-olive-dark">Что такое метод FUE?</h3>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Трансплантация волос методом FUE — бесшовный и малоинвазивный способ решения проблемы облысения. Донорские графты добываются поштучно и пересаживаются в нужную зону.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Вживлённые волосяные фолликулы функционируют на новом месте в соответствии со своим обычным жизненным циклом.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                Восстановительный период — две недели, а заметный результат — уже через полгода!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
