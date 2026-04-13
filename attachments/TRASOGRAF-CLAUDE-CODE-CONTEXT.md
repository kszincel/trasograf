# TRASOGRAF — Kontekst projektu dla Claude Code

> **Ten dokument to JEDYNY kontekst jaki dostajesz.** Nie masz dostępu do Jiry, Slacka ani poprzednich konwersacji. Wszystko co musisz wiedzieć jest tutaj. Czytaj uważnie.

---

## 1. O PROJEKCIE

**Trasograf** to marka spersonalizowanych plakatów-map z tras sportowych (bieganie, hiking, rower). Użytkownik wybiera szablon, wpisuje dane personalizacji (imię, czas, data, numer startowy, dedykacja), widzi live preview z watermarkiem, płaci, dostaje wersję bez watermarku do druku.

- **Marka PL:** Trasograf (trasograf.pl)
- **Marka EN:** Routewright (routewright.com) — przyszłość, nie MVP
- **Founder:** Konrad Szincel (konrad@ikonmedia.pl)
- **Nisza startowa:** biegacze maratonów w Polsce
- **MVP event:** 23. Cracovia Maraton, 19.04.2026, Kraków, ~9000 uczestników
- **Cel MVP:** 20-50 pre-orderów do 19.04 = walidacja. <10 = kill/pivot. >50 = skaluj.
- **Pozycjonowanie:** "Zamień swój bieg/trasę/wyprawę ze Stravy w drukowany plakat-pamiątkę"
- **Konkurencja PL:** Positive Prints, Astralo, Himaps, Mu-ka — ŻADEN nie robi sportu, żaden nie ma live preview
- **Konkurencja globalna:** Muir Way (statyczne mapy parków), Etsy sellers (niska jakość)
- **Moat:** Live preview z watermarkiem przed zakupem — żaden konkurent w PL tego nie ma

---

## 2. STRATEGICZNY KONTEKST — PIVOT GOLDENTRAIL

Trasograf to pivot z projektu Goldentrail (apki do generowania tras outdoorowych). Stary kierunek (generator tras konkurujący ze Stravą/AllTrails) został porzucony — jakość tras nie do wygrania.

Nowy model to **DWUWARSTWOWY BIZNES** pod jedną domeną trasograf.pl:

**Warstwa 1 — Produkt fizyczny (PRIORYTET, monetyzacja):**
Spersonalizowane plakaty-mapy z tras sportowych. To jest to co budujemy teraz. Sprint Cracovia → kolejne eventy → skalowanie.

**Warstwa 2 — Content SEO / Blog (LONG-TERM, audience):**
trasograf.pl/blog stanie się polskim outdoor media brandem — kuratorowane opisy tras po polsku z kontekstem lokalnym (warunki, parking, nocleg, jedzenie). SEO na long-tail polskie frazy typu "trasa na majówkę z psem", "szlak dla dziecka w Tatrach", "niedzielna wycieczka pod Warszawą bez samochodu". Monetyzacja: afiliacja noclegów (Booking, AlohaCamp), afiliacja sprzętu, GPX premium, cross-sell do plakatów.

**Jak to się łączy:**

- Blog buduje organiczny ruch sportowców/turystów → każdy artykuł o trasie ma CTA "zamów mapę swojej wędrówki" → konwersja na plakaty
- Event landingi (/krakow-2026, /rzeznik-2026) dają peak sprzedaży sezonowo
- Blog daje baseline ruch między eventami
- Razem: audience layer (content) + monetization layer (produkt)

**Pipeline AI-assisted content (przyszłość, nie MVP):**
OSM data + Strava popularity + GPT drafty + redakcja Konrada. Tempo: 1-2 trasy/tydzień. Priorytetyzacja per sezon (wiosna: Mazowsze/Kaszuby, lato: Tatry, jesień: Beskidy, zima: narty).

**Ekspansja:**

- PL → CZ/SK → Bałtyki (rok 2-3) dla content
- PL → globalnie EN (routewright.com) dla produktu (Strava community globalne)

**Dla Claude Code to oznacza:**

- Architektura Next.js MUSI być przygotowana na blog (App Router z `/blog/[slug]` dynamic routes) nawet jeśli blog nie jest w MVP
- Strona główna (`/`) powinna mieć sekcję "Nadchodzące eventy" (lista eventów z linkami do dedykowanych landingów) + "Blog" placeholder
- Nawigacja powinna mieć: **Eventy | Konfigurator | Blog (disabled/coming soon) | O nas**
- SEO structure z `<head>`: każda strona eventowa i każdy przyszły post blogowy to osobny landing z własnymi meta tagami
- Dane tras (GPX/SVG) powinny być w strukturze danych łatwej do rozszerzenia: `/data/events/krakow-2026.json`, `/data/events/rzeznik-2026.json` etc.

**To jest kluczowe tło strategiczne — budujesz nie jednorazowy landing, ale fundament pod rosnący biznes dwuwarstwowy.**

---

## 3. ARCHITEKTURA I STACK

### Stack techniczny (decyzja podjęta 09.04.2026)

- **Framework:** Next.js 14+ (App Router) z TypeScript
- **Styling:** Tailwind CSS
- **Hosting:** Vercel (zero-config deploy)
- **Domena:** trasograf.pl podpięta do Vercel
- **Płatności:** Stripe z Przelewy24 + BLIK (natywne wsparcie P24 w PLN)
- **Rendering plakatów:** SVG rendering client-side (React components)
- **Druk:** Gelato (on-demand, EU, wysyłka PL 3-5 dni). Backup: drukomat.pl

### Struktura routingu (App Router)

