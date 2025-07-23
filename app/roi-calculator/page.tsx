import type { Metadata } from "next"
import Header from "@/components/header"
import RoiCalculator from "@/components/roi-calculator/roi-calculator"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "ROI Calculator | Garrio",
  description: "Calculate how much you can save by switching to Garrio for your Shopify customer support.",
  openGraph: {
    title: "ROI Calculator | Garrio",
    description: "Calculate how much you can save by switching to Garrio for your Shopify customer support.",
    url: "https://garrio.ai/roi-calculator",
    siteName: "Garrio",
    images: [
      {
        url: "/og/roi-calculator.png",
        width: 1200,
        height: 630,
        alt: "Garrio ROI Calculator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function RoiCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="solid" />
      <main className="flex-1">
        <RoiCalculator />
      </main>
      <Footer />
    </div>
  )
}
