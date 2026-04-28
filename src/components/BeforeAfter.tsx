import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { EditableImage, EditableLink, EditableText } from "@/components/editor/Editable";

const BeforeAfter = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSiteContent();
  const beforeAfterImages = content.beforeAfter.images;
  const INITIAL_ITEMS = 9;
  const [showAll, setShowAll] = useState(false);
  const visibleImages = useMemo(
    () => (showAll ? beforeAfterImages : beforeAfterImages.slice(0, INITIAL_ITEMS)),
    [beforeAfterImages, showAll],
  );

  return (
    <section id="before-after" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <EditableText
            path="beforeAfter.sectionLabel"
            as="span"
            value={content.beforeAfter.sectionLabel}
            className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive font-body text-sm font-medium tracking-wider uppercase mb-4"
          />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            <EditableText path="beforeAfter.title" as="span" value={content.beforeAfter.title} />
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-xl mx-auto">
            <EditableText path="beforeAfter.subtitle" as="span" value={content.beforeAfter.subtitle} />
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {visibleImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="rounded-2xl overflow-hidden border border-border shadow-warm bg-card"
            >
              <EditableImage
                path={`beforeAfter.images.${i}.src`}
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          ))}
        </div>
        {!showAll && beforeAfterImages.length > INITIAL_ITEMS && (
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-border bg-background text-foreground font-body font-semibold hover:bg-secondary transition-colors"
            >
              Показать еще результаты
            </button>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <EditableLink
            path="beforeAfter.ctaHref"
            href={content.beforeAfter.ctaHref}
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body font-semibold rounded-xl hover:bg-olive-dark transition-colors shadow-warm text-lg"
          >
            <EditableText path="beforeAfter.ctaText" as="span" value={content.beforeAfter.ctaText} />
          </EditableLink>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfter;
