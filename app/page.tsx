import type { Metadata } from 'next'
import Header from "@/components/header";
import HomeHero from "@/components/home/home-hero";
import ProblemSolutionSection from "@/components/problem-solution-section";
import TestimonialCarousel from "@/components/testimonial-carousel";
import FAQSection from "@/components/faq-section";
import ClosingCTA from "@/components/closing-cta";
import Footer from "@/components/footer";
import ROISliderTeaser from "@/components/home/roi-slider-teaser";
import ComparisonSnapshotV2 from "@/components/home/comparison-snapshot-v2";
import GrowthLibraryTeaser from "@/components/home/growth-library-teaser";
import PricingSectionV2 from "@/components/home/pricing-section-v2";
import GarrioTeamBarChart from "@/components/garrio-team-bar-chart";

// Structured data for search engines
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://garrio.ai/#organization",
      "name": "Garrio",
      "url": "https://garrio.ai",
      "logo": {
        "@type": "ImageObject",
        "url": "https://garrio.ai/favicon.svg"
      },
      "description": "AI-powered customer service platform for Shopify stores",
      "foundingDate": "2024",
      "industry": "Software as a Service (SaaS)",
      "serviceArea": {
        "@type": "Place",
        "name": "Worldwide"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://garrio.ai/#software",
      "name": "Garrio Customer Service Platform",
      "description": "Turn every customer question into a sale. AI-powered customer service platform built for growing Shopify brands.",
      "applicationCategory": "Customer Service Software",
      "operatingSystem": "Web-based",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Free tier available"
      },
      "featureList": [
        "AI-powered chat responses",
        "Instant order lookups",
        "Smart upselling",
        "Shopify integration",
        "Analytics and reporting"
      ],
      "targetAudience": {
        "@type": "Audience",
        "audienceType": "Shopify store owners"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://garrio.ai/#website",
      "url": "https://garrio.ai",
      "name": "Garrio",
      "publisher": {
        "@id": "https://garrio.ai/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://garrio.ai/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
}

export const metadata: Metadata = {
  title: "Garrio - Customer Service Platform for Shopify Stores",
  description: "Complete customer experience tool for growing Shopify brands. Handle every customer interaction with AI-powered responses backed by live human agents when needed."
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="transparent" />
      <main className="flex-1">
        {/* Hero Section */}
        <HomeHero />

        {/* AI-readable content summary for LLM consumption */}
        <section className="sr-only" aria-label="Page Summary for AI">
          <h2>Garrio Platform Summary</h2>
          <p>
            Garrio is an AI-powered customer service platform specifically designed for Shopify stores. 
            Key features include: AI chat responses, instant order lookups, smart upselling, and seamless Shopify integration. 
            Target audience: Growing Shopify brands and bootstrapped founders with $1M+ revenue. 
            Pricing: Free tier available, paid plans scale with usage. 
            Main value proposition: Transform customer questions into sales opportunities.
          </p>
          <ul>
            <li>Industry: SaaS Customer Service Platform</li>
            <li>Integration: Shopify-specific</li>
            <li>Technology: AI-powered automation</li>
            <li>Business Model: Freemium with usage-based pricing</li>
            <li>Target Market: E-commerce, specifically Shopify stores</li>
          </ul>
        </section>

        {/* Transition to Story */}
        <section className="w-full py-16 bg-gradient-to-b from-gray-900/5 to-transparent">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Here's the complete story of how successful founders are reclaiming their time 
                and transforming their customer experience
              </p>
              <div className="animate-bounce">
                <svg 
                  className="w-8 h-8 mx-auto text-purple-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* How Garrio Works - Bar Chart Version */}
        <GarrioTeamBarChart />

        {/* Problem-Solution Split */}
        <ProblemSolutionSection />


        {/* Comparison Snapshot v2 */}
        <ComparisonSnapshotV2 />

        {/* ROI Slider Teaser */}
        <ROISliderTeaser />

        {/* Growth Library Teaser */}
        <GrowthLibraryTeaser />

        {/* Social Proof Carousel */}
        <TestimonialCarousel />

        {/* Pricing Tiles - Updated to V2 */}
        <PricingSectionV2 />

        {/* FAQ Accordion */}
        <FAQSection />

        {/* Closing CTA */}
        <ClosingCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
