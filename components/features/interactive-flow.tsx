"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

interface Result {
  icon: string
  title: string
  description: string
  metric: string
}

const results: Result[] = [
  {
    icon: "⚡",
    title: "Instant responses",
    description: "Customers get answers immediately, even at 2 AM",
    metric: "15 second avg response"
  },
  {
    icon: "🎯",
    title: "Personal touch",
    description: "Every response sounds like it came from you",
    metric: "4.9★ customer satisfaction"
  },
  {
    icon: "🎨",
    title: "Your creative time back",
    description: "Spend time designing instead of answering repetitive questions",
    metric: "18 hours saved per week"
  }
]

export default function SimpleResults() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
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

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple setup, powerful results</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            No complex workflows or enterprise training needed. Just the outcomes you've been dreaming of.
          </p>
        </div>

        <div
          ref={sectionRef}
          className={`grid md:grid-cols-3 gap-8 max-w-5xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {results.map((result, index) => (
            <div
              key={result.title}
              className="text-center p-8 bg-gradient-to-br from-purple-50 to-green-50 rounded-2xl"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="text-5xl mb-4">{result.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{result.title}</h3>
              <p className="text-gray-600 mb-4">{result.description}</p>
              <div className="bg-white px-4 py-2 rounded-full text-purple-700 font-semibold text-sm inline-block">
                {result.metric}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gray-100 p-6 rounded-xl max-w-2xl mx-auto">
            <p className="text-gray-700 italic">
              "I went from checking my support email every 30 minutes to checking it once a week. 
              My stress levels dropped, my creativity came back, and my customers are happier than ever."
            </p>
            <p className="text-gray-500 mt-2">— Maria, founder of Bloom & Thread</p>
          </div>
        </div>
      </div>
    </section>
  )
}
