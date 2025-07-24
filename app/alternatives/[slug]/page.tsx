import type { Metadata } from "next"
import { notFound } from "next/navigation"

import ClosingCta from "@/components/alternatives/closing-cta"
import Faq from "@/components/alternatives/faq"
import FeatureComparison from "@/components/alternatives/feature-comparison"
import Hero from "@/components/alternatives/hero"
import MigrationCta from "@/components/alternatives/migration-cta"
import OutcomeBanner from "@/components/alternatives/outcome-banner"
import PricingBreakout from "@/components/alternatives/pricing-breakout"
import TestimonialCarousel from "@/components/alternatives/testimonial-carousel"
import Footer from "@/components/footer"
import competitors from "@/data/competitors.json"

// Define the type for competitor data
type Competitor = {
  slug: string
  name: string
  tagline: string
  pricing: {
    entryPlan: number
    entryTickets: number
    overagePerTicket: number
  }
  shopifyRating: number
  approxUsers: number
  featureFlags: {
    oneClickShopifyActions: boolean
    doneForYouEscalations: boolean
    builtInUpsells: boolean
    freeTier: boolean
  }
  logo: string
  caseStudyIds: string[]
}

// Generate static params for all competitors
export async function generateStaticParams() {
  return competitors.map((competitor) => ({
    slug: competitor.slug,
  }))
}

// Generate metadata for each competitor page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const competitor = competitors.find((c) => c.slug === params.slug) as Competitor | undefined

  if (!competitor) {
    return {
      title: "Not Found",
      description: "The page you're looking for doesn&apos;t exist.",
    }
  }

  return {
    title: `Garrio vs ${competitor.name} | Best Shopify Support Alternative`,
    description: `Ditch ${competitor.name} busy-work—Garrio answers tickets for you.`,
    openGraph: {
      title: `Garrio vs ${competitor.name} | Best Shopify Support Alternative`,
      description: `Ditch ${competitor.name} busy-work—Garrio answers tickets for you.`,
      url: `https://garrio.ai/alternatives/${competitor.slug}`,
      siteName: "Garrio",
      images: [
        {
          url: `/og/alternatives-${competitor.slug}.png`,
          width: 1200,
          height: 630,
          alt: `Garrio vs ${competitor.name}`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  }
}

export default function AlternativePage({ params }: { params: { slug: string } }) {
  // Find the competitor data
  const competitor = competitors.find((c) => c.slug === params.slug) as Competitor | undefined

  // If competitor not found, return 404
  if (!competitor) {
    notFound()
  }

  // Preserve UTM parameters for CTA links
  // const preserveUtm = (baseUrl: string) => {
  //   // This would be implemented client-side to capture UTM params
  //   return baseUrl
  // }

  // JSON-LD structured data for FAQPage
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Does Garrio have feature parity with ${competitor.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, Garrio includes all core ${competitor.name} features plus AI-powered automation that handles tickets for you.`,
        },
      },
      {
        "@type": "Question",
        name: "Will switching affect my SEO or site performance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, Garrio's lightweight widget (under 30kb) loads asynchronously and won&apos;t impact your Core Web Vitals or SEO.",
        },
      },
      {
        "@type": "Question",
        name: "Can I customize the chat widget to match my brand?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Garrio offers full customization of colors, fonts, and messaging to match your brand identity.",
        },
      },
      {
        "@type": "Question",
        name: "What kind of SLA does Garrio offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Free tier includes community support, while paid plans include email support with 24-hour response times. Scale plan includes priority support with 4-hour SLA.",
        },
      },
      {
        "@type": "Question",
        name: "How does Garrio handle data security?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Garrio uses enterprise-grade encryption and is SOC 2 compliant. We never store customer payment details and are fully GDPR and CCPA compliant.",
        },
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* JSON-LD structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero competitor={competitor} />

        {/* Outcome Banner */}
        <OutcomeBanner />

        {/* Feature Comparison */}
        <FeatureComparison competitor={competitor} />

        {/* Testimonial Carousel */}
        <TestimonialCarousel caseStudyIds={competitor.caseStudyIds} competitorName={competitor.name} />

        {/* Pricing Breakout */}
        <PricingBreakout competitor={competitor} />

        {/* Migration CTA */}
        <MigrationCta competitorName={competitor.name} />

        {/* FAQ Section */}
        <Faq competitorName={competitor.name} />

        {/* Closing CTA */}
        <ClosingCta competitorName={competitor.name} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
