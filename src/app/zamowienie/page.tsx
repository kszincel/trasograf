"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PRICE_VARIANTS, formatPrice } from "@/lib/stripe";

function ZamowienieForm() {
  const params = useSearchParams();

  const template = params.get("template") ?? "editorial";
  const name = params.get("name") ?? "";
  const time = params.get("time") ?? "";
  const date = params.get("date") ?? "";
  const startNumber = params.get("startNumber") ?? "";
  const priceId = params.get("priceId") ?? "print_s";

  const variant = PRICE_VARIANTS.find((v) => v.id === priceId) ?? PRICE_VARIANTS[1];
  const needsAddress = variant.type === "print";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const isValid =
    form.firstName && form.lastName && form.email &&
    (!needsAddress || (form.address && form.city && form.postalCode));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          template,
          name,
          time,
          date,
          startNumber,
          ...form,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Nie mozna bylo otworzyc platnosci. Sprobuj ponownie.");
      }
    } catch {
      setError("Blad polaczenia. Sprobuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
        <Link
          href="/"
          className="text-lg tracking-widest uppercase font-light"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Trasograf
        </Link>
        <Link
          href="/konfigurator"
          className="text-xs tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          Wróc do konfiguratora
        </Link>
      </nav>

      <div className="flex flex-1 flex-col md:flex-row max-w-4xl mx-auto w-full px-6 py-12 gap-12">
        {/* Formularz */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-8">
          <div>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6">
              Dane kontaktowe
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs tracking-wider uppercase">Imie</Label>
                <Input
                  placeholder="Jan"
                  value={form.firstName}
                  onChange={set("firstName")}
                  required
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label className="text-xs tracking-wider uppercase">Nazwisko</Label>
                <Input
                  placeholder="Kowalski"
                  value={form.lastName}
                  onChange={set("lastName")}
                  required
                  className="mt-1.5"
                />
              </div>
            </div>
            <div className="mt-3">
              <Label className="text-xs tracking-wider uppercase">Email</Label>
              <Input
                type="email"
                placeholder="jan@example.com"
                value={form.email}
                onChange={set("email")}
                required
                className="mt-1.5"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Wyslemy tu potwierdzenie zamowienia
              </p>
            </div>
          </div>

          {needsAddress && (
            <>
              <Separator />
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6">
                  Adres dostawy
                </p>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs tracking-wider uppercase">Ulica i numer</Label>
                    <Input
                      placeholder="ul. Krakowska 12/3"
                      value={form.address}
                      onChange={set("address")}
                      required={needsAddress}
                      className="mt-1.5"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs tracking-wider uppercase">Kod pocztowy</Label>
                      <Input
                        placeholder="30-001"
                        value={form.postalCode}
                        onChange={set("postalCode")}
                        required={needsAddress}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label className="text-xs tracking-wider uppercase">Miasto</Label>
                      <Input
                        placeholder="Krakow"
                        value={form.city}
                        onChange={set("city")}
                        required={needsAddress}
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-full bg-foreground text-background py-4 text-sm tracking-wider uppercase hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? "Przekierowuje do platnosci..." : `Zaplacisz ${formatPrice(variant.price)}`}
          </button>
          <p className="text-xs text-muted-foreground text-center">
            Platnosc przez Stripe — BLIK, karta, Przelewy24
          </p>
        </form>

        {/* Podsumowanie */}
        <aside className="w-full md:w-72 shrink-0">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6">
            Podsumowanie
          </p>
          <div className="border border-border p-6 space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">Szablon</p>
              <p className="text-sm capitalize">{template}</p>
            </div>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground">Biegacz</p>
              <p className="text-sm">{name || "—"}</p>
              <p className="text-sm text-muted-foreground">{time} · nr {startNumber}</p>
              <p className="text-sm text-muted-foreground">{date}</p>
            </div>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground">Wariant</p>
              <p className="text-sm">{variant.name}</p>
              {variant.size && (
                <p className="text-xs text-muted-foreground">{variant.size}</p>
              )}
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <p className="text-sm">Razem</p>
              <p className="text-lg" style={{ fontFamily: "var(--font-playfair)" }}>
                {formatPrice(variant.price)}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default function ZamowieniePage() {
  return (
    <Suspense>
      <ZamowienieForm />
    </Suspense>
  );
}
