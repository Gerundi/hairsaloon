import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { EditableText } from "@/components/editor/Editable";

const Reviews = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSiteContent();
  const reviews = content.reviews.items;

  return (
    <section id="reviews" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <EditableText
            path="reviews.sectionLabel"
            as="span"
            value={content.reviews.sectionLabel}
            className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive font-body text-sm font-medium tracking-wider uppercase mb-4"
          />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            <EditableText path="reviews.title" as="span" value={content.reviews.title} />
          </h2>
          <div className="inline-flex items-center gap-2 bg-card rounded-full px-6 py-3 border border-border shadow-warm">
            <EditableText path="reviews.ratingSource" as="span" value={content.reviews.ratingSource} className="font-body font-bold text-foreground text-lg" />
            <Star className="w-5 h-5 text-gold fill-gold" />
            <EditableText path="reviews.ratingValue" as="span" value={content.reviews.ratingValue} className="font-body font-bold text-foreground text-lg" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-warm"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="w-5 h-5 text-gold fill-gold" />
                ))}
              </div>
              <p className="text-foreground font-body leading-relaxed mb-6">«<EditableText path={`reviews.items.${i}.text`} as="span" value={review.text} />»</p>
              <p className="text-olive font-body font-semibold">
                <EditableText path={`reviews.items.${i}.name`} as="span" value={review.name} />
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
