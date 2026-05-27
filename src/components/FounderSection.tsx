import { useInView } from '../hooks/useInView';
import { ShieldCheck, PhoneOff, UserCheck } from 'lucide-react';

const principles = [
  {
    icon: ShieldCheck,
    title: 'Bez presji',
  },
  {
    icon: PhoneOff,
    title: 'Bez sprzedażowej karuzeli',
  },
  {
    icon: UserCheck,
    title: 'Bez udostępniania Twoich danych biurom',
  },
];

export function FounderSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`rounded-[2.25rem] bg-gradient-to-br from-slate-50 via-white to-emerald-50/70 border border-slate-200/70 shadow-sm px-6 py-10 md:px-12 md:py-14 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 mb-6">
              Dlaczego powstało WyceńKsięgowość?
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-8">
              Żeby porównywać księgowość na własnych warunkach
            </h2>
          </div>

          <div className="max-w-4xl mx-auto rounded-3xl bg-white/80 border border-slate-200/70 shadow-sm p-6 md:p-8">
            <div className="space-y-5 text-left">
              <div className="flex gap-4">
                <div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                  Wybór księgowości to trudna i odpowiedzialna decyzja. Wymaga czasu, porównania i spokojnej analizy.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                  Przypadkowe oferty rzadko pomagają. Presja sprzedawców jeszcze mniej. Dlatego najpierw dostajesz orientację w cenach i dostępnych opcjach — bez zmuszania do kontaktu.
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50/80 border border-emerald-100 px-5 py-4">
                <p className="text-lg md:text-xl font-bold text-slate-900 text-center">
                  Sprawdzasz. Porównujesz. Decydujesz sam.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="rounded-2xl bg-white/80 border border-emerald-100 p-5 text-center shadow-sm"
              >
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                  <principle.icon size={19} className="text-emerald-600" />
                </div>
                <p className="text-sm md:text-base font-semibold text-slate-800">
                  {principle.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
