"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { InfoIcon as InfoCircle, Clock, DollarSign, BarChart2, RefreshCw } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import CostChart from "@/components/roi-calculator/cost-chart"
import AdvancedSettings from "@/components/roi-calculator/advanced-settings"
import pricingData from "@/data/roi-pricing.json"

export default function RoiCalculator() {
  // State for chat volume and time period
  const [chatVolume, setChatVolume] = useState(750)
  const [timePeriod, setTimePeriod] = useState<"monthly" | "annual">("monthly")

  // State for advanced settings
  const [agentHourlyWage, setAgentHourlyWage] = useState(pricingData.globals.agentHourlyWage)
  const [ticketsPerHour, setTicketsPerHour] = useState(pricingData.globals.ticketsPerHour)
  const [automationRates, setAutomationRates] = useState<Record<string, number>>(
    pricingData.apps.reduce((acc, app) => ({ ...acc, [app.slug]: app.automationRate }), {}),
  )
  const [showUpsellRevenue, setShowUpsellRevenue] = useState(false)
  const [averageOrderValue, setAverageOrderValue] = useState(50)
  const [conversionRate, setConversionRate] = useState(0.05)

  // Calculate results
  const [results, setResults] = useState<{
    costs: Record<string, { total: number; agentCost: number; softwareCost: number }>
    savings: Record<string, number>
    roi: Record<string, number>
    hoursSaved: Record<string, number>
    highestCompetitorCost: { slug: string; cost: number }
    upsellRevenue: number
  }>({
    costs: {},
    savings: {},
    roi: {},
    hoursSaved: {},
    highestCompetitorCost: { slug: "", cost: 0 },
    upsellRevenue: 0,
  })

  // Calculate results when inputs change
  useEffect(() => {
    const calculateResults = () => {
      const costs: Record<string, { total: number; agentCost: number; softwareCost: number }> = {}
      const savings: Record<string, number> = {}
      const roi: Record<string, number> = {}
      const hoursSaved: Record<string, number> = {}
      let highestCompetitorCost = { slug: "", cost: 0 }

      // Calculate costs for each app
      pricingData.apps.forEach((app) => {
        // Calculate human tickets
        const humanTickets = chatVolume * (1 - automationRates[app.slug])

        // Calculate agent hours and cost
        const agentHours = humanTickets / ticketsPerHour
        const agentCost = agentHours * agentHourlyWage

        // Calculate software cost
        let softwareCost = 0
        const plans = app.plans

        // Find the cheapest plan that can handle the volume
        const eligiblePlans = plans.filter((plan) => {
          const includedTickets = "includedChats" in plan ? plan.includedChats : plan.includedTickets
          return includedTickets >= chatVolume
        })

        if (eligiblePlans.length > 0) {
          // Sort by base price and take the cheapest
          const cheapestPlan = eligiblePlans.sort((a, b) => a.base - b.base)[0]
          softwareCost = cheapestPlan.base
        } else {
          // If no plan covers the volume, take the highest tier and add overage
          const highestPlan = plans.sort((a, b) => {
            const aIncluded = "includedChats" in a ? a.includedChats : a.includedTickets
            const bIncluded = "includedChats" in b ? b.includedChats : b.includedTickets
            return bIncluded - aIncluded
          })[0]

          const includedTickets =
            "includedChats" in highestPlan ? highestPlan.includedChats : highestPlan.includedTickets
          const overageTickets = Math.max(0, chatVolume - includedTickets)
          softwareCost = highestPlan.base + overageTickets * highestPlan.overage
        }

        // Calculate total cost
        const totalCost = agentCost + softwareCost

        // Store results
        costs[app.slug] = {
          total: totalCost,
          agentCost,
          softwareCost,
        }

        // Track highest competitor cost
        if (app.slug !== "garrio" && totalCost > highestCompetitorCost.cost) {
          highestCompetitorCost = { slug: app.slug, cost: totalCost }
        }
      })

      // Calculate savings compared to Garrio
      const garrioCost = costs["garrio"].total

      pricingData.apps.forEach((app) => {
        if (app.slug !== "garrio") {
          const competitorCost = costs[app.slug].total
          savings[app.slug] = competitorCost - garrioCost
          roi[app.slug] = (savings[app.slug] / garrioCost) * 100

          // Calculate hours saved
          const garrioHumanTickets = chatVolume * (1 - automationRates["garrio"])
          const competitorHumanTickets = chatVolume * (1 - automationRates[app.slug])
          const hoursDiff = (competitorHumanTickets - garrioHumanTickets) / ticketsPerHour
          hoursSaved[app.slug] = hoursDiff
        }
      })

      // Calculate upsell revenue (Garrio only)
      const upsellRevenue = showUpsellRevenue
        ? chatVolume * conversionRate * averageOrderValue * pricingData.globals.upsellLiftRate
        : 0

      // Apply time period multiplier
      const multiplier = timePeriod === "annual" ? 12 : 1

      Object.keys(costs).forEach((app) => {
        costs[app].total *= multiplier
        costs[app].agentCost *= multiplier
        costs[app].softwareCost *= multiplier
      })

      Object.keys(savings).forEach((app) => {
        savings[app] *= multiplier
        hoursSaved[app] *= multiplier
      })

      highestCompetitorCost.cost *= multiplier

      setResults({
        costs,
        savings,
        roi,
        hoursSaved,
        highestCompetitorCost,
        upsellRevenue: upsellRevenue * multiplier,
      })
    }

    calculateResults()
  }, [
    chatVolume,
    timePeriod,
    agentHourlyWage,
    ticketsPerHour,
    automationRates,
    showUpsellRevenue,
    averageOrderValue,
    conversionRate,
  ])

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Format percentage
  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      maximumFractionDigits: 0,
    }).format(value / 100)
  }

  // Handle slider change with debounce
  const handleSliderChange = (value: number[]) => {
    setChatVolume(value[0])

    // Fire analytics event
    if (typeof window !== "undefined") {
      console.log("Analytics event: roi_slider_change", {
        chats: value[0],
        savings: results.highestCompetitorCost.cost - results.costs["garrio"].total,
        competitor_highest_cost: results.highestCompetitorCost.slug,
      })
    }
  }

  // Handle CTA click
  const handleCtaClick = () => {
    // Fire analytics event
    if (typeof window !== "undefined") {
      console.log("Analytics event: roi_install_click", {
        chats: chatVolume,
        savings_dollars: results.highestCompetitorCost.cost - results.costs["garrio"].total,
        roi_percent: results.roi[results.highestCompetitorCost.slug],
      })
    }
  }

  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">ROI Calculator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how much you can save by switching to Garrio for your Shopify customer support.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Time Period Tabs */}
          <div className="flex justify-center mb-8">
            <Tabs defaultValue="monthly" onValueChange={(value) => setTimePeriod(value as "monthly" | "annual")}>
              <TabsList>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual">Annual</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Volume Slider */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md mb-8">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-medium">How many support chats do you handle each month?</h2>
                <div className="bg-purple-100 text-purple-800 font-bold px-3 py-1 rounded-full">{chatVolume} chats</div>
              </div>
              <Slider
                defaultValue={[750]}
                min={50}
                max={5000}
                step={50}
                onValueChange={handleSliderChange}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>50</span>
                <span>250</span>
                <span>500</span>
                <span>1,000</span>
                <span>2,000</span>
                <span>5,000</span>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Savings Panel */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Garrio Wins</h2>

              {results.highestCompetitorCost.slug && (
                <div className="space-y-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Save vs {pricingData.apps.find((app) => app.slug === results.highestCompetitorCost.slug)?.name}
                    </div>
                    <div className="text-3xl font-bold text-purple-600">
                      {formatCurrency(results.savings[results.highestCompetitorCost.slug] || 0)}
                      <span className="text-lg font-normal text-gray-500">
                        /{timePeriod === "monthly" ? "mo" : "yr"}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      That's {formatPercentage(results.roi[results.highestCompetitorCost.slug] || 0)} ROI vs doing it
                      yourself.
                    </div>
                  </div>

                  <div className="flex items-center">
                    <BarChart2 className="h-5 w-5 text-purple-600 mr-2" />
                    <div>
                      <span className="font-bold">98%</span> chats auto-resolved
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-purple-600 mr-2" />
                    <div>
                      <span className="font-bold">
                        {Math.round(results.hoursSaved[results.highestCompetitorCost.slug] || 0)}
                      </span>{" "}
                      hrs founder time back
                    </div>
                  </div>

                  {showUpsellRevenue && results.upsellRevenue > 0 && (
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                      <div>
                        <span className="font-bold">{formatCurrency(results.upsellRevenue)}</span> extra revenue from
                        upsells
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* CTA Button */}
              <div className="mt-8">
                <Button className="w-full bg-purple-600 hover:bg-purple-700" size="lg" asChild>
                  <Link
                    href={`https://apps.shopify.com/app-installation?utm_source=roi&utm_medium=calculator&utm_campaign=save_${Math.round(results.savings[results.highestCompetitorCost.slug] || 0)}&utm_content=${chatVolume}_chats`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleCtaClick}
                  >
                    Save {formatCurrency(results.savings[results.highestCompetitorCost.slug] || 0)} Now—Add Garrio Free
                  </Link>
                </Button>
                <p className="text-xs text-center text-gray-500 mt-2">
                  One-click install • No credit card • Up in 3 min
                </p>
              </div>
            </div>

            {/* Cost Chart */}
            <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{timePeriod === "monthly" ? "Monthly" : "Annual"} Cost Comparison</h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoCircle className="h-5 w-5 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs p-4">
                      <p className="text-sm">
                        Total cost includes both software subscription and human agent time needed to handle
                        non-automated tickets.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <CostChart
                costs={results.costs}
                apps={pricingData.apps}
                formatCurrency={formatCurrency}
                timePeriod={timePeriod}
              />
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-md mb-8">
            <Accordion type="single" collapsible>
              <AccordionItem value="advanced-settings">
                <AccordionTrigger
                  className="px-6 py-4"
                  onClick={() => {
                    // Fire analytics event
                    if (typeof window !== "undefined") {
                      console.log("Analytics event: roi_advanced_open")
                    }
                  }}
                >
                  Advanced Settings
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <AdvancedSettings
                    agentHourlyWage={agentHourlyWage}
                    setAgentHourlyWage={setAgentHourlyWage}
                    ticketsPerHour={ticketsPerHour}
                    setTicketsPerHour={setTicketsPerHour}
                    automationRates={automationRates}
                    setAutomationRates={setAutomationRates}
                    showUpsellRevenue={showUpsellRevenue}
                    setShowUpsellRevenue={setShowUpsellRevenue}
                    averageOrderValue={averageOrderValue}
                    setAverageOrderValue={setAverageOrderValue}
                    conversionRate={conversionRate}
                    setConversionRate={setConversionRate}
                    apps={pricingData.apps}
                  />

                  <div className="mt-6 flex justify-end">
                    <Button
                      variant="outline"
                      className="flex items-center"
                      onClick={() => {
                        // Reset to defaults
                        setAgentHourlyWage(pricingData.globals.agentHourlyWage)
                        setTicketsPerHour(pricingData.globals.ticketsPerHour)
                        setAutomationRates(
                          pricingData.apps.reduce((acc, app) => ({ ...acc, [app.slug]: app.automationRate }), {}),
                        )
                        setShowUpsellRevenue(false)
                        setAverageOrderValue(50)
                        setConversionRate(0.05)
                      }}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset to Defaults
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Methodology Note */}
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
            <p className="font-medium mb-2">Calculation Methodology:</p>
            <p>
              This calculator estimates costs based on industry benchmarks and real customer data. Agent costs include
              hourly wages for time spent handling tickets that aren't automated. Software costs are based on current
              published pricing. Automation rates are derived from public case studies and aggregate user data.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
