import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const videos = [
  "https://rutube.ru/video/private/4483a3953184ff9d964b98caa9d4b5f2/?r=wd",
  "https://rutube.ru/video/private/95e1585867bb816a1049db29f1f3bfa3/?r=wd",
  "https://rutube.ru/video/private/24180eb72d7c9032dfbec51522e23989/?r=wd",
  "https://rutube.ru/video/private/fff59f7f670b49a6eba232c9b881432c/?r=wd",
  "https://rutube.ru/video/private/b543c6f24ebafe76ef0bb1961989b10f/?r=wd",
  "https://rutube.ru/video/private/dda933bf191852a22d0d2b79060e50cc/?r=wd",
];

const Videos = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="videos"
      className="py-24 bg-[#f3e7d1]/70"
      ref={ref}
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">
            Видео от наших клиентов
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            Реальные истории пациентов о пересадке волос и результате лечения.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-3xl overflow-hidden shadow-warm bg-black/5"
            >
              <iframe
                src={src}
                title={`Видео клиента ${index + 1}`}
                className="w-full aspect-[9/16]"
                allow="autoplay; fullscreen; clipboard-write"
                allowFullScreen
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;

