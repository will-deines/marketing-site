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
    title: "No more midnight email marathons",
    description:
      "Your questions get answered 24/7, even while you're designing your next collection or spending time with family. Complex issues get handled by real people who know your brand.",
    icon: <ArrowRight className="h-10 w-10 text-purple-600" />,
    comparison: "Other platforms still leave you handling escalations and complex customer issues yourself.",
  },
  {
    id: "shopify-native",
    title: "Knows your business like you do",
    description:
      "Answers about your spring collection sizing, shipping policies, and that limited-edition color that sold out last week. No generic responses—it understands your specific products and policies.",
    icon: <Brain className="h-10 w-10 text-purple-600" />,
    comparison: "Generic support tools don&apos;t understand your specific inventory, product variations, or business policies.",
  },
  {
    id: "revenue-engine",
    title: "Turns browsers into buyers",
    description:
      "While helping with sizing questions, suggests 'These earrings would look amazing with that necklace.' Every support conversation becomes an opportunity to share more of what you've created.",
    icon: <DollarSign className="h-10 w-10 text-purple-600" />,
    comparison: "Most support tools just answer questions—they don&apos;t help grow your sales.",
  },
]

export default function FeaturePillars() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section id="feature-pillars" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Customer service that works the way you do</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Because you started your brand to create, not to answer the same questions over and over again.
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
