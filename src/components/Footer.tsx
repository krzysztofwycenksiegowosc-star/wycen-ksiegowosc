import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <span className="text-white font-extrabold text-sm">W</span>
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                Wyceń<span className="text-emerald-400">Księgowość</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Sprawdź, czy nie przepłacasz za księgowość. Porównaj wyceny, podejmuj świadome decyzje.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Nawigacja</h4>
            <ul className="space-y-3">
              <li><a href="#wycena" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">Porównaj cenę</a></li>
              <li><a href="#jak-to-dziala" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">Jak to działa</a></li>
              <li><a href="#zmiana" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">Zmiana biura</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">Polityka prywatności</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">Regulamin</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:kontakt@wycenksiegowosc.pl" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                  kontakt@wycenksiegowosc.pl
                </a>
              </li>
              <li className="text-sm text-slate-400">Pon–Pt: 9:00–17:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 space-y-3">
          <p className="text-xs text-slate-500 text-center leading-relaxed">
            WyceńKsięgowość nie jest biurem rachunkowym. Pomagamy porównać koszt i dostępne możliwości obsługi księgowej.
          </p>
          <p className="text-xs text-slate-500 text-center leading-relaxed">
            Nie udostępniamy Twoich danych biurom rachunkowym. Otrzymujesz informacje potrzebne do decyzji i sam wybierasz, z kim chcesz się skontaktować.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-slate-500">© {currentYear} WyceńKsięgowość. Wszelkie prawa zastrzeżone.</p>
            <p className="text-xs text-slate-600 flex items-center gap-1.5">
              Zbudowane z <Heart size={12} className="text-rose-500" /> dla polskich przedsiębiorców
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
