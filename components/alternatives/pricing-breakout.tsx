"use client"

import { Check } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

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
    <section ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-900 to-indigo-700 bg-clip-text text-transparent">
            Pricing Comparison
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how Garrio&apos;s pricing stacks up against {competitor.name}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Garrio Card */}
          <div
            className={`relative bg-white rounded-2xl border-2 border-purple-200 shadow-2xl p-8 md:p-10 transition-all duration-1000 hover:scale-105 hover:shadow-3xl ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              ⭐ Most Popular
            </div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Garrio Free</h3>
              <div className="mb-4">
                <span className="text-5xl lg:text-6xl font-bold text-purple-600">$0</span>
                <span className="text-xl text-gray-500 ml-2">/month</span>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">Perfect for new Shopify stores getting started with customer service.</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-purple-100 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-gray-700 font-medium">250 chats/mo included</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-purple-100 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-gray-700 font-medium">AI-powered chat widget</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-purple-100 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-gray-700 font-medium">Order lookup integration</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-purple-100 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-gray-700 font-medium">1 human-handoff email</span>
              </li>
            </ul>
            
            <div className="bg-purple-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-purple-700 font-medium text-center">Extra chats: $0.10 each</p>
            </div>
            
            <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200" asChild>
              <Link href="https://apps.shopify.com/app-installation" target="_blank" rel="noopener noreferrer">
                Add Garrio Free—1-Click Install
              </Link>
            </Button>
          </div>

          {/* Competitor Card */}
          <div
            className={`bg-white rounded-2xl border border-gray-200 shadow-lg p-8 md:p-10 transition-all duration-1000 hover:shadow-xl ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{competitor.name} Starter</h3>
              <div className="mb-4">
                <span className="text-5xl lg:text-6xl font-bold text-gray-700">${competitor.pricing.entryPlan}</span>
                <span className="text-xl text-gray-500 ml-2">/month</span>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">Basic plan for small businesses.</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-green-100 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">{competitor.pricing.entryTickets} tickets/mo included</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-green-100 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">Chat widget</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-green-100 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">Basic integrations</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full p-1 bg-green-100 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">Email support</span>
              </li>
            </ul>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 font-medium text-center">
                Extra tickets: ${competitor.pricing.overagePerTicket.toFixed(2)} each
              </p>
            </div>
            
            <Button variant="outline" className="w-full border-2 border-gray-300 text-gray-500 font-semibold py-4 text-lg rounded-xl cursor-not-allowed" disabled>
              💳 Requires Credit Card
            </Button>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/pricing" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold text-lg hover:underline transition-colors">
            Full pricing details 
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
