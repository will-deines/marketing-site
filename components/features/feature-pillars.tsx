"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, DollarSign, Brain } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface FeaturePillar {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  comparison: string
}

const featurePillars: FeaturePillar[] = [
  {
    id: "works-for-you",
    title: "Works For You",
    description:
      "From chat to inbox, we actually do the work. Escalated emails land in our queue, solved by Garrio agents, synced back to Shopify.",
    icon: <ArrowRight className="h-10 w-10 text-purple-600" />,
    comparison: "Gorgias: you handle escalations yourself. Zendesk: generic APIs, no native Shopify actions.",
  },
  {
    id: "shopify-native",
    title: "Shopify-Native Brain",
    description:
      "Knows every SKU, order, and discount in real time. Powered by Shopify APO for ultra-personalized answers & actions.",
    icon: <Brain className="h-10 w-10 text-purple-600" />,
    comparison: "Other platforms use generic AI models with limited Shopify integration.",
  },
  {
    id: "revenue-engine",
    title: "Revenue Engine",
    description:
      "Support that sells. AI suggests upsells & cross-sells inside the chat widget, turning help into margin.",
    icon: <DollarSign className="h-10 w-10 text-purple-600" />,
    comparison: "Most helpdesks focus on closing tickets, not generating revenue.",
  },
]

export default function FeaturePillars() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section id="feature-pillars" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Garrio Beats Every Helpdesk</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The only Shopify support app that handles customer service for you — from AI to human.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featurePillars.map((pillar) => (
            <TooltipProvider key={pillar.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                      hoveredCard === pillar.id ? "z-10 scale-105" : ""
                    }`}
                    onMouseEnter={() => setHoveredCard(pillar.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="flex justify-center mb-6">{pillar.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-center">{pillar.title}</h3>
                    <p className="text-gray-600 text-center">{pillar.description}</p>
                    <div className="mt-4 text-center text-sm text-purple-600">Compare to...</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs p-4 bg-gray-800 text-white">
                  <p>{pillar.comparison}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </section>
  )
}
