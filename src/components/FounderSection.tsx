import { useInView } from '../hooks/useInView';
import { MessageCircle } from 'lucide-react';

export function FounderSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-slate-50/50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 mx-auto mb-6 flex items-center justify-center shadow-lg shadow-emerald-600/20">
            <span className="text-white text-2xl font-bold">MK</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-full text-sm font-medium mb-6">
            <MessageCircle size={14} />
            Dlaczego stworzyłem WycenKsiegowosc.pl?
          </div>

          <blockquote className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed mb-6">
            „Po rozmowach z przedsiębiorcami zauważyłem, że wiele firm kompletnie nie wie dziś, czy płaci za księgowość uczciwą stawkę — szczególnie po zmianach związanych z KSeF.

Powstał chaos:
duże rozbieżności cenowe, podwyżki bez jasnego uzasadnienia i ogromna niepewność przy zmianie biura.

WycenKsiegowosc.pl powstało po to, żeby uporządkować ten rynek i pomóc przedsiębiorcom podejmować spokojniejsze decyzje."
          </blockquote>

          <div>
            <p className="font-semibold text-slate-900">Marcin Kowalski</p>
            <p className="text-sm text-slate-400 mt-1">
              Twórca WycenKsięgowość.pl · przedsiębiorca od 2016 r.
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100">
            <p className="text-sm text-slate-400 leading-relaxed max-w-lg mx-auto">
              Nie jesteśmy korporacją ani biurem księgowym. Jesteśmy narzędziem, które pomaga
              przedsiębiorcom podejmować lepsze decyzje — na podstawie danych, nie obaw.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