```
app/
├── page.tsx                    # / — strona główna brandu
├── krakow-2026/
│   └── page.tsx                # /krakow-2026 — landing Cracovia Maraton (PRIORYTET MVP)
├── konfigurator/
│   └── page.tsx                # /konfigurator — live preview + personalizacja
├── blog/
│   └── [slug]/
│       └── page.tsx            # /blog/[slug] — przyszłe artykuły (placeholder w MVP)
├── api/
│   └── webhook/
│       └── stripe/
│           └── route.ts        # POST /api/webhook/stripe — Stripe webhook
├── layout.tsx                  # Root layout z nawigacją
└── globals.css
```

### Struktura danych eventów

```
data/
└── events/
    └── krakow-2026.json        # Dane eventu: nazwa, data, trasa SVG path, templates
```

### Packages do zainstalowania

```bash
npx create-next-app@latest trasograf --typescript --tailwind --app --src-dir
cd trasograf
npm install stripe @stripe/stripe-js
npm install next-seo          # SEO meta tags
# Fonty: next/font/google dla Inter, Playfair Display, EB Garamond
```

### Env variables (.env.local)

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_BASE_URL=https://trasograf.pl
```

### Co NIE jest w stacku (świadoma decyzja)

- ~~Framer~~ — niepotrzebny, landing w Next.js
- ~~Shopify~~ — overkill na MVP
- ~~Tally~~ — formularz wbudowany w Next.js, bez zewnętrznych narzędzi
- ~~Carrd~~ — zbyt ograniczony

---

## 4. DESIGN DIRECTION — NOWY KIERUNEK: WARM SPORT EDITORIAL

### KRYTYCZNE: Co było źle z poprzednim designem

Poprzednia wersja strony trasograf.pl (jeśli istnieje) jest ZŁA i wymaga PRZEBUDOWY:

- Zbyt pusta, muzealnie kremowa, zero energii sportowej
- Brzydka przykładowa trasa (nie prawdziwa trasa Cracovii)
- Brak polskich znaków (ą, ć, ę, ł, ń, ó, ś, ź, ż)
- Strona główna = landing Cracovia (powinny być rozdzielone)
- Zero grafik/zdjęć — nudne, puste
- Brak energii — wygląda jak muzeum, nie jak marka sportowa

### Nowy kierunek: WARM SPORT EDITORIAL

Zmiana z "kremowy editorial/Kinfolk" na **"WARM SPORT EDITORIAL"** — premium ale z energią sportu.

**Think:** Nike Run Club meets editorial print brand. Ciemniejsze tło (grafit/navy), ciepłe akcenty (amber/pomarańcz/złoto), dynamiczna typografia, zdjęcia/grafiki biegaczy.

### Referencje wizualne (DO)

- **Nike Run Club** — energia, dynamika, ciemne tła, bold typography
- **Tracksmith** — premium running brand, editorial quality, warm tones
- **Satisfy Running** — French running brand, artistic, bold
- **Ciele Athletics** — Canadian running caps brand, colorful but premium
- **Muir Way** — jakość druku, szacunek dla kartografii (dla samych plakatów)
- **Kinfolk/Cereal** — editorial layout principles (ale z WIĘKSZĄ energią)

### Anti-referencje (NIE RÓB)

- Canva templates — generyczne, tandetne
- Generyczne kremowe strony — zbyt puste, brak energii
- Muzealny minimalizm bez energii — Paper Collective vibe na STRONIE (na plakacie OK)
- Race certificates / dyplomy — korporacyjne, nudne
- AliExpress/dropship aesthetic
- Etsy Strava poster sellers — tanie fonty, brak hierarchii

### Typografia

Dynamiczna, bold, sport-editorial. Sugestie fontów (ale zaproponuj własną paletę):

- **Headlines:** Bold/Black weight geometric sans-serif — Inter Black, Söhne, lub coś z charakterem sportowym
- **Body:** Clean sans-serif — Inter, Söhne Light
- **Akcenty/dane:** Monospace dla czasów i dystansów — JetBrains Mono, IBM Plex Mono
- **Plakaty (osobna sprawa):** Serif editorial — Playfair Display, EB Garamond, Freight Display

**KRYTYCZNE:** Font MUSI wspierać polskie znaki: ą, ć, ę, ł, ń, ó, ś, ź, ż. Używaj `next/font/google` z subset `latin-ext`.

### Kolorystyka (opisowo — zaproponuj paletę HEX)

**NIE kopiuj starej kremowej palety.** Nowy kierunek:

- **Bazy ciemne:** grafit, navy, antracyt, głęboki węgiel — tło hero sections, nie biały/kremowy
- **Ciepłe akcenty:** amber, pomarańcz, złoto, koral — CTA, highlights, energia
- **Kontrast:** jasny tekst na ciemnym tle w hero, ciemny tekst na jasnym tle w content sections
- **Nie:** pełen czarny (#000), nie neonowy, nie pastelowy

Zaproponuj spójną paletę 5-7 kolorów: 2 bazy + 2 akcenty + 1 success/error + neutralne.

### Imagery / grafika

- Hero sections MUSZĄ mieć background image/gradient z dynamiką sportową — NIE pusty kremowy bg
- Użyj gradient overlays na ciemnym tle z subtelnymi kształtami tras
- Mockupy plakatów w lifestyle context (na ścianie, w ramie, w pokoju biegacza)
- Jeśli nie masz zdjęć stockowych — użyj dynamic gradients, abstract route shapes, SVG patterns

### WAŻNE: Plakaty vs Strona

- **PLAKATY** nadal eleganckie, premium, minimalistyczne (Kinfolk/Muir Way aesthetic) — to produkt
- **STRONA SPRZEDAŻOWA** ma mieć ENERGIĘ sportu — to marketing
- Te dwa światy łączą się: premium produkt sprzedawany z energią sportową

---

## 5. STRONA GŁÓWNA (/)

**Minimalna na MVP** — priorytet to /krakow-2026. Strona główna to "hub" brandu.

### Sekcje (w kolejności)

1. **Hero** — najlepszy mockup plakatu + headline "Twoja trasa. Na ścianie." + sub "Spersonalizowane plakaty z tras sportowych — maratony, szlaki, trasy rowerowe" + CTA "Zobacz Cracovia Maraton 2026 →" (link do /krakow-2026)

2. **Jak to działa** — 3 kroki:
   - Wybierz styl plakatu
   - Wpisz swoje dane (imię, czas, data)
   - Zamów — drukujemy i wysyłamy

3. **Nadchodzące eventy** — karta z Cracovia Maraton 2026 (link do /krakow-2026) + "Wkrótce więcej eventów" placeholder

4. **Footer** — logo, social links (@trasograf IG/FB), kontakt, regulamin

### Nawigacja (globalna, w layout.tsx)

```
Logo (Trasograf) | Eventy | Konfigurator | Blog (coming soon, disabled) | O nas
```

---

## 6. LANDING CRACOVIA MARATON (/krakow-2026) — PRIORYTET MVP

**To jest GŁÓWNA strona do zbudowania.** Landing sprzedażowy dedykowany 23. Cracovia Maratonowi.

### UWAGA PRAWNA

- Pisz: **"23. maraton w Krakowie, 19.04.2026"**
- NIE pisz: "Cracovia Maraton" (nazwa zastrzeżona)
- NIE pisz: "TAURON" (sponsor)
- NIE używaj loga eventu
- Trasa = fakt geograficzny, publiczne GPX — OK do użycia

### Sekcje landing page (w kolejności)

#### Hero
- **H1:** "Twój krakowski maraton. Na ścianie."
- **Sub:** "Spersonalizowany plakat z trasą 23. maratonu w Krakowie — z Twoim imieniem, czasem i datą. Drukowany po biegu, dostarczony w 2 tygodnie."
- **CTA:** "Stwórz swój plakat →" (scroll do konfiguratora lub link do /konfigurator)
- **Visual:** Dynamiczny hero z ciemnym tłem + mockup plakatu + SVG trasa Cracovii jako dekoracyjny element
- **Tło:** ciemny gradient z subtle route pattern, NIE pusty kremowy

#### Preview 3 szablonów
Mockupy 3 szablonów plakatów obok siebie:
1. **Czysty** (minimalistyczny) — biały, Swiss design
2. **Editorial** (magazynowy) — kremowy, Kinfolk vibe
3. **Topograficzny** (kartograficzny) — pergaminowy, vintage mapa

Każdy z podpisem stylu i krótkim opisem.

#### Trasa która zostaje na ścianie
"Te same 42,195 km które pokonasz 19 kwietnia. Rynek Główny, Wawel, Przegorzały, 9 dzielnic Krakowa — wszystko na jednym plakacie który będziesz oglądać codziennie."

#### Personalizacja która ma znaczenie
"Twoje imię. Twój czas. Data Twojego maratonu. Nie generic printout — dokument Twojego osiągnięcia."

#### Zobacz swój plakat zanim zapłacisz (killer feature)
"Wybierz styl, wpisz dane — i od razu widzisz jak będzie wyglądał Twój plakat. Płacisz dopiero gdy jesteś zadowolony."
→ CTA do konfiguratora inline lub /konfigurator

#### Konfigurator (inline lub link)
Albo wbudowany inline w landing, albo CTA "Stwórz swój plakat →" prowadzący do /konfigurator. Decyzja implementacyjna — inline jest lepszy dla konwersji.

#### Druk po biegu = zero ryzyka
"Płacisz dziś za pre-order (−25%). My drukujemy dopiero gdy znamy Twój czas z mety. Plakat w Twoich rękach do 3 maja. Nie zdążymy — 100% zwrot."

#### Cennik — 3 warianty

| Wariant | Cena | Co zawiera | Dostawa |
|---------|------|------------|---------|
| **Bazowy** | 149 zł | Plakat A3 (30×40 cm), papier 200g mat, personalizacja (imię + czas + data), tuba kartonowa | do 03.05.2026 |
| **Premium** | 249 zł | Plakat A2 (50×70 cm), papier 250g premium mat, personalizacja, czarna drewniana rama, tuba + karton | do 03.05.2026 |
| **Kolekcjonerski** | 399 zł | Plakat A2 signed & numbered (1-50), papier bawełniany 310g, dębowa rama, personalizacja, box kolekcjonerski, certyfikat | do 10.05.2026 |

Pre-order cena = -25% od standard post-event. Dostawa: 15 zł InPost, darmowa przy Premium/Kolekcjonerski.
Refund 100% jeśli nie zdążymy wysłać do 10.05.

#### Social proof placeholder
"Dołącz do [X] biegaczy, którzy już zamówili swój plakat" — dynamiczny counter lub placeholder na start.

#### FAQ

- **Czy muszę skończyć maraton?** Nie. Jeśli DNF, drukujemy bez czasu albo robimy refund.
- **Skąd biorę swój czas?** Automatycznie z datasport.pl po biegu.
- **Mogę zamówić dla znajomego?** Tak, dasz nam jego numer startowy.
- **Ile kosztuje dostawa?** 15 zł InPost, darmowa przy Premium/Kolekcjoner.
- **Co jeśli się nie spodoba?** 14 dni na zwrot, bez pytań.
- **Kiedy dostanę plakat?** Bazowy/Premium do 03.05.2026. Kolekcjonerski do 10.05.2026.
- **Czy mogę zobaczyć plakat przed zakupem?** Tak! Nasz konfigurator pokazuje live preview z Twoimi danymi.

#### Footer CTA
"Stwórz swój plakat →" — ostatni CTA przed footerem.

---

## 7. KONFIGURATOR (/konfigurator lub inline w /krakow-2026)

### Opis flow użytkownika

1. Użytkownik wybiera szablon plakatu (3 style: Czysty / Editorial / Topograficzny)
2. Wpisuje dane personalizacji: imię, czas, data, numer startowy, dedykacja (opcjonalna)
3. Widzi **live preview plakatu** ze znakiem wodnym "TRASOGRAF" — preview aktualizuje się w real-time
4. Wybiera wariant cenowy (Bazowy 149 zł / Premium 249 zł / Kolekcjonerski 399 zł)
5. Klik "Zamów" → Stripe Checkout Session
6. Po płatności: Stripe webhook → watermark usunięty → użytkownik dostaje link do wersji bez watermarku

### React component structure

```
<PosterConfigurator>
  <TemplateSelector />           // 3 karty z miniaturami szablonów
  <PersonalizationForm />        // Formularz: imię, czas, data, numer, dedykacja
  <LivePreview />                // SVG rendering z watermarkiem — aktualizuje się real-time
  <PricingSelector />            // 3 warianty cenowe (radio buttons)
  <CheckoutButton />             // "Zamów" → Stripe Checkout
