import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Jak to działa', href: '#wycena' },
    { label: 'Raport cenowy', href: '#rynek' },
    { label: 'Zmiana księgowego', href: '#zmiana' },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <span className="text-white font-extrabold text-sm">W</span>
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                Wycen<span className="text-emerald-400">Księgowość</span>
                <span className="text-slate-500 font-medium">.pl</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Sprawdź, czy nie przepłacasz za księgowość. Porównaj ceny, podejmuj świadome
              decyzje.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
              Nawigacja
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
              Kontakt
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:kontakt@wycenksiengowosc.pl"
                  className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  kontakt@wycenksiengowosc.pl
                </a>
              </li>
              <li className="text-sm text-slate-400">Pon–Pt: 9:00–17:00</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              © {currentYear} WycenKsięgowość.pl. Wszelkie prawa zastrzeżone.
            </p>
            <p className="text-xs text-slate-600 flex items-center gap-1.5">
              Zbudowane z <Heart size={12} className="text-rose-500" /> dla polskich
              przedsiębiorców
            </p>
          </div>
          <p className="text-xs text-slate-600 mt-4 text-center max-w-2xl mx-auto leading-relaxed">
            Niniejsza strona ma charakter informacyjny i nie stanowi porady księgowej, podatkowej
            ani prawnej. Przed podjęciem decyzji o zmianie księgowego zalecamy konsultację z
            licencjonowanym doradcą.
          </p>
        </div>
      </div>
    </footer>
  );
}
