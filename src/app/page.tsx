import Link from "next/link";
import { Nav } from "@/components/Nav";
import { PRICE_VARIANTS, formatPrice } from "@/lib/stripe";

export const metadata = {
  title: "Trasograf — Spersonalizowane plakaty z tras sportowych",
  description:
    "Zamień swój maraton, szlak lub trasę rowerową w premium plakat. Wybierz styl, wpisz dane — i od razu zobacz jak będzie wyglądał. Drukowany i dostarczony w 2 tygodnie.",
};

const STYLE_PREVIEW_LINES = {
  czysty: [
    { x1: 15, y1: 50, x2: 35, y2: 30 },
    { x1: 35, y1: 30, x2: 55, y2: 45 },
    { x1: 55, y1: 45, x2: 70, y2: 25 },
    { x1: 70, y1: 25, x2: 85, y2: 50 },
  ],
  editorial: [
    { x1: 10, y1: 60, x2: 25, y2: 40 },
    { x1: 25, y1: 40, x2: 40, y2: 55 },
    { x1: 40, y1: 55, x2: 55, y2: 30 },
    { x1: 55, y1: 30, x2: 70, y2: 45 },
    { x1: 70, y1: 45, x2: 90, y2: 35 },
  ],
  topograficzny: [
    { x1: 10, y1: 65, x2: 30, y2: 45 },
    { x1: 30, y1: 45, x2: 50, y2: 55 },
    { x1: 50, y1: 55, x2: 65, y2: 35 },
    { x1: 65, y1: 35, x2: 80, y2: 50 },
    { x1: 80, y1: 50, x2: 90, y2: 40 },
  ],
};

