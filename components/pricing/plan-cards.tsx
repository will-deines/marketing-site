"use client"

import { Check, Sparkles, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"

import { Button } from "@/components/ui/button"
import { plans } from "@/lib/pricing-data"

export default function PlanCards() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
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
    <section className="py-20 md:py-32 bg-gradient-to-br from-gray-50 via-white to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4" ref={sectionRef}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Flexible Plans
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Support that works
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              right out of the box
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Start free with industry-tuned AI that understands your business from day one. Scale to human backup when you&apos;re ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`group relative transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredCard(plan.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`relative h-full bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 flex flex-col ${
                plan.popular ? "border-2 border-purple-300" : "border border-gray-200"
              } ${
                hoveredCard === plan.id ? "transform scale-105 shadow-3xl" : ""
              } ${
                !plan.available ? "opacity-60" : ""
              }`}>
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  plan.popular ? "from-purple-50 to-indigo-50" : "from-gray-50 to-white"
                } opacity-50`}></div>
                
                {/* Popular badge */}
                {plan.badge && (
                  <div className="absolute -top-1 -right-1 z-10">
                    <div className={`relative ${
                      plan.badge === "Popular" ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-gradient-to-r from-gray-600 to-gray-700"
                    } text-white px-6 py-2 rounded-bl-2xl rounded-tr-2xl shadow-lg`}>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-medium">{plan.badge}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="relative p-8 md:p-10 flex flex-col flex-1">
                  {/* Plan name and price */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-5xl font-bold ${
                        plan.id === "free" 
                          ? "text-gray-900" 
                          : "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600"
                      }`}>
                        {plan.price}
                      </span>
                      <span className="text-gray-600 text-lg">{plan.priceDetail}</span>
                    </div>
                  </div>

                  {/* Included chats */}
                  <div className="mb-8">
                    <div className={`p-4 rounded-2xl text-center ${
                      plan.id === "free"
                        ? "bg-gray-100"
                        : "bg-gradient-to-r from-purple-100 to-indigo-100"
                    }`}>
                      <span className={`font-semibold text-lg ${
                        plan.id === "free" ? "text-gray-900" : "text-purple-900"
                      }`}>
                        {plan.includedChats} chats/mo included
                      </span>
                    </div>
                  </div>

                  {/* Features - flex-1 to push button to bottom */}
                  <div className="flex-1">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-gray-700 leading-relaxed">{feature.title}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Extra chat price */}
                    {plan.extraChatPrice && plan.id !== "free" && (
                      <p className="text-sm text-gray-600 mb-8 text-center bg-gray-50 py-2 px-4 rounded-xl">
                        Extra chats: <span className="font-semibold">{plan.extraChatPrice}</span>
                      </p>
                    )}
                  </div>

                  {/* CTA Button - Now properly aligned at bottom */}
                  <Button
                    className={`w-full h-auto py-4 text-lg font-semibold rounded-2xl transition-all duration-200 group ${
                      !plan.available
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : plan.id === "free"
                          ? "bg-white text-gray-900 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                          : plan.popular
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                            : "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white shadow-md hover:shadow-lg"
                    }`}
                    disabled={!plan.available}
                    asChild
                  >
                    <Link href={plan.ctaLink} className="flex items-center justify-center gap-2">
                      {plan.ctaText}
                      {plan.available && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
