import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone, Instagram } from "lucide-react";
import { INSTAGRAM_URL } from "@/lib/social";

const navLinks = [
  { label: "Услуги", href: "#services" },
  { label: "Этапы", href: "#steps" },
  { label: "Команда", href: "#team" },
  { label: "Отзывы", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-warm border-b border-border"
          : "bg-background/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-20 relative">
        <a
          href="#"
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5"
        >
          <span className="font-display font-extrabold text-xl md:text-2xl text-foreground tracking-wide">
            Клиника пересадки волос
          </span>
          <span className="text-[10px] md:text-xs text-muted-foreground font-body">
            MediHairTour
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-body text-sm font-medium tracking-wide uppercase transition-colors ${
                scrolled
                  ? "text-foreground/70 hover:text-foreground"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {INSTAGRAM_URL ? (
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
            >
              <Instagram className="w-5 h-5 text-foreground" />
            </a>
          ) : null}
          <a
            href="tel:+79887364100"
            className="font-body font-phone text-lg font-semibold text-foreground"
          >
            <Phone className="w-5 h-5 inline mr-2" />
            +7 (988) 736 41 00
          </a>
          <a
            href="#calculator"
            className="px-6 py-2.5 bg-primary text-primary-foreground font-body font-semibold text-sm rounded-lg hover:bg-olive-dark transition-colors"
          >
            Консультация
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-foreground"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-card border-b border-border p-6"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-body text-foreground text-lg font-medium py-2"
              >
                {link.label}
              </a>
            ))}
            {INSTAGRAM_URL ? (
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-foreground/80 hover:text-foreground font-body"
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </a>
            ) : null}
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="tel:+79887364100"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-body font-semibold rounded-lg"
              >
                Позвонить
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
