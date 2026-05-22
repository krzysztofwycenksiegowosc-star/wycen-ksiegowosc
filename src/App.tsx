import { useState, useEffect, useRef, type ReactNode, type FormEvent } from "react";
import { cn } from "@/utils/cn";

/* ─── Custom hook for scroll-based visibility animations ─── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ─── Animated section wrapper ─── */

function AnimatedSection({
  children,
  className,
  delay = 0,
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) {
  const { ref, visible } = useInView();

  const delayClasses = [
    "",
    "delay-100",
    "delay-200",
    "delay-300",
    "delay-400",
    "delay-500",
  ];

  return (
    <div
      id={id}
      ref={ref}
      className={cn(
        "fade-in-up",
        visible && "fade-in-up-visible",
        delayClasses[delay] ?? "",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ─── Simple icon components ─── */

function IconChart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M3 3v18h18" />
      <path d="M7 16l4-8 4 4 4-6" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function IconTrendingUp() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M22 7 13.5 15.5 8.5 10.5 2 17" />
      <path d="M16 7h6v6" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function IconBrain() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M12 2a4 4 0 0 0-4 4v1H6a3 3 0 0 0-3 3v1a3 3 0 0 0 3 3h2v1a4 4 0 0 0 4 4" />
      <path d="M12 2a4 4 0 0 1 4 4v1h2a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3h-2v1a4 4 0 0 1-4 4" />
      <path d="M8 12h8" />
    </svg>
  );
}

function IconRefresh() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  );
}

/* ─── NAVBAR ─── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-earth-50/85 backdrop-blur-lg shadow-xs border-b border-earth-200/50"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white text-xs font-bold tracking-tight">
            WK
          </div>
          <span className="font-heading text-lg font-semibold tracking-tight text-earth-900">
            Wycen<span className="text-brand-600">Ksiegowosc</span>.pl
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="#wycena" className="text-sm font-medium text-earth-600 transition-colors hover:text-earth-900">
            Wycena
          </a>
          <a href="#raport" className="text-sm font-medium text-earth-600 transition-colors hover:text-earth-900">
            Rynek
          </a>
          <a href="#zmiana" className="text-sm font-medium text-earth-600 transition-colors hover:text-earth-900">
            Zmiana
          </a>
          <a
            href="#wycena"
            className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-700 active:scale-[0.97]"
          >
            Sprawdź wycenę
          </a>
        </nav>

        {/* Mobile hamburger — not implementing full menu for brevity,
            just a visual indicator */}
        <a
          href="#wycena"
          className="flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-700 active:scale-[0.97] md:hidden"
        >
          Wycena
          <IconArrowRight />
        </a>
      </div>
    </header>
  );
}

/* ─── HERO ─── */

function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Subtle background ornament */}
      <div className="pointer-events-none absolute -top-40 right-0 -z-10 h-[500px] w-[500px] opacity-[0.03] sm:opacity-[0.05]">
        <div className="h-full w-full rounded-full bg-brand-400 blur-3xl" />
      </div>
      <div className="pointer-events-none absolute -bottom-40 -left-40 -z-10 h-[400px] w-[400px] opacity-[0.03] sm:opacity-[0.04]">
        <div className="h-full w-full rounded-full bg-sage-400 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <AnimatedSection delay={0}>
            <span className="inline-block rounded-full border border-earth-200 bg-earth-100/60 px-4 py-1.5 text-xs font-medium tracking-wide text-earth-600">
              #KSeF · Rynek księgowości 2025
            </span>
          </AnimatedSection>

          <AnimatedSection delay={1}>
            <h1 className="mt-6 font-heading text-4xl leading-tight font-bold tracking-tight text-earth-950 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
              Czy wciąż płacisz{" "}
              <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                odpowiednią kwotę
              </span>{" "}
              za księgowość po KSeF?
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={2}>
            <p className="mt-5 text-base leading-relaxed text-earth-600 sm:text-lg sm:leading-relaxed max-w-2xl mx-auto">
              Wiele małych firm zauważyło, że ceny usług księgowych wzrosły – mimo cyfryzacji i automatyzacji.
              Rynek się zmienił. Sprawdź, czy Twoja stawka wciąż ma sens.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={3}>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="#wycena"
                className="inline-flex items-center gap-2 rounded-full bg-earth-900 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-earth-800 active:scale-[0.97] shadow-lg shadow-earth-900/10"
              >
                <IconSearch />
                Sprawdź orientacyjną wycenę
              </a>
              <a
                href="#zmiana"
                className="inline-flex items-center gap-2 rounded-full border border-earth-300 bg-white px-7 py-3.5 text-sm font-semibold text-earth-700 transition-all hover:border-earth-400 hover:text-earth-900 active:scale-[0.97]"
              >
                <IconRefresh />
                Jak łatwo zmienić biuro?
              </a>
            </div>
          </AnimatedSection>

          {/* Subtle trust indicator */}
          <AnimatedSection delay={4}>
            <p className="mt-10 text-xs text-earth-400">
              Bezpłatnie · 2 minuty · Bez zobowiązań
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ─── PRICING ESTIMATION FORM ─── */

