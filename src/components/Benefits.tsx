import { useInView } from '../hooks/useInView';
import { ArrowRight, ClipboardList, BarChart3, UserCheck, ShieldCheck, Target, Compass } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    number: '01',
    title: 'Wypełniasz formularz',
    desc: 'Podajesz informacje o firmie, zakresie obsługi i swoich priorytetach.',
  },
  {
    icon: BarChart3,
    number: '02',
    title: 'Analizujemy i proponujemy',
    desc: 'Przeglądamy oferty za Ciebie. Wskazujemy biura rachunkowe odpowiadające Twoim priorytetom. Otrzymujesz aktualne rynkowe wyceny.',
  },
  {
    icon: UserCheck,
    number: '03',
    title: 'Sam decydujesz o kontakcie',
    desc: 'Otrzymujesz informacje potrzebne do decyzji i sam wybierasz, z kim chcesz rozmawiać.',
  },
];

const gains = [
  {
    icon: ShieldCheck,
    title: 'Zero presji sprzedażowej',
    desc: 'Spokojnie analizujesz niezobowiązujące wyceny.',
  },
  {
    icon: Target,
    title: 'Wyceny dopasowane do Ciebie',
    desc: 'Dlatego zależy nam na poznaniu Twoich priorytetów.',
  },
  {
    icon: Compass,
    title: 'Wsparcie w decyzji',
    desc: 'Widzisz, czy obecna albo rozważana oferta naprawdę ma sens.',
  },
];

export function Benefits() {
  const { ref, isInView } = useInView();

  return (
    <section id="jak-to-dziala" className="py-16 md:py-24 bg-slate-50/50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`rounded-[2.25rem] bg-white border border-slate-200/80 shadow-sm px-5 py-10 md:px-10 md:py-14 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="text-center mb-8 md:mb-11">
            <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 mb-6">
              Jak to działa
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              Porównujesz. Wybierasz. Kontaktujesz się sam.
            </h2>

            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Bez niechcianych telefonów, maili i wiadomości. Kontaktujesz się tylko wtedy, gdy widzisz sens rozmowy z wybranym biurem.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-7 md:gap-8 items-stretch">
            {/* Process path */}
            <div className="rounded-[2rem] bg-slate-50/80 border border-slate-200/80 p-6 md:p-8">
              <div className="mb-7">
                <p className="text-sm font-bold text-emerald-700 mb-2">
                  Proces
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                  Trzy proste kroki
                </h3>
              </div>

              <div className="relative space-y-6">
                <div className="absolute left-[21px] top-10 bottom-10 w-px bg-gradient-to-b from-emerald-100 via-emerald-300 to-emerald-100" />

                {steps.map((step) => (
                  <div key={step.number} className="relative flex gap-5">
                    <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white border border-emerald-100 shadow-sm">
                      <span className="text-sm font-black text-emerald-600">
                        {step.number}
                      </span>
                    </div>

                    <div className="pb-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-slate-900">
                          {step.title}
                        </h4>
                        <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-100">
                          <step.icon size={17} className="text-emerald-600" />
                        </div>
                      </div>

                      <p className="text-sm md:text-base text-slate-500 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gains panel */}
            <div className="rounded-[2rem] bg-emerald-50/70 border border-emerald-100 p-6 md:p-8">
              <div className="mb-7">
                <p className="text-sm font-bold text-emerald-700 mb-2">
                  Co zyskujesz?
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                  Komfort wyboru
                </h3>
              </div>

              <div className="space-y-4">
                {gains.map((gain) => (
                  <div
                    key={gain.title}
                    className="rounded-2xl bg-white/80 border border-emerald-100 p-5 shadow-sm"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100">
                        <gain.icon size={18} className="text-emerald-600" />
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-slate-900 mb-1.5">
                          {gain.title}
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {gain.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm text-emerald-800/80 leading-relaxed">
                Najpierw dostajesz obraz dostępnych możliwości. Dopiero potem decydujesz, czy chcesz z kimś rozmawiać.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('wk-form-mode', { detail: 'reset' }));
                setTimeout(() => document.getElementById('wycena')?.scrollIntoView({ behavior: 'smooth' }), 50);
              }}
              className="group inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-emerald-600/20 hover:-translate-y-0.5"
            >
              Wyceń i porównaj
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>

            <p className="text-sm text-slate-400 mt-4">
              Najpierw sprawdzasz cenę. Decyzja o kontakcie należy do Ciebie.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
