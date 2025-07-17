"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ROI calculation function (simplified version of the full calculator)
const calculateMonthlySavings = (chatVolume: number): number => {
  const automationRate = 0.98
  const ticketsPerHour = 20
  const agentWage = 14

  const humanTickets = chatVolume * (1 - automationRate)
  const agentHours = humanTickets / ticketsPerHour
  const agentCost = agentHours * agentWage
  const softwareCost = 0 // Free tier covers up to 250 chats

  return Math.round(agentCost + softwareCost)
}

// Animation utility for smooth number transitions
const animateValue = (start: number, end: number, duration: number, callback: (value: number) => void) => {
  const startTime = performance.now()

  const updateValue = (currentTime: number) => {
    const elapsedTime = currentTime - startTime

    if (elapsedTime > duration) {
      callback(end)
      return
    }

    const progress = elapsedTime / duration
    const easedProgress = 1 - Math.pow(1 - progress, 3) // Cubic ease-out
    const currentValue = Math.round(start + (end - start) * easedProgress)

    callback(currentValue)
    requestAnimationFrame(updateValue)
  }

  requestAnimationFrame(updateValue)
}

export default function ROISliderTeaser() {
  const [chatVolume, setChatVolume] = useState(250)
  const [displayedSavings, setDisplayedSavings] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const previousSavings = useRef(0)

  // Calculate initial savings
  useEffect(() => {
    const savings = calculateMonthlySavings(chatVolume)
    setDisplayedSavings(savings)
    previousSavings.current = savings
  }, [])

  // Handle slider change with animated transition
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChatVolume = Number.parseInt(e.target.value, 10)
    setChatVolume(newChatVolume)

    const newSavings = calculateMonthlySavings(newChatVolume)
    animateValue(previousSavings.current, newSavings, 200, (value) => {
      setDisplayedSavings(value)
    })
    previousSavings.current = newSavings

    // Track analytics event (debounced)
    const timer = setTimeout(() => {
      // Analytics tracking would go here
      console.log("roi_slider_change", { chats: newChatVolume, monthlySaving: newSavings })
    }, 200)

    return () => clearTimeout(timer)
  }

  // Track CTA click
  const handleCTAClick = () => {
    // Analytics tracking
    console.log("roi_teaser_cta_click", { chats: chatVolume, monthlySaving: displayedSavings })
  }

  // Intersection Observer for fade-in effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={containerRef}
      className={cn(
        "bg-gray-50 py-24 px-4 transition-all duration-300",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
    >
      <div className="max-w-xl mx-auto">
        <h3 className="text-3xl font-semibold text-center mb-8">How much could you save?</h3>

        <div className="w-full">
          <input
            type="range"
            id="roi-slider"
            min={50}
            max={2000}
            step={50}
            value={chatVolume}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
            aria-valuetext={`${chatVolume} chats per month`}
            style={
              {
                // Custom styling for the slider thumb
                "--thumb-color": "hsl(var(--brand-primary))",
                "--track-color": "rgb(229, 231, 235)",
              } as React.CSSProperties
            }
          />

          <div className="flex flex-col items-center mt-6">
            <div
              className="text-5xl md:text-5xl font-bold text-[hsl(var(--brand-primary))] tabular-nums"
              aria-live="polite"
            >
              ${displayedSavings} <span className="text-xl font-medium">/mo</span>
            </div>

            <p className="text-sm text-gray-600 mt-2">Saved every month vs hiring a $14/h agent</p>

            <Button
              className="h-12 px-8 mt-6 bg-[hsl(var(--brand-primary))] text-white rounded-lg font-medium w-full md:w-auto hover:scale-103 hover:shadow-lg transition-all duration-150"
              asChild
              onClick={handleCTAClick}
              aria-label={`Open full ROI calculator with ${chatVolume} chats`}
            >
              <Link href={`/roi-calculator?chats=${chatVolume}&utm_source=home_roi_teaser`}>See your full ROI →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
