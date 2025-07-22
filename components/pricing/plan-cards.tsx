"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"
import { plans } from "@/lib/pricing-data"

export default function PlanCards() {
  const [, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Support that works right out of the box</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Start free with industry-tuned AI that understands your business from day one. Scale to human backup when you&apos;re ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-xl border ${
                plan.popular ? "border-purple-400" : "border-gray-200"
              } shadow-md p-6 md:p-8 transition-all duration-300 ${
                !plan.available ? "opacity-60" : ""
              } hover:shadow-lg transform hover:scale-[1.03] ${plan.id === "free" ? "rotate-[-1deg] shadow-lg" : ""}`}
              onMouseEnter={() => setHoveredCard(plan.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {plan.badge && (
                <div
                  className={`absolute -top-4 left-1/2 transform -translate-x-1/2 ${
                    plan.badge === "Popular" ? "bg-purple-600" : "bg-gray-600"
                  } text-white px-4 py-1 rounded-full text-sm font-medium`}
                >
                  {plan.badge}
                </div>
              )}

              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-500"> {plan.priceDetail}</span>
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-lg text-center">
                <span className="font-medium">{plan.includedChats} chats/mo included</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature.title}</span>
                  </li>
                ))}
              </ul>

              {plan.extraChatPrice && plan.id !== "free" && <p className="text-sm text-gray-500 mb-6">Extra chats: {plan.extraChatPrice}</p>}

              <Button
                className={`w-full ${
                  plan.available
                    ? plan.popular
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-gray-800 hover:bg-gray-900"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!plan.available}
                asChild
              >
                <Link href={plan.ctaLink}>{plan.ctaText}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
