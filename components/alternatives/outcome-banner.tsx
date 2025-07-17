"use client"

import { useEffect, useRef, useState } from "react"

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
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
    <section ref={sectionRef} className="py-12 bg-gradient-to-r from-purple-800 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center justify-center">
                <span className="text-4xl md:text-5xl font-bold">
                  {isVisible ? Math.round(animatedValues[index]) : 0}
                </span>
                <span className="text-xl ml-1">{metric.unit}</span>
              </div>
              <p className="text-white/80 mt-2">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
