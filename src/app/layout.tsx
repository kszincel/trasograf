import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-brand",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Trasograf — Spersonalizowane plakaty z tras sportowych",
  description:
    "Zamień swój maraton, szlak lub trasę rowerową w premium plakat. Wybierz styl, wpisz dane — i od razu zobacz jak będzie wyglądał. Drukowany i dostarczony w 2 tygodnie.",
  openGraph: {
    title: "Trasograf — Twoja trasa. Na ścianie.",
    description:
      "Spersonalizowane plakaty z tras sportowych — maratony, szlaki, trasy rowerowe.",
    type: "website",
    locale: "pl_PL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
