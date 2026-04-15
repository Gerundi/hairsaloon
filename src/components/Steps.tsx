import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { EditableText } from "@/components/editor/Editable";

const Steps = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSiteContent();
  const resolvedSteps = content.steps.items;

  return (
    <section id="steps" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <EditableText
            path="steps.sectionLabel"
            as="span"
            value={content.steps.sectionLabel}
            className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive font-body text-sm font-medium tracking-wider uppercase mb-4"
          />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            <EditableText path="steps.title" as="span" value={content.steps.title} />
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {resolvedSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative flex items-center mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Number circle */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-olive-gradient flex items-center justify-center z-10 shadow-warm">
                <EditableText path={`steps.items.${i}.num`} as="span" value={step.num} className="text-primary-foreground font-display font-bold text-lg" />
              </div>

              {/* Content */}
              <div className={`ml-28 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-20 md:text-right" : "md:pl-20"}`}>
                <div className="bg-card rounded-2xl p-6 shadow-warm border border-border">
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    <EditableText path={`steps.items.${i}.title`} as="span" value={step.title} />
                  </h3>
                  <p className="text-muted-foreground font-body">
                    <EditableText path={`steps.items.${i}.desc`} as="span" value={step.desc} />
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
