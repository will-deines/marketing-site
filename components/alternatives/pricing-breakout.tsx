"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PricingBreakoutProps {
  competitor: {
    name: string
    pricing: {
      entryPlan: number
      entryTickets: number
      overagePerTicket: number
    }
  }
}

export default function PricingBreakout({ competitor }: PricingBreakoutProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.2,
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

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Pricing Comparison</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          See how Garrio&apos;s pricing stacks up against {competitor.name}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Garrio Card */}
          <div
            className={`bg-white rounded-xl border border-purple-200 shadow-lg p-6 md:p-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <h3 className="text-xl font-bold mb-2">Garrio Free</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-gray-500">/month</span>
            </div>
            <p className="text-gray-600 mb-6">Perfect for new Shopify stores getting started with customer service.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>250 chats/mo included</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>AI-powered chat widget</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Order lookup integration</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>1 human-handoff email</span>
              </li>
            </ul>
            <p className="text-sm text-gray-500 mb-6">Extra chats: $0.10 each</p>
            <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
              <Link href="https://apps.shopify.com/app-installation" target="_blank" rel="noopener noreferrer">
                Add Garrio Free—1-Click Install
              </Link>
            </Button>
          </div>

          {/* Competitor Card */}
          <div
            className={`bg-white rounded-xl border border-gray-200 shadow-md p-6 md:p-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <h3 className="text-xl font-bold mb-2">{competitor.name} Starter</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">${competitor.pricing.entryPlan}</span>
              <span className="text-gray-500">/month</span>
            </div>
            <p className="text-gray-600 mb-6">Basic plan for small businesses.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>{competitor.pricing.entryTickets} tickets/mo included</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Chat widget</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Basic integrations</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Email support</span>
              </li>
            </ul>
            <p className="text-sm text-gray-500 mb-6">
              Extra tickets: ${competitor.pricing.overagePerTicket.toFixed(2)} each
            </p>
            <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50" disabled>
              Requires Credit Card
            </Button>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/pricing" className="text-purple-600 hover:underline">
            Full pricing details →
          </Link>
        </div>
      </div>
    </section>
  )
}
