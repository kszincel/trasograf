# Brief: Trasograf — konfigurator plakatów z tras GPS

## Cel

Sklep z konfiguratorem spersonalizowanych plakatów-map sportowych. Estetyka premium editorial (Kinfolk/Cereal). Na start jedna trasa: 23. Maraton Krakow 19.04.2026.

Docelowi uzytkownicy: biegacze amatorzy 30-50 lat po ukonczeniu maratonu, partnerzy/rodzina szukajacy prezentu.

---

## Stack

- **Framework:** Next.js App Router
- **Deploy:** Vercel (subdomena trasograf-***, pozniej wlasna domena)
- **UI:** Tailwind + shadcn/ui
- **Platnosci:** Stripe (Checkout Session, P24 + BLIK, webhooks)
- **Renderowanie plakatow:** Stitch API (klucz do podpięcia)
- **Trasa GPS:** SVG path z danych GPX (Krakow hardcoded na MVP)

---

## Warianty cenowe

| Wariant | Cena | Co zawiera |
|---------|------|-----------|
| Cyfrowy | 49 zl | Plik PDF/PNG do pobrania |
| Maly wydruk | 99 zl | Wydruk (rozmiar S) |
| Sredni wydruk | 149 zl | Wydruk (rozmiar M) |
| Duzy wydruk | 199 zl | Wydruk (rozmiar L, 50x70cm) |

---

## Szablony plakatow

**A — "Czysty"** (minimalistyczny, Swiss design, Dieter Rams)
**B — "Editorial"** (kremowy, Kinfolk/Cereal, ulubiony Konrada)
**C — "Topograficzny"** (vintage kartograficzny, National Geographic vibe)

Prompty do Stitch: `attachments/TRASOGRAF-STITCH-PROMPTS.md`

---

## Pola personalizacji

- Imie i nazwisko
- Czas maratonu (HH:MM:SS)
- Data startu
- Numer startowy

---

## MVP — zakres

### 1. Landing page (`/`, `/krakow-2026`)
- Hero z wizualizacja trasy Krakowa
- Copy targetowane na biegaczy i prezentodawcow
- Mobile-first (biegacze po biegu na telefonie)

### 2. Konfigurator
- Wybor szablonu (A/B/C)
- Wybor wariantu cenowego (49/99/149/199 zl)
- Pola personalizacji
- Live preview z watermarkiem TRASOGRAF (Stitch API)
- CTA do kasy

### 3. Formularz zamowienia
- Imie, nazwisko, email
- Adres dostawy (tylko dla wariantow z wydrukiem)
- Podsumowanie zamowienia

### 4. Platnosci (Stripe)
- Checkout Session z P24 i BLIK
- Webhook po platnosci — zapis danych zamowienia (metadata Stripe)
- Stripe Dashboard jako panel zamowien na MVP (bez wlasnej bazy)

### 5. Potwierdzenie
- Strona dziekujemy
- Email potwierdzajacy (przez Stripe lub prosty nodemailer)

---

## Poza MVP (backlog)

- Wlasna baza danych zamowien (Supabase lub Neon)
- Panel admina z lista zamowien i statusami
- Strava API — import trasy uzytkownika
- Gelato API — automatyczne zlecanie druku
- Kolejne eventy (landing pages per bieg)
- Rynek EN (routewright.com)
- Kolekcja dystansow — galeria wielu biegow jednego uzytkownika
- Konta uzytkownikow / historia zamowien

---

## Postep

- [x] Zebranie wymagan
- [x] Ustalenie scope MVP i cennika
- [ ] Setup projektu Next.js
- [ ] Landing page + trasa Krakowa (SVG)
- [ ] Konfigurator z live preview (Stitch API)
- [ ] Integracja Stripe
- [ ] Formularz zamowienia
- [ ] Webhook i obsługa zamowien
- [ ] Testy end-to-end
- [ ] Deploy na Vercel

---

## Decyzje

- Adres dostawy zbieramy sami (nie przez Stripe Shipping)
- Stripe Dashboard = panel zamowien na MVP (bez wlasnej bazy)
- Stitch API klucz: do podpiecia przez Konrada
- Jira projekt: goldentrail (backlog poza MVP trafi tam po ustawieniu dostepu)
