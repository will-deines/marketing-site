"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, Sparkles, Zap, ArrowRight } from "lucide-react"

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
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-400"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-200"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Elegant badge */}
          <div className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-6 py-3 rounded-full text-sm font-medium border border-white/20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <Sparkles className="w-4 h-4" />
            Enterprise features without the enterprise price
          </div>

          {/* Main headline */}
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.9]">
              Moving on from
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200">
                Shopify Inbox?
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className={`text-xl md:text-2xl lg:text-3xl text-white/80 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            Built for growing brands who deserve better than basic 
            but are smarter than overpaying.
          </p>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center pt-4 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <Button
              size="lg"
              className="bg-white text-purple-900 hover:bg-white/90 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 text-lg px-8 py-6 h-auto rounded-2xl font-semibold group"
              asChild
            >
              <Link href="https://apps.shopify.com/app-installation" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <Zap className="w-5 h-5" />
                Get Your Freedom Back
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm text-lg px-8 py-6 h-auto rounded-2xl font-semibold"
              onClick={scrollToFeatures}
            >
              See How It Works
              <ChevronDown className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 text-white/70 text-sm transition-all duration-1000 delay-800 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>5-minute setup</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
