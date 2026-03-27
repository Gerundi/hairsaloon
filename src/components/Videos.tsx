import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const videos = [
  "/videos/Vid 1.MP4",
  "/videos/Vid 2.MP4",
  "/videos/Vid 3.mp4",
  "/videos/Vid 4.mp4",
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
              <video
                src={src}
                className="w-full aspect-[9/16] object-cover"
                controls
                playsInline
                preload="metadata"
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
              <video
                src={src}
                className="w-full aspect-video object-cover"
                controls
                playsInline
                preload="metadata"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;

