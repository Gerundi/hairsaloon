import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Car, Award, FileCheck, Heart, Phone, DollarSign } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { EditableText } from "@/components/editor/Editable";

const Advantages = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSiteContent();
  const icons = [Award, DollarSign, Heart, Phone, Car, FileCheck];

  return (
    <section className="py-24 bg-olive-gradient" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <EditableText
            path="advantages.sectionLabel"
            as="span"
            value={content.advantages.sectionLabel}
            className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-gold-light font-body text-sm font-medium tracking-wider uppercase mb-4"
          />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            <EditableText path="advantages.title" as="span" value={content.advantages.title} />
          </h2>
          <p className="text-lg text-primary-foreground/70 font-body max-w-2xl mx-auto">
            <EditableText path="advantages.subtitle" as="span" value={content.advantages.subtitle} />
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.advantages.items.map((a, i) => {
            const AdvantageIcon = icons[i] ?? Award;
            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 hover:bg-primary-foreground/10 transition-all duration-300"
            >
              <AdvantageIcon className="w-10 h-10 text-gold mb-4" />
              <h3 className="text-xl font-display font-bold text-primary-foreground mb-2">
                <EditableText path={`advantages.items.${i}.title`} as="span" value={a.title} />
              </h3>
              <p className="text-primary-foreground/70 font-body">
                <EditableText path={`advantages.items.${i}.desc`} as="span" value={a.desc} />
              </p>
            </motion.div>
          );
        })}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
