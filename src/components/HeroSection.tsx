import { useInView } from '../hooks/useInView';
import { ArrowRight, ShieldCheck, PhoneOff } from 'lucide-react';

const heroSteps = [
  {
    number: '01',
    desc: 'Krótko opisujesz firmę i to, co jest dla Ciebie ważne.',
  },
  {
    number: '02',
    desc: 'Dostajesz wyceny dopasowane do Twojej sytuacji.',
  },
  {
    number: '03',
    desc: 'Ty decydujesz, z kim chcesz rozmawiać.',
  },
];

const trustChips = [
  {
    icon: ShieldCheck,
    label: 'Twoje dane są bezpieczne',
  },
  {
    icon: PhoneOff,
    label: 'Zero niechcianych kontaktów',
  },
];

export function HeroSection() {
  const { ref, isInView } = useInView(0.1);

  const scrollToForm = (formMode: 'existing' | 'starting') => {
    window.dispatchEvent(new CustomEvent('wk-form-mode', { detail: formMode }));
    setTimeout(() => {
      document.getElementById('wycena')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-[72px] overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-gradient-to-bl from-emerald-50/80 via-emerald-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-amber-50/30 via-teal-50/15 to-transparent rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24 relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_0.9fr] gap-10 lg:gap-14 items-center">
          {/* Copy */}
          <div className={`transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-sm font-medium text-emerald-600 mb-5 tracking-wide">
              Porównanie kosztów księgowości dla małych firm
            </p>

            <h1 className="text-[2.6rem] sm:text-5xl md:text-[3.4rem] lg:text-[4rem] font-extrabold text-slate-900 tracking-tight leading-[1.06] mb-6 max-w-4xl">
              Sprawdź, czy po KSeF-ie{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 bg-clip-text text-transparent">
                nie przepłacasz
              </span>{' '}
              za księgowość
            </h1>

            <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-10 max-w-2xl">
              Porównaj obecną cenę obsługi księgowej albo oszacuj koszt dla nowej firmy — <strong className="font-semibold text-slate-700">bez udostępniania Twoich danych</strong> biurom rachunkowym i bez lawiny telefonów i maili.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 max-w-3xl">
              <button
                onClick={() => scrollToForm('existing')}
                className="group inline-flex w-full min-h-[58px] items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-2xl text-sm md:text-base font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-600/20 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
              >
                Masz firmę? — Wyceń i porównaj
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1 flex-shrink-0" />
              </button>

              <button
                onClick={() => scrollToForm('starting')}
                className="group inline-flex w-full min-h-[58px] items-center justify-center bg-white hover:bg-slate-50 text-slate-700 px-6 py-4 rounded-2xl text-sm md:text-base font-semibold transition-all duration-300 border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 whitespace-nowrap"
              >
                Zakładasz firmę? — Oszacuj koszt
              </button>
            </div>

            <p className="text-sm text-slate-400 max-w-2xl">
              Najpierw sprawdzasz cenę i dostępne możliwości. Potem sam decydujesz, z kim chcesz rozmawiać.
            </p>
          </div>

          {/* Process panel */}
          <div className={`transition-all duration-1000 delay-300 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-emerald-100/60 via-white to-teal-50/80 blur-2xl opacity-80" />

              <div className="relative rounded-[2rem] border border-emerald-100 bg-white/90 backdrop-blur-xl shadow-2xl shadow-emerald-100/70 p-6 md:p-7">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight mb-6">
                  Wycena bez udostępniania Twoich danych
                </h2>

                <div className="space-y-3">
                  {heroSteps.map((step) => (
                    <div
                      key={step.number}
                      className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100">
                        <span className="text-sm font-black text-emerald-600">
                          {step.number}
                        </span>
                      </div>

                      <p className="text-sm md:text-base text-slate-600 leading-relaxed pt-1">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-2.5 mt-5">
                  {trustChips.map((chip) => (
                    <div
                      key={chip.label}
                      className="flex items-center gap-2 rounded-2xl bg-emerald-50/70 border border-emerald-100 px-3.5 py-3"
                    >
                      <chip.icon size={16} className="text-emerald-600 shrink-0" />
                      <span className="text-xs font-semibold text-slate-700">
                        {chip.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
