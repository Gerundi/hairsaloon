import { Sparkles } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";

const PromoBanner = ({ variant = "sticky" }: { variant?: "sticky" | "inline" }) => {
  const { content } = useSiteContent();
  const promo = content.promo;

  if (!promo.enabled) return null;

  const wrapperClass =
    variant === "sticky"
      ? "sticky top-20 z-40 border-b border-gold/40 shadow-[0_8px_32px_rgba(198,168,90,0.25)]"
      : "rounded-2xl border border-gold/40 shadow-warm mb-8";

  return (
    <div
      className={`${wrapperClass} bg-gradient-to-r from-olive-dark via-primary to-olive text-primary-foreground`}
      role="region"
      aria-label="Акция на июль"
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <span className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold">
            <Sparkles className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="font-body text-xs sm:text-sm uppercase tracking-wider text-gold/90 mb-0.5">
              {promo.badge}
            </p>
            <p className="font-display font-bold text-lg sm:text-xl leading-tight">{promo.title}</p>
            <p className="font-body text-sm sm:text-base text-primary-foreground/90">{promo.subtitle}</p>
          </div>
        </div>
        <a
          href={promo.ctaHref}
          className="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-full bg-gold text-olive-dark font-body font-bold text-sm sm:text-base hover:bg-gold-light transition-colors shadow-gold animate-pulse sm:animate-none sm:hover:scale-[1.02]"
        >
          {promo.ctaText}
        </a>
      </div>
    </div>
  );
};

export default PromoBanner;
