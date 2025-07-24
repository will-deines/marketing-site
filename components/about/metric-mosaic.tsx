"use client"

import { useEffect, useRef, useState } from "react"
import { Clock, TrendingUp, CheckCircle, Star, BarChart3 } from "lucide-react"

interface Metric {
  id: string
  value: string
  caption: string
  startValue: number
  endValue: number
  unit: string
  color: string
  gradient: string
  icon: React.ReactNode
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
    gradient: "from-purple-500 to-indigo-500",
    icon: <Clock className="w-6 h-6" />,
  },
  {
    id: "revenue-lift",
    value: "+22%",
    caption: "Average revenue lift from upsell prompts",
    startValue: 0,
    endValue: 22,
    unit: "%",
    color: "bg-green-500",
    gradient: "from-green-500 to-emerald-500",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    id: "resolution-rate",
    value: "98%",
    caption: "Tickets resolved without merchant touch",
    startValue: 0,
    endValue: 98,
    unit: "%",
    color: "bg-blue-500",
    gradient: "from-blue-500 to-cyan-500",
    icon: <CheckCircle className="w-6 h-6" />,
  },
  {
    id: "app-rating",
    value: "4.9★",
    caption: "Shopify App Store rating",
    startValue: 0,
    endValue: 4.9,
    unit: "★",
    color: "bg-amber-500",
    gradient: "from-amber-500 to-orange-500",
    icon: <Star className="w-6 h-6" />,
  },
]

export default function MetricMosaic() {
  const [visibleMetrics, setVisibleMetrics] = useState<string[]>([])
  const [animatedMetrics, setAnimatedMetrics] = useState<string[]>([])
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
            // Once observed and added to visible metrics, stop observing
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    const currentRefs = metricRefs.current
    Object.values(currentRefs).forEach((ref) => {
      if (ref && !visibleMetrics.includes(ref.getAttribute("data-id") || "")) {
        observer.observe(ref)
      }
    })

    return () => {
      Object.values(currentRefs).forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  // Animate values when they become visible
  useEffect(() => {
    visibleMetrics.forEach((id) => {
      // Skip if already animated
      if (animatedMetrics.includes(id)) return
      
      const metric = metrics.find((m) => m.id === id)
      if (!metric) return

      // Mark as animated
      setAnimatedMetrics((prev) => [...prev, id])

      const startValue = metric.startValue
      const endValue = metric.endValue
      const duration = 2000 // ms (increased from 1500)
      const stepTime = 50 // ms (increased from 20 for smoother animation)
      const steps = duration / stepTime
      const valueIncrement = (endValue - startValue) / steps

      let currentStep = 0
      let currentValue = startValue

      const interval = setInterval(() => {
        currentStep++
        // Use easing function for smoother animation
        const progress = currentStep / steps
        const easedProgress = 1 - Math.pow(1 - progress, 3) // Ease-out cubic
        currentValue = startValue + (endValue - startValue) * easedProgress

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
  }, [visibleMetrics, animatedMetrics])

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
    <section className="py-20 md:py-32 bg-gradient-to-br from-gray-50 via-white to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BarChart3 className="w-4 h-4" />
            Our Impact
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Numbers That
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Matter
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from real founders who transformed their support into a growth engine
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <div
              key={metric.id}
              ref={(el) => (metricRefs.current[metric.id] = el)}
              data-id={metric.id}
              className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100 ${
                index % 2 === 1 ? "md:transform md:translate-y-8" : ""
              } ${
                visibleMetrics.includes(metric.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 bg-gradient-to-br ${metric.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {metric.icon}
              </div>

              {/* Value */}
              <div className={`text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${metric.gradient}`}>
                {visibleMetrics.includes(metric.id) ? formatValue(metric.id) : metric.value}
              </div>

              {/* Caption */}
              <p className="text-gray-600 mb-6 leading-relaxed">{metric.caption}</p>

              {/* Progress bar */}
              <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${metric.gradient} transition-all duration-[2000ms] ease-out rounded-full`}
                  style={{
                    width: visibleMetrics.includes(metric.id)
                      ? `${(animatedValues[metric.id] / metric.endValue) * 100}%`
                      : "0%",
                  }}
                ></div>
              </div>

              {/* Decorative gradient blur */}
              <div className={`absolute -inset-x-4 -bottom-4 h-1/2 bg-gradient-to-t ${metric.gradient} opacity-5 blur-3xl group-hover:opacity-10 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="mt-20 text-center">
          <p className="text-sm text-gray-500">
            Data from last 30 days across all active Garrio stores
          </p>
        </div>
      </div>
    </section>
  )
}
