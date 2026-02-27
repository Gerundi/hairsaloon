import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const team = [
  {
    name: "Хакан Шахин",
    role: "Хирург-трансплантолог из Турции",
    experience: "Стаж: более 13 лет",
    desc: "Более 2 000 успешных операций. Индивидуальный подход к каждому пациенту.",
  },
  {
    name: "Юлия Чепель",
    role: "Куратор проекта TransHair Tour",
    experience: "Стаж: более 10 лет",
    desc: "Основатель сети клиник, врач-косметолог с международной практикой.",
  },
];

const Team = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="py-24 bg-warm-gradient" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive font-body text-sm font-medium tracking-wider uppercase mb-4">
            Специалисты
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Наша команда
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-card rounded-3xl p-8 border border-border shadow-warm"
            >
              <div className="w-20 h-20 rounded-full bg-olive-gradient flex items-center justify-center mb-6">
                <span className="text-primary-foreground font-display font-bold text-2xl">
                  {member.name[0]}
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-olive font-body font-medium mb-1">{member.role}</p>
              <p className="text-gold font-body text-sm font-semibold mb-4">{member.experience}</p>
              <p className="text-muted-foreground font-body leading-relaxed">{member.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
