import type { Metadata } from "next"
import LiveDemoPage from "@/components/live-demo/live-demo-page"

export const metadata: Metadata = {
  title: "Live Demo | Garrio Chat for Shopify",
  description: "Test Garrio on your Shopify page. Paste any URL and see Garrio reply in real time.",
  openGraph: {
    title: "Live Demo | Garrio Chat for Shopify",
    description: "Test Garrio on your Shopify page. Paste any URL and see Garrio reply in real time.",
    url: "https://garrio.com/live-demo",
    siteName: "Garrio",
    images: [
      {
        url: "/og/live-demo.png",
        width: 1200,
        height: 630,
        alt: "Garrio Live Demo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function LiveDemo() {
  return <LiveDemoPage />
}
