import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { LayoutShell } from "@/components/layout/LayoutShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://grupo-six.vercel.app";
const ogImageUrl = new URL("/og-image.webp", siteUrl).href;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Supreme | Maxx, Thermo e Gold | Grupo Six",
    template: "%s | Grupo Six",
  },
  description:
    "Transforme seu corpo com Supreme. Três fórmulas: vitaminas e minerais, termogênico ou quitosana. Garantia de 7 dias. Cartão, PIX ou boleto.",
  keywords: ["Supreme", "suplementos", "Maxx", "Thermo", "Gold", "Grupo Six"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Grupo Six",
    title: "Supreme | Maxx, Thermo e Gold | Grupo Six",
    description:
      "Transforme seu corpo com Supreme. Três fórmulas: vitaminas e minerais, termogênico ou quitosana. Garantia de 7 dias.",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Supreme: suplementos Maxx, Thermo e Gold. O melhor em suplementos.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Supreme | Maxx, Thermo e Gold | Grupo Six",
    description:
      "Transforme seu corpo com Supreme. Três fórmulas. Garantia de 7 dias.",
    images: [ogImageUrl],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/supreme.png" as="image" />
        <link rel="preconnect" href="https://www.youtube.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.dicebear.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <LayoutShell>
            <main id="main-content">{children}</main>
          </LayoutShell>
        </Providers>
      </body>
    </html>
  );
}
