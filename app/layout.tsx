import type { Metadata, Viewport } from "next";
import {
  Fraunces,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  Noto_Sans_Ethiopic,
} from "next/font/google";
import "./globals.css";

// Display / headlines. Variable font, so no weight list is needed.
// Italic is loaded because the brand uses it for headline emphasis.
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

// Body copy.
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-sans",
});

// Eyebrows, labels, origin details, prices, tags.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

// Neither Fraunces nor IBM Plex includes Ethiopic glyphs. Without this the
// Amharic strings (ቡና ቤት, አቦል) render as tofu boxes.
const notoEthiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-noto-ethiopic",
});

export const metadata: Metadata = {
  title: "Buna Bet | Ethiopian coffee in Vancouver",
  description:
    "Wholesale Ethiopian beans and a mobile coffee cart, built around the buna ceremony. For cafés, markets, and events across Vancouver.",
  openGraph: {
    title: "Buna Bet | Ethiopian coffee in Vancouver",
    description:
      "Wholesale Ethiopian beans and a mobile coffee cart, built around the buna ceremony.",
    locale: "en_CA",
    type: "website",
  },
  // TODO: add metadataBase + an OG image once the domain and final photography land.
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1A1512",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} ${notoEthiopic.variable}`}
    >
      <body className="bg-paper font-sans text-charcoal antialiased">
        <a
          href="#main"
          className="sr-only rounded-sm bg-cherry px-5 font-mono text-xs uppercase tracking-[0.18em] text-paper focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:min-h-[44px] focus:items-center"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
