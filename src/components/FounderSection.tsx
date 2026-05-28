import { useInView } from '../hooks/useInView';
import { ArrowRight, Quote } from 'lucide-react';

export function FounderSection() {
  const { ref, isInView } = useInView();

  const scrollToForm = (mode: 'existing' | 'starting') => {
    window.dispatchEvent(new CustomEvent('wk-form-mode', { detail: mode }));
    setTimeout(() => document.getElementById('wycena')?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`rounded-[2.25rem] bg-gradient-to-br from-slate-50 via-white to-emerald-50/70 border border-slate-200/70 shadow-sm px-6 py-12 md:px-12 md:py-16 text-center transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 mb-6">
            Dlaczego powstało WyceńKsięgowość?
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight max-w-4xl mx-auto mb-4">
            Żeby porównywać księgowość na własnych warunkach
          </h2>

          <p className="text-xl md:text-2xl font-semibold text-emerald-700 max-w-3xl mx-auto mb-7">
            Żeby nie tracić czasu na szukanie biura na własną rękę.
          </p>

          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mb-9">
            Wybór księgowości to odpowiedzialna decyzja. Nie musi jednak zaczynać się od presji,
            przypadkowych ofert i chaosu informacyjnego. Z pomocą WyceńKsięgowość najpierw sprawdzasz wyceny dopasowane
            do Twojej firmy i priorytetów. Dopiero potem spokojnie decydujesz, z kim chcesz rozmawiać.
          </p>

          <div className="max-w-3xl mx-auto rounded-3xl bg-white/80 border border-emerald-100 p-6 md:p-7 mb-9 text-left shadow-sm">
            <div className="flex gap-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                <Quote size={19} className="text-emerald-600" />
              </div>

              <p className="font-serif italic text-xl md:text-2xl text-emerald-800 leading-relaxed">
                Szkoda czasu i energii na analizę przypadkowych ofert, jeśli najpierw możesz spokojnie, bez presji sprawdzić, jakie masz opcje do wyboru.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-5">
            <button
              onClick={() => scrollToForm('existing')}
              className="group inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-5 rounded-2xl text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-emerald-600/20 hover:-translate-y-0.5"
            >
              <span>Masz firmę? — Wyceń i porównaj</span>
              <ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollToForm('starting')}
              className="group inline-flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-7 py-5 rounded-2xl text-base font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Zakładasz firmę? — Oszacuj koszt</span>
              <ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <p className="text-sm text-slate-400">
            To zajmie około 2 minut. Potem sam decydujesz, z kim chcesz rozmawiać.
          </p>
        </div>
      </div>
    </section>
  );
}
