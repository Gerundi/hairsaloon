import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { EditableText } from "@/components/editor/Editable";

const FAQ = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [open, setOpen] = useState<number | null>(null);
  const { content } = useSiteContent();
  const faqs = content.faq.items;

  return (
    <section id="faq" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <EditableText
            path="faq.sectionLabel"
            as="span"
            value={content.faq.sectionLabel}
            className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive font-body text-sm font-medium tracking-wider uppercase mb-4"
          />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            <EditableText path="faq.title" as="span" value={content.faq.title} />
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between bg-card rounded-xl p-6 border border-olive/30 hover:border-olive/40 transition-all duration-300 text-left"
              >
                <span className="font-display text-lg font-semibold text-foreground pr-4">
                  <EditableText path={`faq.items.${i}.q`} as="span" value={faq.q} />
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-olive shrink-0 transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-card border border-t-0 border-olive/30 rounded-b-xl px-6 pb-6"
                >
                  <p className="text-muted-foreground font-body leading-relaxed pt-2">
                    <EditableText path={`faq.items.${i}.a`} as="span" value={faq.a} />
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