function PosterMockup({ style, accent }: { style: "czysty" | "editorial" | "topograficzny"; accent?: boolean }) {
  const lines = STYLE_PREVIEW_LINES[style];
  const strokeColor = accent ? "#E8922A" : "#1A1A2E";
  return (
    <div
      className="poster-frame flex flex-col items-center justify-between p-4"
      style={{ aspectRatio: "2/3", width: "100%", maxWidth: 160 }}
    >
      <div className="w-full flex-1 flex items-center justify-center">
        <svg viewBox="0 0 100 80" className="w-full" style={{ maxHeight: 80 }}>
          {accent && (
            <>
              <circle cx="20" cy="60" r="3" fill={strokeColor} opacity="0.15" />
              <circle cx="80" cy="35" r="2" fill={strokeColor} opacity="0.1" />
            </>
          )}
          <polyline
            points={lines.map((l) => `${l.x1},${l.y1} ${l.x2},${l.y2}`).join(" ")}
            fill="none"
            stroke={strokeColor}
            strokeWidth={style === "topograficzny" ? "1.2" : "2"}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={style === "czysty" ? "1" : "0.85"}
          />
          {style === "topograficzny" && (
            <polyline
              points="12,72 32,52 52,62 67,42 82,57 92,47"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.35"
            />
          )}
          {style === "editorial" && (
            <circle cx="55" cy="30" r="3" fill={strokeColor} opacity="0.6" />
          )}
        </svg>
      </div>
      <div className="w-full mt-2 border-t pt-2" style={{ borderColor: `${strokeColor}22` }}>
        <p className="text-center font-black text-xs tracking-widest uppercase" style={{ color: strokeColor, fontFamily: "var(--font-inter)", fontSize: 9 }}>
          KRAKÓW
        </p>
        <p className="text-center text-xs tracking-wider mt-0.5" style={{ color: `${strokeColor}99`, fontSize: 8 }}>
          42,195 KM
        </p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const digital = PRICE_VARIANTS.find((v) => v.id === "digital")!;
  const printS = PRICE_VARIANTS.find((v) => v.id === "print_s")!;
  const printM = PRICE_VARIANTS.find((v) => v.id === "print_m")!;
  const printL = PRICE_VARIANTS.find((v) => v.id === "print_l")!;

  return (
    <main className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--color-coal)" }}>

      {/* NAV */}
      <div className="section-dark">
        <Nav dark />
      </div>

      {/* HERO */}
      <div className="section-dark-texture">
        <section className="px-6 md:px-10 pt-16 pb-20 md:pt-24 md:pb-28 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <div>
              <p
                className="text-xs tracking-[0.2em] uppercase font-bold mb-6"
                style={{ color: "var(--color-amber)" }}
              >
                Plakaty z tras sportowych
              </p>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight mb-6"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Twoja trasa.
                <br />
                <span style={{ color: "var(--color-amber)" }}>Na ścianie.</span>
              </h1>
              <p className="text-white/55 text-base md:text-lg leading-relaxed mb-10 max-w-sm">
                Spersonalizowane plakaty z tras sportowych. Wybierz styl, wpisz
                dane, zobacz preview. Drukowany i dostarczony w 2 tygodnie.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/krakow-2026"
                  className="inline-flex items-center justify-center px-7 py-4 text-xs font-black tracking-widest uppercase transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "var(--color-amber)", color: "var(--color-coal)", fontFamily: "var(--font-inter)" }}
                >
                  Cracovia Maraton 2026 →
                </Link>
                <Link
                  href="/konfigurator"
                  className="inline-flex items-center justify-center px-7 py-4 text-xs font-bold tracking-widest uppercase text-white/70 border border-white/15 hover:border-white/40 hover:text-white transition-colors"
                >
                  Konfigurator
                </Link>
              </div>
            </div>

            {/* Right: poster mockup */}
            <div className="hidden md:flex items-center justify-center gap-4">
              <div className="translate-y-6 opacity-60 scale-90 origin-bottom">
                <PosterMockup style="czysty" />
              </div>
              <div className="z-10 drop-shadow-2xl">
                <PosterMockup style="editorial" accent />
              </div>
              <div className="translate-y-6 opacity-60 scale-90 origin-bottom">
                <PosterMockup style="topograficzny" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* KOLEKCJA */}
      <section className="section-cream py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase font-bold mb-2" style={{ color: "var(--color-coal)", opacity: 0.4 }}>
            Kolekcja
          </p>
          <h2
            className="text-3xl md:text-4xl font-black mb-12 leading-tight"
            style={{ color: "var(--color-coal)", fontFamily: "var(--font-inter)" }}
          >
            Trasa która zostaje
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                slug: "czysty" as const,
                nazwa: "Czysty",
                opis: "Minimalistyczna linia trasy na białym tle. Czyste, ponadczasowe.",
              },
              {
                slug: "editorial" as const,
                nazwa: "Editorial",
                opis: "Linia trasy z typografią i danymi biegacza. Pełna opowieść.",
                featured: true,
              },
              {
                slug: "topograficzny" as const,
                nazwa: "Topograficzny",
                opis: "Trasa na tle warstwic terenu. Dla tych co lubią mapę.",
              },
            ].map((styl) => (
              <div
                key={styl.slug}
                className="group relative"
              >
                {styl.featured && (
                  <div
                    className="absolute -top-3 left-4 text-xs font-black tracking-widest uppercase px-3 py-1 z-10"
                    style={{ backgroundColor: "var(--color-amber)", color: "var(--color-coal)", fontFamily: "var(--font-inter)" }}
                  >
                    Popularny
                  </div>
                )}
                <div
                  className="border-2 p-6 flex flex-col items-center transition-all"
                  style={{
                    borderColor: styl.featured ? "var(--color-coal)" : "oklch(0.88 0.01 80)",
                    backgroundColor: "white",
                  }}
                >
                  <div className="mb-5 w-full flex justify-center">
                    <PosterMockup style={styl.slug} accent={styl.featured} />
                  </div>
                  <h3
                    className="text-lg font-black mb-2 text-center"
                    style={{ color: "var(--color-coal)", fontFamily: "var(--font-inter)" }}
                  >
                    {styl.nazwa}
                  </h3>
                  <p className="text-sm text-center leading-relaxed" style={{ color: "oklch(0.45 0.01 260)" }}>
                    {styl.opis}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JAK TO DZIALA */}
      <section className="section-dark py-20 px-6 md:px-10 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase font-bold mb-12" style={{ color: "var(--color-amber)" }}>
            Jak to dziala
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                nr: "1.",
                tytul: "Wybierz styl plakatu",
                opis: "Minimalistyczny, editorial lub kartograficzny. Każdy zaprojektowany z myślą o czytelności i estetyce.",
              },
              {
                nr: "2.",
                tytul: "Wpisz swoje dane",
                opis: "Imię, czas przejścia, data biegu, numer startowy. Preview aktualizuje się w czasie rzeczywistym.",
              },
              {
                nr: "3.",
                tytul: "Zamów i odbierz",
                opis: "Zapłać online (BLIK, karta, P24). Drukujemy na papierze premium i wysyłamy w 2 tygodnie.",
              },
            ].map((krok) => (
              <div key={krok.nr} className="flex gap-5">
                <span
                  className="text-3xl font-black leading-none shrink-0 w-10"
                  style={{ color: "var(--color-amber)", fontFamily: "var(--font-inter)" }}
                >
                  {krok.nr}
                </span>
                <div>
                  <h3 className="font-bold mb-2 text-white text-base">{krok.tytul}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{krok.opis}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NADCHODZACE EVENTY */}
      <section className="section-graphite py-20 px-6 md:px-10 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase font-bold mb-12" style={{ color: "var(--color-amber)" }}>
            Nadchodzace eventy
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link
              href="/oshee-nocny-2026"
              className="border-2 p-8 hover:brightness-110 transition-all group"
              style={{ borderColor: "var(--color-amber)", backgroundColor: "oklch(0.20 0.01 260)" }}
            >
              <div className="flex items-start justify-between mb-5">
                <span
                  className="text-xs tracking-widest uppercase font-black px-2 py-1"
                  style={{ backgroundColor: "var(--color-amber)", color: "var(--color-coal)", fontFamily: "var(--font-inter)" }}
                >
                  Pre-order · -25%
                </span>
                <span className="text-xs text-white/35 font-medium">18.04.2026</span>
              </div>
              <h3
                className="text-xl font-black mb-1 text-white group-hover:underline"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                OSHEE Nocny Bieg dla WOSP
              </h3>
              <p className="text-sm text-white/45 mb-5">
                Nocna trasa przez centrum Krakowa · 10 km
              </p>
              <span
                className="text-sm font-black"
                style={{ color: "var(--color-amber)" }}
              >
                Od {formatPrice(PRICE_VARIANTS[0].price)} →
              </span>
            </Link>

            <Link
              href="/krakow-2026"
              className="border border-white/15 p-8 hover:border-white/35 transition-all group"
              style={{ backgroundColor: "oklch(0.20 0.01 260)" }}
            >
              <div className="flex items-start justify-between mb-5">
                <span className="text-xs tracking-widest uppercase font-bold text-white/35">
                  Pre-order · -25%
                </span>
                <span className="text-xs text-white/35 font-medium">19.04.2026</span>
              </div>
              <h3
                className="text-xl font-black mb-1 text-white group-hover:underline"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                23. Maraton w Krakowie
              </h3>
              <p className="text-sm text-white/45 mb-5">
                Rynek Glowny, Wawel, Bulwary Wislane · 42,195 km
              </p>
              <span className="text-sm font-black text-white/70">
                Od {formatPrice(PRICE_VARIANTS[0].price)} →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* PREMIUM / CENY */}
      <section className="section-cream py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase font-bold mb-2" style={{ color: "var(--color-coal)", opacity: 0.4 }}>
            Cennik
          </p>
          <h2
            className="text-3xl md:text-4xl font-black mb-12 leading-tight"
            style={{ color: "var(--color-coal)", fontFamily: "var(--font-inter)" }}
          >
            Premium
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { variant: digital, highlight: false, label: "Cyfrowy" },
              { variant: printS, highlight: false, label: "Maly" },
              { variant: printM, highlight: true, label: "Sredni" },
              { variant: printL, highlight: false, label: "Duzy" },
            ].map(({ variant, highlight, label }) => (
              <div
                key={variant.id}
                className="border-2 p-6 flex flex-col relative"
                style={{
                  borderColor: highlight ? "var(--color-coal)" : "oklch(0.88 0.01 80)",
                  backgroundColor: highlight ? "var(--color-coal)" : "white",
                }}
              >
                {highlight && (
                  <div
                    className="absolute -top-3 left-4 text-xs font-black tracking-widest uppercase px-3 py-1"
                    style={{ backgroundColor: "var(--color-amber)", color: "var(--color-coal)" }}
                  >
                    Bestseller
                  </div>
                )}
                <p
                  className="text-xs tracking-widest uppercase font-bold mb-3"
                  style={{ color: highlight ? "var(--color-amber)" : "oklch(0.50 0.01 260)" }}
                >
                  {label}
                </p>
                <p
                  className="text-3xl font-black mb-1"
                  style={{ color: highlight ? "white" : "var(--color-coal)", fontFamily: "var(--font-inter)" }}
                >
                  {formatPrice(variant.price)}
                </p>
                {variant.size && (
                  <p
                    className="text-xs font-medium mb-4"
                    style={{ color: highlight ? "white/50" : "oklch(0.55 0.01 260)" }}
                  >
                    {variant.size}
                  </p>
                )}
                <p
                  className="text-xs leading-relaxed mt-auto pt-3 border-t"
                  style={{
                    color: highlight ? "rgba(255,255,255,0.5)" : "oklch(0.50 0.01 260)",
                    borderColor: highlight ? "rgba(255,255,255,0.12)" : "oklch(0.88 0.01 80)",
                  }}
                >
                  {variant.description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-center mt-6" style={{ color: "oklch(0.55 0.01 260)" }}>
            Ceny w czasie pre-order ze zlizka -25%. Wysylka kurierem w cenie.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="section-dark px-6 md:px-10 py-12 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10 pb-10 border-b border-white/10">
            <Link
              href="/"
              className="text-sm tracking-[0.25em] uppercase font-black text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Trasograf
            </Link>
            <div className="flex flex-wrap gap-6 text-xs tracking-widest uppercase text-white/40">
              <Link href="/krakow-2026" className="hover:text-white transition-colors">Eventy</Link>
              <Link href="/konfigurator" className="hover:text-white transition-colors">Konfigurator</Link>
              <span className="text-white/20 cursor-default">Blog</span>
              <span className="text-white/20 cursor-default">O nas</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              Trasograf · Krakow · {new Date().getFullYear()}
            </p>
            <div className="flex items-center gap-5 text-xs text-white/30">
              <span>kontakt@trasograf.pl</span>
              <span>·</span>
              <span>@trasograf</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
