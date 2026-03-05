import { MapPin, Phone, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-4">
              <span className="font-display font-bold text-xl text-background">
                MediHairTour
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
                <a
                  href="tel:+79887364100"
                  className="hover:text-background transition-colors font-phone"
                >
                  +7 (988) 736 41 00
                </a>
              </div>
              <div className="flex items-start gap-3 text-background/70 font-body">
                <MapPin className="w-4 h-4 mt-1" />
                <span>
                  г. Сочи, пер. Трунова, 6, корп. 4, офис 30
                  <br />
                  г. Пятигорск, ул. Бунимовича, 15, корп. 2
                </span>
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
                { label: "Этапы", href: "#steps" },
                { label: "Команда", href: "#team" },
                { label: "Отзывы", href: "#reviews" },
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
            © 2025 MediHairTour. Все права защищены.
          </p>
          <p className="text-background/40 font-body text-sm font-phone">
            Запись только по телефону: +7 (988) 736 41 00
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
