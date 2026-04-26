import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://xthrive.in/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Strength & Conditioning Gym in HSR Layout, Bangalore | Xthrive HSR",
  description:
    "Xthrive HSR is HSR Layout's #1 functional fitness & strength conditioning gym. Rated 4.9★ on Google. Expert coaching, group classes & Saturday Barbell Club. Book a free drop-in today.",
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
  openGraph: {
    type: "website",
    siteName: "Xthrive HSR",
    title: "Xthrive HSR | Strength & Conditioning Gym in HSR Layout, Bangalore",
    description:
      "HSR Layout's favourite functional fitness gym. 4.9★ on Google. Group classes, barbell club & expert coaching. Book a free drop-in.",
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
    title: "Xthrive HSR | Functional Fitness Gym HSR Layout Bangalore",
    description:
      "Strength. Community. Relentless. HSR Layout's favourite gym — rated 4.9★ on Google.",
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
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
