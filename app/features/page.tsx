import HeroSection from "@/components/features/hero-section"
import FeaturePillars from "@/components/features/feature-pillars"
import InteractiveFlow from "@/components/features/interactive-flow"
import DeepDiveSections from "@/components/features/deep-dive-sections"
import ComparisonTable from "@/components/features/comparison-table"
import SocialProofReel from "@/components/features/social-proof-reel"
import DeveloperCallout from "@/components/features/developer-callout"
import ClosingCTA from "@/components/features/closing-cta"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Features – Garrio Chat for Shopify",
  description:
    "The only Shopify support app that handles customer service for you — from AI to human. Discover how Garrio Chat can transform your customer support.",
}

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Feature Pillars */}
        <FeaturePillars />

        {/* Interactive Flow */}
        <InteractiveFlow />

        {/* Deep-Dive Sections */}
        <DeepDiveSections />

        {/* Side-by-Side Comparison */}
        <ComparisonTable />

        {/* Social Proof Reel */}
        <SocialProofReel />

        {/* Developer Call-out */}
        <DeveloperCallout />

        {/* Closing CTA */}
        <ClosingCTA />
      </main>
    </div>
  )
}
