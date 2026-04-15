import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { EditableText } from "@/components/editor/Editable";

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSiteContent();

  return (
    <section id="about" className="py-32 bg-secondary" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <EditableText
              path="about.sectionLabel"
              as="span"
              value={content.about.sectionLabel}
              className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive font-body text-sm font-medium tracking-wider uppercase mb-6"
            />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
              <EditableText path="about.titleMain" as="span" value={content.about.titleMain} />
              <br />
              <EditableText path="about.titleHighlight" as="span" value={content.about.titleHighlight} className="text-gradient" />
            </h2>
            <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6">
              <EditableText path="about.paragraph1" as="span" value={content.about.paragraph1} />
            </p>
            <p className="text-lg text-muted-foreground font-body leading-relaxed mb-8">
              <EditableText path="about.paragraph2" as="span" value={content.about.paragraph2} />
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-card rounded-xl px-5 py-3 shadow-warm">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <EditableText path="about.badgeFue" as="span" value={content.about.badgeFue} className="font-body font-medium text-foreground" />
              </div>
              <div className="flex items-center gap-3 bg-card rounded-xl px-5 py-3 shadow-warm">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <EditableText path="about.badgeDhi" as="span" value={content.about.badgeDhi} className="font-body font-medium text-foreground" />
              </div>
              <div className="flex items-center gap-3 bg-card rounded-xl px-5 py-3 shadow-warm">
                <div className="w-3 h-3 rounded-full bg-gold" />
                <EditableText path="about.badgeScarless" as="span" value={content.about.badgeScarless} className="font-body font-medium text-foreground" />
              </div>
              <div className="flex items-center gap-3 bg-card rounded-xl px-5 py-3 shadow-warm">
                <div className="w-3 h-3 rounded-full bg-olive" />
                <EditableText path="about.badgeOneDay" as="span" value={content.about.badgeOneDay} className="font-body font-medium text-foreground" />
              </div>
              <div className="flex items-center gap-3 bg-card rounded-xl px-5 py-3 shadow-warm">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <EditableText path="about.badgeLifetimeWarranty" as="span" value={content.about.badgeLifetimeWarranty} className="font-body font-medium text-foreground" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-card rounded-3xl p-10 text-foreground shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-border border-l-4 border-l-gold">
              <h3 className="text-2xl font-display font-bold mb-6 text-olive-dark">
                <EditableText path="about.cardTitle" as="span" value={content.about.cardTitle} />
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                <EditableText path="about.cardText1" as="span" value={content.about.cardText1} />
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                <EditableText path="about.cardText2" as="span" value={content.about.cardText2} />
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                <EditableText path="about.cardText3" as="span" value={content.about.cardText3} />
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
