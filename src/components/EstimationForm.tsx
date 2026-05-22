import { useState, useCallback, type FormEvent } from 'react';
import { useInView } from '../hooks/useInView';
import { Calculator, ArrowRight, CheckCircle2, TrendingDown, Minus, Plus, Loader2 } from 'lucide-react';
import { NETLIFY_FORM_NAME } from '../config';

type TaxForm = 'ryczalt' | 'kpir';
type CompanyType = 'jdg' | 'spolka_cywilna' | 'sp_j' | 'inna';

interface EstimateResult {
  low: number;
  mid: number;
  high: number;
  currentCost: number;
  overpaying: boolean;
  savingsLow: number;
  savingsHigh: number;
}

const COMPANY_TYPE_LABELS: Record<CompanyType, string> = {
  jdg: 'Jednoosobowa działalność (JDG)',
  spolka_cywilna: 'Spółka cywilna',
  sp_j: 'Spółka jawna / partnerska',
  inna: 'Inna forma',
};

function calculateEstimate(
  companyType: CompanyType,
  taxForm: TaxForm,
  invoices: number,
  currentCost: number
): EstimateResult {
  let base: number;
  let perInvoice: number;

  if (taxForm === 'ryczalt') {
    base = 200;
    perInvoice = 8;
  } else {
    base = 350;
    perInvoice = 12;
  }

  if (companyType === 'spolka_cywilna') {
    base *= 1.15;
    perInvoice *= 1.1;
  } else if (companyType === 'sp_j' || companyType === 'inna') {
    base *= 1.3;
    perInvoice *= 1.15;
  }

  const effectivePerInvoice = invoices > 30 ? perInvoice * 0.8 : invoices > 15 ? perInvoice * 0.9 : perInvoice;

  const mid = Math.round(base + invoices * effectivePerInvoice);
  const low = Math.round(mid * 0.75);
  const high = Math.round(mid * 1.25);

  const savingsLow = Math.max(0, currentCost - high);
  const savingsHigh = Math.max(0, currentCost - low);

  return { low, mid, high, currentCost, overpaying: currentCost > mid * 1.15, savingsLow, savingsHigh };
}

async function submitToNetlify(data: Record<string, string>) {
  const body = new URLSearchParams({
    'form-name': NETLIFY_FORM_NAME,
    ...data,
  }).toString();

  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!res.ok) throw new Error('Błąd wysyłki');
}

