# 🚀 Wdrożenie WycenKsięgowość.pl na Netlify

## Jak to działa

Projekt buduje się do **jednego pliku** `dist/index.html`. Formularz używa **Netlify Forms** — brak limitu zgłoszeń, brak zewnętrznych usług.

---

## Krok 1: Wrzuć kod na GitHub

```bash
git init
git add .
git commit -m "WycenKsięgowość.pl - pierwsza wersja"
git remote add origin https://github.com/TWOJ-USER/TWOJE-REPO.git
git push -u origin main
```

Nie masz GitHuba? Zarejestruj się na github.com (darmowe).

---

## Krok 2: Podłącz do Netlify

1. Wejdź na **https://app.netlify.com**
2. Zaloguj się (przez GitHub najwygodniej)
3. Kliknij **„Add new site" → „Import an existing project"**
4. Wybierz swoje repozytorium z GitHuba
5. Netlify wykryje automatycznie konfigurację z `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Kliknij **„Deploy site"**
7. Po ~2 minutach strona jest online pod adresem `random-name-123.netlify.app`

---

## Krok 3: Podpnij domenę

1. W Netlify: **Site configuration → Domain management → Add custom domain**
2. Wpisz `wycenksiengowosc.pl`
3. Netlify wyświetli rekordy DNS do ustawienia:

   | Typ   | Nazwa | Wartość                    |
   |-------|-------|----------------------------|
   | A     | @     | 75.2.60.5                  |
   | CNAME | www   | twoja-strona.netlify.app   |

4. Zaloguj się do **panelu rejestratora domeny** (tam gdzie ją kupiłeś)
5. Znajdź **Zarządzanie DNS** → **Rekordy DNS**
6. Dodaj powyższe rekordy
7. Wróć do Netlify → kliknij **„Verify DNS configuration"**
8. Poczekaj 15 min – 48h (propagacja DNS)
9. Netlify **automatycznie włączy SSL/HTTPS** (darmowy certyfikat Let's Encrypt)

---

## Krok 4: Przetestuj formularz

1. Otwórz swoją stronę online
2. Wypełnij wycenę (dowolne dane testowe)
3. Wpisz email w formularzu kontaktowym
4. Kliknij **„Wyślij zapytanie"**
5. W panelu Netlify: **Logs → Forms** — zobaczysz zgłoszenie ze wszystkimi danymi

### Co zawiera każde zgłoszenie:

| Pole                  | Przykład                            |
|-----------------------|-------------------------------------|
| email                 | jan@firma.pl                        |
| phone                 | 500 123 456                         |
| company_type          | Jednoosobowa działalność (JDG)      |
| tax_form              | Ryczałt                             |
| invoices_per_month    | 15                                  |
| current_cost          | 450 zł/mies.                        |
| estimated_range       | 200–340 zł/mies.                    |
| overpaying            | TAK                                 |
| potential_savings     | 110–250 zł/mies.                    |

---

## Powiadomienia email o nowych zgłoszeniach

Netlify domyślnie nie wysyła powiadomień. Możesz włączyć:

1. W panelu Netlify: **Forms → Form notifications → Add notification**
2. Wybierz **Email notification**
3. Wpisz adres email, na który mają przychodzić zgłoszenia
4. Od teraz każde wysłanie formularza = email z pełnymi danymi

---

## Opcjonalnie: Netlify Functions (auto-reply)

Jeśli chcesz, żeby klient dostawał auto-reply po wysłaniu formularza, możesz dodać Netlify Function. Ale to krok na później — podstawowa wersja działa bez tego.

---

## Checklist ✅

- [ ] Kod wypchnięty na GitHub
- [ ] Strona podłączona do Netlify
- [ ] Domena podpięta (rekordy DNS ustawione)
- [ ] SSL/HTTPS aktywny (automatycznie)
- [ ] Formularz przetestowany (Forms w panelu Netlify)
- [ ] Powiadomienia email włączone
- [ ] Strona testowo otwarta z telefonu

---

## Przydatne linki

- **Netlify panel:** https://app.netlify.com
- **Sprawdzanie DNS:** https://dnschecker.org
- **Google Search Console (SEO):** https://search.google.com/search-console

---

## Jak aktualizować stronę

Po każdej zmianie kodu:

```bash
git add .
git commit -m "opis zmiany"
git push
```

Netlify automatycznie przebuduje stronę (trwa ~2 min). Nie musisz nic klikać w panelu.

---

## Struktura plików

```
├── dist/
│   └── index.html              ← CAŁA STRONA (jeden plik po buildzie)
├── index.html                  ← Szablon + ukryty formularz Netlify
├── netlify.toml                ← Konfiguracja Netlify (build + publish)
├── src/
│   ├── config.ts               ← Nazwa formularza Netlify
│   ├── App.tsx
│   ├── index.css
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── EstimationForm.tsx  ← Formularz (logika + wysyłka)
│   │   ├── MarketInsights.tsx
│   │   ├── WhyNotChange.tsx
│   │   ├── FounderSection.tsx
│   │   └── Footer.tsx
│   └── hooks/
│       └── useInView.ts
├── DEPLOYMENT.md               ← Ten plik
└── package.json
```
