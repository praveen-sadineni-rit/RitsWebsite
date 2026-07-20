import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resource Innovative Technologies | Software & AI Solutions",
  description:
    "Resource IT delivers cutting-edge software solutions, product development, AI services, and staff augmentation to transform your business.",
  keywords:
    "software solutions, product development, AI services, staff augmentation, IT consulting, digital transformation",
  authors: [{ name: "Resource Innovative Technologies" }],
  openGraph: {
    title: "Resource Innovative Technologies | Software & AI Solutions",
    description: "We Build Technology That Scales.",
    url: "https://rits-it.com",
    siteName: "Resource Innovative Technologies",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
