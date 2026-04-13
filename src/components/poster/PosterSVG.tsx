"use client";

import eventData from "@/data/events/krakow-2026.json";

export type PosterTemplate = "czysty" | "editorial" | "topograficzny";

export interface PosterData {
  template: PosterTemplate;
  imie: string;
  czas: string;
  data: string;
  bib_number?: string;
  dedication?: string;
  watermark?: boolean;
}

const ROUTE_PATH = eventData.route.path;
const ROUTE_VIEWBOX = eventData.route.viewBox;

// ── Watermark pattern ───────────────────────────────────────────────────────

function WatermarkPattern() {
  return (
    <defs>
      <pattern
        id="watermark"
        x="0"
        y="0"
        width="220"
        height="220"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(-30)"
      >
        <text
          x="0"
          y="110"
          fontFamily="Inter, sans-serif"
          fontSize="22"
          fill="rgba(0,0,0,0.08)"
          fontWeight="700"
          letterSpacing="4"
        >
          TRASOGRAF
        </text>
      </pattern>
    </defs>
  );
}

// ── Szablon A — CZYSTY ──────────────────────────────────────────────────────

function PosterCzysty({ data }: { data: PosterData }) {
  const line1 = data.imie.toUpperCase();
  const line2 = [
    "23. MARATON W KRAKOWIE",
    data.data,
    "42,195 KM",
    data.czas,
    data.bib_number ? `NR ${data.bib_number}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <svg
      viewBox="0 0 500 700"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      {data.watermark && <WatermarkPattern />}

      {/* Tło */}
      <rect width="500" height="700" fill="#FAFAF8" />

      {/* Trasa — przeskalowana i wycentrowana */}
      <g transform="translate(50, 60) scale(1.0)">
        <svg viewBox={ROUTE_VIEWBOX} width="400" height="420" overflow="visible">
          <path
            d={ROUTE_PATH}
            fill="none"
            stroke="#1A1A2E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Start/meta dot */}
          <circle cx="185" cy="52" r="5" fill="#E85D04" />
        </svg>
      </g>

      {/* Linia pozioma */}
      <line x1="50" y1="524" x2="450" y2="524" stroke="#1A1A2E" strokeWidth="0.5" />

      {/* Personalizacja */}
      <text
        x="250"
        y="548"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="10"
        fontWeight="700"
        fill="#1A1A2E"
        letterSpacing="2"
      >
        {line1}
      </text>
      <text
        x="250"
        y="566"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="7"
        fontWeight="300"
        fill="#1A1A2E"
        letterSpacing="1.5"
      >
        {line2}
      </text>

      {/* Dedication */}
      {data.dedication && (
        <text
          x="250"
          y="584"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize="7"
          fontWeight="300"
          fill="#888"
          fontStyle="italic"
        >
          {data.dedication}
        </text>
      )}

      {/* Watermark overlay */}
      {data.watermark && (
        <rect width="500" height="700" fill="url(#watermark)" />
      )}
    </svg>
  );
}

// ── Szablon B — EDITORIAL ───────────────────────────────────────────────────

function PosterEditorial({ data }: { data: PosterData }) {
  return (
    <svg
      viewBox="0 0 500 700"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      {data.watermark && <WatermarkPattern />}

      {/* Tło kremowe */}
      <rect width="500" height="700" fill="#F5F0E8" />

      {/* Miasto — headline serif */}
      <text
        x="250"
        y="76"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="52"
        fontWeight="700"
        fill="#1A1A2E"
        letterSpacing="-1"
      >
        KRAKÓW
      </text>

      {/* Podtytuł */}
      <text
        x="250"
        y="96"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="8"
        fontWeight="400"
        fill="#888"
        letterSpacing="3"
      >
        23. MARATON · {data.data}
      </text>

      {/* Linia */}
      <line x1="50" y1="108" x2="450" y2="108" stroke="#C9B99A" strokeWidth="0.5" />

      {/* Data pionowo — lewy margines */}
      <text
        x="22"
        y="420"
        fontFamily="Inter, sans-serif"
        fontSize="7"
        fontWeight="400"
        fill="#AAA"
        letterSpacing="2"
        transform="rotate(-90, 22, 420)"
      >
        {data.data}
      </text>

      {/* Trasa */}
      <g transform="translate(55, 115) scale(0.97)">
        <svg viewBox={ROUTE_VIEWBOX} width="390" height="390" overflow="visible">
          <path
            d={ROUTE_PATH}
            fill="none"
            stroke="#2D2D44"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="185" cy="52" r="4" fill="#C0392B" />
        </svg>
      </g>

      {/* Imię — editorial accent */}
      <text
        x="55"
        y="536"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="18"
        fontWeight="400"
        fill="#1A1A2E"
        fontStyle="italic"
      >
        {data.imie}
      </text>

      {/* Czas — monospace, duży */}
      <text
        x="445"
        y="536"
        textAnchor="end"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="22"
        fontWeight="500"
        fill="#1A1A2E"
      >
        {data.czas}
      </text>

      {/* Linia */}
      <line x1="50" y1="548" x2="450" y2="548" stroke="#C9B99A" strokeWidth="0.5" />

      {/* Meta — dystans i numer */}
      <text
        x="55"
        y="566"
        fontFamily="Inter, sans-serif"
        fontSize="7.5"
        fontWeight="300"
        fill="#888"
        letterSpacing="1.5"
      >
        42,195 KM
        {data.bib_number ? ` · NR ${data.bib_number}` : ""}
      </text>

      {/* Dedication */}
      {data.dedication && (
        <text
          x="55"
          y="582"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="8"
          fontWeight="400"
          fill="#B0906A"
          fontStyle="italic"
        >
          {data.dedication}
        </text>
      )}

      {/* TRASOGRAF — stopka */}
      <text
        x="445"
        y="680"
        textAnchor="end"
        fontFamily="Inter, sans-serif"
        fontSize="6"
        fontWeight="700"
        fill="#C9B99A"
        letterSpacing="3"
      >
        TRASOGRAF
      </text>

      {data.watermark && (
        <rect width="500" height="700" fill="url(#watermark)" />
      )}
    </svg>
  );
}

// ── Szablon C — TOPOGRAFICZNY ───────────────────────────────────────────────

function PosterTopograficzny({ data }: { data: PosterData }) {
  return (
    <svg
      viewBox="0 0 500 700"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      {data.watermark && <WatermarkPattern />}

      {/* Tło pergaminowe */}
      <rect width="500" height="700" fill="#EDE0C4" />

      {/* Warstwice — dekoracyjne okręgi */}
      {[120, 160, 200, 240, 280].map((r, i) => (
        <ellipse
          key={i}
          cx="250"
          cy="310"
          rx={r + 20}
          ry={r}
          fill="none"
          stroke="#C4A97D"
          strokeWidth="0.4"
          opacity="0.5"
        />
      ))}

      {/* Siatka ulic — subtelna */}
      {[100, 160, 220, 280, 340, 400].map((x) => (
        <line key={`v${x}`} x1={x} y1="30" x2={x} y2="580" stroke="#C4A97D" strokeWidth="0.3" opacity="0.3" />
      ))}
      {[80, 140, 200, 260, 320, 380, 440, 500, 560].map((y) => (
        <line key={`h${y}`} x1="20" y1={y} x2="480" y2={y} stroke="#C4A97D" strokeWidth="0.3" opacity="0.3" />
      ))}

      {/* Wisła — dekoracyjna krzywa */}
      <path
        d="M 20 380 Q 150 350 250 360 Q 350 370 480 340"
        fill="none"
        stroke="#6B9BB8"
        strokeWidth="4"
        opacity="0.3"
        strokeLinecap="round"
      />

      {/* Trasa maratonu — główna, bold, czerwona */}
      <g transform="translate(50, 50) scale(1.0)">
        <svg viewBox={ROUTE_VIEWBOX} width="400" height="470" overflow="visible">
          <path
            d={ROUTE_PATH}
            fill="none"
            stroke="#8B0000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="185" cy="52" r="5" fill="#8B0000" />
          <circle cx="185" cy="52" r="8" fill="none" stroke="#8B0000" strokeWidth="1" />
        </svg>
      </g>

      {/* Legenda kartograficzna */}
      <rect x="295" y="570" width="180" height="105" fill="#F5EDD8" stroke="#8B6914" strokeWidth="1" />
      <text
        x="305"
        y="586"
        fontFamily="'EB Garamond', 'Playfair Display', Georgia, serif"
        fontSize="7"
        fontWeight="700"
        fill="#5C3D11"
        letterSpacing="2"
      >
        LEGENDA
      </text>
      <line x1="305" y1="590" x2="465" y2="590" stroke="#8B6914" strokeWidth="0.5" />
      <text x="305" y="604" fontFamily="Inter, sans-serif" fontSize="7" fill="#3D2B1F">
        {data.imie.toUpperCase()}
      </text>
      <text x="305" y="617" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fill="#3D2B1F" fontWeight="500">
        {data.czas}
      </text>
      <text x="305" y="630" fontFamily="Inter, sans-serif" fontSize="6.5" fill="#6B4C2A">
        {data.data} · 42,195 KM
      </text>
      {data.bib_number && (
        <text x="305" y="643" fontFamily="Inter, sans-serif" fontSize="6.5" fill="#6B4C2A">
          NR STARTOWY: {data.bib_number}
        </text>
      )}
      {data.dedication && (
        <text x="305" y="656" fontFamily="'Playfair Display', Georgia, serif" fontSize="6" fill="#8B6914" fontStyle="italic">
          {data.dedication}
        </text>
      )}
      <text x="305" y="668" fontFamily="Inter, sans-serif" fontSize="5.5" fill="#8B6914" letterSpacing="1.5">
        TRASOGRAF · KRAKÓW · 2026
      </text>

      {/* Etykiety dzielnic */}
      {[
        { x: 80, y: 120, label: "KROWODRZA" },
        { x: 310, y: 160, label: "ŚRÓDMIEŚCIE" },
        { x: 80, y: 420, label: "DĘBNIKI" },
        { x: 300, y: 450, label: "PODGÓRZE" },
      ].map(({ x, y, label }) => (
        <text
          key={label}
          x={x}
          y={y}
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="6"
          fill="#8B6914"
          opacity="0.5"
          letterSpacing="1"
        >
          {label}
        </text>
      ))}

      {data.watermark && (
        <rect width="500" height="700" fill="url(#watermark)" />
      )}
    </svg>
  );
}

// ── Export ─────────────────────────────────────────────────────────────────

export function PosterSVG({ data }: { data: PosterData }) {
  switch (data.template) {
    case "czysty":
      return <PosterCzysty data={data} />;
    case "editorial":
      return <PosterEditorial data={data} />;
    case "topograficzny":
      return <PosterTopograficzny data={data} />;
  }
}
