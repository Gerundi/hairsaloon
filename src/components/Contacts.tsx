import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone } from "lucide-react";

const Contacts = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contacts"
      className="py-24 bg-[#f7eddc]"
      ref={ref}
    >
      <div className="container mx-auto px-6 grid gap-10 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Контакты клиник
          </h2>
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-semibold text-foreground">
              Сочи
            </h3>
            <p className="text-muted-foreground font-body leading-relaxed">
              354000, Краснодарский край, г. Сочи,
              <br />
              пер. Трунова, 6, корп. 4
            </p>
            <div className="space-y-3">
              <h3 className="text-2xl font-display font-semibold text-foreground">
                Пятигорск
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                357500, Ставропольский край, г. Пятигорск,
                <br />
                ул. Бунимовича, 15, корп. 2
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-4">
              <a
                href="tel:+79887364100"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-accent text-accent font-body font-medium font-phone rounded-full hover:bg-accent/5 transition-all duration-300 text-lg"
              >
                <Phone className="w-5 h-5" />
                +7 (988) 736 41 00
              </a>
              <a
                href="#calculator"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body font-semibold rounded-full hover:bg-olive-dark transition-all duration-300 shadow-gold text-lg"
              >
                Заказать звонок
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full h-[320px] md:h-[420px] rounded-3xl overflow-hidden shadow-warm border border-border"
        >
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=39.733509%2C43.593850&z=18&pt=39.733509,43.593850,pm2dgl"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default Contacts;

