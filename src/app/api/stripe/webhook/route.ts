import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Brak podpisu" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Nieprawidlowy podpis" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata ?? {};

    // Log zamowienia — docelowo baza danych (GT-138)
    console.log("NOWE ZAMOWIENIE", {
      sessionId: session.id,
      amount: session.amount_total,
      email: meta.email || session.customer_email,
      template: meta.template,
      runner: {
        name: meta.runnerName,
        time: meta.runnerTime,
        date: meta.runnerDate,
        startNumber: meta.startNumber,
      },
      delivery: meta.variantType === "print"
        ? {
            name: `${meta.firstName} ${meta.lastName}`,
            address: meta.address,
            city: meta.city,
            postalCode: meta.postalCode,
          }
        : null,
      variant: {
        id: meta.priceId,
        type: meta.variantType,
        size: meta.variantSize,
      },
    });

    // TODO GT-141: Gelato API — automatyczne zlecanie druku dla wariantow print
    // TODO: Email potwierdzajacy
  }

  return NextResponse.json({ received: true });
}
