"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { plans } from "@/lib/pricing-data"

export default function UsageCalculator() {
  const [conversationCount, setConversationCount] = useState(500)
  const [selectedPlan, setSelectedPlan] = useState("starter")
  const [isVisible, setIsVisible] = useState(false)

  // Handle plan changes and adjust conversation count if needed
  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId)
    
    // If switching to free plan and conversation count is above 250, cap it
    if (planId === "free" && conversationCount > 250) {
      setConversationCount(250)
    }
    // If switching from free plan and conversation count is at 250, suggest higher volume
    else if (selectedPlan === "free" && planId !== "free" && conversationCount === 250) {
      setConversationCount(500) // Reset to a reasonable default for other plans
    }
  }

  // BLS data: Customer service representative median hourly wage $20.59 (May 2024)
  // Adding benefits/taxes (~30% overhead) = $26.77/hour
  // Adding management overhead (~40% of agent costs) = $37.48/hour total
  // Management includes: hiring, training, scheduling, QA, supervisor time, tools/software
  const AGENT_HOURLY_COST = 26.77
  const MANAGEMENT_OVERHEAD_RATE = 0.4 // 40% of agent costs
  const TOTAL_AGENT_COST_WITH_MANAGEMENT = AGENT_HOURLY_COST * (1 + MANAGEMENT_OVERHEAD_RATE)
  const AVG_CONVERSATION_MINUTES = 6

  const calculateSavings = () => {
    const selectedPlanData = plans.find(p => p.id === selectedPlan)
    if (!selectedPlanData) return { planCost: 0, humanCost: 0, savings: 0, timeSaved: 0 }

    // Calculate plan cost
    let planCost = 0
    const included = selectedPlanData.includedChats
    const overageRate = parseFloat(selectedPlanData.extraChatPrice.replace(/[^0-9.]/g, ''))
    
    if (conversationCount > included) {
      planCost = (conversationCount - included) * overageRate
    }
    
    // Add base cost for paid plans
    if (selectedPlan === "essentials") planCost += 200
    if (selectedPlan === "professional") planCost += 500

    // Calculate human team cost and savings
    const aiDeflectionRate = 0.7
    
    // Before Garrio: Need agents for 100% of conversations + management overhead
    const fullAgentMinutes = conversationCount * AVG_CONVERSATION_MINUTES
    const fullAgentHours = fullAgentMinutes / 60
    const fullHumanCost = fullAgentHours * TOTAL_AGENT_COST_WITH_MANAGEMENT
    
    // After Garrio: Different plans handle the remaining 30% differently
    let remainingAgentCost = 0
    let conversationsToHandle = 0
    
    if (selectedPlan === "essentials" || selectedPlan === "professional") {
      // Human backup plans: Zero additional agent costs (Garrio handles everything)
      remainingAgentCost = 0
      conversationsToHandle = 0
    } else {
      // AI-only plans: Still need agents for remaining 30% WITH management overhead
      // (They still have to manage the agents handling 30% of conversations)
      conversationsToHandle = conversationCount * (1 - aiDeflectionRate)
      const remainingAgentMinutes = conversationsToHandle * AVG_CONVERSATION_MINUTES
      const remainingAgentHours = remainingAgentMinutes / 60
      remainingAgentCost = remainingAgentHours * TOTAL_AGENT_COST_WITH_MANAGEMENT // Full cost including management
    }
    
    const totalGarrioCost = planCost + remainingAgentCost
    const savings = fullHumanCost - totalGarrioCost
    
    const humanCost = fullHumanCost

    return { planCost, humanCost, savings }
  }

  const { planCost, humanCost, savings } = calculateSavings()

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Calculate Your Savings</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how much money and time you&apos;ll save vs. hiring your own customer support team.
          </p>
        </div>

        <div
          className={`max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Plan Selection Bubbles */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-center">Select a plan to compare:</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {plans.filter(plan => plan.id !== "professional").map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => handlePlanChange(plan.id)}
                  className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                    selectedPlan === plan.id
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-purple-300"
                  }`}
                >
                  {plan.name}
                </button>
              ))}
              <button
                className="px-4 py-2 rounded-full border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
                disabled
              >
                Professional - Contact Us
              </button>
            </div>
          </div>

          {/* Conversation Volume Slider */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Monthly conversation volume</span>
              <span className="font-bold text-purple-600">{conversationCount} conversations</span>
            </div>
            <div className="relative">
              <div className="relative">
                <Slider
                  value={[Math.min(conversationCount, selectedPlan === "free" ? 250 : 1500)]}
                  min={0}
                  max={1500}
                  step={25}
                  onValueChange={(value) => {
                    const newValue = selectedPlan === "free" ? Math.min(value[0], 250) : value[0]
                    setConversationCount(newValue)
                  }}
                  className={`py-4 ${selectedPlan === "free" && conversationCount === 250 ? "slider-yellow" : ""}`}
                />
                
                {/* Gray overlay for unavailable range */}
                {selectedPlan === "free" && (
                  <div 
                    className="absolute top-1/2 h-2 bg-gray-200 rounded-r-full pointer-events-none z-10"
                    style={{
                      left: `${(250 / 1500) * 100}%`,
                      width: `${((1500 - 250) / 1500) * 100}%`,
                      transform: 'translateY(-50%)'
                    }}
                  />
                )}
              </div>
              
              <style jsx global>{`
                .slider-yellow .bg-purple-600 {
                  background-color: #eab308 !important;
                }
                .slider-yellow .border-purple-600 {
                  border-color: #eab308 !important;
                }
              `}</style>
              
              {/* Yellow warning popup when Free plan hits limit */}
              {selectedPlan === "free" && conversationCount === 250 && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-yellow-100 border border-yellow-300 p-3 rounded-lg shadow-lg text-center min-w-max">
                    <div className="text-sm font-medium text-yellow-800 mb-1">
                      Free Plan Limit Reached!
                    </div>
                    <div className="text-xs text-yellow-700">
                      Upgrade to Starter Plan for additional conversations
                    </div>
                    {/* Arrow pointing up */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-yellow-300"></div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>0</span>
              <span>500</span>
              <span>1,000</span>
              <span>1,500</span>
            </div>
          </div>

          {/* Cost Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Before Garrio</h3>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Agent coverage needed</div>
                <div className="font-medium">
                  {conversationCount} conversations (100% manual handling)
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Agent hours + management overhead</div>
                <div className="font-medium">
                  {(conversationCount * 6 / 60).toFixed(1)} hours + 40% management costs
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="text-sm text-gray-600 mb-1">Estimated monthly cost</div>
                <div className="text-2xl font-bold text-red-600">${humanCost.toFixed(0)}</div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
              <h3 className="text-lg font-semibold mb-4">With {plans.find(p => p.id === selectedPlan)?.name}</h3>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Garrio plan cost</div>
                <div className="font-medium">
                  ${planCost.toFixed(0)} + 70% AI deflection
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Remaining agent costs</div>
                <div className="font-medium">
                  {selectedPlan === "essentials" || selectedPlan === "professional" 
                    ? "$0 (human agents included)"
                    : `$${(conversationCount * 0.3 * 6 / 60 * TOTAL_AGENT_COST_WITH_MANAGEMENT).toFixed(0)} (30% need agents + mgmt)`
                  }
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="text-sm text-gray-600 mb-1">Total monthly cost</div>
                <div className="text-2xl font-bold text-green-600">
                  ${(planCost + (selectedPlan === "essentials" || selectedPlan === "professional" ? 0 : conversationCount * 0.3 * 6 / 60 * TOTAL_AGENT_COST_WITH_MANAGEMENT)).toFixed(0)}
                </div>
              </div>
            </div>
          </div>

          {/* Savings Summary */}
          {savings > 0 && (
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-800 mb-2">
                You save ${savings.toFixed(0)} per month
              </div>
              <div className="text-sm text-green-700">
                {selectedPlan === "essentials" || selectedPlan === "professional"
                  ? `Savings from eliminating 100% of agent hiring and management costs • Based on ${conversationCount} conversations/month`
                  : `Savings from AI deflecting ${Math.round(conversationCount * 0.7)} conversations (still need to manage agents for remaining 30%) • Based on ${conversationCount} conversations/month`
                }
              </div>
            </div>
          )}

          {/* Professional Plan CTA */}
          <div className="mt-6 p-4 bg-purple-50 border border-purple-100 rounded-lg text-center">
            <div className="text-lg font-semibold text-purple-800 mb-2">
              Need higher volume or custom features?
            </div>
            <div className="text-sm text-purple-700 mb-3">
              Our Professional plan offers dedicated success management, monthly model refreshes, and enterprise-grade support.
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200">
              Contact Us for Custom Pricing
            </button>
          </div>

          {/* Source Attribution */}
          <div className="mt-6 text-xs text-gray-500 text-center">
            Cost calculations based on{" "}
            <a 
              href="https://www.bls.gov/oes/2023/may/oes434051.htm" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="underline hover:text-gray-700"
            >
              BLS customer service representative wage data
            </a>
            {" "}($20.59/hour + 30% benefits + 40% management overhead = $37.48/hour total)
          </div>
        </div>
      </div>
    </section>
  )
}
