import { useState, useEffect, useCallback, type FormEvent } from 'react';
import { useInView } from '../hooks/useInView';
import { ArrowRight, ArrowLeft, Loader2, CheckCircle2, ChevronRight } from 'lucide-react';
import { NETLIFY_FORM_NAME } from '../config';

// ─── Types ──────────────────────────────────────────────
type Mode = 'existing' | 'starting';

// ─── Constants ──────────────────────────────────────────
const COMPANY_TYPES = ['JDG', 'Spółka cywilna', 'Spółka z o.o.', 'Spółka osobowa'];
const COMPANY_TYPES_STARTING = [...COMPANY_TYPES, 'Jeszcze nie wiem'];
const TAX_FORMS = ['Ryczałt', 'KPiR', 'Pełna księgowość', 'Nie wiem'];
const VAT_OPTS = ['Tak', 'Nie', 'Nie wiem'];
const DOC_RANGES = ['do 10', '11–30', '31–70', '71–150', 'powyżej 150'];
const DOC_RANGES_STARTING = [...DOC_RANGES, 'Nie wiem'];
const EMPLOYMENT_OPTS_E = ['Nie', 'Tak'];
const EMPLOYMENT_OPTS_S = ['Nie', 'Tak', 'Jeszcze nie wiem'];
const START_TIMEFRAMES = ['Już działam / zaraz startuję', 'W tym miesiącu', 'W ciągu 1–3 miesięcy', 'Później', 'Jeszcze nie wiem'];
const KSEF_OPTS = ['Wzrosła', 'Nie zmieniła się', 'Zmalała', 'Nie wiem'];

const NEEDS_EXISTING = [
  'Niska cena',
  'Łatwy kontakt z księgowym',
  'Szybka odpowiedź na pytania',
  'Podgląd online dokumentów i rozliczeń',
  'Wsparcie w KSeF',
  'Przypomnienia o terminach',
  'Pomoc przy zmianie biura',
  'Proste wyjaśnienia bez żargonu',
  'Obsługa kadr i umów',
  'Doświadczenie w mojej branży',
  'Lepsza organizacja dokumentów',
  'Jasny zakres obsługi',
];

const NEEDS_STARTING = [
  'Niska cena na start',
  'Pomoc przy zakładaniu firmy',
  'Pomoc w wyborze formy rozliczenia',
  'Proste wyjaśnienia bez żargonu',
  'Łatwy kontakt z księgowym',
  'Szybka odpowiedź na pytania',
  'Wsparcie w KSeF',
  'Podgląd online dokumentów i rozliczeń',
  'Przypomnienia o terminach',
  'Pomoc przy VAT',
  'Obsługa kadr i umów w przyszłości',
  'Doświadczenie w mojej branży',
];

