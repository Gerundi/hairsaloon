import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const videos = [
  "https://rutube.ru/play/embed/a90f4f23b4ffcd752399fd207815ce59",
  "https://rutube.ru/play/embed/c7356f50d67cf2428844aee72b058719/?skinColor=6d4c41",
  "https://rutube.ru/play/embed/dcfd4fa30f36a576e5779ca52b1bd826/?skinColor=6d4c41",
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

        {/* First row: 2 vertical videos */}
        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {videos.slice(0, 2).map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-3xl overflow-hidden shadow-warm bg-black"
            >
              <iframe
                src={src}
                title={`Видео клиента ${index + 1}`}
                className="w-full aspect-[9/16]"
                allow="autoplay; fullscreen; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          ))}
        </div>

        {/* Second and third rows: 2 horizontal videos */}
        <div className="mt-6 space-y-6 max-w-5xl mx-auto">
          {videos.slice(2).map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: (index + 2) * 0.08 }}
              className="rounded-3xl overflow-hidden shadow-warm bg-black"
            >
              <iframe
                src={src}
                title={`Видео клиента ${index + 3}`}
                className="w-full aspect-video"
                allow="autoplay; fullscreen; clipboard-write; encrypted-media; picture-in-picture"
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