</PosterConfigurator>
```

### Pola formularza personalizacji

| Pole | Typ | Required | Przykład |
|------|-----|----------|---------|
| imię (imie) | text | TAK | "Konrad Szincel" |
| czas (czas) | text (HH:MM:SS) | TAK | "4:12:33" |
| data | text (auto-filled) | TAK | "19.04.2026" |
| numer startowy (bib_number) | text | NIE | "1337" |
| dedykacja (dedication) | textarea | NIE | "Dla Taty — pierwszych 42 km!" |

### SVG rendering

- Trasa GPS jako SVG `<path>` element
- Personalizacja jako SVG `<text>` elements
- Watermark jako repeating pattern: "TRASOGRAF" diagonalnie, `opacity: 0.08`, repeating `<pattern>` w SVG `<defs>`
- Rendering client-side — cały SVG to React component
- Preview ma niższą rozdzielczość (wystarczy screen-quality)
- Po płatności: ten sam SVG bez watermarku, eksport do high-res PDF/PNG

### Watermark spec

```svg
<defs>
  <pattern id="watermark" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
    <text x="0" y="100" font-family="Inter, sans-serif" font-size="24" fill="rgba(0,0,0,0.08)" font-weight="bold">TRASOGRAF</text>
  </pattern>
</defs>
<rect width="100%" height="100%" fill="url(#watermark)" />
```

### Stripe integration

```typescript
// POST /api/checkout — tworzy Stripe Checkout Session
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['p24', 'card', 'blik'],
  line_items: [{
    price: priceId, // per wariant
    quantity: 1,
  }],
  mode: 'payment',
  success_url: `${baseUrl}/sukces?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${baseUrl}/krakow-2026`,
  metadata: {
    template: 'czysty',        // lub 'editorial' / 'topograficzny'
    imie: 'Konrad Szincel',
    czas: '4:12:33',
    data: '19.04.2026',
    bib_number: '1337',
    dedication: 'Dla Taty',
    event: 'krakow-2026',
  },
});
```

### Webhook: POST /api/webhook/stripe

```typescript
// Po płatności (checkout.session.completed):
// 1. Odczytaj metadata z session
// 2. Wygeneruj wersję plakatu BEZ watermarku (server-side SVG → PDF)
// 3. Upload do storage (Vercel Blob lub S3)
// 4. Wyślij email z linkiem do pobrania (signed URL, wygasa po 7 dniach)
// 5. Zapisz zamówienie w bazie/spreadsheet
```

---

## 8. PLAKATY — 3 SZABLONY SVG

### Trasa GPS Cracovii — jak ją uzyskać

Trasa 23. Cracovia Maratonu (42,195 km, start Rynek Główny, pętla przez 9 dzielnic):

**Opcja 1 — OpenStreetMap Overpass API:**
```
// Query Overpass API dla relacji maratonu krakowskiego
[out:json];
relation["name"~"Cracovia"]["route"="running"];
out geom;
```

**Opcja 2 — Hardcoded SVG path:**
Znajdź GPX trasy Cracovia Maratonu (publiczne dane z datasport.pl lub strava segments) i konwertuj na SVG path. Narzędzie: `gpx-to-svg` npm package lub ręczna konwersja koordynat GPS → viewBox SVG.

**Opcja 3 — Uproszczona trasa:**
Ręcznie narysuj uproszczoną trasę na podstawie mapy Krakowa. Kluczowe punkty: Rynek Główny (start/meta), Wawel, Bulwary Wiślane, Przegorzały, Tyniec (nawrotka), powrót Bulwarami. Trasa to pętla z nawrotką na zachodzie.

**KRYTYCZNE:** Trasa musi wyglądać jak PRAWDZIWA trasa maratonu — z naturalnymi zakrętami ulic, nie jak losowy squiggle. Jeśli nie masz GPX, narysuj ją ręcznie na podstawie Google Maps z zachowaniem proporcji.

### Szablon A — "CZYSTY" (Minimalistyczny / Swiss Design)

**Filozofia:** Trasa jest bohaterem. Zero dekoracji. Plakat jak obiekt z wystawy w MoMA.

**Layout:**
- Trasa jako jedyny element graficzny, wycentrowana w złotym podziale
- Min. 25% white space
- Dane personalizacji w dolnym marginesie, 1 linia, 8-10pt
- Brak tła mapy — TYLKO linia trasy na białym/czarnym tle

**Typografia:** Inter (via next/font/google), Light 300 dla danych, Medium 500 dla eventu. UPPERCASE, tracking +0.05em.

**Paleta LIGHT:** Tło białe, trasa ciemny grafit, akcent czerwień (dot start/finish)
**Paleta DARK:** Tło czarny/grafit, trasa kremowa/biała, akcent jasny

**Personalizacja (1 linia):**
`KONRAD SZINCEL | 23. MARATON W KRAKOWIE | 19.04.2026 | 42,195 KM | 4:12:33`

**Vibe:** Swiss poster, Dieter Rams, Apple minimalism, Paper Collective

### Szablon B — "EDITORIAL" (Magazynowy / Kinfolk / Cereal)

**Filozofia:** Plakat jako strona z luksusowego magazynu podróżniczego. Typografia = element graficzny.

**Layout:**
- Trasa w centrum (60% powierzchni)
- "KRAKÓW" dużą czcionką u góry (serif, ~48pt)
- Asymetryczny layout
- Data obrócona 90° na lewym marginesie
- Imię biegacza jako wyrazisty element

**Typografia:**
- Headline: Playfair Display (serif) — nazwa miasta
- Body: Inter (sans) — dane personalizacji
- Hierarchia: 48pt → 18pt → 10pt → 7pt

**Paleta WARM:** Tło ecru/kremowe, trasa ciemny grafit, headline ciemny, akcent terakota + oliwka
**Paleta COOL:** Tło jasnoszare, trasa granatowy, akcent zieleń

**Vibe:** Kinfolk, Cereal magazine, Patagonia catalog — warm, analog, tactile

### Szablon C — "TOPOGRAFICZNY" (Kartograficzny / Vintage / National Geographic)

**Filozofia:** Plakat jako piękna mapa. Trasa na autentycznych danych topograficznych.

**Layout:**
- Mapa topograficzna Krakowa jako tło (warstwice, rzeki/Wisła, ulice, parki)
- Trasa czerwona bold na tle mapy
- Legenda kartograficzna w ramce (prawy dół) z danymi biegacza
- Nazwy dzielnic w foncie kartograficznym

**Typografia:**
- Mapa: EB Garamond (serif) — nazwy, etykiety
- Legenda: Inter (sans) — dane personalizacji
- Ulice: EB Garamond Italic 6-7pt
- Dzielnice: EB Garamond Small Caps 8pt

**Paleta CLASSIC:** Tło pergaminowe, warstwice brązowe, woda niebieska, trasa czerwona, zieleń parków
**Paleta MIDNIGHT:** Tło ciemny granat, trasa złota/amber

**Vibe:** Muir Way, National Geographic, gabinet podróżnika, vintage USGS

### Specyfikacja techniczna plakatów (wszystkie szablony)

- **Formaty:** A3 (297×420mm), 50×70cm — oba z 3mm bleed
- **Rozdzielczość:** 300 DPI do druku
- **Marginesy:** Bleed 3mm, safe zone 10mm, wewnętrzne 20-30mm
- **Papier:** Matowy fine art 250-350gsm
- **Rama:** Default cienka czarna aluminiowa 8mm. Alternatywy: naturalny dąb, ciemny orzech

---

## 9. STRIPE SETUP

### 3 produkty z cenami

```
Produkt 1: "Plakat Bazowy — 23. Maraton Kraków 2026"
  - Price: 14900 (149 zł) PLN
  - Metadata: { variant: "bazowy", format: "A3", frame: false }

