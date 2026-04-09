const STITCH_API_KEY = process.env.STITCH_API_KEY!;
const STITCH_API_URL = "https://api.stitch.design/v1/generate";

export type PosterTemplate = "czysty" | "editorial" | "topograficzny";

export interface PosterData {
  template: PosterTemplate;
  name: string;
  time: string;
  date: string;
  startNumber: string;
  city?: string;
  watermark?: boolean;
}

function buildPrompt(data: PosterData): string {
  const { template, name, time, date, startNumber, city = "KRAKOW", watermark = true } = data;

  const personalizacja = `"${name.toUpperCase()} | ${time} | ${date} | NR ${startNumber} | ${city}"`;
  const watermarkRule = watermark
    ? 'Add a diagonal watermark text "TRASOGRAF" repeated across the entire poster at very low opacity (about 8-10%), evenly spaced, so it covers the whole composition. This is a preview watermark.'
    : "";

  if (template === "czysty") {
    return `Design a minimalist sport route poster, 50×70cm portrait orientation.

CENTRAL ELEMENT: A single GPS route line of a marathon through a city — this is the HERO of the poster, taking up 60-70% of the composition. The line should be clean, continuous, showing the actual shape of the running route with all its turns and curves. No fill, just the line.

LAYOUT: The route centered in the upper 2/3 of the poster. Below the route, one line of personalization data in small uppercase sans-serif: ${personalizacja}. Generous white space around everything. Nothing else.

VIBE: Swiss design, Dieter Rams, "less is more". Think: a single beautiful object on a white wall. Museum-quality restraint. The poster should look like it belongs in a Scandinavian apartment next to a Paper Collective print.

TYPOGRAPHY: Clean geometric sans-serif only. No script, no handwriting, no decorative fonts. Small, quiet, confident.

DO NOT: Use gradients. Use background textures or patterns. Use illustrations or icons. Use decorative borders or frames. Use script/handwriting fonts. Make the city name the biggest element. Use stock photography. Use more than 2 colors total.

${watermarkRule}`;
  }

  if (template === "editorial") {
    return `Design a warm editorial sport route poster in the style of Kinfolk or Cereal magazine, 50×70cm portrait.

CENTRAL ELEMENT: A GPS route line of a marathon through a city — the main visual, taking 50-60% of the composition. The route should feel hand-drawn or plotted, organic, like a cartographer drew it.

LAYOUT: Magazine-style asymmetric composition. The route is the centerpiece. Around it, typographic elements placed editorially: city name as a large serif heading (not bigger than the route itself), date rotated 90° on the left margin, runner's name and time as a quiet caption below. Personalization: ${personalizacja}.

VIBE: Warm, analog, tactile. Like a page torn from a beautiful travel magazine. Cream/off-white/ecru tones, natural warmth. Kinfolk, Cereal magazine, Patagonia catalog photography. The kind of poster you'd find in a boutique coffee shop in Copenhagen. Premium but approachable, not cold or corporate.

TYPOGRAPHY: Elegant serif for the city name (think editorial magazine headers), clean sans-serif for data. Two fonts maximum. Confident sizing hierarchy.

DO NOT: Use bright or neon colors. Use gradients. Use script/handwriting/cursive fonts. Use stock imagery or photography. Use decorative borders, stamps, or badges. Make it look like a race certificate or diploma. Use more than 3 colors. Make the data (time, name) the visual focus.

${watermarkRule}`;
  }

  // topograficzny
  return `Design a vintage topographic sport route poster, 50×70cm portrait, inspired by old military maps, National Geographic cartography, and Muir Way trail prints.

CENTRAL ELEMENT: A GPS route line of a marathon layered ON TOP of a subtle topographic base — contour lines, river paths, park areas, street grid faintly visible underneath. The route itself should be the boldest line on the map, clearly standing out from the terrain.

LAYOUT: The route and topo map fill most of the poster. In the bottom or corner, a "map legend" box with the runner's data styled like an actual cartographic legend: ${personalizacja}.

VIBE: Vintage cartography, antique map aesthetic, explorer's journal. Like something you'd find in a mountaineering museum or a geography professor's office. Warm parchment tones, muted earth colors. Muir Way, old Ordnance Survey maps, vintage National Geographic inserts.

TYPOGRAPHY: Classic serif, cartographic lettering style. Small, precise, informational. No modern sans-serif for the map elements.

DO NOT: Use bright colors or neon highlights. Use modern flat design. Use gradients unrelated to terrain. Use script/handwriting fonts. Make it look digital or generated. Use decorative frames or borders that aren't cartographic in style. Forget the topographic base layer.

${watermarkRule}`;
}

export async function generatePosterPreview(data: PosterData): Promise<string> {
  const prompt = buildPrompt(data);

  const res = await fetch(STITCH_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${STITCH_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      width: 714,
      height: 1000,
      format: "jpeg",
      quality: 85,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Stitch API error ${res.status}: ${err}`);
  }

  const json = await res.json();
  // Stitch returns { url: "..." } or { image_url: "..." }
  return json.url ?? json.image_url ?? json.output ?? json.data?.url;
}
