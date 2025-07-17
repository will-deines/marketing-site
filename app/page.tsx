import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProblemSolutionSection from "@/components/problem-solution-section";
import TestimonialCarousel from "@/components/testimonial-carousel";
import FAQSection from "@/components/faq-section";
import ClosingCTA from "@/components/closing-cta";
import Footer from "@/components/footer";
import ROISliderTeaser from "@/components/home/roi-slider-teaser";
import InlineDemoBlock from "@/components/home/inline-demo-block";
import ComparisonSnapshotV2 from "@/components/home/comparison-snapshot-v2";
import GrowthLibraryTeaser from "@/components/home/growth-library-teaser";
import PricingSectionV2 from "@/components/home/pricing-section-v2";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="absolute top-0 left-0 right-0 z-20 px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <span className="font-bold text-lg text-white">Garrio</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium text-white hover:underline underline-offset-4"
            href="/features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium text-white hover:underline underline-offset-4"
            href="/pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium text-white hover:underline underline-offset-4"
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium text-white hover:underline underline-offset-4"
            href="/contact"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover filter blur-md scale-110"
              style={{ objectFit: "cover" }}
            >
              <source src="/background-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/40 z-10"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center justify-center space-y-8 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white w-full">
              The only full stack Sales and Customer Experience platform for
              Shopify stores
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white hover:bg-white/20"
                asChild
              >
                <Link href="#">Learn More</Link>
              </Button>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90"
                asChild
              >
                <Link href="#">Start Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Value Banner */}
        <section className="w-full relative overflow-hidden group">
          <div className="bg-gradient-to-r from-purple-600 to-purple-400 py-8 md:py-10">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Why Free-Tier Matters
                  </h2>
                  <p className="text-white/90 text-lg">
                    Shopify-only, built for you
                  </p>
                </div>

                {/* Marquee effect on hover */}
                <div className="w-full md:w-auto overflow-hidden">
                  <div className="flex items-center space-x-8 group-hover:animate-marquee whitespace-nowrap">
                    <span className="text-white text-xl font-medium">
                      Setup in minutes
                    </span>
                    <span className="text-white">•</span>
                    <span className="text-white text-xl font-medium">
                      Generous Free tier
                    </span>
                    <span className="text-white">•</span>
                    <span className="text-white text-xl font-medium">
                      Smarter with every sale 🚀
                    </span>
                  </div>
                </div>
              </div>

              {/* Cinemagraphs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/background-video.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="text-white font-medium">
                      Indie shop owner unboxing
                    </span>
                  </div>
                </div>
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/background-video.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="text-white font-medium">
                      Packing orders
                    </span>
                  </div>
                </div>
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/background-video.mp4" type="video/mp4" />
                  </video>
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

        {/* Inline Demo Block */}
        <InlineDemoBlock />

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
