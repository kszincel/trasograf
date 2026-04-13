"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavProps {
  dark?: boolean;
}

export function Nav({ dark = false }: NavProps) {
  const pathname = usePathname();

  const linkClass = (href: string, disabled = false) => {
    const base = "text-xs tracking-widest uppercase transition-colors font-medium";
    const active = pathname === href;
    if (disabled)
      return `${base} text-white/25 cursor-default`;
    if (active)
      return `${base} text-white`;
    return `${base} text-white/55 hover:text-white`;
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/10">
      <Link
        href="/"
        className="text-sm tracking-[0.25em] uppercase font-black text-white"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Trasograf
      </Link>
      <div className="hidden md:flex items-center gap-7">
        <Link href="/" className={linkClass("/")}>
          Strona
        </Link>
        <Link href="/oshee-nocny-2026" className={linkClass("/oshee-nocny-2026")}>
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
      <Link
        href="/krakow-2026"
        className="text-xs tracking-widest uppercase font-bold px-5 py-2.5 transition-opacity hover:opacity-85"
        style={{ backgroundColor: "var(--color-amber)", color: "var(--color-coal)", fontFamily: "var(--font-inter)" }}
      >
        Zamów
      </Link>
    </nav>
  );
}
