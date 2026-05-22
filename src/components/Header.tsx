import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#wycena', label: 'Wycena' },
    { href: '#rynek', label: 'Raport cenowy' },
    { href: '#zmiana', label: 'Zmiana księgowego' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-600/20 group-hover:shadow-emerald-600/30 transition-shadow">
            <span className="text-white font-extrabold text-sm tracking-tight">W</span>
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight">
            Wyceń<span className="text-emerald-600">Księgowość</span>
            <span className="text-slate-300 font-medium">.pl</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-50"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#wycena"
          className="hidden md:inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-emerald-600/20 active:scale-[0.98]"
        >
          Sprawdź wycenę
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-slate-100 animate-fade-in">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-slate-600 hover:text-slate-900 text-base font-medium px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#wycena"
              onClick={() => setMenuOpen(false)}
              className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl text-base font-semibold transition-all mt-3"
            >
              Sprawdź wycenę
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
