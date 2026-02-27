import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const results = [
  { area: "Голова — лобная зона", grafts: "3 500 графтов" },
  { area: "Голова — макушка", grafts: "2 800 графтов" },
  { area: "Борода", grafts: "1 500 графтов" },
  { area: "Брови", grafts: "400 графтов" },
];

const Results = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="results" className="py-24 bg-warm-gradient" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive font-body text-sm font-medium tracking-wider uppercase mb-4">
            До и после
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Результаты наших клиентов
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-xl mx-auto">
            Каждый случай индивидуален — оставьте заявку для персональной оценки
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {results.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden border border-border shadow-warm group"
            >
              <div className="aspect-[4/3] bg-muted flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-olive-gradient opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="text-center z-10 p-4">
                  <span className="text-5xl font-display font-bold text-gradient">{r.grafts.split(" ")[0]}</span>
                  <p className="text-sm text-muted-foreground font-body mt-1">графтов</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-foreground mb-1">{r.area}</h3>
                <p className="text-olive font-body text-sm font-medium">{r.grafts}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
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

export default Results;
