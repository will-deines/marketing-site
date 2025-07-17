"use client"

import { useEffect, useRef, useState } from "react"
import { Check, X } from "lucide-react"

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

    Object.values(rowRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      Object.values(rowRefs.current).forEach((ref) => {
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
        <Check className={`h-6 w-6 ${isGarrio ? "text-purple-600" : "text-green-500"} mx-auto`} />
      ) : (
        <X className="h-6 w-6 text-gray-400 mx-auto" />
      )
    }

    return <div className={`text-center ${isGarrio ? "font-bold text-purple-700" : "text-gray-700"}`}>{value}</div>
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Feature Comparison</h2>
        <h3 className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Why Shopify merchants switch from {competitor.name} to Garrio
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse max-w-4xl mx-auto">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-6 text-left font-medium text-gray-500">Feature</th>
                <th className="py-4 px-6 text-center font-medium text-purple-600">Garrio</th>
                <th className="py-4 px-6 text-center font-medium text-gray-500">{competitor.name}</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr
                  key={feature.id}
                  ref={(el) => (rowRefs.current[feature.id] = el)}
                  data-id={feature.id}
                  className={`border-b border-gray-200 transition-opacity duration-500 ${
                    visibleRows.includes(feature.id) ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="font-medium">{feature.name}</div>
                    <div className="text-sm text-gray-500">{feature.description}</div>
                  </td>
                  <td className="py-4 px-6 bg-purple-50/50">{renderValue(feature.garrioValue, true)}</td>
                  <td className="py-4 px-6">{renderValue(getCompetitorValue(feature))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
