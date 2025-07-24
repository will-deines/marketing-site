"use client"

import { Check, X, Info } from "lucide-react"
import { useState, useEffect, useRef } from "react"

import { plans, comparisonFeatures } from "@/lib/pricing-data"

export default function ComparisonTable() {
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

  const renderValue = (value: boolean | string, planId: string) => {
    if (typeof value === "boolean") {
      return value ? (
        <div className="inline-flex items-center justify-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            planId === 'essentials' ? 'bg-gradient-to-br from-purple-500 to-indigo-500' : 'bg-gradient-to-br from-green-500 to-emerald-500'
          }`}>
            <Check className="h-5 w-5 text-white" />
          </div>
        </div>
      ) : (
        <div className="inline-flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <X className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      )
    }
    return <span className="text-sm font-medium text-gray-700">{value}</span>
  }

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-purple-50 via-white to-indigo-50 overflow-hidden">
      <div className="container mx-auto px-4" ref={sectionRef}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Info className="w-4 h-4" />
            Feature Comparison
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            What's in
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              each plan?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Compare features across all plans to find the right fit for your business.
          </p>
        </div>

        <div className={`overflow-hidden rounded-3xl shadow-2xl border border-purple-100 bg-white transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-50 to-indigo-50">
                  <th className="py-6 px-8 text-left font-semibold text-gray-900 text-lg border-b-2 border-purple-200">
                    Feature
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      className={`py-6 px-8 text-center font-semibold text-lg border-b-2 ${
                        plan.popular 
                          ? "bg-gradient-to-b from-purple-100 to-purple-50 border-purple-300 text-purple-900" 
                          : "border-purple-200 text-gray-900"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span>{plan.name}</span>
                        {plan.popular && (
                          <span className="text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full">
                            POPULAR
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr 
                    key={feature.id} 
                    className={`border-b border-gray-100 hover:bg-purple-50/30 transition-all duration-300 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <td className="py-5 px-8 text-left">
                      <span className="font-medium text-gray-900">{feature.name}</span>
                    </td>
                    {plans.map((plan) => (
                      <td 
                        key={`${plan.id}-${feature.id}`} 
                        className={`py-5 px-8 text-center ${
                          plan.popular ? "bg-purple-50/30" : ""
                        }`}
                      >
                        {renderValue(feature.plans[plan.id], plan.id)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            All plans include free setup, 24/7 support, and can be cancelled anytime
          </p>
        </div>
      </div>
    </section>
  )
}