const COMPANY_TYPES = [
  { value: "", label: "Wybierz formę..." },
  { value: "jednoosobowa", label: "Jednoosobowa działalność gospodarcza" },
  { value: "spolka_zoo", label: "Spółka z o.o." },
  { value: "spolka_jawna", label: "Spółka jawna" },
  { value: "spolka_cywilna", label: "Spółka cywilna" },
  { value: "inna", label: "Inna" },
];

const TAX_FORMS = [
  { value: "", label: "Wybierz formę opodatkowania..." },
  { value: "ryczalt", label: "Ryczałt ewidencjonowany" },
  { value: "kpir", label: "KPiR (księga przychodów i rozchodów)" },
  { value: "skala", label: "Skala podatkowa" },
  { value: "karta", label: "Karta podatkowa" },
  { value: "linia", label: "Podatek liniowy" },
];

function EstimationForm() {
  const [form, setForm] = useState({
    companyType: "",
    taxForm: "",
    invoices: "",
    currentCost: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError("");

    // Oblicz orientacyjny zakres przed wysłaniem
    const invoices = parseInt(form.invoices) || 20;
    const estimatedMin = Math.round(invoices * 1.8 + 80);
    const estimatedMax = Math.round(invoices * 3.2 + 150);
    const estimatedRange = `${estimatedMin}–${estimatedMax} zł`;

    try {
      // Wyślij dane do Netlify Forms
      const formData = new FormData();
      formData.append("form-name", "wycena");
      formData.append("company-type", form.companyType);
      formData.append("tax-form", form.taxForm);
      formData.append("invoices", form.invoices);
      formData.append("current-cost", form.currentCost);
      formData.append("email", form.email);
      formData.append("estimated-range", estimatedRange);

      const response = await fetch("/__forms.html", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Sukces – pokaż wynik wyceny
      setSubmitted(true);
    } catch (err) {
      console.error("Netlify Forms error:", err);
      setSendError(
        "Nie udało się wysłać formularza. Spróbuj ponownie za chwilę."
      );
      // Mimo błędu wysyłki – pokazujemy wycenę lokalnie
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    const invoices = parseInt(form.invoices) || 20;
    const currentCost = parseInt(form.currentCost) || 0;
    const estimatedMin = Math.round(invoices * 1.8 + 80);
    const estimatedMax = Math.round(invoices * 3.2 + 150);
    const saving = currentCost > estimatedMin ? currentCost - estimatedMin : 0;
    const overpay = saving > 50;

    return (
      <div className="rounded-3xl bg-white p-8 shadow-xl shadow-earth-900/5 ring-1 ring-earth-200/60 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-100">
            <IconCheck />
          </div>
          <h3 className="mt-4 font-heading text-xl font-semibold text-earth-900">
            Twoja orientacyjna wycena
          </h3>
          <p className="mt-2 text-sm text-earth-500">
            Na podstawie podanych danych, typowa stawka rynkowa dla Twojego profilu wynosi:
          </p>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-heading text-4xl font-bold text-earth-900">
              {estimatedMin}–{estimatedMax} zł
            </span>
            <span className="text-sm text-earth-500">/ mies.</span>
          </div>

          {overpay && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-50 px-5 py-2.5 text-sm font-medium text-amber-800 ring-1 ring-amber-200/50">
              <IconTrendingUp />
              Możliwe, że przepłacasz ok. {saving} zł/mies.
            </div>
          )}

          {!overpay && currentCost > 0 && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-sage-50 px-5 py-2.5 text-sm font-medium text-sage-700 ring-1 ring-sage-200/50">
              <IconCheck />
              Twoja stawka wygląda na rynkową
            </div>
          )}

          <div className="mt-8 w-full space-y-3 border-t border-earth-100 pt-6">
            <p className="text-xs text-earth-400">
              To wycena orientacyjna oparta o dane rynkowe. Aby otrzymać dokładną ofertę, skontaktuj się z nami.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="rounded-full bg-earth-100 px-6 py-2.5 text-sm font-medium text-earth-700 transition-colors hover:bg-earth-200"
            >
              Wprowadź inne dane
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl shadow-earth-900/5 ring-1 ring-earth-200/60 sm:p-10">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <IconChart />
        </div>
        <div>
          <h3 className="font-heading text-lg font-semibold text-earth-900">
            Orientacyjna wycena
          </h3>
          <p className="text-xs text-earth-500">
            Wypełnij 4 pola – zajmie to 2 minuty
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Company type */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-earth-600">
              Typ działalności
            </label>
            <select
              value={form.companyType}
              onChange={(e) => update("companyType", e.target.value)}
              required
              className="w-full rounded-xl border border-earth-200 bg-earth-50/50 px-4 py-2.5 text-sm text-earth-900 transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200/50"
            >
              {COMPANY_TYPES.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tax form */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-earth-600">
              Forma opodatkowania
            </label>
            <select
              value={form.taxForm}
              onChange={(e) => update("taxForm", e.target.value)}
              required
              className="w-full rounded-xl border border-earth-200 bg-earth-50/50 px-4 py-2.5 text-sm text-earth-900 transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200/50"
            >
              {TAX_FORMS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Invoices */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-earth-600">
              Liczba faktur miesięcznie
            </label>
            <input
              type="number"
              min={0}
              max={500}
              placeholder="n.p. 25"
              value={form.invoices}
              onChange={(e) => update("invoices", e.target.value)}
              required
              className="w-full rounded-xl border border-earth-200 bg-earth-50/50 px-4 py-2.5 text-sm text-earth-900 transition-colors placeholder:text-earth-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200/50"
            />
          </div>

          {/* Current cost */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-earth-600">
              Obecny koszt księgowości (zł/mies.)
            </label>
            <input
              type="number"
              min={0}
              placeholder="n.p. 350"
              value={form.currentCost}
              onChange={(e) => update("currentCost", e.target.value)}
              required
              className="w-full rounded-xl border border-earth-200 bg-earth-50/50 px-4 py-2.5 text-sm text-earth-900 transition-colors placeholder:text-earth-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200/50"
            />
          </div>
        </div>

        {/* Optional email */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-earth-600">
            E-mail (opcjonalnie – wyślemy Ci podsumowanie)
          </label>
          <input
            type="email"
            placeholder="twoj@email.pl"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-xl border border-earth-200 bg-earth-50/50 px-4 py-2.5 text-sm text-earth-900 transition-colors placeholder:text-earth-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200/50"
          />
        </div>

        {sendError && (
          <p className="text-center text-sm text-red-500">{sendError}</p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-xl bg-earth-900 py-3.5 text-sm font-semibold text-white transition-all hover:bg-earth-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? (
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Wysyłanie…
            </span>
          ) : (
            "Sprawdź szacunkową wycenę"
          )}
        </button>

        <p className="text-center text-[11px] text-earth-400">
          Dane są przetwarzane anonimowo. Nie udostępniamy ich bez Twojej zgody.
        </p>
      </form>
    </div>
  );
}

/* ─── QUICK ESTIMATION SECTION ─── */

function QuickEstimation() {
  return (
    <section id="wycena" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-5">
          {/* Left copy */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <AnimatedSection>
              <span className="inline-block rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-medium text-brand-700">
                Sprawdź w 2 minuty
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-earth-950 sm:text-4xl">
                Nie wiesz, ile powinieneś{" "}
                <span className="text-brand-600">płacić?</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-earth-600">
                Ceny usług księgowych różnią się diametralnie w zależności od formy
                opodatkowania, liczby faktur i regionu. Wprowadź swoje dane i
                sprawdź przedział rynkowy dla Twojego profilu.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Porównanie do stawek rynkowych",
                  "Bez podawania danych wrażliwych",
                  "Wynik od razu – bez czekania",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                      <IconCheck />
                    </div>
                    <span className="text-sm text-earth-600">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatedSection delay={1}>
              <EstimationForm />
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── MARKET INSIGHTS SECTION ─── */

const insights = [
  {
    icon: <IconChart />,
    title: "Średnie stawki w 2025",
    description:
      "Za księgowość JDG na ryczałcie z do 20 fakturami miesięcznie micro firmy płacą średnio 150–300 zł. Przy KPiR i większej liczbie faktur – nawet 400–700 zł.",
    accent: "bg-brand-50 text-brand-600",
  },
  {
    icon: <IconTrendingUp />,
    title: "Wzrost po KSeF",
    description:
      "Od wprowadzenia obowiązkowego KSeF wiele biur podniosło ceny o 15–30%, argumentując to kosztami wdrożenia. Automatyzacja miała obniżyć koszty – u Ciebie też wzrosły?",
    accent: "bg-amber-50 text-amber-700",
  },
  {
    icon: <IconUsers />,
    title: "Brak porównania ofert",
    description:
      "Ponad 60% mikroprzedsiębiorców nie zmieniało biura rachunkowego od 3+ lat. Aż 4 na 10 firm nigdy nie porównało swojej stawki z rynkiem. To się opłaca sprawdzić.",
    accent: "bg-sage-50 text-sage-700",
  },
  {
    icon: <IconBrain />,
    title: "Czy automatyzacja tanieje?",
    description:
      "Nowe narzędzia i integracje z KSeF faktycznie obniżają koszty obsługi po stronie biura – ale nie zawsze te oszczędności są przenoszone na klienta. Warto negocjować.",
    accent: "bg-clay-50 text-clay-700",
  },
];

function MarketInsights() {
  return (
    <section id="raport" className="py-16 sm:py-24 bg-earth-100/40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full border border-sage-200 bg-sage-50 px-4 py-1.5 text-xs font-medium text-sage-700">
              Dane rynkowe
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-earth-950 sm:text-4xl">
              Ile tak naprawdę kosztuje księgowość w 2025?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-earth-600">
              Rynek się skonsolidował, ceny poszły w górę, a różnice między ofertami
              są większe niż kiedykolwiek. Oto, co wynika z naszych obserwacji.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {insights.map((item, i) => (
            <AnimatedSection key={item.title} delay={i + 1}>
              <div className="group relative h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-earth-200/50 transition-all hover:shadow-md hover:ring-earth-300/50">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl transition-all group-hover:scale-105",
                    item.accent
                  )}
                >
                  {item.icon}
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold text-earth-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-earth-500">
                  {item.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom note */}
        <AnimatedSection delay={5}>
          <div className="mt-10 text-center">
            <p className="text-sm text-earth-400">
              Źródła: analizy własne, dane GUS, raporty branżowe 2024–2025.
              Wyceny mają charakter orientacyjny.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── WHY PEOPLE DON'T CHANGE ─── */

const barriers = [
  {
    title: "Strach przed chaosem",
    description:
      "Obawiasz się, że dokumenty się pogubią, faktury gdzieś przepadną, a ZUS dostanie nieaktualne dane. To normalne – ale da się to zrobić bez stresu.",
    icon: <IconShield />,
  },
  {
    title: "Proces wydaje się trudny",
    description:
      "Zmiana biura kojarzy się z papierologią, godzinami na telefonie i tłumaczeniem całej historii firmy. W rzeczywistości – przy dobrym biurze – to kwestia jednego spotkania.",
    icon: <IconRefresh />,
  },
  {
    title: "Nie wiesz, czy będzie lepiej",
    description:
      "Nowe biuro to niewiadoma. A obecne – nawet jeśli drogie – jest chociaż przewidywalne. Problem w tym, że „przewidywalnie drogie” to wciąż niekorzystne.",
    icon: <IconBrain />,
  },
];

function WhyPeopleDontChange() {
  return (
    <section id="zmiana" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <div>
            <AnimatedSection>
              <span className="inline-block rounded-full border border-clay-200 bg-clay-50 px-4 py-1.5 text-xs font-medium text-clay-700">
                Psychologia zmiany
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-earth-950 sm:text-4xl">
                Dlaczego ludzie{" "}
                <span className="text-brand-600">nie zmieniają</span> księgowości?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-earth-600">
                Nie dlatego, że są zadowoleni. Ale dlatego, że zmiana – w teorii –
                brzmi jak ryzyko. Stracisz czas. Dokumenty się posypią. Nowe biuro
                okaże się gorsze.
              </p>
              <p className="mt-3 text-base leading-relaxed text-earth-600">
                Prawda jest taka, że zmiana biura rachunkowego, przy odpowiednim
                wsparciu, jest prostsza niż zakładanie konta w nowym banku.
              </p>
            </AnimatedSection>

            {/* CTA */}
            <AnimatedSection delay={2}>
              <div className="mt-8 rounded-2xl bg-earth-900 p-6 sm:p-8">
                <h4 className="font-heading text-lg font-semibold text-white">
                  Chcesz zmienić biuro bez chaosu?
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-earth-300">
                  Pomożemy Ci znaleźć sprawdzone biuro, które przejmie cały proces –
                  od przeniesienia dokumentów po pierwszy miesiąc obsługi.
                </p>
                <a
                  href="#wycena"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-earth-900 transition-all hover:bg-earth-100 active:scale-[0.97]"
                >
                  Sprawdź, jak to działa
                  <IconArrowRight />
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* Right – Barriers cards */}
          <div className="space-y-4">
            {barriers.map((item, i) => (
              <AnimatedSection key={item.title} delay={i + 1}>
                <div className="group flex gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-earth-200/50 transition-all hover:shadow-md hover:ring-earth-300/50 sm:items-start">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-clay-50 text-clay-600 transition-all group-hover:scale-105">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-earth-900">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-earth-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── HUMAN TRUST SECTION ─── */

function HumanTrust() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-transparent via-earth-100/30 to-transparent">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <AnimatedSection>
            <div className="rounded-3xl bg-white p-8 shadow-xl shadow-earth-900/5 ring-1 ring-earth-200/60 sm:p-12">
              <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start sm:gap-8">
                {/* Avatar — simple geometric placeholder */}
                <div className="mb-4 sm:mb-0 shrink-0">
                  <div className="mx-auto sm:mx-0 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-300 to-brand-500 text-2xl font-bold text-white shadow-lg shadow-brand-200/50">
                    MK
                  </div>
                </div>

                <div>
                  <blockquote className="text-base leading-relaxed text-earth-700 sm:text-lg sm:leading-relaxed">
                    „Założyłem WycenKsiegowosc.pl, bo sam prowadzę małą firmę i
                    zauważyłem, że rynek księgowości stał się mało przejrzysty.
                    Ceny rosną, a przedsiębiorcy rzadko mają czas, żeby
                    sprawdzić, czy płacą uczciwie. Chcę, żeby to narzędzie
                    pomogło Ci podjąć lepszą decyzję – bez ciśnienia, bez
                    marketingu, bez zbędnych obietnic.”
                  </blockquote>

                  <div className="mt-5 flex flex-col items-center sm:items-start">
                    <span className="font-heading text-sm font-semibold text-earth-900">
                      Michał K.
                    </span>
                    <span className="text-xs text-earth-500">
                      Założyciel WycenKsiegowosc.pl · przedsiębiorca od 2018
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA BANNER ─── */

function CtaBanner() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-earth-900 to-earth-950 px-6 py-14 sm:px-14 sm:py-16">
            {/* Subtle decorative dots */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/5 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-brand-500/10 blur-xl" />

            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Sprawdź swoją wycenę w 2 minuty
              </h2>
              <p className="mt-3 text-base leading-relaxed text-earth-300">
                Bez rejestracji. Bez zobowiązań. Tylko konkretna informacja,
                czy Twoja stawka ma sens.
              </p>
              <a
                href="#wycena"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-500 active:scale-[0.97] shadow-lg shadow-brand-900/20"
              >
                <IconSearch />
                Sprawdź orientacyjną wycenę
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */

function Footer() {
  return (
    <footer className="border-t border-earth-200/60 bg-earth-50 py-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-600 text-white text-[10px] font-bold tracking-tight">
              WK
            </div>
            <span className="font-heading text-sm font-semibold tracking-tight text-earth-800">
              Wycen<span className="text-brand-600">Ksiegowosc</span>.pl
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#wycena" className="text-xs text-earth-500 transition-colors hover:text-earth-800">
              Wycena
            </a>
            <a href="#raport" className="text-xs text-earth-500 transition-colors hover:text-earth-800">
              Raport rynkowy
            </a>
            <a href="#zmiana" className="text-xs text-earth-500 transition-colors hover:text-earth-800">
              Zmiana biura
            </a>
            <span className="text-xs text-earth-400">·</span>
            <span className="text-xs text-earth-400">Polityka prywatności</span>
            <span className="text-xs text-earth-400">Kontakt</span>
          </nav>
        </div>

        <div className="mt-8 border-t border-earth-200/50 pt-6 text-center">
          <p className="text-xs text-earth-400">
            © {new Date().getFullYear()} WycenKsiegowosc.pl · Narzędzie do
            orientacyjnej wyceny usług księgowych · Nie jesteśmy biurem rachunkowym
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ─── */

export default function App() {
  return (
    <div className="min-h-screen bg-earth-50 font-sans text-earth-950 selection:bg-brand-200/60">
      <Navbar />
      <main>
        <Hero />
        <QuickEstimation />
        <MarketInsights />
        <WhyPeopleDontChange />
        <HumanTrust />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
