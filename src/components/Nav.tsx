"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavProps {
  dark?: boolean;
}

export function Nav({ dark = false }: NavProps) {
  const pathname = usePathname();

  const linkClass = (href: string, disabled = false) => {
    const base = "text-xs tracking-widest uppercase transition-colors";
    const active = pathname === href;
    if (disabled)
      return `${base} ${dark ? "text-white/30" : "text-foreground/30"} cursor-default`;
    if (active)
      return `${base} ${dark ? "text-white" : "text-foreground"} font-medium`;
    return `${base} ${dark ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground"}`;
  };

  return (
    <nav
      className={`flex items-center justify-between px-6 md:px-10 py-5 ${
        dark ? "border-b border-white/10" : "border-b border-border"
      }`}
    >
      <Link
        href="/"
        className={`text-base tracking-[0.2em] uppercase font-bold ${
          dark ? "text-white" : "text-foreground"
        }`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Trasograf
      </Link>
      <div className="flex items-center gap-6 md:gap-8">
        <Link href="/krakow-2026" className={linkClass("/krakow-2026")}>
          Eventy
        </Link>
        <Link href="/konfigurator" className={linkClass("/konfigurator")}>
          Konfigurator
        </Link>
        <span className={linkClass("", true)} title="Wkrótce">
          Blog
        </span>
        <span className={linkClass("", true)} title="Wkrótce">
          O nas
        </span>
      </div>
    </nav>
  );
}
