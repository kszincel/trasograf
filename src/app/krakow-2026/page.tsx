import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { PRICE_VARIANTS, formatPrice } from "@/lib/stripe";
import eventData from "@/data/events/krakow-2026.json";

export const metadata: Metadata = {
  title: "Plakat z trasą 23. Maratonu w Krakowie 2026 | Trasograf",
  description:
    "Uwiecznij swój krakowski maraton. Spersonalizowany plakat z trasą 23. maratonu w Krakowie — z Twoim imieniem, czasem i datą. Pre-order −25%. Zobacz live preview!",
  openGraph: {
    title: "Twój krakowski maraton. Na ścianie.",
    description:
      "Spersonalizowany plakat z trasą 23. maratonu w Krakowie — 3 style, live preview, druk po biegu.",
    url: "https://trasograf.pl/krakow-2026",
  },
};

const FAQ = [
  {
    q: "Czy muszę skończyć maraton?",
    a: "Nie. Jeśli DNF, drukujemy bez czasu albo robimy refund — Ty decydujesz.",
  },
  {
    q: "Skąd biorę swój czas?",
    a: "Automatycznie z datasport.pl po biegu. Nie musisz nic robić.",
  },
  {
    q: "Mogę zamówić dla znajomego?",
    a: "Tak! Podaj nam jego numer startowy, a my uzupełnimy czas po biegu.",
  },
  {
    q: "Ile kosztuje dostawa?",
    a: "15 zł InPost. Darmowa przy wariancie Premium i Kolekcjonerskim.",
  },
  {
    q: "Co jeśli się nie spodoba?",
    a: "14 dni na zwrot, bez pytań. Pełny refund.",
  },
  {
    q: "Kiedy dostanę plakat?",
    a: "Bazowy i Premium: do 3 maja 2026. Kolekcjonerski: do 10 maja 2026.",
  },
  {
    q: "Czy mogę zobaczyć plakat przed zakupem?",
    a: "Tak! Nasz konfigurator pokazuje live preview z Twoimi danymi — widzisz dokładnie co zamawiasz.",
  },
];

const TEMPLATES = [
  {
    id: "czysty",
    label: "Czysty",
    opis: "Swiss design. Biała przestrzeń, jedna trasa, jeden napis.",
  },
  {
    id: "editorial",
    label: "Editorial",
    opis: "Kremowy, ciepły, jak strona Kinfolk. Serif, asymetria.",
    popular: true,
  },
  {
    id: "topograficzny",
    label: "Topograficzny",
    opis: "Vintage kartografia. Warstwice, siatka ulic, pergamin.",
  },
];

