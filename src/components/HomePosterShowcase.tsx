"use client";

import { PosterSVG } from "./poster/PosterSVG";

const DEMO_EDITORIAL = {
  template: "editorial" as const,
  imie: "KUKULNIK",
  czas: "1:02:47",
  data: "18.04.2026",
  watermark: false,
};

const DEMO_CZYSTY = {
  template: "czysty" as const,
  imie: "ANNA NOWAK",
  czas: "1:05:12",
  data: "18.04.2026",
  watermark: false,
};

const DEMO_TOPO = {
  template: "topograficzny" as const,
  imie: "MAREK WIS",
  czas: "58:34",
  data: "18.04.2026",
  watermark: false,
};

export function HeroPosterStack() {
  return (
    <div className="relative flex items-center justify-center" style={{ minHeight: 320, minWidth: 280 }}>
      {/* Czysty — za, lewo */}
      <div
        className="absolute bg-white overflow-hidden"
        style={{
          width: 150,
          height: 210,
          left: 0,
          top: 30,
          transform: "rotate(-4deg)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
          opacity: 0.65,
        }}
      >
        <PosterSVG data={DEMO_CZYSTY} />
      </div>

      {/* Editorial — główny, środek */}
      <div
        className="relative bg-white overflow-hidden z-10"
        style={{
          width: 190,
          height: 266,
          transform: "rotate(1deg)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 10px 40px rgba(0,0,0,0.4)",
          marginLeft: 60,
        }}
      >
        <PosterSVG data={DEMO_EDITORIAL} />
      </div>
    </div>
  );
}

export function PosterCollection() {
  const items = [
    {
      data: DEMO_CZYSTY,
      name: "Czysty",
      desc: "Minimalistyczna linia trasy na bialym tle. Czyste, ponadczasowe.",
    },
    {
      data: DEMO_EDITORIAL,
      name: "Editorial",
      desc: "Linia trasy z typografia i danymi biegacza. Pelna opowiesc.",
      featured: true,
    },
    {
      data: DEMO_TOPO,
      name: "Topograficzny",
      desc: "Trasa na tle warstwic terenu. Dla tych co lubia mape.",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 md:gap-10">
      {items.map((item) => (
        <div key={item.name} className="flex flex-col items-center">
          <div
            className="w-full overflow-hidden mb-4"
            style={{
              aspectRatio: "5/7",
              boxShadow: item.featured
                ? "0 16px 48px rgba(0,0,0,0.18)"
                : "0 6px 24px rgba(0,0,0,0.1)",
            }}
          >
            <PosterSVG data={item.data} />
          </div>
          <p
            className="text-sm font-black tracking-wide text-center"
            style={{ color: "var(--color-coal)", fontFamily: "var(--font-inter)" }}
          >
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
}
