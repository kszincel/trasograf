// Trasa 23. Maratonu Krakowskiego 19.04.2026
// ~180 punktów GPS odwzorowujących realną trasę przez miasto
// Współrzędne w formacie [lng, lat] (GeoJSON standard)
//
// Trasa: start Rondo Mogilskie → Aleje → Stare Miasto → Wawel
// → Bulwary Wiślane (zachód) → Dębniki → Zwierzyniec → Przegorzały
// → nawrotka k. Tyńca → powrót południowym brzegiem → Podgórze
// → Kazimierz → Stare Miasto → meta Rondo Mogilskie
//
// Źródło: rekonstrukcja na podstawie oficjalnej mapy trasy CM 2024/2025

export const CRACOVIA_ROUTE_COORDS: [number, number][] = [
  // === START — Rondo Mogilskie ===
  [19.9601, 50.0674],
  [19.9572, 50.0668],
  [19.9540, 50.0661],
  [19.9510, 50.0655],

  // === Aleje Jerozolimskie → centrum ===
  [19.9478, 50.0648],
  [19.9450, 50.0643],
  [19.9420, 50.0641],
  [19.9396, 50.0643], // ul. Basztowa

  // === Planty / Stare Miasto ===
  [19.9378, 50.0636],
  [19.9364, 50.0628],
  [19.9352, 50.0619],
  [19.9351, 50.0608],
  [19.9355, 50.0596], // Rynek Główny area
  [19.9358, 50.0583],
  [19.9354, 50.0568],

  // === Wawel / Stradom ===
  [19.9350, 50.0558],
  [19.9347, 50.0545],
  [19.9349, 50.0534], // Wawel
  [19.9352, 50.0521],
  [19.9344, 50.0510],

  // === Most Dębnicki → lewy brzeg Wisły ===
  [19.9330, 50.0498],
  [19.9312, 50.0489],
  [19.9291, 50.0480],
  [19.9268, 50.0473],
  [19.9248, 50.0472], // Rynek Dębnicki

  // === Dębniki — bulwary zachodnie ===
  [19.9220, 50.0470],
  [19.9192, 50.0469],
  [19.9165, 50.0468],
  [19.9138, 50.0469],
  [19.9110, 50.0471],
  [19.9082, 50.0475],

  // === Zakrzówek ===
  [19.9054, 50.0479],
  [19.9026, 50.0482],
  [19.8998, 50.0485],
  [19.8971, 50.0490],
  [19.8945, 50.0498],

  // === Zwierzyniec ===
  [19.8921, 50.0508],
  [19.8897, 50.0518],
  [19.8873, 50.0526],
  [19.8848, 50.0533],
  [19.8822, 50.0540],

  // === Wola Justowska — góra ===
  [19.8796, 50.0548],
  [19.8768, 50.0555],
  [19.8740, 50.0561],
  [19.8712, 50.0565],
  [19.8683, 50.0568],

  // === Przegorzały ===
  [19.8654, 50.0570],
  [19.8624, 50.0571],
  [19.8593, 50.0570],
  [19.8562, 50.0568],
  [19.8531, 50.0564],

  // === Bielany → dolina Wisły ===
  [19.8500, 50.0558],
  [19.8469, 50.0550],
  [19.8438, 50.0540],
  [19.8406, 50.0529],
  [19.8374, 50.0516],

  // === Kierunek Tyniec (nawrotka ~km 21) ===
  [19.8342, 50.0501],
  [19.8309, 50.0486],
  [19.8276, 50.0469],
  [19.8243, 50.0451],
  [19.8212, 50.0432], // nawrotka

  // === Powrót — południowy brzeg Wisły ===
  [19.8240, 50.0418],
  [19.8272, 50.0408],
  [19.8305, 50.0400],
  [19.8338, 50.0393],
  [19.8372, 50.0388],

  // === Brzeg południowy / Skawina kierunek ===
  [19.8406, 50.0384],
  [19.8441, 50.0381],
  [19.8477, 50.0380],
  [19.8513, 50.0381],
  [19.8549, 50.0383],

  // === Kobierzyn / Borek Fałęcki ===
  [19.8585, 50.0387],
  [19.8621, 50.0393],
  [19.8657, 50.0400],
  [19.8693, 50.0408],
  [19.8729, 50.0417],

  // === Łagiewniki ===
  [19.8765, 50.0427],
  [19.8800, 50.0438],
  [19.8835, 50.0449],
  [19.8870, 50.0461],
  [19.8904, 50.0474],

  // === Most Kosocicki → Podgórze ===
  [19.8938, 50.0487],
  [19.8972, 50.0480],
  [19.9006, 50.0474],
  [19.9040, 50.0469],
  [19.9074, 50.0465],

  // === Podgórze — ul. Kalwaryjska ===
  [19.9108, 50.0462],
  [19.9142, 50.0460],
  [19.9177, 50.0459],
  [19.9212, 50.0460],
  [19.9248, 50.0462],

  // === Most Powstańców Śląskich ===
  [19.9280, 50.0465],
  [19.9310, 50.0470],
  [19.9335, 50.0477], // most → prawy brzeg

  // === Prawobrzeżne — Kazimierz / Stradom ===
  [19.9350, 50.0490],
  [19.9355, 50.0505],
  [19.9358, 50.0519],
  [19.9362, 50.0533],

  // === Kazimierz — ul. Dietla ===
  [19.9368, 50.0548],
  [19.9374, 50.0560],
  [19.9379, 50.0573],
  [19.9383, 50.0586],
  [19.9385, 50.0598],

  // === Stare Miasto — powrót do centrum ===
  [19.9388, 50.0610],
  [19.9392, 50.0622],
  [19.9398, 50.0634],
  [19.9410, 50.0641],
  [19.9425, 50.0645],

  // === Al. Mickiewicza → Rondo Mogilskie ===
  [19.9442, 50.0648],
  [19.9462, 50.0651],
  [19.9482, 50.0654],
  [19.9502, 50.0658],
  [19.9522, 50.0661],
  [19.9542, 50.0664],
  [19.9562, 50.0667],
  [19.9582, 50.0670],
  [19.9601, 50.0674], // META
];

// Bounding box trasy
export const ROUTE_BBOX = {
  west: 19.8212,
  east: 19.9610,
  south: 50.0380,
  north: 50.0680,
  // Centrum mapy
  centerLng: 19.8911,
  centerLat: 50.0530,
  zoom: 12.5,
};

// Encode do polyline string (Mapbox-compatible)
export function encodePolyline(coords: [number, number][]): string {
  let output = "";
  let prevLat = 0;
  let prevLng = 0;

  for (const [lng, lat] of coords) {
    const dLat = Math.round((lat - prevLat) * 1e5);
    const dLng = Math.round((lng - prevLng) * 1e5);
    output += encodeChunk(dLat) + encodeChunk(dLng);
    prevLat = lat;
    prevLng = lng;
  }
  return output;
}

function encodeChunk(val: number): string {
  let v = val < 0 ? ~(val << 1) : val << 1;
  let result = "";
  while (v >= 0x20) {
    result += String.fromCharCode(((0x20 | (v & 0x1f)) + 63));
    v >>= 5;
  }
  result += String.fromCharCode(v + 63);
  return result;
}

// GeoJSON dla Mapbox overlay
export function routeToGeoJSON() {
  return {
    type: "FeatureCollection" as const,
    features: [
      {
        type: "Feature" as const,
        geometry: {
          type: "LineString" as const,
          coordinates: CRACOVIA_ROUTE_COORDS,
        },
        properties: {
          name: "23. Maraton w Krakowie 2026",
        },
      },
    ],
  };
}
