import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { EditableLink, EditableText } from "@/components/editor/Editable";

const Videos = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSiteContent();
  const videos = content.videos.embeds;

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
            <EditableText path="videos.title" as="span" value={content.videos.title} />
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            <EditableText path="videos.subtitle" as="span" value={content.videos.subtitle} />
          </p>
        </motion.div>

        {/* First row: 2 vertical videos */}
        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {videos.slice(0, 2).map((src, index) => (
            <EditableLink
              key={src}
              path={`videos.embeds.${index}`}
              href={src}
              onClick={(event) => event.preventDefault()}
            >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-3xl overflow-hidden shadow-warm bg-black"
            >
              <iframe
                src={src}
                title={`Видео клиента ${index + 1}`}
                className="w-full aspect-[9/16]"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="autoplay; fullscreen; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
            </EditableLink>
          ))}
        </div>

        {/* Second and third rows: 2 horizontal videos */}
        <div className="mt-6 space-y-6 max-w-5xl mx-auto">
          {videos.slice(2).map((src, index) => (
            <EditableLink
              key={src}
              path={`videos.embeds.${index + 2}`}
              href={src}
              onClick={(event) => event.preventDefault()}
            >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: (index + 2) * 0.08 }}
              className="rounded-3xl overflow-hidden shadow-warm bg-black"
            >
              <iframe
                src={src}
                title={`Видео клиента ${index + 3}`}
                className="w-full aspect-video"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="autoplay; fullscreen; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
            </EditableLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;

