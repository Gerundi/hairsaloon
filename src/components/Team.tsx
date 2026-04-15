import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { EditableImage, EditableLink, EditableText } from "@/components/editor/Editable";

const Team = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSiteContent();

  return (
    <section id="team" className="py-32 bg-secondary" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <EditableText
            path="team.sectionLabel"
            as="span"
            value={content.team.sectionLabel}
            className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive font-body text-sm font-medium tracking-wider uppercase mb-4"
          />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            <EditableText path="team.title" as="span" value={content.team.title} />
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-5xl mx-auto bg-card rounded-[24px] shadow-[0_18px_60px_rgba(0,0,0,0.06)] border border-border px-6 py-8 md:px-10 md:py-10"
        >
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            {/* Фото слева */}
            <div className="order-1 md:order-none">
              <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden bg-muted">
                <EditableImage path="team.imageSrc" src={content.team.imageSrc} alt={content.team.imageAlt} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Текст справа */}
            <div className="space-y-5">
              <p className="text-olive font-body font-medium">
                <EditableText path="team.subtitle" as="span" value={content.team.subtitle} />
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                <EditableText path="team.description" as="span" value={content.team.description} />
              </p>
              <ul className="space-y-2 font-body text-foreground">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-olive-dark" />
                  <EditableText path="team.bullets.0" as="span" value={content.team.bullets[0] ?? ""} />
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-olive-dark" />
                  <EditableText path="team.bullets.1" as="span" value={content.team.bullets[1] ?? ""} />
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-olive-dark" />
                  <EditableText path="team.bullets.2" as="span" value={content.team.bullets[2] ?? ""} />
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-olive-dark" />
                  <EditableText path="team.bullets.3" as="span" value={content.team.bullets[3] ?? ""} />
                </li>
              </ul>
              <div className="pt-2">
                <EditableLink
                  path="team.ctaHref"
                  href={content.team.ctaHref}
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-body font-semibold rounded-full hover:bg-olive-dark transition-colors"
                >
                  <EditableText path="team.ctaText" as="span" value={content.team.ctaText} />
                </EditableLink>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