Produkt 2: "Plakat Premium — 23. Maraton Kraków 2026"
  - Price: 24900 (249 zł) PLN
  - Metadata: { variant: "premium", format: "A2", frame: true }

Produkt 3: "Plakat Kolekcjonerski — 23. Maraton Kraków 2026"
  - Price: 39900 (399 zł) PLN
  - Metadata: { variant: "kolekcjonerski", format: "A2", frame: "oak", limited: true }
```

### Checkout Session config

```typescript
{
  payment_method_types: ['p24', 'card', 'blik'],
  locale: 'pl',
  currency: 'pln',
  shipping_address_collection: { allowed_countries: ['PL'] },
  shipping_options: [
    { shipping_rate: 'shr_inpost_15pln' },     // 15 zł InPost
    { shipping_rate: 'shr_free' },              // darmowa dla Premium/Kolekcjonerski
  ],
}
```

### Webhook endpoint: POST /api/webhook/stripe

Events to handle:
- `checkout.session.completed` — zamówienie potwierdzone, generuj plakat bez watermarku
- `charge.refunded` — oznacz zamówienie jako zwrócone

### Metadata structure (w Checkout Session)

```json
{
  "template": "czysty|editorial|topograficzny",
  "imie": "Konrad Szincel",
  "czas": "4:12:33",
  "data": "19.04.2026",
  "bib_number": "1337",
  "dedication": "Dla Taty — pierwszych 42 km!",
  "event": "krakow-2026",
  "variant": "bazowy|premium|kolekcjonerski"
}
```

---

## 10. SEO I META

### Per page

**Strona główna (/):**
```html
<title>Trasograf — Spersonalizowane plakaty z tras sportowych</title>
<meta name="description" content="Zamień swój maraton, szlak lub trasę rowerową w premium plakat. Wybierz styl, wpisz dane — i od razu zobacz jak będzie wyglądał. Drukowany i dostarczony w 2 tygodnie." />
<meta property="og:title" content="Trasograf — Twoja trasa. Na ścianie." />
<meta property="og:description" content="Spersonalizowane plakaty z tras sportowych — maratony, szlaki, trasy rowerowe." />
<meta property="og:image" content="https://trasograf.pl/og-home.jpg" />
<meta property="og:url" content="https://trasograf.pl" />
```

**Landing Cracovia (/krakow-2026):**
```html
<title>Plakat z trasą 23. Maratonu w Krakowie 2026 | Trasograf</title>
<meta name="description" content="Uwiecznij swój krakowski maraton. Spersonalizowany plakat z trasą 23. maratonu w Krakowie — z Twoim imieniem, czasem i datą. Pre-order -25%. Zobacz live preview!" />
<meta property="og:title" content="Twój krakowski maraton. Na ścianie." />
<meta property="og:description" content="Spersonalizowany plakat z trasą 23. maratonu w Krakowie — 3 style, live preview, druk po biegu." />
<meta property="og:image" content="https://trasograf.pl/og-krakow-2026.jpg" />
<meta property="og:url" content="https://trasograf.pl/krakow-2026" />
```

**Konfigurator (/konfigurator):**
```html
<title>Konfigurator plakatu — Trasograf</title>
<meta name="description" content="Stwórz swój spersonalizowany plakat z trasą maratonu. Wybierz styl, wpisz dane i zobacz live preview. Zamów online." />
```

### Structured data (Product schema na /krakow-2026)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Plakat z trasą 23. Maratonu w Krakowie 2026",
  "description": "Spersonalizowany plakat premium z trasą maratonu krakowskiego",
  "brand": { "@type": "Brand", "name": "Trasograf" },
  "offers": [
    { "@type": "Offer", "price": "149", "priceCurrency": "PLN", "name": "Bazowy" },
    { "@type": "Offer", "price": "249", "priceCurrency": "PLN", "name": "Premium" },
    { "@type": "Offer", "price": "399", "priceCurrency": "PLN", "name": "Kolekcjonerski" }
  ]
}
```

