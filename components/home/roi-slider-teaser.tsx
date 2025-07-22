"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ClaimsModal from "@/components/ui/claims-modal"

// ROI calculation function - calculates both time and money savings
const calculateSavings = (interactions: number) => {
  const automationRate = 0.85 // 85% of interactions handled by AI
  const avgTimePerInteraction = 4 // minutes per interaction
  const agentWage = 14 // USD per hour
  
  const automatedInteractions = interactions * automationRate
  const humanInteractions = interactions * (1 - automationRate)
  
  // Time savings calculation
  const totalTimeWithoutAI = interactions * avgTimePerInteraction // minutes
  const timeWithAI = humanInteractions * avgTimePerInteraction // only human interactions take time
  const timeSaved = totalTimeWithoutAI - timeWithAI // minutes saved
  const hoursSaved = Math.round(timeSaved / 60 * 10) / 10 // hours, rounded to 1 decimal
  
  // Money savings calculation  
  const costWithoutAI = (totalTimeWithoutAI / 60) * agentWage
  const costWithAI = (timeWithAI / 60) * agentWage
  const moneySaved = Math.round(costWithoutAI - costWithAI)
  
  return {
    hoursSaved,
    moneySaved,
    automatedInteractions: Math.round(automatedInteractions)
  }
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
  const [interactions, setInteractions] = useState(250)
  const [displayedHours, setDisplayedHours] = useState(0)
  const [displayedMoney, setDisplayedMoney] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const previousHours = useRef(0)
  const previousMoney = useRef(0)

  // Calculate initial savings on mount
  useEffect(() => {
    const savings = calculateSavings(interactions)
    setDisplayedHours(savings.hoursSaved)
    setDisplayedMoney(savings.moneySaved)
    previousHours.current = savings.hoursSaved
    previousMoney.current = savings.moneySaved
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- interactions excluded: only for initial calc, updates handled by handleSliderChange with animation

  // Handle slider change with animated transition
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInteractions = Number.parseInt(e.target.value, 10)
    setInteractions(newInteractions)

    const newSavings = calculateSavings(newInteractions)
    
    // Animate hours saved
    animateValue(previousHours.current, newSavings.hoursSaved, 200, (value) => {
      setDisplayedHours(Math.round(value * 10) / 10)
    })
    
    // Animate money saved
    animateValue(previousMoney.current, newSavings.moneySaved, 200, (value) => {
      setDisplayedMoney(Math.round(value))
    })
    
    previousHours.current = newSavings.hoursSaved
    previousMoney.current = newSavings.moneySaved

    // Track analytics event (debounced)
    const timer = setTimeout(() => {
      console.log("roi_slider_change", { 
        interactions: newInteractions, 
        hoursSaved: newSavings.hoursSaved, 
        moneySaved: newSavings.moneySaved 
      })
    }, 200)

    return () => clearTimeout(timer)
  }

  // Track CTA click
  const handleCTAClick = () => {
    // Analytics tracking
    console.log("roi_teaser_cta_click", { 
      interactions: interactions, 
      hoursSaved: displayedHours, 
      moneySaved: displayedMoney 
    })
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
        <h3 className="text-3xl font-semibold text-center mb-4">What if you could get 5 hours of your week back?</h3>
        <p className="text-center text-gray-600 mb-8">Time you&apos;re not answering the same questions is time you can spend on product development, marketing, or actually taking a break.</p>

        <div className="w-full">
          {/* Slider with clear labeling */}
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>50 interactions/month</span>
            <span className="font-medium">{interactions} customer interactions per month</span>
            <span>2,000 interactions/month</span>
          </div>
          
          <input
            type="range"
            id="roi-slider"
            min={50}
            max={2000}
            step={50}
            value={interactions}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
            aria-valuetext={`${interactions} customer interactions per month`}
            style={
              {
                // Custom styling for the slider thumb
                "--thumb-color": "hsl(var(--brand-primary))",
                "--track-color": "rgb(229, 231, 235)",
              } as React.CSSProperties
            }
          />

          <div className="flex flex-col items-center mt-8">
            {/* Time and Money Savings Display */}
            <div className="grid grid-cols-2 gap-8 w-full max-w-md">
              <div className="text-center">
                <div
                  className="text-3xl md:text-4xl font-bold text-[hsl(var(--brand-primary))] tabular-nums"
                  aria-live="polite"
                >
                  {displayedHours}h
                </div>
                <p className="text-sm text-gray-600 mt-1">hours saved</p>
              </div>
              
              <div className="text-center">
                <div
                  className="text-3xl md:text-4xl font-bold text-[hsl(var(--brand-primary))] tabular-nums"
                  aria-live="polite"
                >
                  ${displayedMoney}
                </div>
                <p className="text-sm text-gray-600 mt-1">cost saved</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mt-4">Time and money you save each month vs. handling every customer question yourself</p>
              <ClaimsModal 
                title="ROI Calculation Methodology"
                size="md"
              />
            </div>

            <Button
              className="h-12 px-8 mt-6 bg-[hsl(var(--brand-primary))] text-white rounded-lg font-medium w-full md:w-auto hover:scale-103 hover:shadow-lg transition-all duration-150"
              asChild
              onClick={handleCTAClick}
              aria-label={`Open full ROI calculator with ${interactions} interactions`}
            >
              <Link href={`/roi-calculator?interactions=${interactions}&utm_source=home_roi_teaser`}>See your full ROI →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
