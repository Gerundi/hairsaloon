import { MapPin, Phone, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-olive-gradient flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">T</span>
              </div>
              <span className="font-display font-bold text-xl text-background">
                TRANSHAIR TOUR
              </span>
            </div>
            <p className="text-background/60 font-body leading-relaxed">
              Профессиональная пересадка волос с гарантией результата. Лучшие специалисты из Турции.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-background text-lg mb-4">Контакты</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-background/70 font-body">
                <Phone className="w-4 h-4" />
                <a href="tel:+79181088778" className="hover:text-background transition-colors">
                  +7 (918) 108 87 78
                </a>
              </div>
              <div className="flex items-start gap-3 text-background/70 font-body">
                <MapPin className="w-4 h-4 mt-1" />
                <span>г. Сочи, ул. Коммунальная, 41Б</span>
              </div>
              <div className="flex items-center gap-3 text-background/70 font-body">
                <Clock className="w-4 h-4" />
                <span>Пн-Вс: 9:00 - 20:00</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-background text-lg mb-4">Навигация</h4>
            <div className="space-y-2">
              {[
                { label: "Услуги", href: "#services" },
                { label: "Результаты", href: "#results" },
                { label: "Этапы", href: "#steps" },
                { label: "Команда", href: "#team" },
                { label: "FAQ", href: "#faq" },
              ].map((link) => (
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
            © 2025 TransHair Tour. Все права защищены.
          </p>
          <p className="text-background/40 font-body text-sm">
            Запись только по телефону: +7 (918) 108 87 78
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