---

## 11. MVP SCOPE

### Co JEST w MVP

- Landing page /krakow-2026 z pełnym copy i sekcjami
- Strona główna / minimalna (hero + link do /krakow-2026)
- Konfigurator z live preview i watermarkiem (3 szablony)
- Formularz personalizacji (imię, czas, data, numer startowy, dedykacja)
- 3 szablony SVG plakatów (Czysty, Editorial, Topograficzny)
- Trasa Cracovia Maratonu jako SVG path
- Stripe Checkout z P24/BLIK (3 warianty cenowe: 149/249/399 zł)
- Stripe webhook do odblokowania wersji bez watermarku
- Strona sukcesu po płatności z linkiem do pobrania
- Responsive design (mobile + desktop)
- Polskie znaki (ą, ć, ę, ł, ń, ó, ś, ź, ż) we WSZYSTKICH fontach
- SEO meta tagi per page
- Nawigacja z placeholderem na Blog (coming soon)
- Struktura App Router przygotowana na rozszerzenie (/blog/[slug], kolejne eventy)

### Co NIE JEST w MVP

- Blog (/blog) — placeholder w nawigacji, nie budujemy contentu
- Integracja Strava OAuth (per-user trasy) — przyszłość
- Generator SVG ze Strava API
- Kolejne eventy (Warszawa, Rzeźnik) — tylko placeholder "wkrótce"
- System kont użytkowników / login
- Panel admina
- Automatyczny email po płatności (manual na start)
- Wersja EN (routewright.com)
- System recenzji / UGC
- Retargeting pixel (opcjonalnie jeśli szybkie)

