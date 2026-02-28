import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Услуги", href: "#services" },
  { label: "Результаты", href: "#results" },
  { label: "До и после", href: "#before-after" },
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
          ? "bg-card/95 backdrop-blur-lg shadow-warm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-20">
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-olive-gradient flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-lg">M</span>
          </div>
          <div>
            <span className={`font-display font-bold text-lg ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
              MediHairTour
            </span>
          </div>
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
                  : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+79887364100"
            className={`font-body text-sm font-medium ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
          >
            <Phone className="w-4 h-4 inline mr-2" />
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
          className={`lg:hidden ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
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
            <a
              href="tel:+79887364100"
              className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-body font-semibold rounded-lg"
            >
              Позвонить
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
