import Link from "next/link";
import { Nav } from "@/components/Nav";
import { PRICE_VARIANTS, formatPrice } from "@/lib/stripe";
import { HeroPosterStack, PosterCollection } from "@/components/HomePosterShowcase";

export const metadata = {
  title: "Trasograf — Spersonalizowane plakaty z tras sportowych",
  description:
    "Zamień swój maraton, szlak lub trasę rowerową w premium plakat. Wybierz styl, wpisz dane — i od razu zobacz jak będzie wyglądał. Drukowany i dostarczony w 2 tygodnie.",
};

// ── Ikony sekcji "Jak to działa" ─────────────────────────────────────────────

function IconBiegacz() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="22" cy="7" r="3" fill="currentColor" opacity="0.9" />
      <path d="M20 11l-5 7 3 1-4 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 18l-4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M22 14l4-2 2 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconOlowek() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M8 26l2-6L24 6l4 4L14 24l-6 2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 10l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconPaczka() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="6" y="14" width="24" height="16" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 14l6-8h12l6 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 6l-2 8M22 6l2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6 20h24" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const digital = PRICE_VARIANTS.find((v) => v.id === "digital")!;
  const printS  = PRICE_VARIANTS.find((v) => v.id === "print_s")!;
  const printM  = PRICE_VARIANTS.find((v) => v.id === "print_m")!;
  const printL  = PRICE_VARIANTS.find((v) => v.id === "print_l")!;

  return (
    <main className="flex flex-col min-h-screen">

      {/* ── HERO ── */}
      <div
        style={{
          background: `
            linear-gradient(105deg, rgba(10,10,14,0.98) 38%, rgba(10,10,14,0.72) 100%),
            radial-gradient(ellipse at 88% 75%, rgba(160,85,10,0.30) 0%, transparent 52%),
            radial-gradient(ellipse at 65% 35%, rgba(80,45,5,0.18) 0%, transparent 42%),
            #0A0A0E
          `,
        }}
      >
        <Nav dark />

        <section className="px-6 md:px-12 pt-14 pb-20 md:pt-20 md:pb-28 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10 items-center">

            {/* Tekst */}
            <div className="flex-1 min-w-0">
              <p
                className="text-xs tracking-[0.22em] uppercase font-bold mb-5"
                style={{ color: "var(--color-amber)" }}
              >
                Plakaty z tras sportowych
              </p>
              <h1
                className="font-black text-white leading-none tracking-tight mb-6"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(2.8rem, 6vw, 5rem)",
                }}
              >
                Twoj nocny bieg.
                <br />
                <span style={{ color: "var(--color-amber)" }}>Na scianie.</span>
              </h1>
              <p className="text-white/50 text-base leading-relaxed mb-10 max-w-sm">
                Spersonalizowany plakat z trasy OSHEE Nocnego Biegu. Twoje imie,
                czas, data. Dostarczony w 2 tygodnie.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/oshee-nocny-2026"
                  className="inline-flex items-center justify-center px-8 py-4 text-xs font-black tracking-[0.15em] uppercase transition-opacity hover:opacity-85"
                  style={{
                    backgroundColor: "var(--color-amber)",
                    color: "#0A0A0E",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  Stworz swoj plakat →
                </Link>
                <Link
                  href="/krakow-2026"
                  className="inline-flex items-center justify-center px-8 py-4 text-xs font-semibold tracking-[0.12em] uppercase text-white/50 border border-white/12 hover:border-white/35 hover:text-white/80 transition-all"
                >
                  Cracovia Maraton
                </Link>
              </div>
            </div>

            {/* Poster mockup */}
            <div className="hidden md:flex flex-shrink-0 items-center justify-center w-[340px]">
              <HeroPosterStack />
            </div>

          </div>
        </section>
      </div>

      {/* ── KOLEKCJA ── */}
      <section
        className="py-20 px-6 md:px-12"
        style={{ backgroundColor: "var(--color-cream)", color: "var(--color-coal)" }}
      >
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-black mb-12"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            }}
          >
            Kolekcja: Trasa ktora zostaje
          </h2>
          <PosterCollection />
        </div>
      </section>

      {/* ── JAK TO DZIALA ── */}
      <section
        className="py-20 px-6 md:px-12 border-t border-white/8"
        style={{ backgroundColor: "#0A0A0E", color: "white" }}
      >
        <div className="max-w-5xl mx-auto">
          <p
            className="text-xs tracking-[0.22em] uppercase font-bold mb-12"
            style={{ color: "var(--color-amber)" }}
          >
            Jak to dziala
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
            {[
              {
                nr: "1.",
                icon: <IconBiegacz />,
                tytul: "Wybierz styl",
                opis: "Wybierz jeden z trzech stylow plakatu. Kazdy zaprojektowany z mysla o czytelnosci i estetyce.",
              },
              {
                nr: "2.",
                icon: <IconOlowek />,
                tytul: "Spersonalizuj",
                opis: "Wpisz imie, czas biegu i date. Preview aktualizuje sie w czasie rzeczywistym.",
              },
              {
                nr: "3.",
                icon: <IconPaczka />,
                tytul: "Otrzymaj",
                opis: "Oplacony plakat drukujemy na papierze premium i wyslamy kurierem w 2 tygodnie.",
              },
            ].map((krok) => (
              <div key={krok.nr} className="flex flex-col gap-4">
                <div style={{ color: "var(--color-amber)", opacity: 0.85 }}>
                  {krok.icon}
                </div>
                <div>
                  <p className="text-xs tracking-widest text-white/30 mb-1 font-medium">
                    {krok.nr}
                  </p>
                  <h3
                    className="text-base font-black mb-2 text-white"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {krok.tytul}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {krok.opis}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREMIUM / CENNIK ── */}
      <section
        className="py-20 px-6 md:px-12"
        style={{ backgroundColor: "var(--color-cream)", color: "var(--color-coal)" }}
      >
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-black mb-12"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            }}
          >
            Premium
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: digital, label: "CYFROWY",  highlight: false },
              { v: printS,  label: "MALY",     highlight: false },
              { v: printM,  label: "SREDNI",   highlight: true  },
              { v: printL,  label: "DUZY",     highlight: false },
            ].map(({ v, label, highlight }) => (
              <div
                key={v.id}
                className="relative flex flex-col p-6 border"
                style={{
                  backgroundColor: highlight ? "var(--color-coal)" : "white",
                  borderColor: highlight ? "var(--color-coal)" : "oklch(0.88 0.01 80)",
                }}
              >
                {highlight && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-black tracking-widest uppercase px-3 py-1 whitespace-nowrap"
                    style={{ backgroundColor: "var(--color-amber)", color: "#0A0A0E", fontFamily: "var(--font-inter)" }}
                  >
                    Bestseller
                  </span>
                )}
                <p
                  className="text-xs tracking-[0.18em] uppercase font-bold mb-4"
                  style={{ color: highlight ? "var(--color-amber)" : "oklch(0.50 0.01 260)" }}
                >
                  {label}
                </p>
                <p
                  className="font-black mb-1"
                  style={{
                    fontSize: "2rem",
                    color: highlight ? "white" : "var(--color-coal)",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {formatPrice(v.price)}
                </p>
                {v.size && (
                  <p
                    className="text-xs mb-3 font-medium"
                    style={{ color: highlight ? "rgba(255,255,255,0.45)" : "oklch(0.55 0.01 260)" }}
                  >
                    {v.size}
                  </p>
                )}
                <p
                  className="text-xs leading-relaxed mt-auto pt-4 border-t"
                  style={{
                    color: highlight ? "rgba(255,255,255,0.40)" : "oklch(0.55 0.01 260)",
                    borderColor: highlight ? "rgba(255,255,255,0.10)" : "oklch(0.88 0.01 80)",
                  }}
                >
                  {v.description}
                </p>
              </div>
            ))}
          </div>
          <p
            className="text-xs text-center mt-6"
            style={{ color: "oklch(0.55 0.01 260)" }}
          >
            Ceny w czasie pre-order ze zlizka -25%. Wysylka kurierem w cenie.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="px-6 md:px-12 pt-12 pb-8 mt-auto border-t"
        style={{ backgroundColor: "#0A0A0E", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Top row — partnerzy / linki */}
          <div
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10 mb-10 border-b"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="flex flex-wrap gap-6 text-xs tracking-[0.18em] uppercase text-white/20 font-bold">
              <span>Pro bono</span>
              <span>Partner</span>
              <span>Premium</span>
              <span>Partner +</span>
            </div>
            <div className="flex flex-wrap gap-5 text-xs tracking-[0.14em] uppercase">
              <Link href="/oshee-nocny-2026" className="text-white/40 hover:text-white transition-colors">Eventy</Link>
              <Link href="/konfigurator" className="text-white/40 hover:text-white transition-colors">Konfigurator</Link>
              <span className="text-white/15 cursor-default">Blog</span>
              <span className="text-white/15 cursor-default">O nas</span>
              <span className="text-white/15 cursor-default">Kontakt</span>
              <span className="text-white/15 cursor-default">RODO</span>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4 text-xs text-white/20">
              <span>Trasograf · Krakow · {new Date().getFullYear()}</span>
              <span>·</span>
              <span>kontakt@trasograf.pl</span>
            </div>
            <Link
              href="/"
              className="text-xs tracking-[0.28em] uppercase font-black text-white/70 hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Trasograf
            </Link>
          </div>
        </div>
      </footer>

    </main>
  );
}