### Kill criteria

- **<10 zamówień do 15.04** = KILL, refund wszystkim, post-mortem
- **10-30 zamówień** = finish strong, planuj kolejny event
- **>50 zamówień** = seria, buduj pełną platformę z generatorem SVG

---

## 12. PEŁNY COPY PL

### Copy landing Cracovia (/krakow-2026)

**H1:** Twój krakowski maraton. Na ścianie.

**Sub:** Spersonalizowany plakat z trasą 23. maratonu w Krakowie — z Twoim imieniem, czasem i datą. Drukowany po biegu, dostarczony w 2 tygodnie.

**CTA główny:** Stwórz swój plakat →

**Sekcja 1 — Trasa która zostaje na ścianie:**
Te same 42,195 km które pokonasz 19 kwietnia. Rynek Główny, Wawel, Przegorzały, 9 dzielnic Krakowa — wszystko na jednym plakacie który będziesz oglądać codziennie.

**Sekcja 2 — Personalizacja która ma znaczenie:**
Twoje imię. Twój czas. Data Twojego maratonu. Nie generic printout — dokument Twojego osiągnięcia.

**Sekcja 3 — Zobacz swój plakat zanim zapłacisz:**
Wybierz styl, wpisz dane — i od razu widzisz jak będzie wyglądał Twój plakat. Płacisz dopiero gdy jesteś zadowolony.

**Sekcja 4 — Druk po biegu = zero ryzyka:**
Płacisz dziś za pre-order (−25%). My drukujemy dopiero gdy znamy Twój czas z mety. Plakat w Twoich rękach do 3 maja. Nie zdążymy — 100% zwrot.

**CTA końcowy:** Stwórz swój plakat →

### Copy strona główna (/)

