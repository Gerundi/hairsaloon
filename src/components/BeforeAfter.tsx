import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const beforeAfterImages = [
  { src: "/before-after/1.png", alt: "Результат пересадки волос — до и после" },
  { src: "/before-after/2.png", alt: "Результат пересадки волос — до и после" },
  { src: "/before-after/3.png", alt: "Результат пересадки волос — до и после" },
  { src: "/before-after/4.png", alt: "Результат пересадки волос — до и после" },
  { src: "/before-after/5.png", alt: "Результат пересадки волос — до и после" },
  { src: "/before-after/6.png", alt: "Результат пересадки волос — до и после" },
  { src: "/before-after/7.png", alt: "Результат пересадки волос — до и после" },
  { src: "/before-after/8.png", alt: "Результат пересадки волос — до и после" },
  { src: "/before-after/9.png", alt: "Результат пересадки волос — до и после" },
];

const BeforeAfter = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="before-after" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive font-body text-sm font-medium tracking-wider uppercase mb-4">
            Результаты
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Результаты до и после процедур
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-xl mx-auto">
            Реальные результаты наших пациентов после пересадки волос
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {beforeAfterImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`rounded-2xl overflow-hidden border border-border shadow-warm bg-card ${i === beforeAfterImages.length - 1 ? "max-sm:max-w-sm max-sm:mx-auto" : ""}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="#calculator"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body font-semibold rounded-xl hover:bg-olive-dark transition-colors shadow-warm text-lg"
          >
            Получить консультацию
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfter;
