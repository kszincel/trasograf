"use client";

import { useMemo, useState } from "react";
import { CRACOVIA_ROUTE_COORDS } from "@/data/events/krakow-2026-route";
import type { PosterData, PosterTemplate } from "./PosterSVG";

// ── Mapbox Static API ──────────────────────────────────────────────────────

const MAPBOX_STYLES: Record<PosterTemplate, string> = {
  czysty: "mapbox/light-v11",
  editorial: "mapbox/outdoors-v12",
  topograficzny: "mapbox/outdoors-v12",
};

const STROKE_COLORS: Record<PosterTemplate, string> = {
  czysty: "#1A1A2E",
  editorial: "#7A1515",
  topograficzny: "#6B0000",
};

const STROKE_WIDTHS: Record<PosterTemplate, number> = {
  czysty: 3,
  editorial: 5,
  topograficzny: 4,
};

const MARKER_COLORS: Record<PosterTemplate, string> = {
  czysty: "#E85D04",
  editorial: "#C83232",
  topograficzny: "#8B0000",
};

function buildMapboxUrl(
  template: PosterTemplate,
  width: number,
  height: number,
  token: string
): string {
  const style = MAPBOX_STYLES[template];

  const geojson = JSON.stringify({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: CRACOVIA_ROUTE_COORDS,
        },
        properties: {
          stroke: STROKE_COLORS[template],
          "stroke-width": STROKE_WIDTHS[template],
          "stroke-opacity": 1,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: CRACOVIA_ROUTE_COORDS[0],
        },
        properties: {
          "marker-color": MARKER_COLORS[template],
          "marker-size": "medium",
        },
      },
    ],
  });

  const overlay = `geojson(${encodeURIComponent(geojson)})`;
  // "auto" calculates optimal center/zoom to fit the route
  return `https://api.mapbox.com/styles/v1/${style}/static/${overlay}/auto/${width}x${height}?padding=60,50,60,50&access_token=${token}`;
}

// ── Watermark ──────────────────────────────────────────────────────────────

function Watermark() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 10 }}>
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 4 }).map((_, col) => (
          <span
            key={`${row}-${col}`}
            className="absolute font-bold select-none"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              letterSpacing: "4px",
              opacity: 0.08,
              color: "#000",
              transform: "rotate(-30deg)",
              top: `${row * 100 - 20}px`,
              left: `${col * 160 - 40}px`,
              whiteSpace: "nowrap",
            }}
          >
            TRASOGRAF
          </span>
        ))
      )}
    </div>
  );
}

// ── Overlay: CZYSTY ───────────────────────────────────────────────────────

function OverlayCzysty({ data }: { data: PosterData }) {
  const details = [
    "23. MARATON W KRAKOWIE",
    data.data,
    data.czas,
    data.bib_number ? `NR ${data.bib_number}` : null,
  ]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <>
      {/* Top label */}
      <div
        className="absolute top-0 left-0 right-0 flex justify-between items-start"
        style={{ zIndex: 5, padding: "4% 5%" }}
      >
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            padding: "5px 10px",
            border: "0.5px solid rgba(26,26,46,0.15)",
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(6px, 1.5vw, 9px)",
              letterSpacing: "3px",
              color: "#1A1A2E",
              fontWeight: 700,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            KRAKÓW · 42,195 KM
          </p>
        </div>
      </div>

      {/* Bottom strip */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          backgroundColor: "rgba(255,255,255,0.92)",
          borderTop: "1px solid rgba(26,26,46,0.2)",
          padding: "4% 5%",
          zIndex: 5,
        }}
      >
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(7px, 1.6vw, 11px)",
            fontWeight: 700,
            letterSpacing: "2px",
            color: "#1A1A2E",
            textTransform: "uppercase",
            margin: "0 0 3px",
          }}
        >
          {data.imie}
        </p>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(5px, 1.1vw, 7.5px)",
            letterSpacing: "1.5px",
            color: "#555",
            fontWeight: 300,
            margin: 0,
          }}
        >
          {details}
        </p>
        {data.dedication && (
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(4px, 0.9vw, 6.5px)",
              color: "#888",
              fontStyle: "italic",
              marginTop: "3px",
            }}
          >
            {data.dedication}
          </p>
        )}
      </div>
    </>
  );
}

// ── Overlay: EDITORIAL ────────────────────────────────────────────────────

