import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Garrio - Customer Service Platform for Shopify Stores",
  description:
    "Complete customer experience tool for growing Shopify brands. Handle every customer interaction with AI-powered responses backed by live human agents when needed.",
  keywords:
    "shopify customer service, ai customer support, email automation, live chat support, human agents, omnichannel support, shopify apps, customer service platform, ai with human backup",
  authors: [{ name: "Garrio" }],
  creator: "Garrio",
  publisher: "Garrio",
  metadataBase: new URL("https://garrio.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title:
      "Garrio - Complete Customer Experience Tool | AI + Human Agents for Shopify",
    description:
      "Handle every customer interaction (chat, email, phone) with AI-powered responses backed by live human agents. Built for growing Shopify brands like yours.",
    siteName: "Garrio",
    images: [
      {
        url: "/og/homepage.jpg",
        width: 1200,
        height: 630,
        alt: "Garrio - AI Customer Service Platform for Shopify Stores",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Garrio - Complete Customer Experience Tool",
    description:
      "AI + human agents handling every interaction (chat, email, phone). Built for growing Shopify brands.",
    images: ["/og/homepage.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/brand/favicon.svg",
    apple: "/brand/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="overflow-x-hidden">{children}</body>
      <Analytics />
    </html>
  );
}
