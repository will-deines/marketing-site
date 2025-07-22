"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export default function CinematicHero() {
  const [isVisible, setIsVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const scrollToStory = () => {
    const storySection = document.getElementById("mission-vision")
    if (storySection) {
      storySection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectFit: "cover" }}
          poster="/images/about-hero.jpg"
        >
          <source src="/videos/about-hero.av1.webm" type="video/webm" />
          <source src="/videos/about-hero.h265.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-purple-600/70 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        <div
          className={`max-w-3xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            You launched to build something that matters.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            We built Garrio because we know what it&apos;s like to chase your dream, bootstrap a brand, and get buried under &ldquo;Where&rsquo;s my order?&rdquo; messages.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent border-white text-white hover:bg-white/10"
            onClick={scrollToStory}
          >
            Our Story ↓
          </Button>
        </div>
      </div>
    </section>
  )
}