**H1:** Twoja trasa. Na ścianie.

**Sub:** Spersonalizowane plakaty z tras sportowych — maratony, szlaki, trasy rowerowe. Wybierz styl, wpisz dane, zobacz preview.

**Sekcja "Jak to działa":**
1. Wybierz styl plakatu — minimalistyczny, editorial lub kartograficzny
2. Wpisz swoje dane — imię, czas, data biegu
3. Zamów — drukujemy i wysyłamy w 2 tygodnie

**Sekcja "Nadchodzące eventy":**
Karta: 23. Maraton w Krakowie | 19.04.2026 | Pre-order -25% | "Zobacz →"
Placeholder: Wkrótce więcej eventów. Zostaw email a damy Ci znać.

### FAQ (pełne odpowiedzi)

**Czy muszę skończyć maraton?**
Nie. Jeśli DNF, drukujemy bez czasu albo robimy refund — Ty decydujesz.

**Skąd biorę swój czas?**
Automatycznie z datasport.pl po biegu. Nie musisz nic robić.

**Mogę zamówić dla znajomego?**
Tak! Podaj nam jego numer startowy, a my uzupełnimy czas po biegu.

**Ile kosztuje dostawa?**
15 zł InPost. Darmowa przy wariancie Premium i Kolekcjonerskim.

**Co jeśli się nie spodoba?**
14 dni na zwrot, bez pytań. Pełny refund.

**Kiedy dostanę plakat?**
Bazowy i Premium: do 3 maja 2026. Kolekcjonerski: do 10 maja 2026.

**Czy mogę zobaczyć plakat przed zakupem?**
Tak! Nasz konfigurator pokazuje live preview z Twoimi danymi — widzisz dokładnie co zamawiasz.

---

## 13. POSTY FB (gotowe do wklejenia)

### Post #1 — Pre-race (grupy Cracovia Maraton, ITMBW, Biegacze Krakowa)

> Cześć! Biegniecie w niedzielę Cracovię? Robimy z kumplem limitowany plakat z oficjalną trasą 23. CM z personalizacją (imię, czas, data). 3 style, druk po biegu żebyśmy mogli wpisać Wasz realny czas. Możesz zobaczyć jak będzie wyglądał Twój plakat zanim zapłacisz! Pre-order −25% do niedzielnego startu. Nie spam, sam biegnę 😅 — link w komentarzu.

### Post #2 — Post-race angle (dzień 4-5 sprintu)

> Wyobraźcie sobie: za rok siedzicie przy kawie i patrzycie na ścianę — plakat z trasą Cracovii z Waszym imieniem i czasem 3:42:17. To jedyna mapa która znaczy coś więcej niż dekoracja. Robimy takie plakaty na 23. CM — pre-order teraz, druk po Waszym biegu. [link]

### Post #3 — Gift angle (post-event)

> Update: w 4 dni od startu mamy 23 pre-ordery od biegaczy Cracovii 💪 Najpopularniejszy: Premium w ramie (79% zamówień). Jeszcze 4 dni do startu i końca pre-order'a (-25%). Jeśli nie chcesz przegapić → [link]. Dzięki tym którzy już zaufali ❤️

### Grupy FB do targetowania

- Cracovia Maraton (oficjalna — przez komenty, nie post)
- ITMBW (amatorska grupa biegowa Kraków, czwartkowe treningi Bulwary)
- Biegacze Krakowa / Kraków Biega
- Bieganie Małopolska
- Polscy Biegacze / Bieganie to Moja Pasja (ogólnopolskie)
- Maratończycy 2026 / Maratony Polskie
- Grupa "Biegam bo lubię"
- Kluby: KB Cracovia, Krakus Kraków

---

## 14. KNOWN ISSUES Z POPRZEDNIEJ WERSJI

Jeśli istnieje poprzednia wersja trasograf.pl — te problemy MUSZĄ być naprawione:

1. **Brak polskich znaków** (ą, ć, ę, ł, ń, ó, ś, ź, ż) — font musi wspierać PL. Użyj `next/font/google` z `subsets: ['latin', 'latin-ext']`
2. **Strona główna ≠ landing Cracovia** — ROZDZIELIĆ routing: `/` = strona brandu, `/krakow-2026` = landing eventowy
3. **Trasa przykładowa brzydka** — użyć prawdziwej trasy Cracovii (SVG path z GPX), nie losowego squiggle
4. **Design zbyt pusty/kremowy** — nowy kierunek WARM SPORT EDITORIAL z ciemnym tłem i energią
5. **Zero grafik/zdjęć** — dodać lifestyle imagery, gradients, dynamiczne tła
6. **Cennik** — musi być 149/249/399 zł (sprawdzić czy poprzednia wersja miała inne ceny)
7. **Brak live preview** — konfigurator z watermarkiem to killer feature, musi działać
8. **Brak Stripe P24/BLIK** — polscy klienci płacą głównie przelewem/BLIKiem, nie kartą

---

## 15. ART DIRECTION — PEŁNY BRIEF DESIGNERSKI (z Jiry GT-117)

### Benchmarki estetyki (skrót)

- **Muir Way** — gold standard map art. Shaded relief, ciepłe ziemiste palety, muzealny, ponadczasowy
- **Paper Collective** — skandynawski minimalizm, ultra-clean white space, matowa paleta
- **Positive Prints** — konfigurator online, personalizacja real-time. Czego unikać: generyczność, "gift shop" vibe
- **Kinfolk Magazine** — custom typefaces, 12-kolumnowy grid, white space jako luksus
- **Cereal Magazine** — minimalistyczny, restrained typography, calm spirit
- **Swiss Design** — matematyczny grid, asymetryczny layout, sans-serif, zero dekoracji
- **Patagonia** — outdoor lifestyle z editorial quality, naturalne tony

