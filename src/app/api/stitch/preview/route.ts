import { NextRequest, NextResponse } from "next/server";
import { generatePosterPreview, type PosterData } from "@/lib/stitch";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { template, name, time, date, startNumber, watermark = true } =
      body as PosterData & { watermark?: boolean };

    if (!template || !name || !time || !date || !startNumber) {
      return NextResponse.json(
        { error: "Brakujace dane: template, name, time, date, startNumber" },
        { status: 400 }
      );
    }

    const imageUrl = await generatePosterPreview({
      template,
      name,
      time,
      date,
      startNumber,
      watermark,
    });

    return NextResponse.json({ url: imageUrl });
  } catch (err) {
    console.error("Stitch preview error:", err);
    return NextResponse.json(
      { error: "Blad generowania podgladu" },
      { status: 500 }
    );
  }
}
