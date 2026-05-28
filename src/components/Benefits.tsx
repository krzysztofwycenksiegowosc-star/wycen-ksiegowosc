import { useInView } from '../hooks/useInView';
import { ClipboardList, BarChart3, UserCheck, ArrowRight, PhoneOff, Target, Sparkles } from 'lucide-react';

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
    desc: 'Przeglądamy oferty za Ciebie. Wskazujemy biura rachunkowe, odpowiadające Twoim priorytetom. Otrzymujesz aktualne rynkowe wyceny.',
  },
  {
    icon: UserCheck,
    number: '03',
    title: 'Sam decydujesz o kontakcie',
    desc: 'Otrzymujesz informacje potrzebne do decyzji i sam wybierasz, z kim chcesz rozmawiać.',
  },
];

const benefits = [
  {
    icon: PhoneOff,
    title: 'Bez lawiny telefonów',
    desc: 'Nie trafiasz do sprzedażowej karuzeli. Najpierw dostajesz niezobowiązujące wyceny. Decyzję o kontakcie podejmujesz sam.',
  },
  {
    icon: Target,
    title: 'Wyceny dopasowane do Ciebie',
    desc: 'Cena ma znaczenie, ale nie jest jedynym kryterium. Dlatego zależy nam na poznaniu Twoich priorytetów.',
  },
  {
    icon: Sparkles,
    title: 'Zawsze zyskujesz',
    desc: 'Dzięki wycenie wiesz, czy oferta, z której korzystasz albo którą rozważasz, naprawdę ma sens. Możesz podjąć lepszą decyzję.',
  },
];

export function Benefits() {
  const { ref, isInView } = useInView();

  return (
    <section id="jak-to-dziala" className="py-20 md:py-24 bg-slate-50/50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`rounded-[2.25rem] bg-white border border-slate-200/80 shadow-sm px-5 py-10 md:px-10 md:py-14 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="text-center mb-11">
            <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 mb-6">
              Jak to działa
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              Porównujesz. Wybierasz. Kontaktujesz się sam.
            </h2>

            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Nie uruchamiasz lawiny telefonów. Kontaktujesz się tylko wtedy, gdy widzisz sens rozmowy z wybranym biurem.
            </p>
          </div>

          {/* Process */}
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-[18%] right-[18%] h-px bg-gradient-to-r from-emerald-100 via-emerald-300 to-emerald-100 -translate-y-1/2" />

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5">
              {steps.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="bg-slate-50/80 rounded-[2rem] border border-slate-200/80 p-7 md:p-8 h-full">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl md:text-4xl font-black tracking-tight text-emerald-600">
                        {step.number}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-100 flex items-center justify-center shadow-sm">
                        <step.icon size={20} className="text-emerald-600" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                      {step.title}
                    </h3>

                    <p className="text-sm text-slate-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-6 z-10 w-12 h-12 rounded-full bg-white border border-emerald-100 shadow-sm items-center justify-center -translate-y-1/2">
                      <ArrowRight size={19} className="text-emerald-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-3xl bg-emerald-50/60 border border-emerald-100 p-7 md:p-8 text-center"
              >
                <div className="w-11 h-11 rounded-2xl bg-white/80 border border-emerald-100 flex items-center justify-center mx-auto mb-5">
                  <benefit.icon size={19} className="text-emerald-600" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {benefit.title}
                </h3>

                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
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
