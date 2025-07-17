"use client"

import { useEffect, useState } from "react"

interface Feature {
  name: string
  garrio: string
  competitor: string
}

const features: Feature[] = [
  {
    name: "AI-powered chat",
    garrio: "✅",
    competitor: "Limited",
  },
  {
    name: "Order lookups",
    garrio: "✅",
    competitor: "❌",
  },
  {
    name: "Human handoff",
    garrio: "✅",
    competitor: "❌",
  },
  {
    name: "Upsells",
    garrio: "✅",
    competitor: "❌",
  },
]

export default function ComparisonSnapshotV2() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    const element = document.getElementById("comparison-snapshot")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <section id="comparison-snapshot" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Garrio vs. The Old Way</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">AI-powered support that actually works.</p>

        <div
          className={`max-w-3xl mx-auto rounded-xl shadow-lg overflow-hidden transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-4 px-6 font-medium text-gray-500">Feature</th>
                <th className="py-4 px-6 font-medium text-purple-600 text-center">Garrio</th>
                <th className="py-4 px-6 font-medium text-gray-500 text-center">Other</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature.name} className="border-b border-gray-200">
                  <td className="py-4 px-6 font-medium">{feature.name}</td>
                  <td className="py-4 px-6 text-center">{feature.garrio}</td>
                  <td className="py-4 px-6 text-center">{feature.competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
