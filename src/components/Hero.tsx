import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { label: "Приживаемость волос", value: "98%" },
  { label: "Успешных пересадок", value: "1 000+" },
  { label: "Лет опыта", value: "10+" },
  { label: "Гарантия в договоре", value: "100%" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-background">
      <div className="container mx-auto px-6 py-32 grid gap-12 md:grid-cols-2 items-center">
        {/* Left: content */}
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-secondary text-accent font-body text-sm font-medium tracking-wider uppercase border border-accent/30">
              Современная технология FUE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-display font-bold text-olive-dark leading-tight mb-6"
          >
            Пересадка волос
            <br />
            <span className="text-gold">в Сочи за 1 день</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground font-body font-light mb-10 max-w-xl"
          >
            Лучшие специалисты из Турции. Результат, гарантированный договором.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a
              href="#calculator"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body font-semibold rounded-full hover:bg-olive-dark transition-all duration-300 shadow-gold text-lg"
            >
              Рассчитать стоимость
            </a>
            <a
              href="tel:+79887364100"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-accent text-accent font-body font-medium rounded-full hover:bg-accent/5 transition-all duration-300 text-lg"
            >
              <Phone className="w-5 h-5" />
              +7 (988) 736 41 00
            </a>
          </motion.div>
        </div>

        {/* Right: image */}
        <div className="relative h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-warm bg-muted">
          <img
            src={heroBg}
            alt="Клиника MediHairTour"
            className="w-full h-full object-cover brightness-110"
          />
        </div>

        {/* Stats bar (full width under content) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="md:col-span-2 mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 bg-card rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-border"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-body">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* WhatsApp floating */}
      <a
        href="https://api.whatsapp.com/send?phone=79887364100"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-warm hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-8 h-8 text-accent-foreground" />
      </a>
    </section>
  );
};

export default Hero;
