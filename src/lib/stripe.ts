import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-03-25.dahlia",
    });
  }
  return _stripe;
}

// backwards compat alias
export const stripe = { get instance() { return getStripe(); } };

export interface PriceVariant {
  id: string;
  name: string;
  description: string;
  price: number; // w groszach
  type: "digital" | "print";
  size?: string;
}

export const PRICE_VARIANTS: PriceVariant[] = [
  {
    id: "digital",
    name: "Wersja cyfrowa",
    description: "Plik PDF i PNG w wysokiej rozdzielczosci do pobrania",
    price: 4900,
    type: "digital",
  },
  {
    id: "print_s",
    name: "Wydruk maly",
    description: "Wydruk 30x42cm na papierze premium, dostawa kurierem",
    price: 9900,
    type: "print",
    size: "30x42cm",
  },
  {
    id: "print_m",
    name: "Wydruk sredni",
    description: "Wydruk 40x56cm na papierze premium, dostawa kurierem",
    price: 14900,
    type: "print",
    size: "40x56cm",
  },
  {
    id: "print_l",
    name: "Wydruk duzy",
    description: "Wydruk 50x70cm na papierze premium, dostawa kurierem",
    price: 19900,
    type: "print",
    size: "50x70cm",
  },
];

export function formatPrice(groszach: number): string {
  return `${(groszach / 100).toFixed(0)} zl`;
}
