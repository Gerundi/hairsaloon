import { MapPin, Phone, Clock, Instagram } from "lucide-react";
import { useSiteContent } from "@/contexts/SiteContentContext";

const Footer = () => {
  const { content } = useSiteContent();
  const instagramUrl = content.footer.instagramUrl;
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-4">
              <span className="font-display font-bold text-xl text-background">
                {content.footer.brandName}
              </span>
            </div>
            <p className="text-background/60 font-body leading-relaxed">
              {content.footer.description}
            </p>
            <p className="mt-2 text-background/45 font-body font-light text-sm">
              ООО "Многопрофильный медицинский центр "3А""
            </p>
            {instagramUrl ? (
              <div className="mt-6">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-background/70 hover:text-background transition-colors font-body"
                >
                  <Instagram className="w-5 h-5" />
                  Instagram
                </a>
              </div>
            ) : null}
          </div>

          <div>
            <h4 className="font-display font-bold text-background text-lg mb-4">{content.footer.contactsTitle}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-background/70 font-body">
                <Phone className="w-4 h-4" />
                <a
                  href={content.footer.phoneHref}
                  className="hover:text-background transition-colors font-phone"
                >
                  {content.footer.phoneText}
                </a>
              </div>
              <div className="flex items-start gap-3 text-background/70 font-body">
                <MapPin className="w-4 h-4 mt-1" />
                <span>
                  {content.footer.address.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                </span>
              </div>
              <div className="flex items-center gap-3 text-background/70 font-body">
                <Clock className="w-4 h-4" />
                <span>{content.footer.hours}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-background text-lg mb-4">{content.footer.navigationTitle}</h4>
            <div className="space-y-2">
              {content.footer.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-background/70 font-body hover:text-background transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/40 font-body text-sm">
            {content.footer.copyright}
          </p>
          <p className="text-background/40 font-body text-sm font-phone">
            {content.footer.bookingText}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
