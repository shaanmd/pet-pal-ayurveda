import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PetPal Ayurveda — Unlock Your Pet's Ancient Path to Healing",
  description:
    "Discover your pet's Dosha with our free quiz. Ayurvedic pet rehab and massage for Australia, New Zealand & India. Join the waitlist for our upcoming book.",
  keywords: ["Ayurvedic pet care", "pet Dosha", "pet massage", "holistic vet", "pet rehab"],
  openGraph: {
    title: "PetPal Ayurveda — Unlock Your Pet's Ancient Path to Healing",
    description: "Free Pet Dosha quiz. Natural Ayurvedic methods for your pet. Join the waitlist.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${karla.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
