import { useInView } from '../hooks/useInView';
import { Calendar, Handshake, ArrowRight } from 'lucide-react';

const blocks = [
  {
    icon: Handshake,
    title: 'Nie musisz robić wszystkiego samodzielnie',
    desc: 'Dobre biuro pomaga w przejęciu obsługi, ustaleniu brakujących dokumentów i spokojnym przejściu przez zmianę.',
  },
  {
    icon: Calendar,
    title: 'Nie musisz czekać do końca roku',
    desc: 'Biuro rachunkowe można zmienić także w trakcie roku, z miesiąca na miesiąc. Wiele firm tak właśnie robi.',
  },
];

export function WhyNotChange() {
  const { ref, isInView } = useInView();

  return (
    <section id="zmiana-biura" className="py-20 md:py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 mb-6">
            Zmiana biura
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight max-w-4xl mx-auto">
            Zmiana biura rachunkowego nie musi oznaczać chaosu
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {blocks.map((block, index) => (
            <div
              key={block.title}
              className={`bg-white rounded-3xl border border-slate-200/80 p-7 md:p-8 transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isInView ? `${index * 120 + 150}ms` : '0ms' }}
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6">
                <block.icon size={21} className="text-emerald-600" />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-3">
                {block.title}
              </h3>

              <p className="text-base text-slate-500 leading-relaxed">
                {block.desc}
              </p>
            </div>
          ))}
        </div>

        <div
          className={`max-w-5xl mx-auto transition-all duration-700 delay-300 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="rounded-3xl bg-emerald-50/60 border border-emerald-100 p-7 md:p-8 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
              Jak wycena pomaga przy zmianie biura?
            </h3>

            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Zyskujesz orientację w aktualnych cenach księgowości dla Twojej firmy. Widzisz, czy obecna oferta ma sens i czy możesz dobrać obsługę lepiej dopasowaną do Ciebie.
            </p>
          </div>
        </div>

        <div
          className={`text-center mt-10 transition-all duration-700 delay-500 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('wk-form-mode', { detail: 'reset' }));
              setTimeout(() => document.getElementById('wycena')?.scrollIntoView({ behavior: 'smooth' }), 50);
            }}
            className="group inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-emerald-600/20 hover:-translate-y-0.5"
          >
            Zacznij od wyceny
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
