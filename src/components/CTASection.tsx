import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { EditableLink, EditableText } from "@/components/editor/Editable";

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSiteContent();

  return (
    <section className="py-24 bg-olive-gradient" ref={ref}>
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6 leading-tight">
            <EditableText path="ctaSection.title" as="span" value={content.ctaSection.title} />
            <EditableText path="ctaSection.titleHighlight" as="span" value={content.ctaSection.titleHighlight} className="text-gold" />
          </h2>
          <p className="text-xl text-primary-foreground/70 font-body mb-10">
            <EditableText path="ctaSection.subtitle" as="span" value={content.ctaSection.subtitle} />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EditableLink
              path="ctaSection.primaryHref"
              href={content.ctaSection.primaryHref}
              className="inline-flex items-center justify-center px-10 py-5 bg-gold text-primary font-body font-bold text-lg rounded-xl hover:bg-gold-light transition-all duration-300 shadow-gold"
            >
              <EditableText path="ctaSection.primaryText" as="span" value={content.ctaSection.primaryText} />
            </EditableLink>
            <EditableLink
              path="ctaSection.secondaryHref"
              href={content.ctaSection.secondaryHref}
              className="inline-flex items-center justify-center px-10 py-5 border-2 border-primary-foreground/30 text-primary-foreground font-body font-semibold font-phone text-lg rounded-xl hover:bg-primary-foreground/10 transition-all duration-300"
            >
              <EditableText path="ctaSection.secondaryText" as="span" value={content.ctaSection.secondaryText} />
            </EditableLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