function OverlayEditorial({ data }: { data: PosterData }) {
  return (
    <>
      {/* Top gradient — cream fade */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          background: "linear-gradient(to bottom, rgba(245,240,232,0.97) 0%, rgba(245,240,232,0.85) 50%, transparent 100%)",
          padding: "5% 6% 8%",
          zIndex: 5,
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(22px, 6vw, 42px)",
            fontWeight: 700,
            color: "#1A1A2E",
            margin: "0 0 4px",
            lineHeight: 1,
            letterSpacing: "-1px",
          }}
        >
          KRAKÓW
        </p>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(5px, 1.1vw, 8px)",
            letterSpacing: "3px",
            color: "#8A7860",
            fontWeight: 400,
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          23. Maraton · {data.data}
        </p>
      </div>

      {/* Vertical date — left */}
      <div
        className="absolute"
        style={{
          left: "3%",
          top: "50%",
          transform: "translateY(-50%) rotate(-90deg)",
          transformOrigin: "center center",
          zIndex: 5,
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(4px, 0.9vw, 6px)",
            letterSpacing: "2.5px",
            color: "rgba(255,255,255,0.65)",
            fontWeight: 300,
            textTransform: "uppercase",
          }}
        >
          {data.data}
        </span>
      </div>

      {/* Bottom gradient — cream fade */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          background: "linear-gradient(to top, rgba(245,240,232,0.97) 0%, rgba(245,240,232,0.85) 55%, transparent 100%)",
          padding: "8% 6% 5%",
          zIndex: 5,
        }}
      >
        <div style={{ borderTop: "0.5px solid #C9B99A", paddingTop: "8px", marginBottom: "6px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(11px, 2.8vw, 20px)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#1A1A2E",
              margin: 0,
            }}
          >
            {data.imie}
          </p>
          <p
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(13px, 3.2vw, 24px)",
              fontWeight: 500,
              color: "#1A1A2E",
              margin: 0,
            }}
          >
            {data.czas}
          </p>
        </div>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(4px, 0.95vw, 7px)",
            color: "#8A7860",
            letterSpacing: "1.5px",
            marginTop: "4px",
          }}
        >
          42,195 KM{data.bib_number ? ` · NR ${data.bib_number}` : ""}
        </p>
        {data.dedication && (
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(4px, 0.85vw, 7px)",
              color: "#B0906A",
              fontStyle: "italic",
              marginTop: "2px",
            }}
          >
            {data.dedication}
          </p>
        )}
      </div>
    </>
  );
}

// ── Overlay: TOPOGRAFICZNY ────────────────────────────────────────────────

function OverlayTopograficzny({ data }: { data: PosterData }) {
  return (
    <>
      {/* Header */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          backgroundColor: "rgba(237,224,196,0.90)",
          borderBottom: "1px solid #8B6914",
          padding: "2.5% 5%",
          zIndex: 5,
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(7px, 1.5vw, 10px)",
            letterSpacing: "4px",
            color: "#5C3D11",
            fontWeight: 700,
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          23. Maraton Krakowski · {data.data}
        </p>
      </div>

      {/* Legenda — prawy dół */}
      <div
        className="absolute"
        style={{
          bottom: "4%",
          right: "4%",
          backgroundColor: "rgba(245,237,216,0.95)",
          border: "1px solid #8B6914",
          padding: "4% 5%",
          zIndex: 5,
          minWidth: "38%",
          maxWidth: "52%",
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(5px, 1vw, 7px)",
            fontWeight: 700,
            letterSpacing: "3px",
            color: "#5C3D11",
            borderBottom: "0.5px solid #8B6914",
            paddingBottom: "4px",
            marginBottom: "6px",
            textTransform: "uppercase",
          }}
        >
          Legenda
        </p>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(6px, 1.3vw, 9px)",
            color: "#3D2B1F",
            fontWeight: 600,
            margin: "0 0 2px",
            letterSpacing: "1px",
          }}
        >
          {data.imie.toUpperCase()}
        </p>
        <p
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "clamp(9px, 2vw, 14px)",
            color: "#3D2B1F",
            fontWeight: 500,
            margin: "0 0 3px",
          }}
        >
          {data.czas}
        </p>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(5px, 0.9vw, 7px)", color: "#6B4C2A", margin: "0 0 1px" }}>
          {data.data} · 42,195 KM
        </p>
        {data.bib_number && (
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(5px, 0.9vw, 7px)", color: "#6B4C2A", margin: "0 0 1px" }}>
            NR STARTOWY: {data.bib_number}
          </p>
        )}
        {data.dedication && (
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(5px, 0.85vw, 7px)", color: "#8B6914", fontStyle: "italic", marginTop: "3px" }}>
            {data.dedication}
          </p>
        )}
        <div style={{ borderTop: "0.5px solid #C4A97D", marginTop: "5px", paddingTop: "4px" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(4px, 0.7vw, 5.5px)", color: "#8B6914", letterSpacing: "2px", margin: 0 }}>
            TRASOGRAF · KRAKÓW · 2026
          </p>
        </div>
      </div>
    </>
  );
}

// ── Fallback (brak tokena) ────────────────────────────────────────────────

function Fallback({ template }: { template: PosterTemplate }) {
  const bg =
    template === "czysty" ? "#FAFAF8" :
    template === "editorial" ? "#F5F0E8" :
    "#EDE0C4";

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ backgroundColor: bg }}
    >
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "9px",
          color: "#999",
          textAlign: "center",
          padding: "0 20px",
          lineHeight: 1.6,
        }}
      >
        Dodaj NEXT_PUBLIC_MAPBOX_TOKEN
        <br />
        aby zobaczyć mapę
      </p>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────

export function PosterMap({ data, width = 500, height = 700 }: { data: PosterData; width?: number; height?: number }) {
  const [imgError, setImgError] = useState(false);

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

  const mapUrl = useMemo(() => {
    if (!token || imgError) return "";
    return buildMapboxUrl(data.template, width, height, token);
  }, [data.template, width, height, token, imgError]);

  return (
    <div className="relative overflow-hidden" style={{ width: "100%", height: "100%" }}>
      {/* Mapa */}
      {mapUrl ? (
        <img
          src={mapUrl}
          alt="Mapa trasy maratonu krakowskiego"
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <Fallback template={data.template} />
      )}

      {/* Overlay typograficzny */}
      {data.template === "czysty" && <OverlayCzysty data={data} />}
      {data.template === "editorial" && <OverlayEditorial data={data} />}
      {data.template === "topograficzny" && <OverlayTopograficzny data={data} />}

      {/* Watermark */}
      {data.watermark && <Watermark />}
    </div>
  );
}
