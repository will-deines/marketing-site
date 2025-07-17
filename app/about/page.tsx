import type { Metadata } from "next"
import CinematicHero from "@/components/about/cinematic-hero"
import MissionVision from "@/components/about/mission-vision"
import FoundingStory from "@/components/about/founding-story"
import MetricMosaic from "@/components/about/metric-mosaic"
import ValuesGrid from "@/components/about/values-grid"
import TeamGallery from "@/components/about/team-gallery"
import InvestorStrip from "@/components/about/investor-strip"
import CareersSection from "@/components/about/careers-section"
import PressResources from "@/components/about/press-resources"
import ClosingCTA from "@/components/about/closing-cta"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "About Garrio – Support That Works While You Grow",
  description:
    "We're re-inventing how Shopify stores serve (and sell to) shoppers. Learn about our mission, team, and values.",
  openGraph: {
    title: "About Garrio – Support That Works While You Grow",
    description:
      "We're re-inventing how Shopify stores serve (and sell to) shoppers. Learn about our mission, team, and values.",
    url: "https://garrio.com/about",
    siteName: "Garrio",
    images: [
      {
        url: "https://garrio.com/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About Garrio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Cinematic Hero */}
        <CinematicHero />

        {/* Mission & Vision Block */}
        <MissionVision />

        {/* Founding Story Timeline */}
        <FoundingStory />

        {/* Numbers That Matter */}
        <MetricMosaic />

        {/* Values Grid */}
        <ValuesGrid />

        {/* Team Gallery */}
        <TeamGallery />

        {/* Investor & Advisor Strip */}
        <InvestorStrip />

        {/* Careers Section */}
        <CareersSection />

        {/* Press & Resources */}
        <PressResources />

        {/* Closing Brand CTA */}
        <ClosingCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
