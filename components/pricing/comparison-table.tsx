"use client"

import { Check, Minus } from "lucide-react"
import { plans, comparisonFeatures } from "@/lib/pricing-data"

export default function ComparisonTable() {
  const renderValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-purple-600 mx-auto" />
      ) : (
        <Minus className="h-5 w-5 text-gray-300 mx-auto" />
      )
    }
    return <span className="text-sm">{value}</span>
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What&apos;s in each plan?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Compare features across all plans to find the right fit for your business.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-max">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-6 text-left font-medium text-gray-500">Feature</th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      className={`py-4 px-6 text-center font-medium ${
                        plan.popular ? "text-purple-600" : "text-gray-500"
                      }`}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature) => (
                  <tr key={feature.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-6 text-left font-medium">{feature.name}</td>
                    {plans.map((plan) => (
                      <td key={`${plan.id}-${feature.id}`} className="py-4 px-6 text-center">
                        {renderValue(feature.plans[plan.id])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
