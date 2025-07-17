"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { calculateCost } from "@/lib/pricing-data"

export default function UsageCalculator() {
  const [chatCount, setChatCount] = useState(500)
  const [costs, setCosts] = useState({ free: 0, starter: 0, savings: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const costs = calculateCost(chatCount, "free")
    setCosts(costs)
  }, [chatCount])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
      },
    )

    const element = document.getElementById("calculator")
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
    <section id="calculator" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Usage Cost Calculator</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estimate your monthly costs based on expected chat volume. Slide to see how different plans compare.
          </p>
        </div>

        <div
          className={`max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Monthly chat volume</span>
              <span className="font-bold text-purple-600">{chatCount} chats</span>
            </div>
            <Slider
              value={[chatCount]}
              min={0}
              max={4000}
              step={50}
              onValueChange={(value) => setChatCount(value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>0</span>
              <span>1,000</span>
              <span>2,000</span>
              <span>3,000</span>
              <span>4,000</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Free Plan</h3>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Included chats</div>
                <div className="font-medium">250 chats/mo</div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Extra chats</div>
                <div className="font-medium">{Math.max(0, chatCount - 250)} × $0.10</div>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="text-sm text-gray-600 mb-1">Estimated monthly cost</div>
                <div className="text-2xl font-bold">${costs.free.toFixed(2)}</div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
              <h3 className="text-lg font-semibold mb-4">Starter Plan</h3>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Included chats</div>
                <div className="font-medium">350 chats/mo</div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Extra chats</div>
                <div className="font-medium">{Math.max(0, chatCount - 350)} × $0.10</div>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="text-sm text-gray-600 mb-1">Estimated monthly cost</div>
                <div className="text-2xl font-bold">${costs.starter.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {costs.savings > 0 && (
            <div className="mt-6 bg-green-50 border border-green-100 p-4 rounded-lg text-center">
              <span className="font-medium text-green-800">
                Starter plan saves you ${costs.savings.toFixed(2)} at {chatCount} chats per month
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
