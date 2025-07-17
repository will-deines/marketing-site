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
            AI answers. Agents finish. You just watch sales grow.
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Built exclusively for Shopify data. Free to start. No tickets left behind.
          </p>
        </div>

        {/* Split-screen video */}
        <div className="relative max-w-5xl mx-auto bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="aspect-video">
            <video ref={videoRef} autoPlay muted playsInline loop className="w-full h-full object-cover">
              <source src="/background-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Timeline UI overlay */}
            <div
              ref={timelineRef}
              className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 flex items-center justify-center"
            >
              <div className="flex items-center space-x-4 md:space-x-8">
                <div className="timeline-step flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                    1
                  </div>
                  <span className="text-xs md:text-sm text-white mt-1">AI Reply</span>
                </div>
                <div className="h-0.5 w-8 md:w-16 bg-gray-500 timeline-connector"></div>
                <div className="timeline-step flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white">2</div>
                  <span className="text-xs md:text-sm text-white mt-1">Detect Issue</span>
                </div>
                <div className="h-0.5 w-8 md:w-16 bg-gray-500 timeline-connector"></div>
                <div className="timeline-step flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white">3</div>
                  <span className="text-xs md:text-sm text-white mt-1">Escalate</span>
                </div>
                <div className="h-0.5 w-8 md:w-16 bg-gray-500 timeline-connector"></div>
                <div className="timeline-step flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white">4</div>
                  <span className="text-xs md:text-sm text-white mt-1">Resolve</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
            <Link href="https://apps.shopify.com/app-installation" target="_blank" rel="noopener noreferrer">
              Get Started Free
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent border-white text-white hover:bg-white/10"
            onClick={scrollToFeatures}
          >
            Explore the Features <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* CSS for timeline animation */}
      <style jsx global>{`
        .timeline-step.active div {
          background-color: rgb(147, 51, 234); /* purple-600 */
        }
        
        .timeline-step.active + .timeline-connector {
          background-color: rgb(147, 51, 234); /* purple-600 */
          transition: background-color 0.3s ease;
        }
      `}</style>
    </section>
  )
}
