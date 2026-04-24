import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SeoContent = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="seo-content" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-3xl border border-border shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-8 md:p-12 space-y-8"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Пересадка волос в Сочи и Пятигорске
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed">
              MediHairTour специализируется на трансплантации волос по технологии FUE в двух городах:
              Сочи и Пятигорске. Мы проводим пересадку волос мужчинам и женщинам, а также
              восстановление бровей и формирование бороды с естественным результатом.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-3">
              Какие услуги по пересадке волос мы предоставляем
            </h3>
            <ul className="space-y-2 text-muted-foreground font-body leading-relaxed">
              <li>- Пересадка волос мужчине (лобная зона, макушка, комплексное восстановление).</li>
              <li>- Пересадка волос женщине с учетом особенностей женского типа выпадения.</li>
              <li>- Пересадка бровей для восстановления формы и густоты.</li>
              <li>- Пересадка бороды для формирования плотного и натурального контура.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-3">
              Почему пациенты выбирают MediHairTour
            </h3>
            <p className="text-muted-foreground font-body leading-relaxed">
              В клинике работает ведущий хирург-трансплантолог из Турции. До начала лечения фиксируем
              стоимость в договоре, предоставляем послеоперационное сопровождение и предлагаем
              бесплатное проживание в отеле для иногородних пациентов.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SeoContent;
