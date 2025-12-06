import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { weddingData } from "@/lib/data/wedding";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: weddingData.metadata.title,
  description: weddingData.metadata.description,
  openGraph: {
    title: weddingData.metadata.title,
    description: weddingData.metadata.description,
    images: [
      {
        url: weddingData.metadata.thumbnail,
        width: 1200,
        height: 630,
        alt: `${weddingData.couple.partner1.name} & ${weddingData.couple.partner2.name} Wedding`,
      },
    ],
    siteName: weddingData.metadata.siteName,
    url: weddingData.metadata.url,
  },
  twitter: {
    card: "summary_large_image",
    title: weddingData.metadata.title,
    description: weddingData.metadata.description,
    images: [weddingData.metadata.thumbnail],
  },
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-md mx-auto bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
