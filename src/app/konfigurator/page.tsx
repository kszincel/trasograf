"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { PosterMap } from "@/components/poster/PosterMap";
import { type PosterTemplate, type PosterData } from "@/components/poster/PosterSVG";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { PRICE_VARIANTS, formatPrice, type PriceVariant } from "@/lib/stripe";
import { CRACOVIA_ROUTE_COORDS } from "@/data/events/krakow-2026-route";
import { OSHEE_ROUTE_COORDS } from "@/data/events/krakow-oshee-2026-route";

const TEMPLATES: { id: PosterTemplate; label: string; opis: string }[] = [
  { id: "czysty", label: "Czysty", opis: "Minimalistyczny, Swiss design" },
  { id: "editorial", label: "Editorial", opis: "Kremowy, magazynowy" },
  { id: "topograficzny", label: "Topograficzny", opis: "Vintage kartografia" },
];

const EVENT_DEFAULTS: Record<string, { date: string; label: string; dystans: string; routeCoords: [number, number][] }> = {
  oshee: {
    date: "18.04.2026",
    label: "OSHEE Nocny Bieg dla WOŚP",
    dystans: "10",
    routeCoords: OSHEE_ROUTE_COORDS,
  },
  cracovia: {
    date: "19.04.2026",
    label: "23. Maraton w Krakowie",
    dystans: "42",
    routeCoords: CRACOVIA_ROUTE_COORDS,
  },
};

export default function KonfiguratorPage() {
  const [template, setTemplate] = useState<PosterTemplate>("editorial");
  const [eventKey, setEventKey] = useState<string>("cracovia");
  const [form, setForm] = useState({
    imie: "",
    czas: "",
    data: "19.04.2026",
    bib_number: "",
    dedication: "",
  });
  const [variant, setVariant] = useState<PriceVariant>(PRICE_VARIANTS[1]);
  const [loading, setLoading] = useState(false);

  // Czytaj event z URL po załadowaniu
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ev = params.get("event") ?? "cracovia";
    const dataParam = params.get("data");
    const key = EVENT_DEFAULTS[ev] ? ev : "cracovia";
    setEventKey(key);
    setForm((f) => ({
      ...f,
      data: dataParam || EVENT_DEFAULTS[key].date,
    }));
  }, []);

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const posterData: PosterData = {
    template,
    imie: form.imie || "Twoje imię",
    czas: form.czas || "0:00:00",
    data: form.data,
    bib_number: form.bib_number || undefined,
    dedication: form.dedication || undefined,
    watermark: true,
  };

  const isComplete = form.imie.trim() !== "" && form.czas.trim() !== "";

  const goToOrder = () => {
    if (!isComplete) return;
    const params = new URLSearchParams({
      template,
      imie: form.imie,
      czas: form.czas,
      data: form.data,
      bib_number: form.bib_number,
      dedication: form.dedication,
      priceId: variant.id,
    });
    window.location.href = `/zamowienie?${params.toString()}`;
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Nav />

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Lewy panel — podgląd SVG */}
        <aside className="w-full lg:w-[420px] bg-secondary/30 border-r border-border flex flex-col items-center justify-start py-10 px-6 shrink-0">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6 font-medium">
            Podgląd plakatu
          </p>

          {/* Map Preview */}
          <div
            className="w-full max-w-[280px] border border-border shadow-lg bg-white"
            style={{ aspectRatio: "5/7", position: "relative" }}
          >
            <PosterMap
              data={posterData}
              routeCoords={EVENT_DEFAULTS[eventKey].routeCoords}
            />
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4 max-w-[220px]">
            Podgląd z watermarkiem. Wersja do druku bez watermarku — po
            płatności.
          </p>

          <div className="mt-6 text-center">
            <p className="text-xs font-mono text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
              {EVENT_DEFAULTS[eventKey].label} · {EVENT_DEFAULTS[eventKey].date}
            </p>
          </div>
        </aside>

        {/* Prawy panel — konfiguracja */}
        <div className="flex-1 px-6 md:px-12 py-10 max-w-2xl">
          {/* Szablon */}
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-medium">
              1. Wybierz styl
            </p>
            <div className="grid grid-cols-3 gap-3">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`border-2 p-4 text-left transition-all ${
                    template === t.id
                      ? "border-foreground bg-secondary"
                      : "border-border hover:border-foreground/40"
                  }`}
                >
                  <p className="text-xs font-bold tracking-wider uppercase mb-1">
                    {t.label}
                  </p>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {t.opis}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <Separator className="mb-8" />

          {/* Dane */}
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-medium">
              2. Twoje dane
            </p>
            <div className="space-y-4">
              <div>
                <Label className="text-xs tracking-wider uppercase font-medium">
                  Imię i nazwisko *
                </Label>
                <Input
                  placeholder="np. Anna Kowalska"
                  value={form.imie}
                  onChange={set("imie")}
                  className="mt-1.5"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs tracking-wider uppercase font-medium">
                    Czas (GG:MM:SS) *
                  </Label>
                  <Input
                    placeholder="np. 4:12:33"
                    value={form.czas}
                    onChange={set("czas")}
                    className="mt-1.5 font-mono"
                    style={{ fontFamily: "var(--font-mono)" }}
                  />
                </div>
                <div>
                  <Label className="text-xs tracking-wider uppercase font-medium">
                    Numer startowy
                  </Label>
                  <Input
                    placeholder="np. 4821"
                    value={form.bib_number}
                    onChange={set("bib_number")}
                    className="mt-1.5"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs tracking-wider uppercase font-medium">
                  Data biegu
                </Label>
                <Input
                  value={form.data}
                  onChange={set("data")}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label className="text-xs tracking-wider uppercase font-medium">
                  Dedykacja (opcjonalna)
                </Label>
                <Textarea
                  placeholder="np. Dla Taty — pierwszych 42 km!"
                  value={form.dedication}
                  onChange={set("dedication")}
                  className="mt-1.5 resize-none"
                  rows={2}
                />
              </div>
            </div>
          </div>

          <Separator className="mb-8" />

          {/* Wariant */}
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-medium">
              3. Wybierz wariant
            </p>
            <div className="space-y-2">
              {PRICE_VARIANTS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVariant(v)}
                  className={`w-full border-2 p-4 text-left flex items-center justify-between transition-all ${
                    variant.id === v.id
                      ? "border-foreground bg-secondary"
                      : "border-border hover:border-foreground/40"
                  }`}
                >
                  <div>
                    <p className="text-sm font-bold">{v.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {v.description}
                    </p>
                  </div>
                  <p
                    className="text-lg font-black ml-4 shrink-0"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {formatPrice(v.price)}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={goToOrder}
            disabled={!isComplete || loading}
            className="w-full py-4 text-sm font-bold tracking-wider uppercase transition-opacity disabled:opacity-30 disabled:cursor-not-allowed text-[#1A1A2E] hover:opacity-90"
            style={{ backgroundColor: "var(--color-amber)" }}
          >
            Zamów — {formatPrice(variant.price)} →
          </button>
          {!isComplete && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              Wpisz imię i czas aby kontynuować
            </p>
          )}
          <p className="text-xs text-muted-foreground text-center mt-3">
            Płatność przez Stripe — BLIK, karta, Przelewy24
          </p>
        </div>
      </div>
    </main>
  );
}
