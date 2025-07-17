"use client"

import { useEffect, useRef, useState } from "react"

interface Metric {
  id: string
  value: string
  caption: string
  startValue: number
  endValue: number
  unit: string
  color: string
}

const metrics: Metric[] = [
  {
    id: "time-saved",
    value: "11 hrs",
    caption: "Founder time saved per week (median across Free plans)",
    startValue: 0,
    endValue: 11,
    unit: "hrs",
    color: "bg-purple-600",
  },
  {
    id: "revenue-lift",
    value: "+22%",
    caption: "Average revenue lift from upsell prompts",
    startValue: 0,
    endValue: 22,
    unit: "%",
    color: "bg-green-500",
  },
  {
    id: "resolution-rate",
    value: "98%",
    caption: "Tickets resolved without merchant touch",
    startValue: 0,
    endValue: 98,
    unit: "%",
    color: "bg-blue-500",
  },
  {
    id: "app-rating",
    value: "4.9★",
    caption: "Shopify App Store rating",
    startValue: 0,
    endValue: 4.9,
    unit: "★",
    color: "bg-amber-500",
  },
]

export default function MetricMosaic() {
  const [visibleMetrics, setVisibleMetrics] = useState<string[]>([])
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({})
  const metricRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Initialize animated values
  useEffect(() => {
    const initialValues: { [key: string]: number } = {}
    metrics.forEach((metric) => {
      initialValues[metric.id] = metric.startValue
    })
    setAnimatedValues(initialValues)
  }, [])

  // Handle intersection observation for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id")
          if (id && entry.isIntersecting && !visibleMetrics.includes(id)) {
            setVisibleMetrics((prev) => [...prev, id])
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    Object.values(metricRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      Object.values(metricRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [visibleMetrics])

  // Animate values when they become visible
  useEffect(() => {
    visibleMetrics.forEach((id) => {
      const metric = metrics.find((m) => m.id === id)
      if (!metric) return

      const startValue = metric.startValue
      const endValue = metric.endValue
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

        setAnimatedValues((prev) => ({
          ...prev,
          [id]: currentValue,
        }))
      }, stepTime)

      return () => clearInterval(interval)
    })
  }, [visibleMetrics])

  // Format animated value based on metric
  const formatValue = (id: string): string => {
    const metric = metrics.find((m) => m.id === id)
    if (!metric) return ""

    const value = animatedValues[id] || metric.startValue

    if (metric.id === "app-rating") {
      return value.toFixed(1) + metric.unit
    }

    if (metric.id === "revenue-lift") {
      return "+" + Math.round(value) + metric.unit
    }

    return Math.round(value) + " " + metric.unit
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Numbers That Matter</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <div
              key={metric.id}
              ref={(el) => (metricRefs.current[metric.id] = el)}
              data-id={metric.id}
              className={`bg-white rounded-xl border border-gray-200 p-6 shadow-md transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
                index % 2 === 1 ? "md:transform md:translate-y-8" : ""
              }`}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {visibleMetrics.includes(metric.id) ? formatValue(metric.id) : metric.value}
              </div>
              <p className="text-gray-600 mb-4">{metric.caption}</p>

              {/* Micro bar chart */}
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${metric.color} transition-all duration-1500 ease-out`}
                  style={{
                    width: visibleMetrics.includes(metric.id)
                      ? `${(animatedValues[metric.id] / metric.endValue) * 100}%`
                      : "0%",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
