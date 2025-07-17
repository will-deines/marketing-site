"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LastChanceCTA() {
  const [isSticky, setIsSticky] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)
  const [hasAppeared, setHasAppeared] = useState(false)
  const ctaRef = useRef<HTMLDivElement>(null)
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Handle scroll and idle detection
  useEffect(() => {
    const handleScroll = () => {
      // Check if user is near the bottom of the page
      const scrollPosition = window.scrollY + window.innerHeight
      const pageHeight = document.body.offsetHeight
      const isNearBottom = scrollPosition > pageHeight - 500

      // Reset idle timer on scroll
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }

      // Set idle timer if near bottom
      if (isNearBottom) {
        idleTimerRef.current = setTimeout(() => {
          setIsSticky(true)
        }, 8000) // 8 seconds
      } else {
        setIsSticky(false)
      }

      // Set hasAppeared once when element is in view
      if (!hasAppeared && ctaRef.current) {
        const rect = ctaRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setHasAppeared(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }
    }
  }, [hasAppeared])

  // Set up pulsing animation every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(true)

      // Reset pulsing state after animation completes
      setTimeout(() => {
        setIsPulsing(false)
      }, 1000)
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      ref={ctaRef}
      className={`w-full bg-gradient-to-r from-purple-800 to-purple-600 py-6 transition-all duration-500 ${
        isSticky ? "fixed bottom-0 left-0 z-50 shadow-lg" : ""
      } ${hasAppeared ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-0">
            Add Garrio Chat to your Shopify store—free forever, launch in 3 minutes.
          </h2>
          <div className="flex items-center space-x-4">
            <Button
              size="lg"
              className={`bg-white text-purple-900 hover:bg-white/90 transition-all ${
                isPulsing ? "animate-pulse-once" : ""
              }`}
              asChild
            >
              <Link href="https://apps.shopify.com/app-installation" target="_blank" rel="noopener noreferrer">
                Install on Shopify
              </Link>
            </Button>
            <Link
              href="#demo"
              className="text-white underline underline-offset-4 hover:text-white/80 transition-colors"
              onClick={(e) => {
                e.preventDefault()
                const demoSection = document.getElementById("demo")
                if (demoSection) {
                  demoSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              See live demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
