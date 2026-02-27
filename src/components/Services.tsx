import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User, UserCheck, Scissors, Sparkles } from "lucide-react";

const services = [
  {
    icon: User,
    title: "Пересадка волос мужчине",
    desc: "Восстановление густоты волос с естественным результатом и без шрамов",
  },
  {
    icon: UserCheck,
    title: "Пересадка волос женщине",
    desc: "Деликатная процедура с учётом особенностей женского облысения",
  },
  {
    icon: Sparkles,
    title: "Пересадка бровей",
    desc: "Идеальная форма и густота бровей с натуральным видом",
  },
  {
    icon: Scissors,
    title: "Пересадка бороды",
    desc: "Создание густой и равномерной бороды за одну процедуру",
  },
];

const Services = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive font-body text-sm font-medium tracking-wider uppercase mb-4">
            Наши услуги
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Профессиональная пересадка волос
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group bg-card rounded-2xl p-8 border border-border hover:border-olive/30 hover:shadow-warm transition-all duration-500 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-olive/10 flex items-center justify-center mb-6 group-hover:bg-olive-gradient group-hover:text-primary-foreground transition-all duration-500">
                <s.icon className="w-7 h-7 text-olive group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">{s.title}</h3>
              <p className="text-muted-foreground font-body leading-relaxed mb-6">{s.desc}</p>
              <a
                href="#calculator"
                className="inline-block font-body font-semibold text-sm text-olive hover:text-olive-dark transition-colors uppercase tracking-wide"
              >
                Оставить заявку →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
