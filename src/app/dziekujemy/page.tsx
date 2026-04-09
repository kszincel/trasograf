import Link from "next/link";
import { RouteShape } from "@/components/RouteShape";
import { KRAKOW_ROUTE } from "@/lib/krakow-route";

export default function DziekujemyPage() {
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
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <RouteShape
          size="md"
          className="text-foreground opacity-60 mb-10"
          strokeWidth={1.2}
        />
        <h1
          className="text-3xl md:text-4xl mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Dziekujemy za zamowienie.
        </h1>
        <p className="text-muted-foreground text-base max-w-md leading-relaxed mb-8">
          Potwierdzenie wyslalismy na Twoj email. Plakat bedzie gotowy w 5-7
          dni roboczych i dotrze prosto do Ciebie.
        </p>
        <p className="text-xs text-muted-foreground mb-12">
          {KRAKOW_ROUTE.event.name} · {KRAKOW_ROUTE.event.date}
        </p>
        <Link
          href="/"
          className="text-xs tracking-wider uppercase underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          Wróc na strone glowna
        </Link>
      </div>
    </main>
  );
}
