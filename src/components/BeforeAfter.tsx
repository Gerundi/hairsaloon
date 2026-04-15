import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { EditableImage, EditableLink, EditableText } from "@/components/editor/Editable";

const BeforeAfter = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSiteContent();
  const beforeAfterImages = content.beforeAfter.images;

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

        {/* Desktop / tablet layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
            {beforeAfterImages.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl overflow-hidden border border-border shadow-warm bg-card"
              >
                <EditableImage path={`beforeAfter.images.${i}.src`} src={img.src} alt={img.alt} className="w-full h-auto object-cover" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile slider */}
        <div className="md:hidden -mx-6">
          <div className="flex gap-4 px-6 pb-4 overflow-x-auto snap-x snap-mandatory before-after-scroll">
            {beforeAfterImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="snap-center min-w-[80%] rounded-2xl overflow-hidden border border-border shadow-warm bg-card"
              >
                <EditableImage path={`beforeAfter.images.${i}.src`} src={img.src} alt={img.alt} className="w-full h-auto object-cover" />
              </motion.div>
            ))}
          </div>
        </div>

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
