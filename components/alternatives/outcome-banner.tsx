"use client"

import { useEffect, useRef, useState } from "react"
import ClaimsModal from "@/components/ui/claims-modal"

interface Metric {
  value: number
  label: string
  unit: string
  color: string
}

const metrics: Metric[] = [
  {
    value: 11,
    label: "Hours saved per week",
    unit: "hrs",
    color: "bg-purple-600",
  },
  {
    value: 22,
    label: "Revenue lift from upsells",
    unit: "%",
    color: "bg-green-500",
  },
  {
    value: 98,
    label: "Tickets auto-resolved",
    unit: "%",
    color: "bg-blue-500",
  },
]

export default function OutcomeBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState<number[]>(metrics.map(() => 0))
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
      },
    )

    const currentSection = sectionRef.current
    if (currentSection) {
      observer.observe(currentSection)
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection)
      }
    }
  }, [])

  // Animate values when section becomes visible
  useEffect(() => {
    if (!isVisible) return

    metrics.forEach((metric, index) => {
      const startValue = 0
      const endValue = metric.value
      const duration = 1500 // ms
      const stepTime = 20 // ms
      const steps = duration / stepTime
      const valueIncrement = (endValue - startValue) / steps

      let currentStep = 0
      let currentValue = startValue

      const interval = setInterval(() => {
        currentStep++
        currentValue += valueIncrement

        if (currentStep >= steps) {
          clearInterval(interval)
          currentValue = endValue
        }

        setAnimatedValues((prev) => {
          const newValues = [...prev]
          newValues[index] = currentValue
          return newValues
        })
      }, stepTime)

      return () => clearInterval(interval)
    })
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-gradient-to-br from-purple-800 via-purple-700 to-indigo-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white/90">
            Proven Results for Shopify Merchants
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Join thousands of merchants who've transformed their customer service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors duration-300">
                <div className="flex items-center justify-center mb-3">
                  <span className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-br from-white to-purple-100 bg-clip-text text-transparent">
                    {isVisible ? Math.round(animatedValues[index]) : 0}
                  </span>
                  <span className="text-2xl md:text-3xl ml-2 text-white/90">{metric.unit}</span>
                </div>
                <p className="text-white/80 text-lg font-medium leading-relaxed">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Claims Sources */}
        <div className="text-center mt-10">
          <ClaimsModal 
            title="Outcome Metrics Sources"
            size="md"
          />
        </div>
      </div>
    </section>
  )
}
