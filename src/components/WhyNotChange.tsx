import { useInView } from '../hooks/useInView';
import { ShieldCheck, FileText, Building2, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

const fears = [
  {
    icon: ShieldCheck,
    fear: '„Boję się chaosu w dokumentach"',
    solution: 'Zmiana nie wymaga Twojej ingerencji — nowy księgowy przejmuje wszystko i porządkuje na nowo.',
    color: 'emerald',
  },
  {
    icon: FileText,
    fear: '„Nie wiem, jak przejąć dokumenty"',
    solution: 'Obecny księgowy ma prawny obowiązek przekazać pełną dokumentację w terminie 30 dni.',
    color: 'blue',
  },
  {
    icon: Building2,
    fear: '„Nie chcę problemów z Urzędem Skarbowym"',
    solution: 'Dobry księgowy przejmuje pełną odpowiedzialność za ciągłość i terminowość rozliczeń.',
    color: 'amber',
  },
  {
    icon: Clock,
    fear: '„To pewnie zajmie mnóstwo czasu"',
    solution: 'Od Ciebie potrzebujemy maksymalnie 30 minut na podpisanie upoważnienia. Resztę ogarniamy my.',
    color: 'purple',
  },
];

const steps = [
  {
    number: '01',
    title: 'Podpisujesz upoważnienie',
    desc: 'Jeden dokument — online lub osobiście.',
  },
  {
    number: '02',
    title: 'My kontaktujemy się z księgowym',
    desc: 'Przejmujemy dokumentację zgodnie z procedurą.',
  },
  {
    number: '03',
    title: 'Weryfikujemy stan księgowań',
    desc: 'Sprawdzamy ciągłość i kompletność.',
  },
  {
    number: '04',
    title: 'Kontynuujemy bez przerwy',
    desc: 'Twoje obowiązki są realizowane terminowo.',
  },
];

const colorMap: Record<string, { bg: string; icon: string; accent: string }> = {
  emerald: {
    bg: 'bg-emerald-50',
    icon: 'text-emerald-600',
    accent: 'bg-emerald-500',
  },
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    accent: 'bg-blue-500',
  },
  amber: {
    bg: 'bg-amber-50',
    icon: 'text-amber-600',
    accent: 'bg-amber-500',
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    accent: 'bg-purple-500',
  },
};

export function WhyNotChange() {
  const { ref, isInView } = useInView();

  return (
    <section id="zmiana" className="py-24 md:py-32 bg-white relative overflow-hidden" ref={ref}>
      {/* Subtle background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-slate-50 to-transparent rounded-full -translate-y-1/3 translate-x-1/4 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-full text-sm font-medium mb-5">
            <ShieldCheck size={14} />
            Spokojna zmiana
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Dlaczego tak trudno zmienić księgowego?
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Większość przedsiębiorców zostaje przy swoim księgowym nie ze satysfakcji, ale ze
            strachu przed chaosem. Ten strach jest naturalny — ale nieuzasadniony.
          </p>
        </div>

        {/* Fears & Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {fears.map((item, i) => {
            const colors = colorMap[item.color];
            return (
              <div
                key={i}
                className={`group bg-white rounded-2xl border border-slate-200/60 p-7 transition-all duration-500 hover:shadow-lg hover:shadow-slate-100/80 hover:border-slate-200 ${
                  isInView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: isInView ? `${i * 100 + 200}ms` : '0ms' }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}
                  >
                    <item.icon size={20} className={colors.icon} />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-slate-900 mb-2 italic">
                      {item.fear}
                    </p>
                    <div className="flex items-start gap-2">
                      <CheckCircle2
                        size={16}
                        className="text-emerald-500 flex-shrink-0 mt-0.5"
                      />
                      <p className="text-sm text-slate-500 leading-relaxed">{item.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Steps */}
        <div
          className={`transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: isInView ? '600ms' : '0ms' }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Jak wygląda zmiana krok po kroku?
            </h3>
            <p className="text-slate-500">Prosto, spokojnie, z pełnym wsparciem.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-slate-50 rounded-2xl p-6 h-full border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-300 group">
                  <span className="text-3xl font-extrabold text-slate-200 group-hover:text-emerald-200 transition-colors">
                    {step.number}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-3 mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6">
                    <ArrowRight size={16} className="text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a
              href="#wycena"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-emerald-600/20 hover:-translate-y-0.5 group"
            >
              Sprawdź, ile możesz zaoszczędzić
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
