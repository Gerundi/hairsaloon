import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { EditableImage, EditableLink, EditableText } from "@/components/editor/Editable";

const Hero = () => {
  const { content } = useSiteContent();
  const stats = content.hero.stats;

  return (
    <section className="relative min-h-screen flex items-center bg-transparent">
      <div className="container mx-auto px-6 py-24 md:py-28 lg:py-32 grid gap-10 lg:gap-8 lg:grid-cols-2 items-center">
        {/* Left: content */}
        <div className="relative z-10">
          <div className="max-w-xl lg:max-w-none min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <EditableText
              path="hero.badgeText"
              as="span"
              value={content.hero.badgeText}
              className="inline-block px-4 py-2 rounded-full bg-secondary text-accent font-body text-sm font-medium tracking-wider uppercase border border-accent/30"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-display font-bold text-olive-dark leading-[0.95] mb-6 break-words"
          >
            <EditableText path="hero.titleLine1" as="span" value={content.hero.titleLine1} />
            <br />
            <EditableText path="hero.titleLine2" as="span" value={content.hero.titleLine2} />
            <br />
            <EditableText path="hero.titleHighlight" as="span" value={content.hero.titleHighlight} className="text-gold" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground font-body font-light mb-10 max-w-xl"
          >
            <EditableText path="hero.subtitle" as="span" value={content.hero.subtitle} />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 mb-16"
          >
            <EditableLink
              path="hero.phoneHref"
              href={content.hero.phoneHref}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-accent text-accent font-body font-medium font-phone rounded-full hover:bg-accent/5 transition-all duration-300 text-lg"
            >
              <Phone className="w-5 h-5" />
              <EditableText path="hero.phoneText" as="span" value={content.hero.phoneText} />
            </EditableLink>
            <EditableLink
              path="hero.calcHref"
              href={content.hero.calcHref}
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body font-semibold rounded-full hover:bg-olive-dark transition-all duration-300 shadow-gold text-lg"
            >
              <EditableText path="hero.calcText" as="span" value={content.hero.calcText} />
            </EditableLink>
            <EditableLink
              path="hero.freeConsultHref"
              href={content.hero.freeConsultHref}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gold bg-gold text-olive-dark font-body font-semibold rounded-full shadow-[0_0_25px_rgba(217,152,54,0.9)] text-lg animate-pulse"
            >
              <EditableText path="hero.freeConsultText" as="span" value={content.hero.freeConsultText} />
            </EditableLink>
          </motion.div>
          </div>
        </div>

        {/* Right: image */}
        <div className="relative h-[360px] md:h-[460px] lg:h-[520px] xl:h-[560px] rounded-3xl overflow-hidden shadow-warm bg-muted min-w-0 w-full z-0">
          <EditableImage
            path="hero.heroImageSrc"
            src={content.hero.heroImageSrc}
            alt={content.hero.heroImageAlt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover pointer-events-none brightness-[1.03] contrast-[1.08] saturate-[1.05]"
          />
        </div>

        {/* Stats bar (full width under content) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative z-10 md:col-span-2 mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 bg-card rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-border"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-1">
                <EditableText path={`hero.stats.${i}.value`} as="span" value={stat.value} />
              </div>
              <div className="text-sm text-muted-foreground font-body">
                <EditableText path={`hero.stats.${i}.label`} as="span" value={stat.label} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* WhatsApp floating */}
      <EditableLink
        path="hero.whatsappHref"
        href={content.hero.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-warm hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-8 h-8 text-accent-foreground" />
      </EditableLink>
    </section>
  );
};

export default Hero;