### Ogólne zasady dla wszystkich plakatów (Stitch prompts v2)

1. **GPS ROUTE LINE jest ZAWSZE centralnym elementem.** Wszystko inne jest drugorzędne.
2. **Nigdy gradient backgrounds.** Flat colors lub subtle paper textures.
3. **Nigdy script/handwriting/cursive fonts.**
4. **Personalizacja (imię, czas, data) obecna ale cicha** — nie visual focus.
5. **Generous white/negative space.** Less is more.
6. **Watermark "TRASOGRAF"** powtórzony diagonalnie, opacity 0.08.
7. **Referencje:** Paper Collective, Muir Way, Kinfolk/Cereal, Blomkal, Patagonia.
8. **Anti-referencje:** Canva templates, AliExpress dropship, race certificates, diploma-style, stock gradients, clip art.

### Paleta kolorów brandu (z oryginalnego briefu GT-117)

**Primary:**
- Trasograf Black: #1A1A1A
- Trasograf Cream: #F5F0E8

**Secondary:**
- Route Red: #C83232
- Olive Trail: #5C6B4F
- Topo Blue: #7BA7BC

**Neutral:**
- Warm Grey: #8A8578
- Light Sand: #E8E3D8
- Deep Charcoal: #2C2C2C

> **UWAGA:** Te kolory dotyczą PLAKATÓW. Strona sprzedażowa (landing) powinna mieć osobną, bardziej energetyczną paletę w kierunku warm sport editorial (ciemne bazy + ciepłe akcenty). Zaproponuj paletę strony sam.

### Typografia brandu

- **Primary (headings):** Söhne (Klim, płatny) → **fallback dla web: Inter** (Google Fonts, darmowy)
- **Secondary (body):** Freight Text Pro → **fallback: Libre Baskerville** lub Playfair Display
- **Monospace (dane/liczby):** JetBrains Mono → fallback: IBM Plex Mono
- **Kartografia:** EB Garamond → fallback: Crimson Pro

### Specyfikacja druku

- Papier: Matowy fine art 300-350gsm, 100% bawełna, bezkwasowy
- Sugestia: Hahnemühle Photo Rag 308gsm lub Museum Etching 350gsm
- Rama default: cienka czarna aluminiowa 8mm profil
- Alternatywy: naturalny dąb 15mm, ciemny orzech 12mm
- Rich black do druku: C40 M30 Y30 K100
- Profil: ISO Coated v2 / Fogra39

---

## 16. KPI I DECISION POINTS

| Metryka | Cel sprintu |
|---------|-------------|
| Unique landing visits | 3000 |
| CR landing → checkout | 2-4% |
| Pre-orders total | 20-50 |
| AOV | ≥150 zł |
| CAC (Meta) | ≤50 zł |
| Refund rate pre-event | <5% |

### Decision points

- **Dzień 5 (12.04):** <5 zamówień = STOP, zmień ofertę/copy/cenę. 5-15 = kontynuuj. >15 = skaluj ads do 2000 zł.
- **Dzień 8 (15.04):** <10 zamówień = KILL, refund wszystkim, post-mortem. 10-30 = finish strong. >30 = rozpocznij pracę nad generatorem SVG + pipeline na Warszawę 09/2026.
- **Dzień 11 (19.04):** final count. <20 = pivot. >50 = seria, buduj platform.

---

## 17. RYZYKA

- **Prawa do nazwy:** NIE używać "Cracovia Maraton" ani "TAURON". Mówić "23. maraton w Krakowie 19.04.2026". Trasa = fakt geograficzny.
- **Zgoda adminów grup FB** — soft promo, wartość najpierw, link w komentarzach
- **Gelato jakość** — sample musi potwierdzić jakość. Backup: drukomat.pl
- **Live preview rendering na mobile** — Canvas/SVG może być wolny na niskim-end Android. Lazy loading, placeholder skeleton.
- **Niski popyt** — bazowa hipoteza: 0.5-1% konwersja z 9000 biegaczy = 45-90 orders. Jeśli pudło → pivot na "gift dla rodziny biegacza" angle.

---

## 18. RESEARCH RYNKOWY (podsumowanie GT-115)

### Ranking nisz

1. **BIEGANIE** (launch first) — najwyższy intent, najwyższy LTV, dwupeak sezonowy (kwiecień + wrzesień), niska konkurencja PL dla formatu, emocjonalny trigger po finiszu
2. **GÓRY / HIKING** (second launch, lipiec 2026) — silny demand sezonowy lato, storytelling "once-in-a-lifetime" tras
3. **ROWER** (trzeci) — lowest intent PL, słabszy trigger emocjonalny

### Sezonowość biegania PL

- **Kwiecień:** Cracovia, Orlen, sezon wiosenny
- **Wrzesień-Październik:** Warszawa, Berlin, Chicago
- **Grudzień:** prezent świąteczny
- Double-peak → dobre dla cashflow

### Top eventy do outreach (PL 2026)

1. Cracovia Marathon (19.04) — MVP
2. Orlen Warsaw Marathon (08.09)
3. Tarnów Marathon (22.06)
4. Poznań Marathon (28.09)
5. Gdańsk Marathon (28.04)
6. Wrocław Marathon (14.09)

---

*Dokument wygenerowany 13.04.2026. Źródło: Jira tickets GT-113, GT-114, GT-115, GT-116, GT-117, GT-118, GT-136, GT-137 + komentarze.*
