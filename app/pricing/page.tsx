import Header from "@/components/header"
import PricingHero from "@/components/pricing/pricing-hero"
import PlanCards from "@/components/pricing/plan-cards"
import UsageCalculator from "@/components/pricing/usage-calculator"
import ComparisonTable from "@/components/pricing/comparison-table"
import PricingFAQ from "@/components/pricing/pricing-faq"
import FinalCTA from "@/components/pricing/final-cta"
import type { Metadata } from "next"
import { plans } from "@/lib/pricing-data"

export const metadata: Metadata = {
  title: "Plans & Pricing – Garrio Chat for Shopify",
  description:
    "Start free and scale when you're ready. Garrio Chat offers flexible pricing plans for Shopify stores of all sizes.",
  keywords: "shopify pricing, customer service cost, ai support pricing, shopify app pricing, customer support plans",
  openGraph: {
    title: "Plans & Pricing – Garrio Chat for Shopify",
    description:
      "Start free and scale when you're ready. Garrio Chat offers flexible pricing plans for Shopify stores of all sizes.",
    url: "https://garrio.ai/pricing",
    siteName: "Garrio",
    images: [
      {
        url: "/og/pricing.jpg",
        width: 1200,
        height: 630,
        alt: "Garrio Pricing Plans",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plans & Pricing – Garrio Chat for Shopify",
    description:
      "Start free and scale when you're ready. Flexible pricing plans for Shopify stores of all sizes.",
    images: ["/og/pricing.jpg"],
  },
  alternates: {
    canonical: "/pricing",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          "name": "Garrio Customer Service Platform",
          "description": "AI-powered customer service platform for Shopify stores with human backup support",
          "brand": {
            "@type": "Brand",
            "name": "Garrio"
          },
          "offers": plans.map(plan => ({
            "@type": "Offer",
            "name": plan.name,
            "price": plan.price.replace('$', ''),
            "priceCurrency": "USD",
            "description": `${plan.includedChats} chats included, ${plan.extraChatPrice} for additional chats`,
            "eligibleQuantity": {
              "@type": "QuantitativeValue",
              "maxValue": plan.includedChats,
              "unitText": "chats per month"
            },
            "availability": plan.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
          })),
          "category": "Customer Service Software",
          "applicationCategory": "BusinessApplication"
        }
      ]
    })
  },
}

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Sticky Sub-Hero */}
        <PricingHero />

        {/* Plan Cards Grid */}
        <PlanCards />

        {/* Usage Cost Calculator */}
        <UsageCalculator />

        {/* Comparison Table */}
        <ComparisonTable />

        {/* FAQ Accordion */}
        <PricingFAQ />

        {/* Final CTA Banner */}
        <FinalCTA />
      </main>
    </div>
  )
}
