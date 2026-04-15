import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone, Instagram } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { EditableLink, EditableText } from "@/components/editor/Editable";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { content } = useSiteContent();
  const navLinks = content.navbar.navLinks;
  const instagramUrl = content.navbar.instagramUrl;

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
          <EditableText
            path="navbar.brandTitle"
            as="span"
            value={content.navbar.brandTitle}
            className="font-display font-extrabold text-xl md:text-2xl text-foreground tracking-wide"
          />
          <EditableText
            path="navbar.brandSubtitle"
            as="span"
            value={content.navbar.brandSubtitle}
            className="text-[10px] md:text-xs text-muted-foreground font-body"
          />
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <EditableLink
              key={link.href}
              path={`navbar.navLinks.${i}.href`}
              href={link.href}
              className={`font-body text-sm font-medium tracking-wide uppercase transition-colors ${
                scrolled
                  ? "text-foreground/70 hover:text-foreground"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              <EditableText
                path={`navbar.navLinks.${i}.label`}
                as="span"
                value={link.label}
              />
            </EditableLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {instagramUrl ? (
            <EditableLink
              path="navbar.instagramUrl"
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
            >
              <Instagram className="w-5 h-5 text-foreground" />
            </EditableLink>
          ) : null}
          <EditableLink
            path="navbar.phoneHref"
            href={content.navbar.phoneHref}
            className="font-body font-phone text-lg font-semibold text-foreground"
          >
            <Phone className="w-5 h-5 inline mr-2" />
            <EditableText path="navbar.phoneText" as="span" value={content.navbar.phoneText} />
          </EditableLink>
          <EditableLink
            path="navbar.consultHref"
            href={content.navbar.consultHref}
            className="px-6 py-2.5 bg-primary text-primary-foreground font-body font-semibold text-sm rounded-lg hover:bg-olive-dark transition-colors"
          >
            <EditableText path="navbar.consultText" as="span" value={content.navbar.consultText} />
          </EditableLink>
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
            {navLinks.map((link, i) => (
              <EditableLink
                key={link.href}
                path={`navbar.navLinks.${i}.href`}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-body text-foreground text-lg font-medium py-2"
              >
                <EditableText path={`navbar.navLinks.${i}.label`} as="span" value={link.label} />
              </EditableLink>
            ))}
            {instagramUrl ? (
              <EditableLink
                path="navbar.instagramUrl"
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-foreground/80 hover:text-foreground font-body"
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </EditableLink>
            ) : null}
            <div className="mt-4 flex flex-col gap-3">
              <EditableLink
                path="navbar.phoneHref"
                href={content.navbar.phoneHref}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-body font-semibold rounded-lg"
              >
                <EditableText path="navbar.mobileCallText" as="span" value={content.navbar.mobileCallText} />
              </EditableLink>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
