"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PricingHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Image Background - Growth metrics dashboard */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/growth-metrics-mobile.avif" type="image/avif" />
          <source media="(max-width: 767px)" srcSet="/images/growth-metrics-mobile.webp" type="image/webp" />
          <source media="(max-width: 767px)" srcSet="/images/growth-metrics-mobile.jpg" type="image/jpeg" />
          <source srcSet="/images/growth-metrics.avif" type="image/avif" />
          <source srcSet="/images/growth-metrics.webp" type="image/webp" />
          <img 
            src="/images/growth-metrics.jpg" 
            alt="Business growth metrics dashboard background" 
            className="absolute inset-0 w-full h-full object-cover filter blur-md scale-150" 
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
        </picture>
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Support tools for indie brands competing with giants
          </h1>
        </div>

        {/* Glassmorphism Card */}
        <div
          className={`max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8 md:p-12 shadow-xl border border-white/20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Instant, elevated customer experience that puts you totally in control—without wasting your time.</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
                <Link href="https://apps.shopify.com/app-installation" target="_blank" rel="noopener noreferrer">
                  Install Free on Shopify
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="#calculator">Calculate cost →</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
