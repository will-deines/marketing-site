"use client"

import { Check, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface FeatureComparisonProps {
  competitor: {
    name: string
    featureFlags: {
      oneClickShopifyActions: boolean
      doneForYouEscalations: boolean
      builtInUpsells: boolean
      freeTier: boolean
    }
    pricing: {
      overagePerTicket: number
    }
    shopifyRating: number
  }
}

interface Feature {
  id: string
  name: string
  description: string
  garrioValue: boolean | string | number
  competitorKey?: keyof FeatureComparisonProps["competitor"]["featureFlags"] | string
}

export default function FeatureComparison({ competitor }: FeatureComparisonProps) {
  const [visibleRows, setVisibleRows] = useState<string[]>([])
  const rowRefs = useRef<{ [key: string]: HTMLTableRowElement | null }>({})

  // Define features to compare
  const features: Feature[] = [
    {
      id: "done-for-you",
      name: "Done-for-you escalations",
      description: "Complex tickets handled by human agents without merchant involvement",
      garrioValue: true,
      competitorKey: "doneForYouEscalations",
    },
    {
      id: "one-click",
      name: "1-click Shopify actions",
      description: "Edit orders, process returns, apply discounts directly from chat",
      garrioValue: true,
      competitorKey: "oneClickShopifyActions",
    },
    {
      id: "upsells",
      name: "AI upsells",
      description: "Automatically suggest relevant products during support conversations",
      garrioValue: true,
      competitorKey: "builtInUpsells",
    },
    {
      id: "free-tier",
      name: "Free tier",
      description: "Start without paying and scale as you grow",
      garrioValue: true,
      competitorKey: "freeTier",
    },
    {
      id: "overage",
      name: "Overage rate",
      description: "Cost per additional ticket beyond plan limit",
      garrioValue: "$0.10",
      competitorKey: "pricing.overagePerTicket",
    },
    {
      id: "rating",
      name: "Shopify rating",
      description: "Average rating on Shopify App Store",
      garrioValue: "4.9★",
      competitorKey: "shopifyRating",
    },
  ]

  // Handle intersection observation for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id")
          if (id && entry.isIntersecting && !visibleRows.includes(id)) {
            setVisibleRows((prev) => [...prev, id])

            // Fire analytics event (would be implemented with actual analytics)
            if (typeof window !== "undefined") {
              console.log("Analytics event: alt_row_visible", { feature_id: id, competitor: competitor.name })
            }
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    const currentRefs = rowRefs.current
    Object.values(currentRefs).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      Object.values(currentRefs).forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [visibleRows, competitor.name])

  // Get competitor value based on feature
  const getCompetitorValue = (feature: Feature) => {
    if (!feature.competitorKey) return false

    if (feature.competitorKey === "pricing.overagePerTicket") {
      return `$${competitor.pricing.overagePerTicket.toFixed(2)}`
    }

    if (feature.competitorKey === "shopifyRating") {
      return `${competitor.shopifyRating}★`
    }

    return competitor.featureFlags[feature.competitorKey as keyof typeof competitor.featureFlags]
  }

  // Render value (boolean, string, or number)
  const renderValue = (value: boolean | string | number, isGarrio = false) => {
    if (typeof value === "boolean") {
      return value ? (
        <div className="flex items-center justify-center">
          <div className={`rounded-full p-2 ${isGarrio ? "bg-purple-100" : "bg-green-100"}`}>
            <Check className={`h-5 w-5 ${isGarrio ? "text-purple-600" : "text-green-600"}`} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="rounded-full p-2 bg-gray-100">
            <X className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      )
    }

    return (
      <div className={`text-center font-semibold text-lg ${
        isGarrio ? "text-purple-700 bg-purple-50 px-3 py-1 rounded-lg mx-auto inline-block" : "text-gray-700"
      }`}>
        {value}
      </div>
    )
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-900 to-indigo-700 bg-clip-text text-transparent">
            Feature Comparison
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Why Shopify merchants switch from {competitor.name} to Garrio
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <table className="w-full border-collapse max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
                  <th className="py-6 px-8 text-left font-semibold text-gray-700 text-lg">Feature</th>
                  <th className="py-6 px-8 text-center font-semibold text-purple-700 text-lg bg-purple-50/50">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      Garrio
                    </div>
                  </th>
                  <th className="py-6 px-8 text-center font-semibold text-gray-600 text-lg">{competitor.name}</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={feature.id}
                    ref={(el) => (rowRefs.current[feature.id] = el)}
                    data-id={feature.id}
                    className={`border-b border-gray-100 transition-all duration-700 hover:bg-purple-50/30 ${
                      visibleRows.includes(feature.id) 
                        ? "opacity-100 translate-x-0" 
                        : "opacity-0 translate-x-4"
                    } ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <td className="py-6 px-8">
                      <div className="font-semibold text-gray-900 text-lg mb-1">{feature.name}</div>
                      <div className="text-sm text-gray-600 leading-relaxed">{feature.description}</div>
                    </td>
                    <td className="py-6 px-8 bg-gradient-to-r from-purple-50/70 to-purple-50/30 relative">
                      <div className="absolute inset-0 bg-purple-100/20 rounded-lg mx-2"></div>
                      <div className="relative z-10">{renderValue(feature.garrioValue, true)}</div>
                    </td>
                    <td className="py-6 px-8 text-center">{renderValue(getCompetitorValue(feature))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Ready to make the switch?</p>
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Setup takes 60 seconds
          </div>
        </div>
      </div>
    </section>
  )
}
