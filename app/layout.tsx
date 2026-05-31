import type { Metadata, Viewport } from "next";
import { Chivo_Mono, Host_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://xthrive.in/";
const siteTitle = "Xthrive HSR | Strength & Conditioning Gym in HSR Layout";
const siteDescription =
  "Xthrive is HSR Layout's favourite functional fitness, strength & conditioning gym. Coached classes for beginners and advanced athletes.";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host-grotesk",
  display: "swap",
});

const chivoMono = Chivo_Mono({
  subsets: ["latin"],
  variable: "--font-chivo-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "strength conditioning gym HSR Layout",
    "functional fitness gym Bangalore",
    "CrossFit gym HSR",
    "group fitness classes HSR",
    "barbell club Bangalore",
    "gym in HSR Layout",
    "personal training HSR Bangalore",
    "Xthrive HSR",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Xthrive HSR",
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Xthrive HSR gym promotional banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.svg"],
  },
  other: {
    "geo.region": "IN-KA",
    "geo.placename": "HSR Layout, Bengaluru, Karnataka",
    "geo.position": "12.9121;77.6446",
    ICBM: "12.9121, 77.6446",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiScriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${hostGrotesk.variable} ${chivoMono.variable}`}
      >
        {children}
        {umamiWebsiteId && umamiScriptUrl ? (
          <Script
            src={umamiScriptUrl}
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
