import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import { Sparkles, Zap, ArrowRight, CheckCircle, ChevronDown } from "lucide-react";
import HeroVideoBackground from "@/components/hero-video-background";
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

export default function Home() {
  // Structured data for search engines and AI agents
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
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Structured Data for SEO and AI agents */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main className="flex-1" role="main">
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
        <HeroVideoBackground
          videoSrc="/videos/homepage-hero"
          blur="sm"
          scale="110"
          overlay="black"
          overlayOpacity="50"
          height="screen"
          posterSrc="/images/homepage-hero.jpg"
          reducedMotionFallback="/images/homepage-hero.jpg"
        >
          <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center min-h-screen">
            <div className="max-w-5xl mx-auto text-center space-y-12">
              {/* Elegant badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-6 py-3 rounded-full text-sm font-medium border border-white/20 animate-fade-in">
                <Sparkles className="w-4 h-4" />
                For Shopify founders ready to scale
              </div>

              {/* Main headline */}
              <div className="space-y-6 animate-fade-in-up">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.9]">
                  Build the brand
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200">
                    you always
                  </span>
                  <br />
                  dreamed of
                </h1>
              </div>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
                Your AI + human support team handles every customer while you focus on growth
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4 animate-fade-in-up animation-delay-400">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-white/90 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 text-lg px-8 py-6 h-auto rounded-2xl font-semibold group"
                  asChild
                >
                  <Link href="https://apps.shopify.com/app-installation" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                    <Zap className="w-5 h-5" />
                    Start Building Today
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm text-lg px-8 py-6 h-auto rounded-2xl font-semibold"
                  asChild
                >
                  <Link href="#how-it-works" className="flex items-center gap-2">
                    See How It Works
                    <ChevronDown className="w-5 h-5" />
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 text-white/70 text-sm animate-fade-in animation-delay-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>3-minute setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>500+ founders trust us</span>
                </div>
              </div>
            </div>
          </div>
        </HeroVideoBackground>

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
