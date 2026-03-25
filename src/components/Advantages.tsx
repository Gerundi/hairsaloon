import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Car, Award, FileCheck, Heart, Phone, DollarSign } from "lucide-react";

const advantages = [
  { icon: Award, title: "Гарантия результата", desc: "Результат зафиксирован в официальном договоре" },
  { icon: DollarSign, title: "Фиксированная цена", desc: "Никаких скрытых платежей — всё прозрачно" },
  { icon: Heart, title: "Пакет ухода", desc: "Лекарственные препараты для восстановления включены" },
  { icon: Phone, title: "Поддержка 10 дней", desc: "Ежедневная обратная связь после процедуры" },
  { icon: Car, title: "Трансфер от аэропорта", desc: "Встретим и доставим до клиники — комфортно и без лишних забот" },
  { icon: FileCheck, title: "Бесплатное проживание для иногородних", desc: "Организуем размещение в отеле рядом с клиникой — входит в программу лечения." },
];

const Advantages = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-olive-gradient" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-gold-light font-body text-sm font-medium tracking-wider uppercase mb-4">
            Почему мы
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            Преимущества MediHairTour
          </h2>
          <p className="text-lg text-primary-foreground/70 font-body max-w-2xl mx-auto">
            Полный цикл — от диагностики до сопровождения после процедуры
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 hover:bg-primary-foreground/10 transition-all duration-300"
            >
              <a.icon className="w-10 h-10 text-gold mb-4" />
              <h3 className="text-xl font-display font-bold text-primary-foreground mb-2">{a.title}</h3>
              <p className="text-primary-foreground/70 font-body">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
