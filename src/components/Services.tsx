import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User, UserCheck, Scissors, Sparkles } from "lucide-react";

const services = [
  {
    icon: User,
    title: "Пересадка волос мужчине",
    desc: "Восстановление густоты волос с естественным результатом и без шрамов",
    image: "/services/hair-men.jpg",
  },
  {
    icon: UserCheck,
    title: "Пересадка волос женщине",
    desc: "Деликатная процедура с учётом особенностей женского облысения",
    image: "/services/hair-women.jpg",
  },
  {
    icon: Sparkles,
    title: "Пересадка бровей",
    desc: "Идеальная форма и густота бровей с натуральным видом",
    image: "/services/brows.png",
  },
  {
    icon: Scissors,
    title: "Пересадка бороды",
    desc: "Создание густой и равномерной бороды за одну процедуру",
    image: "/services/beard.png",
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
              className="group bg-card rounded-2xl p-0 border border-border overflow-hidden hover:border-olive/30 hover:shadow-warm transition-all duration-500 cursor-pointer flex flex-col"
            >
              {s.image && (
                <div className="h-56 w-full overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-8 pt-6 flex flex-col flex-1">
                <h3 className="text-xl font-display font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground font-body leading-relaxed mb-6 flex-1">{s.desc}</p>
                <div className="mt-auto pt-2">
                  <a
                    href="#calculator"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm hover:bg-olive-dark transition-colors"
                  >
                    Оставить заявку
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
