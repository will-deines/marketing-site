import Header from "@/components/header";
import HeroSection from "@/components/features/hero-section";
import BeforeAfterComparison from "@/components/features/before-after-comparison";
import FeaturePillars from "@/components/features/feature-pillars";
import SimpleResults from "@/components/features/interactive-flow";
import DeepDiveSections from "@/components/features/deep-dive-sections";
import ComparisonTable from "@/components/features/comparison-table";
import SocialProofReel from "@/components/features/social-proof-reel";
import PeaceOfMindCallout from "@/components/features/peace-of-mind-callout";
import ClosingCTA from "@/components/features/closing-cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features – Garrio Chat for Shopify",
  description:
    "The only Shopify support app that handles customer service for you — from AI to human. Discover how Garrio Chat can transform your customer support.",
  keywords:
    "shopify features, ai customer support, automated responses, human backup, shopify integration, customer service automation",
  openGraph: {
    title: "Features – Garrio Chat for Shopify",
    description:
      "The only Shopify support app that handles customer service for you — from AI to human. Discover how Garrio Chat can transform your customer support.",
    url: "https://garrio.ai/features",
    siteName: "Garrio",
    images: [
      {
        url: "/og/features.jpg",
        width: 1200,
        height: 630,
        alt: "Garrio Features Overview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Features – Garrio Chat for Shopify",
    description:
      "The only Shopify support app that handles customer service for you — from AI to human.",
    images: ["/og/features.jpg"],
  },
  alternates: {
    canonical: "/features",
  },
};

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Before/After Reality Check */}
        <BeforeAfterComparison />

        {/* Feature Pillars */}
        <FeaturePillars />

        {/* Simple Results */}
        <SimpleResults />

        {/* Deep-Dive Sections */}
        <DeepDiveSections />

        {/* Side-by-Side Comparison */}
        <ComparisonTable />

        {/* Social Proof Reel */}
        <SocialProofReel />

        {/* Peace of Mind Call-out */}
        <PeaceOfMindCallout />

        {/* Closing CTA */}
        <ClosingCTA />
      </main>
    </div>
  );
}
