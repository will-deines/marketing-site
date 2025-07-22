import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
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
          blur="md"
          scale="110"
          overlay="black"
          overlayOpacity="40"
          height="screen"
          posterSrc="/images/homepage-hero.jpg"
          reducedMotionFallback="/images/homepage-hero.jpg"
        >
          <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center space-y-8 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white w-full">
              Build the brand you always dreamed of
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mt-4 max-w-3xl">
              Garrio turns support tickets into upsells, complaints into loyalty, and every interaction into revenue—while you focus on what you love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white hover:bg-white/20"
                asChild
              >
                <Link href="#demo">See How It Works</Link>
              </Button>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90"
                asChild
              >
                <Link href="https://apps.shopify.com/app-installation" target="_blank" rel="noopener noreferrer">
                  Start Building Today
                </Link>
              </Button>
            </div>
          </div>
        </HeroVideoBackground>

        {/* Value Banner */}
        <section className="w-full relative overflow-hidden group">
          <div className="bg-gradient-to-r from-purple-600 to-purple-400 py-8 md:py-10">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Wake up to happy customers, not endless tickets
                  </h2>
                  <p className="text-white/90 text-lg">
                    Every question answered, every order tracked, every upsell opportunity captured—all while you focus on growing the business you built from the ground up.
                  </p>
                </div>

                {/* Marquee effect on hover */}
                <div className="w-full md:w-auto overflow-hidden">
                  <div className="flex items-center space-x-8 group-hover:animate-marquee whitespace-nowrap">
                    <span className="text-white text-xl font-medium">
                      No setup fees
                    </span>
                    <span className="text-white">•</span>
                    <span className="text-white text-xl font-medium">
                      Generous free tier
                    </span>
                    <span className="text-white">•</span>
                    <span className="text-white text-xl font-medium">
                      Pays for itself with first upsell 🚀
                    </span>
                  </div>
                </div>
              </div>

              {/* Hero Images */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <picture>
                    <source media="(max-width: 767px)" srcSet="/images/indie-unboxing-final-mobile.avif" type="image/avif" />
                    <source media="(max-width: 767px)" srcSet="/images/indie-unboxing-final-mobile.webp" type="image/webp" />
                    <source media="(max-width: 767px)" srcSet="/images/indie-unboxing-final-mobile.jpg" type="image/jpeg" />
                    <source srcSet="/images/indie-unboxing-final.avif" type="image/avif" />
                    <source srcSet="/images/indie-unboxing-final.webp" type="image/webp" />
                    <img 
                      src="/images/indie-unboxing-final.jpg" 
                      alt="Indie shop owner unboxing packages" 
                      className="absolute inset-0 w-full h-full object-cover" 
                      loading="lazy"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="text-white font-medium">
                      Indie shop owner unboxing
                    </span>
                  </div>
                </div>
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <picture>
                    <source media="(max-width: 767px)" srcSet="/images/product-showcase-mobile.avif" type="image/avif" />
                    <source media="(max-width: 767px)" srcSet="/images/product-showcase-mobile.webp" type="image/webp" />
                    <source media="(max-width: 767px)" srcSet="/images/product-showcase-mobile.jpg" type="image/jpeg" />
                    <source srcSet="/images/product-showcase.avif" type="image/avif" />
                    <source srcSet="/images/product-showcase.webp" type="image/webp" />
                    <img 
                      src="/images/product-showcase.jpg" 
                      alt="Modern e-commerce product management dashboard" 
                      className="absolute inset-0 w-full h-full object-cover" 
                      loading="lazy"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="text-white font-medium">
                      Product showcase
                    </span>
                  </div>
                </div>
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <picture>
                    <source media="(max-width: 767px)" srcSet="/images/customer-support-mobile.avif" type="image/avif" />
                    <source media="(max-width: 767px)" srcSet="/images/customer-support-mobile.webp" type="image/webp" />
                    <source media="(max-width: 767px)" srcSet="/images/customer-support-mobile.jpg" type="image/jpeg" />
                    <source srcSet="/images/customer-support.avif" type="image/avif" />
                    <source srcSet="/images/customer-support.webp" type="image/webp" />
                    <img 
                      src="/images/customer-support.jpg" 
                      alt="Professional customer support representative with headset" 
                      className="absolute inset-0 w-full h-full object-cover" 
                      loading="lazy"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="text-white font-medium">
                      Customer experience
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
