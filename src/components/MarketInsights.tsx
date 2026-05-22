import { useInView } from '../hooks/useInView';
import { BarChart3, TrendingUp, Search, Lightbulb } from 'lucide-react';

const insights = [
  {
    icon: BarChart3,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    title: 'Typowe ceny księgowości',
    stats: [
      { label: 'Ryczałt', value: '150–400 zł/mies.' },
      { label: 'KPiR', value: '250–600 zł/mies.' },
      { label: 'Spółki', value: 'od 500 zł/mies.' },
    ],
    description: 'Ceny różnią się znacząco w zależności od regionu, formy opodatkowania i zakresu usług.',
  },
  {
    icon: TrendingUp,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    title: 'Wpływ KSeF na ceny',
    stats: [
      { label: 'Biura, które podniosły ceny', value: '~65%' },
      { label: 'Średnia podwyżka', value: '15–30%' },
      { label: 'Zmiana zakresu usług', value: 'Często brak' },
    ],
    description:
      'Wielu księgowych podniosło ceny po wdrożeniu KSeF, tłumacząc to dodatkowymi obowiązkami — mimo że system miał uprościć pracę.',
  },
  {
    icon: Search,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    title: 'Co pokazuje rynek',
    stats: [
      { label: 'Rozstrzał cenowy', value: 'do 300%' },
      { label: 'Cena a jakość', value: 'Brak korelacji' },
      { label: 'Dostosowanie do KSeF', value: 'Nierównomierne' },
    ],
    description:
      'Ceny za ten sam zakres usług potrafią różnić się kilkukrotnie. Wyższa cena nie zawsze oznacza lepszą obsługę.',
  },
  {
    icon: Lightbulb,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    title: 'Warto wiedzieć',
    stats: [
      { label: 'Firmy, które nie porównywały', value: '~40%' },
      { label: 'Zmiana księgowego', value: 'Prostsza niż myślisz' },
      { label: 'Negocjacje', value: 'Często skuteczne' },
    ],
    description:
      'Wielu przedsiębiorców przepłaca, bo nigdy nie porównało ofert. Samo sprawdzenie rynku daje przewagę.',
  },
];

export function MarketInsights() {
  const { ref, isInView } = useInView();

  return (
    <section id="rynek" className="py-24 md:py-32 bg-slate-50/50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-3.5 py-1.5 rounded-full text-sm font-medium mb-5">
            <BarChart3 size={14} />
            Raport rynkowy
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Co dzieje się na rynku księgowości?
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Obserwujemy rynek i zbieramy dane. Oto najważniejsze trendy i wnioski, które pomogą Ci
            zrozumieć obecne realia cenowe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight, i) => (
            <div
              key={i}
              className={`group bg-white rounded-2xl border border-slate-200/60 p-7 md:p-8 transition-all duration-500 hover:shadow-xl hover:shadow-slate-100/80 hover:border-slate-200 hover:-translate-y-1 ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isInView ? `${i * 100 + 200}ms` : '0ms' }}
            >
              <div className="flex items-start gap-4 mb-5">
                <div
                  className={`w-11 h-11 rounded-xl ${insight.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <insight.icon size={20} className={insight.iconColor} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 pt-2">{insight.title}</h3>
              </div>

              <div className="space-y-3 mb-5">
                {insight.stats.map((stat, j) => (
                  <div key={j} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <span className="text-sm text-slate-500">{stat.label}</span>
                    <span className="text-sm font-semibold text-slate-800">{stat.value}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-slate-400 leading-relaxed">{insight.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            Dane oparte na analizie cen od ponad 150 biur księgowych i ankietach przedsiębiorców.
            Wartości są orientacyjne i mogą się różnić w zależności od regionu.
          </p>
        </div>
      </div>
    </section>
  );
}
