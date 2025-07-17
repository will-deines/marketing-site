import PricingHero from "@/components/pricing/pricing-hero"
import PlanCards from "@/components/pricing/plan-cards"
import UsageCalculator from "@/components/pricing/usage-calculator"
import ComparisonTable from "@/components/pricing/comparison-table"
import PricingFAQ from "@/components/pricing/pricing-faq"
import FinalCTA from "@/components/pricing/final-cta"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Plans & Pricing – Garrio Chat for Shopify",
  description:
    "Start free and scale when you're ready. Garrio Chat offers flexible pricing plans for Shopify stores of all sizes.",
}

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
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
