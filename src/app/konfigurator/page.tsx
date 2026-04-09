"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { RouteShape } from "@/components/RouteShape";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { KRAKOW_ROUTE } from "@/lib/krakow-route";
import { PRICE_VARIANTS, formatPrice, type PriceVariant } from "@/lib/stripe";
import type { PosterTemplate } from "@/lib/stitch";

type Step = "szablon" | "dane" | "wariant";

interface FormData {
  template: PosterTemplate;
  name: string;
  time: string;
  date: string;
  startNumber: string;
}

const TEMPLATES: { id: PosterTemplate; label: string; opis: string }[] = [
  { id: "czysty", label: "Czysty", opis: "Minimalistyczny, Swiss design" },
  { id: "editorial", label: "Editorial", opis: "Kremowy, Kinfolk vibe" },
  { id: "topograficzny", label: "Topograficzny", opis: "Vintage kartograficzny" },
];

export default function KonfiguratorPage() {
  const [step, setStep] = useState<Step>("szablon");
  const [form, setForm] = useState<FormData>({
    template: "editorial",
    name: "",
    time: "",
    date: KRAKOW_ROUTE.event.date,
    startNumber: "",
  });
  const [selectedVariant, setSelectedVariant] = useState<PriceVariant>(PRICE_VARIANTS[1]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const isFormComplete =
    form.name.trim() !== "" &&
    form.time.trim() !== "" &&
    form.date.trim() !== "" &&
    form.startNumber.trim() !== "";

  const generatePreview = useCallback(async () => {
    if (!isFormComplete) return;
    setLoadingPreview(true);
    setPreviewError(false);
    try {
      const res = await fetch("/api/stitch/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, watermark: true }),
      });
      const data = await res.json();
      if (data.url) {
        setPreviewUrl(data.url);
      } else {
        setPreviewError(true);
      }
    } catch {
      setPreviewError(true);
    } finally {
      setLoadingPreview(false);
    }
  }, [form, isFormComplete]);

  const goToOrder = () => {
    const params = new URLSearchParams({
      template: form.template,
      name: form.name,
      time: form.time,
      date: form.date,
      startNumber: form.startNumber,
      priceId: selectedVariant.id,
    });
    window.location.href = `/zamowienie?${params.toString()}`;
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Nawigacja */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
        <Link
          href="/"
          className="text-lg tracking-widest uppercase font-light"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Trasograf
        </Link>
        <div className="flex items-center gap-6 text-xs tracking-wider uppercase text-muted-foreground">
          {(["szablon", "dane", "wariant"] as Step[]).map((s, i) => (
            <span
              key={s}
              className={step === s ? "text-foreground" : ""}
            >
              {i + 1}. {s}
            </span>
          ))}
        </div>
      </nav>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Lewa — podglad */}
        <aside className="w-full md:w-[420px] bg-secondary/30 border-r border-border flex flex-col items-center justify-center p-8 min-h-[400px]">
          <div className="w-full max-w-[280px] aspect-[5/7] border border-border bg-background relative flex items-center justify-center overflow-hidden">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Podglad plakatu"
                fill
                className="object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-4 px-6 text-center">
                {loadingPreview ? (
                  <>
                    <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
                    <p className="text-xs text-muted-foreground">Generuje podglad...</p>
                  </>
                ) : (
                  <>
                    <RouteShape
                      size="full"
                      className="max-w-[120px] max-h-[160px] text-foreground/60"
                      strokeWidth={1.2}
                    />
                    {isFormComplete ? (
                      <button
                        onClick={generatePreview}
                        className="text-xs tracking-wider uppercase underline underline-offset-4 hover:text-muted-foreground transition-colors"
                      >
                        Generuj podglad
                      </button>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Wypelnij dane, aby zobaczyc podglad
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
            {/* Watermark overlay — zawsze widoczny na podgladzie */}
            <div
              className="absolute inset-0 pointer-events-none select-none flex items-center justify-center"
              style={{ opacity: 0.07 }}
            >
              <span
                className="text-3xl font-bold rotate-[-35deg] tracking-widest"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                TRASOGRAF
              </span>
            </div>
          </div>

          {previewUrl && (
            <button
              onClick={generatePreview}
              disabled={loadingPreview}
              className="mt-4 text-xs tracking-wider uppercase text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors disabled:opacity-50"
            >
              Odswiez podglad
            </button>
          )}
          {previewError && (
            <p className="mt-3 text-xs text-destructive">
              Blad generowania — sprobuj ponownie
            </p>
          )}

          <div className="mt-6 text-center">
            <Badge variant="secondary" className="text-xs tracking-wider">
              {KRAKOW_ROUTE.event.name} · {KRAKOW_ROUTE.event.date}
            </Badge>
          </div>
        </aside>

        {/* Prawa — konfiguracja */}
        <div className="flex-1 px-6 md:px-12 py-10 max-w-xl">
          {/* Krok 1: Szablon */}
          <section className="mb-10">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6">
              1. Wybierz szablon
            </p>
            <div className="grid grid-cols-3 gap-3">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setForm((f) => ({ ...f, template: t.id }))}
                  className={`border p-4 text-left transition-colors ${
                    form.template === t.id
                      ? "border-foreground bg-secondary"
                      : "border-border hover:border-foreground/40"
                  }`}
                >
                  <p className="text-xs font-medium tracking-wider uppercase mb-1">
                    {t.label}
                  </p>
                  <p className="text-xs text-muted-foreground leading-snug">{t.opis}</p>
                </button>
              ))}
            </div>
          </section>

          <Separator className="mb-10" />

          {/* Krok 2: Dane */}
          <section className="mb-10">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6">
              2. Twoje dane
            </p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-xs tracking-wider uppercase">
                  Imie i nazwisko
                </Label>
                <Input
                  id="name"
                  placeholder="np. Anna Kowalska"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-1.5"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="time" className="text-xs tracking-wider uppercase">
                    Czas (GG:MM:SS)
                  </Label>
                  <Input
                    id="time"
                    placeholder="np. 4:12:33"
                    value={form.time}
                    onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="startNumber" className="text-xs tracking-wider uppercase">
                    Numer startowy
                  </Label>
                  <Input
                    id="startNumber"
                    placeholder="np. 4821"
                    value={form.startNumber}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, startNumber: e.target.value }))
                    }
                    className="mt-1.5"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="date" className="text-xs tracking-wider uppercase">
                  Data biegu
                </Label>
                <Input
                  id="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="mt-1.5"
                />
              </div>
            </div>

            {isFormComplete && !previewUrl && (
              <button
                onClick={generatePreview}
                disabled={loadingPreview}
                className="mt-4 text-xs tracking-wider uppercase underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                {loadingPreview ? "Generuje..." : "Podglad na zywo"}
              </button>
            )}
          </section>

          <Separator className="mb-10" />

          {/* Krok 3: Wariant */}
          <section className="mb-10">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6">
              3. Wybierz wariant
            </p>
            <div className="space-y-2">
              {PRICE_VARIANTS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`w-full border p-4 text-left flex items-center justify-between transition-colors ${
                    selectedVariant.id === v.id
                      ? "border-foreground bg-secondary"
                      : "border-border hover:border-foreground/40"
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium">{v.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{v.description}</p>
                  </div>
                  <p
                    className="text-lg ml-4 shrink-0"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {formatPrice(v.price)}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* CTA */}
          <button
            onClick={goToOrder}
            disabled={!isFormComplete}
            className="w-full bg-foreground text-background py-4 text-sm tracking-wider uppercase hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Przejdz do zamowienia — {formatPrice(selectedVariant.price)}
          </button>
          {!isFormComplete && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              Wypelnij wszystkie dane, aby kontynuowac
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