// ─── Sub-components ─────────────────────────────────────
function OptionGroup({ options, value, onChange, columns = 2 }: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  columns?: number;
}) {
  const gridClass = columns === 3 ? 'grid-cols-3' : 'grid-cols-2';
  return (
    <div className={`grid ${gridClass} gap-2`}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all text-left ${
            value === opt
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function StepIndicator({ step, labels }: { step: number; labels: string[] }) {
  return (
    <div className="flex items-center gap-1 mb-8">
      {labels.map((label, i) => (
        <div key={i} className="flex items-center gap-1 flex-1 min-w-0">
          <div className={`flex items-center gap-2 ${i + 1 <= step ? 'text-emerald-600' : 'text-slate-300'}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
              i + 1 <= step ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              {i + 1}
            </span>
            <span className="text-xs font-medium truncate hidden sm:inline">{label}</span>
          </div>
          {i < labels.length - 1 && (
            <div className={`h-px flex-1 mx-2 ${i + 1 < step ? 'bg-emerald-300' : 'bg-slate-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Submission ─────────────────────────────────────────
async function submitToNetlify(data: Record<string, string>) {
  const body = new URLSearchParams({ 'form-name': NETLIFY_FORM_NAME, ...data }).toString();
  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) throw new Error('Błąd wysyłki');
}

// ─── Main Component ────────────────────────────────────
export function EstimationForm() {
  const { ref, isInView } = useInView();

  // Mode & step
  const [mode, setMode] = useState<Mode>('existing');
  const [modeSelected, setModeSelected] = useState(false);
  const [step, setStep] = useState(1); // 1-3 = active form steps

  // Step 1
  const [companyType, setCompanyType] = useState('');
  const [taxForm, setTaxForm] = useState('');
  const [vat, setVat] = useState('');
  const [documents, setDocuments] = useState('');

  // Step 2
  const [hasEmployees, setHasEmployees] = useState('');
  const [employeesUop, setEmployeesUop] = useState('');
  const [employeesOther, setEmployeesOther] = useState('');
  const [startTimeframe, setStartTimeframe] = useState('');
  const [needs, setNeeds] = useState<string[]>([]);
  const [customNeed, setCustomNeed] = useState('');

  // Step 3
  const [currentCost, setCurrentCost] = useState('');
  const [ksefPriceChange, setKsefPriceChange] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  // Submission
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // Listen for mode changes from Hero/FinalCTA
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as Mode | 'reset';
      if (detail === 'reset') {
        setMode('existing');
        setModeSelected(false);
        setStep(1);
        setCompanyType('');
        setTaxForm('');
        setVat('');
        setDocuments('');
        setHasEmployees('');
        setEmployeesUop('');
        setEmployeesOther('');
        setStartTimeframe('');
        setNeeds([]);
        setCustomNeed('');
        setCurrentCost('');
        setKsefPriceChange('');
        setEmail('');
        setPhone('');
        setMessage('');
        setSubmitted(false);
        return;
      }

      if (detail === 'existing' || detail === 'starting') {
        setMode(detail);
        setModeSelected(true);
        setStep(1);
        // Reset fields
        setCompanyType('');
        setTaxForm('');
        setVat('');
        setDocuments('');
        setHasEmployees('');
        setEmployeesUop('');
        setEmployeesOther('');
        setStartTimeframe('');
        setNeeds([]);
    setCustomNeed('');
        setCustomNeed('');
        setCurrentCost('');
        setKsefPriceChange('');
        setEmail('');
        setPhone('');
        setMessage('');
        setSubmitted(false);
      }
    };
    window.addEventListener('wk-form-mode', handler);
    return () => window.removeEventListener('wk-form-mode', handler);
  }, []);

  // Handlers
  const toggleNeed = useCallback((need: string) => {
    setNeeds((prev) => {
      if (prev.includes(need)) {
        return prev.filter((n) => n !== need);
      }
      if (prev.length >= 5) return prev;
      return [...prev, need];
    });
  }, []);

  const addCustomNeed = useCallback(() => {
    const value = customNeed.trim();
    if (!value) return;
    if (needs.length >= 5) return;
    if (needs.includes(value)) {
      setCustomNeed('');
      return;
    }
    setNeeds((prev) => [...prev, value]);
    setCustomNeed('');
  }, [customNeed, needs]);

  const handleModeSelect = (m: Mode) => {
    setMode(m);
    setModeSelected(true);
    setStep(1);
    setCompanyType('');
    setTaxForm('');
    setVat('');
    setDocuments('');
    setHasEmployees('');
    setEmployeesUop('');
    setEmployeesOther('');
    setStartTimeframe('');
    setNeeds([]);
    setCustomNeed('');
    setCurrentCost('');
    setKsefPriceChange('');
  };

  // Validation
  const step1Valid = companyType && taxForm && vat && documents;
  const step2Valid = hasEmployees && needs.length >= 3
    && (mode === 'starting' ? startTimeframe : true);
  const step3Valid = email && (mode === 'existing' ? currentCost : true);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!step3Valid) return;
      setSubmitting(true);
      setSubmitError(false);

      const data: Record<string, string> = {
        mode: mode === 'existing' ? 'Mam firmę' : 'Zakładam firmę',
        company_type: companyType,
        tax_form: taxForm,
        vat,
        documents,
        has_employees: hasEmployees,
        employees_uop: employeesUop || '0',
        employees_other: employeesOther || '0',
        needs: needs.join(', '),
        email,
        phone: phone || '(brak)',
        message: message || '(brak)',
      };
      if (mode === 'existing') {
        data.current_cost = currentCost + ' zł/mies.';
        data.ksef_price_change = ksefPriceChange || '(brak)';
      }
      if (mode === 'starting') {
        data.start_timeframe = startTimeframe;
      }

      try {
        await submitToNetlify(data);
        setSubmitted(true);
      } catch {
        setSubmitError(true);
      } finally {
        setSubmitting(false);
      }
    },
    [mode, companyType, taxForm, vat, documents, hasEmployees, employeesUop, employeesOther, startTimeframe, needs, currentCost, ksefPriceChange, email, phone, message, step3Valid]
  );

  const stepLabels = mode === 'existing'
    ? ['Profil firmy', 'Zakres i priorytety', 'Cena i kontakt']
    : ['Planowana firma', 'Zakres i priorytety', 'Kontakt'];

  const currentNeeds = mode === 'existing' ? NEEDS_EXISTING : NEEDS_STARTING;
  const isSpZoo = companyType === 'Spółka z o.o.';

  useEffect(() => {
    if (isSpZoo && taxForm !== 'Pełna księgowość') {
      setTaxForm('Pełna księgowość');
    }
  }, [isSpZoo, taxForm]);

  return (
    <section id="wycena" className="relative py-24 md:py-32 bg-white" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-12 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Porównaj cenę księgowości
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Podaj kilka informacji o firmie i zaznacz, co jest dla Ciebie ważne. Dzięki temu porównanie
            uwzględni nie tylko cenę, ale też styl współpracy z biurem.
          </p>
        </div>

        <div className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {submitted ? (
            /* ── Success ── */
            <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl shadow-emerald-50 p-8 md:p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Dziękujemy!</h3>
              <div className="text-slate-500 leading-relaxed max-w-md mx-auto space-y-3">
                <p>Dziękujemy. Gromadzimy i sprawdzamy wyceny dla Ciebie.</p>
                <p>Dopasujemy je do Twojej działalności i priorytetów.</p>
                <p>Otrzymasz je mailem z adresu <span className="font-semibold text-slate-700">twojawycena@wycenksiegowosc.pl</span>.</p>
                <p>Sprawdź też folder Oferty, Inne lub Spam.</p>
              </div>
            </div>
          ) : (
            <div
              onClick={(e) => {
                if (!modeSelected && !(e.target as HTMLElement).closest('[data-form-intro="true"]')) {
                  setModeSelected(true);
                }
              }}
              className="relative overflow-hidden bg-white rounded-[2rem] border-2 border-emerald-200/80 shadow-2xl shadow-emerald-100/60 p-6 md:p-10"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400" />
              <p className="hidden"><label>Nie wypełniaj: <input name="bot-field" /></label></p>

              {!modeSelected && (
                <div data-form-intro="true">
                  <div className="mb-7 rounded-2xl bg-emerald-50/70 border border-emerald-100 p-4 md:p-5">
                    <p className="text-sm font-bold text-emerald-700 mb-1">
                      Formularz wyceny
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Wybierz swoją sytuację. Potem uzupełnisz profil firmy i zaznaczysz, co jest dla Ciebie ważne.
                    </p>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Jaka jest Twoja sytuacja?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {([
                        { m: 'existing' as Mode, title: 'Mam firmę', desc: 'Porównaj obecną cenę księgowości z możliwościami dopasowanymi do profilu Twojej firmy.' },
                        { m: 'starting' as Mode, title: 'Zakładam firmę', desc: 'Oszacuj koszt księgowości przed wyborem biura lub startem działalności.' },
                      ]).map((opt) => (
                        <button
                          key={opt.m}
                          type="button"
                          onClick={() => handleModeSelect(opt.m)}
                          className="text-left p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40 transition-all"
                        >
                          <span className="text-sm font-bold text-slate-800">
                            {opt.title}
                          </span>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{opt.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 mb-2">
                    {mode === 'existing' ? 'Formularz wyceny dla istniejącej firmy' : 'Formularz wyceny dla powstającej firmy'}
                  </p>
                  <p className="text-sm text-slate-500">
                    {mode === 'existing'
                      ? 'Uzupełnij profil firmy i sprawdź, czy obecna obsługa ma sens.'
                      : 'Opisz planowaną działalność i oszacuj koszt księgowości przed startem.'}
                  </p>
                </div>

                {modeSelected && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.reload();
                    }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:text-slate-700 hover:shadow-sm"
                    aria-label="Zamknij formularz"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* ── Step indicator ── */}
              {step > 0 && <StepIndicator step={step} labels={stepLabels} />}

              {/* ════════ STEP 1 ════════ */}
              {step === 1 && (
                <div className="space-y-7 animate-fade-in">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      {mode === 'existing' ? 'Forma działalności' : 'Planowana forma działalności'}
                    </label>
                    <OptionGroup
                      options={mode === 'starting' ? COMPANY_TYPES_STARTING : COMPANY_TYPES}
                      value={companyType}
                      onChange={setCompanyType}
                      columns={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      {mode === 'existing' ? 'Forma rozliczenia' : 'Planowana forma rozliczenia'}
                    </label>

                    {isSpZoo ? (
                      <>
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-sm font-semibold text-emerald-700">
                          Pełna księgowość
                        </div>
                        <p className="mt-2 text-xs text-slate-400">
                          Dla spółki z o.o. właściwa jest pełna księgowość.
                        </p>
                      </>
                    ) : (
                      <OptionGroup options={TAX_FORMS} value={taxForm} onChange={setTaxForm} columns={2} />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">VAT</label>
                    <OptionGroup options={VAT_OPTS} value={vat} onChange={setVat} columns={3} />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      {mode === 'existing' ? 'Liczba dokumentów miesięcznie' : 'Szacowana liczba dokumentów miesięcznie'}
                    </label>
                    <OptionGroup
                      options={mode === 'starting' ? DOC_RANGES_STARTING : DOC_RANGES}
                      value={documents}
                      onChange={setDocuments}
                      columns={3}
                    />
                  </div>
                </div>
              )}

              {/* ════════ STEP 2 ════════ */}
              {step === 2 && (
                <div className="space-y-7 animate-fade-in">
                  {/* Employment */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      {mode === 'existing'
                        ? 'Czy zatrudniasz pracowników lub współpracowników?'
                        : 'Czy planujesz zatrudniać pracowników lub współpracowników?'}
                    </label>
                    <OptionGroup
                      options={mode === 'starting' ? EMPLOYMENT_OPTS_S : EMPLOYMENT_OPTS_E}
                      value={hasEmployees}
                      onChange={setHasEmployees}
                      columns={3}
                    />
                  </div>

                  {hasEmployees === 'Tak' && (
                    <div className="grid grid-cols-2 gap-4 animate-fade-in">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          {mode === 'existing' ? 'Pracownicy na UoP' : 'Planowani pracownicy na UoP'}
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={employeesUop}
                          onChange={(e) => setEmployeesUop(e.target.value)}
                          placeholder="0"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all placeholder:text-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          {mode === 'existing' ? 'Umowy zlecenia / inne' : 'Planowane umowy zlecenia / inne'}
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={employeesOther}
                          onChange={(e) => setEmployeesOther(e.target.value)}
                          placeholder="0"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all placeholder:text-slate-300"
                        />
                      </div>
                    </div>
                  )}

                  {/* Start timeframe (starting only) */}
                  {mode === 'starting' && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Kiedy planujesz rozpocząć działalność?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {START_TIMEFRAMES.map((tf) => (
                          <button
                            key={tf}
                            type="button"
                            onClick={() => setStartTimeframe(tf)}
                            className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                              tf === 'Jeszcze nie wiem' ? 'sm:col-span-2' : ''
                            } ${
                              startTimeframe === tf
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            {tf}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Needs */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {mode === 'existing'
                        ? 'Co jest dla Ciebie najważniejsze we współpracy z księgowością?'
                        : 'Co będzie dla Ciebie najważniejsze przy wyborze księgowości?'}
                    </label>
                    <p className="text-xs text-slate-400 mb-4">
                      Wybierz 3–5 rzeczy, które mają największe znaczenie.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {currentNeeds.map((need) => {
                        const selected = needs.includes(need);
                        const disabled = !selected && needs.length >= 5;
                        return (
                          <button
                            key={need}
                            type="button"
                            onClick={() => !disabled && toggleNeed(need)}
                            disabled={disabled}
                            className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                              selected
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm'
                                : disabled
                                  ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            {need}
                          </button>
                        );
                      })}
                    </div>

                    <div className="rounded-2xl bg-slate-50/70 border border-slate-200 p-4 mb-3">
                      <label className="block text-xs font-semibold text-slate-600 mb-2">
                        Chcesz dodać własny priorytet?
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={customNeed}
                          onChange={(e) => setCustomNeed(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addCustomNeed();
                            }
                          }}
                          disabled={needs.length >= 5}
                          placeholder="np. obsługa po angielsku, e-commerce, raporty miesięczne"
                          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 disabled:bg-slate-100 disabled:text-slate-400"
                        />
                        <button
                          type="button"
                          onClick={addCustomNeed}
                          disabled={!customNeed.trim() || needs.length >= 5}
                          className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold transition hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed"
                        >
                          Dodaj
                        </button>
                      </div>

                      {needs.filter((need) => !currentNeeds.includes(need)).length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {needs.filter((need) => !currentNeeds.includes(need)).map((need) => (
                            <button
                              key={need}
                              type="button"
                              onClick={() => toggleNeed(need)}
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-700"
                            >
                              {need}
                              <span className="text-emerald-500">×</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-slate-400">
                      Wybrano {needs.length}/5 {needs.length < 3 && '— wybierz co najmniej 3'}
                    </p>
                  </div>
                </div>
              )}

              {/* ════════ STEP 3 ════════ */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-7 animate-fade-in">
                  {/* Existing: price fields */}
                  {mode === 'existing' && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Ile obecnie płacisz miesięcznie za księgowość?
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={currentCost}
                            onChange={(e) => setCurrentCost(e.target.value)}
                            placeholder="np. 450"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 pr-16 text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all placeholder:text-slate-300"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">zł netto</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">
                          Czy cena obsługi zmieniła się w związku z KSeF?
                        </label>
                        <OptionGroup options={KSEF_OPTS} value={ksefPriceChange} onChange={setKsefPriceChange} columns={2} />
                      </div>
                    </>
                  )}

                  {/* Contact */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Adres e-mail</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="twoj@email.pl"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all placeholder:text-slate-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Telefon — opcjonalnie</label>
                    <input
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="500 123 456"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all placeholder:text-slate-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Masz uwagi, nietypową sytuację - opisz krótko (opcjonalnie)</label>
                    <textarea
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      placeholder={mode === 'existing'
                        ? 'np. czy obecna cena jest wysoka, czy warto zmienić biuro, czy można znaleźć lepiej dopasowaną obsługę'
                        : 'np. ile może kosztować księgowość, jaką formę działalności wybrać, czy warto być VAT-owcem'
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all placeholder:text-slate-300 resize-none"
                    />
                  </div>

                  {submitError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
                      Wystąpił błąd. Spróbuj ponownie za chwilę.
                    </div>
                  )}

                  {/* Trust box */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Nie udostępniamy Twoich danych biurom rachunkowym. Otrzymujesz informacje potrzebne do decyzji.
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!step3Valid || submitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-emerald-600/20 disabled:hover:shadow-none flex items-center justify-center gap-2 group active:scale-[0.99]"
                  >
                    {submitting ? (
                      <><Loader2 size={18} className="animate-spin" /> Wysyłanie...</>
                    ) : (
                      <>
                        {mode === 'existing' ? 'Porównaj moją cenę' : 'Oszacuj koszt księgowości'}
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-400 text-center">
                    {mode === 'existing'
                      ? 'Najpierw sprawdzasz, czy obecna cena i zakres obsługi mają sens. Potem sam decydujesz, z kim chcesz rozmawiać.'
                      : 'Otrzymasz punkt odniesienia przed wyborem biura lub startem działalności.'}
                  </p>
                </form>
              )}

              {/* ── Navigation buttons (steps 1-2) ── */}
              {step > 0 && step < 3 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      <ArrowLeft size={16} /> Wstecz
                    </button>
                  ) : (
                    <div />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      if (step === 1 && step1Valid) setStep(2);
                      if (step === 2 && step2Valid) setStep(3);
                    }}
                    disabled={(step === 1 && !step1Valid) || (step === 2 && !step2Valid)}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all disabled:hover:shadow-none hover:shadow-lg hover:shadow-emerald-600/20"
                  >
                    Dalej <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* Back from step 3 */}
              {step === 3 && !submitted && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <ArrowLeft size={16} /> Wstecz
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