export default function Krakow2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Plakat z trasą 23. Maratonu w Krakowie 2026",
    description: "Spersonalizowany plakat premium z trasą maratonu krakowskiego",
    brand: { "@type": "Brand", name: "Trasograf" },
    offers: PRICE_VARIANTS.map((v) => ({
      "@type": "Offer",
      price: (v.price / 100).toString(),
      priceCurrency: "PLN",
      name: v.name,
    })),
  };

  return (
    <main className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — dark */}
      <div className="section-dark">
        <Nav dark />
        <section className="px-6 md:px-10 py-20 md:py-32 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <p
                className="text-xs tracking-widest uppercase font-bold mb-5"
                style={{ color: "var(--color-amber)" }}
              >
                Pre-order · −25% · {eventData.date}
              </p>
              <h1
                className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Twój krakowski maraton. Na ścianie.
              </h1>
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                Spersonalizowany plakat z trasą 23. maratonu w Krakowie — z
                Twoim imieniem, czasem i datą. Drukowany po biegu, dostarczony
                w 2 tygodnie.
              </p>
              <Link
                href="/konfigurator"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-wider uppercase text-[#1A1A2E] hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "var(--color-amber)" }}
              >
                Stwórz swój plakat →
              </Link>
            </div>

            {/* Trasa SVG — hero visual */}
            <div className="w-48 md:w-64 shrink-0 opacity-60">
              <svg
                viewBox={eventData.route.viewBox}
                className="w-full h-auto"
                fill="none"
              >
                <path
                  d={eventData.route.path}
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="185" cy="52" r="5" fill="var(--color-amber)" />
              </svg>
            </div>
          </div>
        </section>
      </div>

      {/* Trasa */}
      <section className="py-16 px-6 md:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-black mb-4"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Trasa która zostaje na ścianie.
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            Te same 42,195 km które pokonasz 19 kwietnia. Rynek Główny, Wawel,
            Przegorzały, 9 dzielnic Krakowa — wszystko na jednym plakacie który
            będziesz oglądać codziennie.
          </p>
        </div>
      </section>

      {/* 3 szablony */}
      <section className="py-16 px-6 md:px-10 bg-secondary/30 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-10 font-medium">
            Trzy style plakatów
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEMPLATES.map((t) => (
              <div key={t.id} className="relative">
                {t.popular && (
                  <div
                    className="absolute -top-3 left-4 text-[10px] font-bold tracking-widest uppercase px-3 py-1 text-[#1A1A2E]"
                    style={{ backgroundColor: "var(--color-amber)" }}
                  >
                    Najpopularniejszy
                  </div>
                )}
                <div className="aspect-[5/7] border border-border bg-background flex items-center justify-center mb-4">
                  <svg
                    viewBox={eventData.route.viewBox}
                    className="w-24 h-auto opacity-60"
                    fill="none"
                  >
                    <path
                      d={eventData.route.path}
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-xs font-bold tracking-widest uppercase mb-1">{t.label}</p>
                <p className="text-xs text-muted-foreground">{t.opis}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/konfigurator"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold tracking-wider uppercase text-[#1A1A2E] hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "var(--color-amber)" }}
            >
              Stwórz swój plakat →
            </Link>
          </div>
        </div>
      </section>

      {/* Personalizacja */}
      <section className="py-16 px-6 md:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-4" style={{ fontFamily: "var(--font-inter)" }}>
              Personalizacja która ma znaczenie.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Twoje imię. Twój czas. Data Twojego maratonu. Nie generic
              printout — dokument Twojego osiągnięcia.
            </p>
          </div>
          <div className="section-graphite p-6 font-mono text-sm"
               style={{ fontFamily: "var(--font-mono)", backgroundColor: "var(--color-graphite)" }}>
            <p className="text-white/40 text-xs mb-3 tracking-wider">PRZYKŁAD PERSONALIZACJI</p>
            <p className="text-white font-bold">ANNA KOWALSKA</p>
            <p className="text-white/80">
              <span style={{ color: "var(--color-amber)" }}>3:58:47</span>
            </p>
            <p className="text-white/60 text-xs mt-2">19.04.2026 · NR 4821 · 42,195 KM</p>
            <p className="text-white/40 text-xs italic mt-1">"Dla rodziny — każdy krok był dla Was"</p>
          </div>
        </div>
      </section>

      {/* Live preview */}
      <section className="py-16 px-6 md:px-10 section-dark border-b border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4" style={{ fontFamily: "var(--font-inter)" }}>
            Zobacz swój plakat zanim zapłacisz.
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">
            Wybierz styl, wpisz dane — i od razu widzisz jak będzie wyglądał
            Twój plakat. Płacisz dopiero gdy jesteś zadowolony.
          </p>
          <Link
            href="/konfigurator"
            className="inline-flex items-center justify-center px-10 py-4 text-sm font-bold tracking-wider uppercase text-[#1A1A2E] hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--color-amber)" }}
          >
            Otwórz konfigurator →
          </Link>
        </div>
      </section>

      {/* Druk po biegu */}
      <section className="py-16 px-6 md:px-10 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="border-l-4 pl-8" style={{ borderColor: "var(--color-amber)" }}>
            <h2 className="text-2xl font-black mb-3" style={{ fontFamily: "var(--font-inter)" }}>
              Druk po biegu = zero ryzyka.
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Płacisz dziś za pre-order (−25%). My drukujemy dopiero gdy znamy
              Twój czas z mety. Plakat w Twoich rękach do 3 maja. Nie zdążymy
              — 100% zwrot.
            </p>
          </div>
        </div>
      </section>

      {/* Cennik */}
      <section className="py-16 px-6 md:px-10 bg-secondary/30 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-10 font-medium">
            Cennik — pre-order −25%
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {PRICE_VARIANTS.map((v) => (
              <div key={v.id} className="border border-border bg-card p-6">
                <p
                  className="text-2xl font-black mb-1"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {formatPrice(v.price)}
                </p>
                <p className="text-sm font-bold mb-2">{v.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {v.description}
                </p>
                {v.size && (
                  <p
                    className="text-xs font-mono mt-3 font-medium"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--color-amber-dark)" }}
                  >
                    {v.size}
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Dostawa: 15 zł InPost. Darmowa przy wariancie Premium i
            Kolekcjonerskim.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 md:px-10 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-10 font-medium">
            FAQ
          </p>
          <div className="space-y-8">
            {FAQ.map((item) => (
              <div key={item.q}>
                <h3 className="font-bold mb-2 text-foreground">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-6 md:px-10 section-dark">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-white/60 text-sm mb-4">
            {eventData.participants.toLocaleString("pl")} uczestników ·{" "}
            {eventData.date}
          </p>
          <Link
            href="/konfigurator"
            className="inline-flex items-center justify-center px-10 py-4 text-sm font-bold tracking-wider uppercase text-[#1A1A2E] hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--color-amber)" }}
          >
            Stwórz swój plakat →
          </Link>
        </div>
      </section>
    </main>
  );
}
