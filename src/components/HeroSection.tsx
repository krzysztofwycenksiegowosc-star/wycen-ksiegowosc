import { useInView } from '../hooks/useInView';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative min-h-screen flex items-center pt-[72px] overflow-hidden" ref={ref}>
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-gradient-to-bl from-emerald-50/80 via-emerald-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-amber-50/40 via-teal-50/20 to-transparent rounded-full blur-3xl" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24 relative w-full">
        <div
          className={`max-w-3xl transition-all duration-1000 ease-out ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-emerald-50/80 backdrop-blur-sm border border-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles size={14} className="text-emerald-500" />
            <span>Nowe realia rynkowe po wdrożeniu KSeF</span>
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-soft" />
          </div>

          {/* Headline */}
          <h1 className="text-[2.5rem] sm:text-5xl md:text-[3.5rem] lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08] mb-6">
            Czy po KSeF nadal płacisz za księgowość{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                tyle, ile powinieneś?
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-full" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-10 max-w-2xl">
            Wiele małych firm nie zauważyło, że ceny usług księgowych rosną — mimo cyfryzacji i
            automatyzacji, które miały je obniżyć. Sprawdź, gdzie jesteś i podejmij świadomą
            decyzję.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#wycena"
              className="group inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-600/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              Sprawdź orientacyjną wycenę
              <ArrowRight
                size={18}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#zmiana"
              className="group inline-flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100"
            >
              Jak łatwa jest zmiana księgowości?
            </a>
          </div>

          {/* Subtle social proof */}
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {['bg-gradient-to-br from-emerald-200 to-emerald-300', 'bg-gradient-to-br from-teal-200 to-teal-300', 'bg-gradient-to-br from-amber-200 to-amber-300', 'bg-gradient-to-br from-slate-200 to-slate-300'].map((gradient, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full border-2 border-white ${gradient}`}
                  />
                ))}
              </div>
              <span className="font-medium text-slate-600">+240 przedsiębiorców</span>
            </div>
            <span className="hidden sm:block text-slate-200">|</span>
            <span>
              sprawdziło w tym miesiącu, czy nie przepłaca za księgowość
            </span>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Abstract card preview */}
            <div className="animate-float-slow bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 w-[280px] mb-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Twoja cena</span>
                <span className="text-xs text-rose-500 font-semibold bg-rose-50 px-2 py-0.5 rounded-full">+40%</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">450 zł<span className="text-base font-normal text-slate-400">/mies.</span></div>
              <div className="text-sm text-slate-400">Ryczałt, ~15 faktur</div>
              <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-gradient-to-r from-emerald-400 to-rose-400 rounded-full" />
              </div>
            </div>

            <div className="animate-float-slow [animation-delay:2s] bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-5 w-[240px] ml-12">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <span className="text-emerald-600 text-sm">✓</span>
                </div>
                <span className="text-sm font-semibold text-slate-700">Orientacyjna wycena</span>
              </div>
              <div className="text-2xl font-bold text-emerald-600">200–280 zł<span className="text-sm font-normal text-slate-400">/mies.</span></div>
              <div className="text-xs text-slate-400 mt-1">Możesz oszczędzać ~170 zł/mies.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
