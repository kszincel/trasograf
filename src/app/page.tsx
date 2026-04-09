import Link from "next/link";
import { RouteShape } from "@/components/RouteShape";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { KRAKOW_ROUTE } from "@/lib/krakow-route";
import { PRICE_VARIANTS, formatPrice } from "@/lib/stripe";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Nawigacja */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
        <span
          className="text-lg tracking-widest uppercase font-light"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Trasograf
        </span>
        <Link
          href="/konfigurator"
          className="text-xs tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          Zamow plakat
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex-1 grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
        {/* Lewa — trasa */}
        <div className="flex items-center justify-center bg-secondary/40 p-12 md:p-20">
          <RouteShape
            size="full"
            className="max-w-[260px] max-h-[380px] text-foreground opacity-90"
            strokeWidth={1.5}
          />
        </div>

        {/* Prawa — copy */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-16">
          <Badge variant="secondary" className="w-fit mb-6 text-xs tracking-wider uppercase">
            {KRAKOW_ROUTE.event.name}
          </Badge>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Twoj maraton.
            <br />
            <span className="text-muted-foreground">Na scianie.</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-md">
            Premium plakat z Twoja trasa GPS. Wybierz styl, wpisz swoje dane —
            imie, czas, numer startowy. Druk na papierze archiwalnym i dostawa
            do domu.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/konfigurator"
              className="inline-flex items-center justify-center bg-foreground text-background px-8 py-3 text-sm tracking-wider uppercase hover:opacity-80 transition-opacity"
            >
              Skonfiguruj plakat
            </Link>
            <Link
              href="#jak-to-dziala"
              className="inline-flex items-center justify-center border border-border px-8 py-3 text-sm tracking-wider uppercase hover:bg-secondary transition-colors"
            >
              Jak to dziala
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            Od {formatPrice(PRICE_VARIANTS[0].price)} — wysylka w 5-7 dni
          </p>
        </div>
      </section>

      {/* Jak to dziala */}
      <section id="jak-to-dziala" className="py-20 px-6 md:px-16 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-12">
            Jak to dziala
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                nr: "01",
                tytul: "Wybierz styl",
                opis: "Trzy szablony: minimalistyczny, kremowy editorial i topograficzny. Kazdy zaprojektowany z mysla o czytelnosci i estetyce.",
              },
              {
                nr: "02",
                tytul: "Wpisz swoje dane",
                opis: "Imie, czas przejscia, data biegu, numer startowy. Podglad aktualizuje sie na zywo — widzisz dokladnie to, co zamawias.",
              },
              {
                nr: "03",
                tytul: "Odbierz plakat",
                opis: "Zaplacisz online (BLIK, karta, Przelewy24), my drukujemy na papierze archiwalnym i wysylamy kurierem.",
              },
            ].map((krok) => (
              <div key={krok.nr}>
                <span
                  className="text-4xl font-light text-muted-foreground/30"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {krok.nr}
                </span>
                <h3
                  className="text-lg mt-3 mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {krok.tytul}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{krok.opis}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Szablony */}
      <section className="py-20 px-6 md:px-16 bg-secondary/30 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-12">
            Trzy style
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: "czysty",
                label: "Czysty",
                opis: "Swiss design. Biala przestrzen, jedna trasa, jeden napis. Minimalizm w najczystszej formie.",
                popularne: false,
              },
              {
                id: "editorial",
                label: "Editorial",
                opis: "Kremowy, ciepły, jak strona Kinfolk. Szeryfowy naglowek, asymetryczny uklad, analogowa faktura.",
                popularne: true,
              },
              {
                id: "topograficzny",
                label: "Topograficzny",
                opis: "Stara kartografia. Warstwice, siatka ulic, trasa jako pogrubiona linia na mapie parchmentowej.",
                popularne: false,
              },
            ].map((szablon) => (
              <div key={szablon.id} className="relative">
                {szablon.popularne && (
                  <Badge className="absolute -top-3 left-0 text-xs tracking-wider uppercase">
                    Najpopularniejszy
                  </Badge>
                )}
                <div className="aspect-[5/7] bg-background border border-border flex items-center justify-center mb-4 overflow-hidden">
                  <RouteShape
                    size="full"
                    className="max-w-[100px] max-h-[140px] text-foreground"
                    strokeWidth={1.2}
                  />
                </div>
                <h3 className="text-sm tracking-wider uppercase mb-1">{szablon.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{szablon.opis}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/konfigurator"
              className="inline-flex items-center justify-center bg-foreground text-background px-10 py-3 text-sm tracking-wider uppercase hover:opacity-80 transition-opacity"
            >
              Skonfiguruj swoj plakat
            </Link>
          </div>
        </div>
      </section>

      {/* Cennik */}
      <section className="py-20 px-6 md:px-16 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-12">
            Cennik
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {PRICE_VARIANTS.map((v) => (
              <div key={v.id} className="border border-border p-6">
                <p
                  className="text-2xl mb-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {formatPrice(v.price)}
                </p>
                <p className="text-sm font-medium mb-2">{v.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 md:px-16 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs tracking-widest uppercase text-muted-foreground">
            Trasograf
          </span>
          <Separator orientation="vertical" className="hidden sm:block h-4" />
          <span className="text-xs text-muted-foreground">
            {KRAKOW_ROUTE.event.name} · {KRAKOW_ROUTE.event.date} · {KRAKOW_ROUTE.event.city}
          </span>
        </div>
      </footer>
    </main>
  );
}
