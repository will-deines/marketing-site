"use client"

import Link from "next/link"
import { useEffect, useState, useRef } from "react"

import { Button } from "@/components/ui/button"

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
      className={`w-full bg-gradient-to-r from-purple-900 via-purple-700 to-indigo-800 py-8 transition-all duration-500 relative overflow-hidden ${
        isSticky ? "fixed bottom-0 left-0 z-50 shadow-2xl" : ""
      } ${hasAppeared ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 animate-pulse" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-300/10 rounded-full blur-3xl animate-float-delayed" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Ready to transform your customer experience?
            </h2>
            <p className="text-purple-100/80 text-lg">
              Join 500+ Shopify founders • Free forever • Launch in 3 minutes
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              size="lg"
              className={`bg-white text-purple-900 hover:bg-white/95 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 font-semibold ${
                isPulsing ? "animate-pulse ring-4 ring-white/50" : ""
              }`}
              asChild
            >
              <Link href="https://apps.shopify.com/garrio" target="_blank" rel="noopener noreferrer">
                Install on Shopify
              </Link>
            </Button>
            <Link
              href="#demo"
              className="text-white/90 hover:text-white underline underline-offset-4 decoration-2 decoration-white/30 hover:decoration-white/60 transition-all duration-300 font-medium"
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
