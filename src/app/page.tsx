import Link from "next/link";
import { Nav } from "@/components/Nav";
import { PRICE_VARIANTS, formatPrice } from "@/lib/stripe";

export const metadata = {
  title: "Trasograf — Spersonalizowane plakaty z tras sportowych",
  description:
    "Zamień swój maraton, szlak lub trasę rowerową w premium plakat. Wybierz styl, wpisz dane — i od razu zobacz jak będzie wyglądał. Drukowany i dostarczony w 2 tygodnie.",
};

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero — dark */}
      <div className="section-dark">
        <Nav dark />
        <section className="px-6 md:px-10 py-24 md:py-36 max-w-5xl mx-auto">
          <p className="text-amber text-xs tracking-widest uppercase mb-6 font-medium"
             style={{ color: "var(--color-amber)", fontFamily: "var(--font-sans)" }}>
            Plakaty z tras sportowych
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight mb-6"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Twoja trasa.
            <br />
            <span style={{ color: "var(--color-amber)" }}>Na ścianie.</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            Spersonalizowane plakaty z tras sportowych — maratony, szlaki, trasy
            rowerowe. Wybierz styl, wpisz dane, zobacz preview.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/krakow-2026"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-wider uppercase text-[#1A1A2E] hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "var(--color-amber)", fontFamily: "var(--font-inter)" }}
            >
              Cracovia Maraton 2026 →
            </Link>
            <Link
              href="/konfigurator"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wider uppercase text-white border border-white/20 hover:border-white/50 transition-colors"
            >
              Konfigurator
            </Link>
          </div>
        </section>
      </div>

      {/* Jak to działa */}
      <section className="py-20 px-6 md:px-10 bg-background border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-12 font-medium">
            Jak to działa
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                nr: "01",
                tytul: "Wybierz styl plakatu",
                opis: "Minimalistyczny, editorial lub kartograficzny. Każdy zaprojektowany z myślą o czytelności i estetyce.",
              },
              {
                nr: "02",
                tytul: "Wpisz swoje dane",
                opis: "Imię, czas przejścia, data biegu, numer startowy. Preview aktualizuje się w czasie rzeczywistym.",
              },
              {
                nr: "03",
                tytul: "Zamów i odbierz",
                opis: "Zapłać online (BLIK, karta, P24). Drukujemy na papierze premium i wysyłamy w 2 tygodnie.",
              },
            ].map((krok) => (
              <div key={krok.nr} className="flex gap-6">
                <span
                  className="text-4xl font-black leading-none shrink-0"
                  style={{ color: "var(--color-amber)", fontFamily: "var(--font-inter)" }}
                >
                  {krok.nr}
                </span>
                <div>
                  <h3 className="font-bold mb-2 text-foreground">{krok.tytul}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{krok.opis}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nadchodzące eventy */}
      <section className="py-20 px-6 md:px-10 bg-secondary/40 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-12 font-medium">
            Nadchodzące eventy
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* OSHEE Nocny Bieg — 18 kwietnia */}
            <Link
              href="/oshee-nocny-2026"
              className="border-2 p-8 hover:shadow-lg transition-shadow group"
              style={{ borderColor: "var(--color-amber)" }}
            >
              <div className="flex items-start justify-between mb-4">
                <p
                  className="text-xs tracking-widest uppercase font-bold"
                  style={{ color: "var(--color-amber)" }}
                >
                  Pre-order · −25%
                </p>
                <span className="text-xs text-muted-foreground">18.04.2026</span>
              </div>
              <h3 className="text-xl font-black mb-1 group-hover:underline" style={{ fontFamily: "var(--font-inter)" }}>
                OSHEE Nocny Bieg dla WOŚP
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Nocna trasa przez centrum Krakowa · 10 km
              </p>
              <span className="text-sm font-bold">
                Od {formatPrice(PRICE_VARIANTS[0].price)} →
              </span>
            </Link>

            {/* Cracovia Maraton — 19 kwietnia */}
            <Link
              href="/krakow-2026"
              className="border border-border p-8 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-start justify-between mb-4">
                <p
                  className="text-xs tracking-widest uppercase font-bold text-muted-foreground"
                >
                  Pre-order · −25%
                </p>
                <span className="text-xs text-muted-foreground">19.04.2026</span>
              </div>
              <h3 className="text-xl font-black mb-1 group-hover:underline" style={{ fontFamily: "var(--font-inter)" }}>
                23. Maraton w Krakowie
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Rynek Główny, Wawel, Bulwary Wiślane · 42,195 km
              </p>
              <span className="text-sm font-bold">
                Od {formatPrice(PRICE_VARIANTS[0].price)} →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-dark px-6 md:px-10 py-10 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white/80 text-sm font-bold tracking-widest uppercase">
            Trasograf
          </span>
          <div className="flex items-center gap-6 text-xs text-white/40 tracking-wider">
            <span>kontakt@trasograf.pl</span>
            <span>·</span>
            <span>@trasograf</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
