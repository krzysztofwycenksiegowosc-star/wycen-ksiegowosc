import { useInView } from '../hooks/useInView';
import { Calendar, HandHelping, ArrowRight } from 'lucide-react';

const blocks = [
  {
    icon: Calendar,
    title: 'Nie musisz czekać do końca roku',
    desc: 'Biuro rachunkowe można zmienić także w trakcie roku, z miesiąca na miesiąc. Wiele firm tak właśnie robi.',
  },
  {
    icon: HandHelping,
    title: 'Nie musisz robić wszystkiego samodzielnie',
    desc: 'Dobre biuro pomaga w przejęciu obsługi, ustaleniu brakujących dokumentów i spokojnym przejściu przez zmianę.',
  },
];

export function WhyNotChange() {
  const { ref, isInView } = useInView();

  return (
    <section id="zmiana" className="py-24 md:py-32 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`max-w-3xl mx-auto text-center mb-14 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="text-sm font-medium text-emerald-600 mb-3 block">Zmiana biura</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Zmiana biura rachunkowego nie musi oznaczać chaosu
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Nie musisz od razu podejmować decyzji. Najpierw sprawdzasz, czy obecna cena, zakres obsługi i sposób
            współpracy nadal pasują do Twojej firmy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {blocks.map((block, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl border border-slate-200/60 p-7 transition-all duration-500 hover:shadow-lg hover:shadow-slate-100/80 hover:-translate-y-1 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: isInView ? `${i * 120 + 200}ms` : '0ms' }}
            >
              <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center mb-5">
                <block.icon size={20} className="text-emerald-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{block.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{block.desc}</p>
            </div>
          ))}
        </div>

        <div className={`max-w-3xl mx-auto mt-8 transition-all duration-700 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="rounded-3xl bg-emerald-50/60 border border-emerald-100 p-7 md:p-8 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Co daje wycena?</h3>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Zyskujesz orientację w aktualnych cenach księgowości dla Twojej firmy. Widzisz, czy obecna oferta ma sens i czy możesz dobrać obsługę lepiej dopasowaną do Ciebie.
            </p>
          </div>
        </div>

        <div className={`text-center mt-12 transition-all duration-700 delay-600 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('wk-form-mode', { detail: 'existing' }));
              setTimeout(() => document.getElementById('wycena')?.scrollIntoView({ behavior: 'smooth' }), 50);
            }}
            className="group inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-emerald-600/20 hover:-translate-y-0.5"
          >
            Sprawdź, czy zmiana ma sens
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          <p className="text-sm text-slate-400 mt-4">
            Przycisk przeniesie Cię do formularza, gdzie porównasz cenę, zakres obsługi i swoje priorytety.
          </p>
        </div>
      </div>
    </section>
  );
}
