"use client"

import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PricingSection() {
  const freeTierRef = useRef<HTMLDivElement>(null)
  const [isFreeTierVisible, setIsFreeTierVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFreeTierVisible(true)
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
      },
    )

    if (freeTierRef.current) {
      observer.observe(freeTierRef.current)
    }

    return () => {
      if (freeTierRef.current) {
        observer.unobserve(freeTierRef.current)
      }
    }
  }, [])

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pick Your Plan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Start with our generous free tier and scale as your business grows. No credit card required to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan - Positioned forward */}
          <div
            ref={freeTierRef}
            id="free-tier"
            className="relative bg-white rounded-xl border border-purple-200 shadow-lg p-6 md:p-8 transform md:scale-105 md:translate-y-2 z-10 transition-all duration-300"
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <h3 className="text-xl font-bold mb-2">Free</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-gray-500">/month</span>
            </div>
            <p className="text-gray-600 mb-6">Perfect for new Shopify stores getting started with customer service.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>100 chats/mo</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>1 human-handoff email</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Basic discount engine</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Order lookup</span>
              </li>
            </ul>
            <Button
              className={`w-full bg-purple-600 hover:bg-purple-700 transition-all duration-500 ${
                isFreeTierVisible ? "animate-bounce-once" : ""
              }`}
            >
              Start Free
            </Button>
          </div>

          {/* Growth Plan */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 md:p-8 transition-all duration-300 hover:shadow-lg">
            <h3 className="text-xl font-bold mb-2">Growth</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">$29</span>
              <span className="text-gray-500">/month</span>
            </div>
            <p className="text-gray-600 mb-6">For established stores ready to scale their customer experience.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>2,000 chats/mo</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Unlimited email handoffs</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>A/B discount testing</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Advanced analytics</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50" asChild>
              <Link href="#">Upgrade Now</Link>
            </Button>
          </div>

          {/* Scale Plan */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 md:p-8 transition-all duration-300 hover:shadow-lg">
            <h3 className="text-xl font-bold mb-2">Scale</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">$99</span>
              <span className="text-gray-500">/month</span>
            </div>
            <p className="text-gray-600 mb-6">For power sellers with multiple stores or high volume.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>10,000 chats/mo</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Priority SLA</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Multistore dashboard</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Custom integrations</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50" asChild>
              <Link href="#">Contact Sales</Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 max-w-2xl mx-auto">
            All plans include core features: AI-powered chat, order lookups, and Shopify integration.
            <br />
            Need a custom plan?{" "}
            <Link href="#" className="text-purple-600 hover:underline">
              Contact our sales team
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
