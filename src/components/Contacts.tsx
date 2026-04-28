import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { EditableLink, EditableText } from "@/components/editor/Editable";

const Contacts = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSiteContent();

  return (
    <section
      id="contacts"
      className="py-24 bg-[#f7eddc]"
      ref={ref}
    >
      <div className="container mx-auto px-6 grid gap-10 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            <EditableText path="contacts.title" as="span" value={content.contacts.title} />
          </h2>
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-semibold text-foreground">
              <EditableText path="contacts.city1Name" as="span" value={content.contacts.city1Name} />
            </h3>
            <p className="text-muted-foreground font-body leading-relaxed">
              <EditableText path="contacts.city1Address" as="span" value={content.contacts.city1Address} className="whitespace-pre-line" />
            </p>
            <div className="space-y-3">
              <h3 className="text-2xl font-display font-semibold text-foreground">
                <EditableText path="contacts.city2Name" as="span" value={content.contacts.city2Name} />
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                <EditableText path="contacts.city2Address" as="span" value={content.contacts.city2Address} className="whitespace-pre-line" />
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-4">
              <EditableLink
                path="contacts.phoneHref"
                href={content.contacts.phoneHref}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-accent text-accent font-body font-medium font-phone rounded-full hover:bg-accent/5 transition-all duration-300 text-lg"
              >
                <Phone className="w-5 h-5" />
                <EditableText path="contacts.phoneText" as="span" value={content.contacts.phoneText} />
              </EditableLink>
              <EditableLink
                path="contacts.ctaHref"
                href={content.contacts.ctaHref}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body font-semibold rounded-full hover:bg-olive-dark transition-all duration-300 shadow-gold text-lg"
              >
                <EditableText path="contacts.ctaText" as="span" value={content.contacts.ctaText} />
              </EditableLink>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full h-[320px] md:h-[420px] rounded-3xl overflow-hidden shadow-warm border border-border"
        >
          <iframe
            src={content.contacts.mapEmbedSrc}
            title="Карта клиники MediHairTour"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default Contacts;

