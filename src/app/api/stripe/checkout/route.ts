import { NextRequest, NextResponse } from "next/server";
import { getStripe, PRICE_VARIANTS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      priceId,
      template,
      name,
      time,
      date,
      startNumber,
      // adres — tylko dla wariantow z wydrukiem
      firstName,
      lastName,
      email,
      address,
      city,
      postalCode,
    } = body;

    const variant = PRICE_VARIANTS.find((v) => v.id === priceId);
    if (!variant) {
      return NextResponse.json({ error: "Nieprawidlowy wariant" }, { status: 400 });
    }

    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card", "p24", "blik"],
      line_items: [
        {
          price_data: {
            currency: "pln",
            product_data: {
              name: `Trasograf — ${variant.name}`,
              description: `Szablon: ${template} | Biegacz: ${name} | Czas: ${time} | Data: ${date}`,
              images: [],
            },
            unit_amount: variant.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/dziekujemy?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/zamowienie`,
      customer_email: email || undefined,
      metadata: {
        priceId,
        template,
        runnerName: name,
        runnerTime: time,
        runnerDate: date,
        startNumber,
        firstName: firstName ?? "",
        lastName: lastName ?? "",
        email: email ?? "",
        address: address ?? "",
        city: city ?? "",
        postalCode: postalCode ?? "",
        variantType: variant.type,
        variantSize: variant.size ?? "digital",
      },
      locale: "pl",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Blad tworzenia sesji platnosci" }, { status: 500 });
  }
}
