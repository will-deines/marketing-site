"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  // Restart video every 8 seconds for seamless loop
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const interval = setInterval(() => {
      if (videoElement) {
        videoElement.currentTime = 0
        videoElement.play()
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  // Animate timeline in sync with video
  useEffect(() => {
    const videoElement = videoRef.current
    const timelineElement = timelineRef.current
    if (!videoElement || !timelineElement) return

    const handleTimeUpdate = () => {
      const progress = (videoElement.currentTime / videoElement.duration) * 100
      const steps = timelineElement.querySelectorAll(".timeline-step")

      steps.forEach((step, index) => {
        const stepEl = step as HTMLElement
        const threshold = (index + 1) * 25

        if (progress >= threshold) {
          stepEl.classList.add("active")
        } else {
          stepEl.classList.remove("active")
        }
      })
    }

    videoElement.addEventListener("timeupdate", handleTimeUpdate)
    return () => videoElement.removeEventListener("timeupdate", handleTimeUpdate)
  }, [])

  // Fade in animation
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("feature-pillars")
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      <div
        className={`relative z-10 container mx-auto px-4 py-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Moving on from Shopify Inbox but don&apos;t want to spend thousands on enterprise?
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Get enterprise-level support without the enterprise price tag. Built for growing brands who deserve better than basic but smarter than overpaying.
          </p>
        </div>


        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
            <Link href="https://apps.shopify.com/app-installation" target="_blank" rel="noopener noreferrer">
              Get Your Freedom Back
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent border-white text-white hover:bg-white/10"
            onClick={scrollToFeatures}
          >
            See How It Works <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

    </section>
  )
}