export function EstimationForm() {
  const { ref, isInView } = useInView();
  const [companyType, setCompanyType] = useState<CompanyType>('jdg');
  const [taxForm, setTaxForm] = useState<TaxForm>('ryczalt');
  const [invoices, setInvoices] = useState(10);
  const [currentCost, setCurrentCost] = useState('');
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleEstimate = useCallback(() => {
    const cost = parseFloat(currentCost);
    if (isNaN(cost) || cost <= 0) return;
    setResult(calculateEstimate(companyType, taxForm, invoices, cost));
  }, [companyType, taxForm, invoices, currentCost]);

  const handleContactSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      setSubmitError(false);

      const formData: Record<string, string> = {
        email: email || '(brak emaila)',
        phone: phone || '(brak telefonu)',
        company_type: COMPANY_TYPE_LABELS[companyType],
        tax_form: taxForm === 'ryczalt' ? 'Ryczałt' : 'KPiR',
        invoices_per_month: String(invoices),
        current_cost: currentCost + ' zł/mies.',
        estimated_range: result ? `${result.low}–${result.high} zł/mies.` : '(nie wyliczono)',
        overpaying: result ? (result.overpaying ? 'TAK' : 'NIE') : '(nie wyliczono)',
        potential_savings: result ? `${result.savingsLow}–${result.savingsHigh} zł/mies.` : '(nie wyliczono)',
      };

      try {
        await submitToNetlify(formData);
        setSubmitted(true);
      } catch {
        setSubmitError(true);
      } finally {
        setSubmitting(false);
      }
    },
    [email, phone, companyType, taxForm, invoices, currentCost, result]
  );

  const companyTypes: { value: CompanyType; label: string }[] = [
    { value: 'jdg', label: 'Jednoosobowa działalność (JDG)' },
    { value: 'spolka_cywilna', label: 'Spółka cywilna' },
    { value: 'sp_j', label: 'Spółka jawna / partnerska' },
    { value: 'inna', label: 'Inna forma' },
  ];

  return (
    <section id="wycena" className="relative py-24 md:py-32 bg-white" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-full text-sm font-medium mb-5">
            <Calculator size={14} />
            Darmowa wycena
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Szybka orientacyjna wycena
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Odpowiedz na kilka pytań — to zajmie minutę. Otrzymasz orientacyjny zakres cenowy dla
            Twojej działalności.
          </p>
        </div>

        <div
          className={`max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100/50 p-8 md:p-10">
            {/* Company Type */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Rodzaj działalności
              </label>
              <select
                value={companyType}
                onChange={(e) => setCompanyType(e.target.value as CompanyType)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 12px center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '20px',
                }}
              >
                {companyTypes.map((ct) => (
                  <option key={ct.value} value={ct.value}>
                    {ct.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tax Form Toggle */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Forma opodatkowania
              </label>
              <div className="flex bg-slate-100 rounded-xl p-1.5">
                <button
                  type="button"
                  onClick={() => setTaxForm('ryczalt')}
                  className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    taxForm === 'ryczalt'
                      ? 'bg-white shadow-sm text-slate-900'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Ryczałt
                </button>
                <button
                  type="button"
                  onClick={() => setTaxForm('kpir')}
                  className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    taxForm === 'kpir'
                      ? 'bg-white shadow-sm text-slate-900'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  KPiR
                </button>
              </div>
            </div>

            {/* Invoices slider */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Liczba faktur miesięcznie
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setInvoices(Math.max(1, invoices - 1))}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors flex-shrink-0"
                >
                  <Minus size={16} />
                </button>
                <div className="flex-1">
                  <input
                    type="range"
                    min="1"
                    max="80"
                    value={invoices}
                    onChange={(e) => setInvoices(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setInvoices(Math.min(80, invoices + 1))}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors flex-shrink-0"
                >
                  <Plus size={16} />
                </button>
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 min-w-[60px] text-center">
                  {invoices}
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-2 px-14">
                <span>1</span>
                <span>80</span>
              </div>
            </div>

            {/* Current cost */}
            <div className="mb-10">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Obecny koszt księgowości
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={currentCost}
                  onChange={(e) => setCurrentCost(e.target.value)}
                  placeholder="np. 400"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 pr-16 text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all placeholder:text-slate-300"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">
                  zł/mies.
                </span>
              </div>
            </div>

            {/* Estimate button */}
            <button
              type="button"
              onClick={handleEstimate}
              disabled={!currentCost || parseFloat(currentCost) <= 0}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-emerald-600/20 disabled:hover:shadow-none flex items-center justify-center gap-2 group active:scale-[0.99]"
            >
              Pokaż orientacyjną cenę
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className="mt-6 animate-scale-in">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-100 rounded-3xl p-8 md:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      result.overpaying ? 'bg-amber-100' : 'bg-emerald-100'
                    }`}
                  >
                    {result.overpaying ? (
                      <TrendingDown size={22} className="text-amber-600" />
                    ) : (
                      <CheckCircle2 size={22} className="text-emerald-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      {result.overpaying
                        ? 'Możesz przepłacać za księgowość'
                        : 'Twoja cena wydaje się adekwatna'}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {result.overpaying
                        ? 'Na podstawie podanych danych, Twoja cena może być powyżej średniej rynkowej.'
                        : 'Twoja obecna cena mieści się w typowym zakresie rynkowym dla podobnych firm.'}
                    </p>
                  </div>
                </div>

                {/* Price comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-white">
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Orientacyjny zakres rynkowy
                    </span>
                    <div className="text-2xl font-bold text-emerald-700 mt-2">
                      {result.low}–{result.high} zł
                    </div>
                    <span className="text-sm text-slate-400">za miesiąc</span>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-white">
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Twoja obecna cena
                    </span>
                    <div className="text-2xl font-bold text-slate-900 mt-2">
                      {result.currentCost} zł
                    </div>
                    <span className="text-sm text-slate-400">za miesiąc</span>
                  </div>
                </div>

                {result.overpaying && result.savingsHigh > 0 && (
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-emerald-100 mb-6">
                    <span className="text-sm font-semibold text-emerald-700">
                      💡 Szacowana potencjalna oszczędność: {result.savingsLow}–{result.savingsHigh} zł miesięcznie
                    </span>
                    <p className="text-xs text-slate-400 mt-1">
                      = {result.savingsLow * 12}–{result.savingsHigh * 12} zł rocznie
                    </p>
                  </div>
                )}

                <p className="text-xs text-slate-400 leading-relaxed">
                  Powyższa wycena ma charakter orientacyjny i nie stanowi oferty handlowej. Dokładna
                  cena zależy od zakresu usług, regionu i specyfiki działalności.
                </p>
              </div>

              {/* Contact form — Netlify Forms */}
              <form
                onSubmit={handleContactSubmit}
                name={NETLIFY_FORM_NAME}
                className="mt-6 bg-white rounded-3xl border border-slate-200/80 shadow-lg shadow-slate-100/50 p-8"
              >
                {/* Honeypot — protection against bots */}
                <p className="hidden">
                  <label>
                    Nie wypełniaj tego pola: <input name="bot-field" />
                  </label>
                </p>

                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Chcesz otrzymać konkretne oferty?
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  Zostaw kontakt — prześlemy Ci dopasowane propozycje od sprawdzonych księgowych.
                </p>

                {submitted ? (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={28} className="text-emerald-600" />
                    </div>
                    <p className="font-semibold text-slate-900">Dziękujemy!</p>
                    <p className="text-sm text-slate-500 mt-1">
                      Skontaktujemy się z Tobą wkrótce z dopasowanymi propozycjami.
                    </p>
                  </div>
                ) : (
                  <>
                    {submitError && (
                      <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
                        Wystąpił błąd przy wysyłce. Spróbuj ponownie za chwilę.
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all placeholder:text-slate-300"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Telefon (opcjonalnie)"
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all placeholder:text-slate-300"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={(!email && !phone) || submitting}
                      className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Wysyłanie...
                        </>
                      ) : (
                        <>
                          Wyślij zapytanie — bez zobowiązań
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                    <p className="text-xs text-slate-400 text-center mt-3">
                      Nie spamujemy. Odpowiadamy tylko z konkretnymi propozycjami.
                    </p>
                  </>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
