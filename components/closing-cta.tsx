"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ClosingCTA() {
  const [isPulsing, setIsPulsing] = useState(false)

  // Set up pulsing animation every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(true)

      // Reset pulsing state after animation completes
      setTimeout(() => {
        setIsPulsing(false)
      }, 1000)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden">
      {/* Image Background - Team collaboration scene */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/team-collaboration-mobile.avif" type="image/avif" />
          <source media="(max-width: 767px)" srcSet="/images/team-collaboration-mobile.webp" type="image/webp" />
          <source media="(max-width: 767px)" srcSet="/images/team-collaboration-mobile.jpg" type="image/jpeg" />
          <source srcSet="/images/team-collaboration.avif" type="image/avif" />
          <source srcSet="/images/team-collaboration.webp" type="image/webp" />
          <img 
            src="/images/team-collaboration.jpg" 
            alt="Team collaboration background" 
            className="absolute inset-0 w-full h-full object-cover scale-120 filter brightness-50" 
            style={{ objectFit: "cover", transform: "scale(1.2)" }}
            loading="lazy"
          />
        </picture>
        <div className="absolute inset-0 bg-purple-900/60 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Your Customers Are Waiting
          </h2>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-10">
            Don&apos;t let another potential sale slip through the cracks. Set up Garrio in 3 minutes and start converting questions into customers today.
          </p>

          <Button
            size="lg"
            className={`bg-white text-purple-900 hover:bg-white/90 text-lg px-8 py-6 h-auto transition-all ${
              isPulsing ? "animate-pulse-once scale-105" : ""
            }`}
            asChild
          >
            <Link href="https://apps.shopify.com/app-installation" target="_blank" rel="noopener noreferrer">
              Add to Shopify
            </Link>
          </Button>

          <p className="text-white/80 mt-6">
            Already have an account?{" "}
            <Link href="#" className="text-white underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
