import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Team = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="py-32 bg-secondary" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive font-body text-sm font-medium tracking-wider uppercase mb-4">
            Эксперт
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Доктор Хакан Шахин
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-5xl mx-auto bg-card rounded-[24px] shadow-[0_18px_60px_rgba(0,0,0,0.06)] border border-border px-6 py-8 md:px-10 md:py-10"
        >
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            {/* Фото слева */}
            <div className="order-1 md:order-none">
              <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden bg-muted">
                <img
                  src="/team/hakan-shahin.png"
                  alt="Доктор Хакан Шахин"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Текст справа */}
            <div className="space-y-5">
              <p className="text-olive font-body font-medium">
                Трансплантолог из Турции
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                Ведущий специалист клиники MediHairTour по пересадке волос. Сочетает международный опыт с внимательным и спокойным отношением к каждому пациенту.
              </p>
              <ul className="space-y-2 font-body text-foreground">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-olive-dark" />
                  <span>10+ лет практики</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-olive-dark" />
                  <span>Более 2 000 успешных операций</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-olive-dark" />
                  <span>Международный опыт</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-olive-dark" />
                  <span>Индивидуальный подход к каждому пациенту</span>
                </li>
              </ul>
              <div className="pt-2">
                <a
                  href="#calculator"
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-body font-semibold rounded-full hover:bg-olive-dark transition-colors"
                >
                  Записаться на консультацию
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
