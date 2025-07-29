"use client"

import { InfoIcon as InfoCircle, Clock, DollarSign, BarChart2, RefreshCw, ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

import AdvancedSettings from "@/components/roi-calculator/advanced-settings"
import CostChart from "@/components/roi-calculator/cost-chart"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { plans } from "@/lib/pricing-data"
import competitorData from "@/data/competitor-pricing.json"

export default function RoiCalculator() {
  // State for chat volume and time period
  const [chatVolume, setChatVolume] = useState(750)
  const [timePeriod, setTimePeriod] = useState<"monthly" | "annual">("monthly")

  // State for advanced settings
  // BLS data: $20.59/hour + 30% benefits = $26.77 + 40% management = $37.48 total
  // Sources: BLS May 2024 data + industry benchmarks showing 2-2.5x multiplier (see /claims-sources)
  const [agentHourlyWage, setAgentHourlyWage] = useState(37.48)
  // 15 minutes per interaction (from claims doc) = 4 tickets per hour
  const [ticketsPerHour, setTicketsPerHour] = useState(4)
  const [automationRates, setAutomationRates] = useState<Record<string, number>>({
    gorgias: 0.4,
    reamaze: 0.35,
    zendesk: 0.3,
    tidio: 0.25
  })
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
    garrioPlanInfo: { planName: string; effectiveAutomationRate: number }
  }>({
    costs: {},
    savings: {},
    roi: {},
    hoursSaved: {},
    highestCompetitorCost: { slug: "", cost: 0 },
    upsellRevenue: 0,
    garrioPlanInfo: { planName: "essentials", effectiveAutomationRate: 0.98 },
  })

  // Calculate results when inputs change
  useEffect(() => {
    const calculateResults = () => {
      const costs: Record<string, { total: number; agentCost: number; softwareCost: number }> = {}
      const savings: Record<string, number> = {}
      const roi: Record<string, number> = {}
      const hoursSaved: Record<string, number> = {}
      let highestCompetitorCost = { slug: "", cost: 0 }

      // Calculate Garrio costs
      const calculateGarrioCost = () => {
        // For ROI calculator, always assume Essentials plan with 98% handling
        const effectiveAutomationRate = 0.98
        const planName = "essentials"
        
        // Calculate software cost for Essentials plan
        let softwareCost = 200 // Base cost for Essentials
        
        if (chatVolume > 350) {
          // Add overage cost ($1.00 per chat over 350)
          const overageChats = chatVolume - 350
          softwareCost = 200 + (overageChats * 1.00)
        }

        // Calculate human tickets - only 2% need human agents with Essentials
        const humanTickets = chatVolume * (1 - effectiveAutomationRate)
        const agentHours = humanTickets / ticketsPerHour
        // Agent cost already includes management overhead from default wage
        const agentCost = agentHours * agentHourlyWage

        return {
          total: agentCost + softwareCost,
          agentCost,
          softwareCost,
          planName,
          effectiveAutomationRate
        }
      }

      // Calculate competitor costs
      const calculateCompetitorCost = (competitor: any) => {
        const humanTickets = chatVolume * (1 - automationRates[competitor.slug])
        const agentHours = humanTickets / ticketsPerHour
        // Agent cost includes full burden (wage + benefits + management overhead)
        const agentCost = agentHours * agentHourlyWage

        let softwareCost = 0
        
        // Check if competitor requires per-seat pricing
        if (competitor.seatRequired && competitor.seatPricing) {
          // Calculate number of seats needed
          // Assume 40 hours/week = 160 hours/month per agent
          const seatsNeeded = Math.max(1, Math.ceil(agentHours / 160))
          
          // Use the cheapest seat price available
          const cheapestSeat = competitor.seatPricing.sort((a: any, b: any) => a.pricePerSeat - b.pricePerSeat)[0]
          const seatCost = seatsNeeded * cheapestSeat.pricePerSeat
          
          // For seat-based pricing, also add any volume-based costs
          const plans = competitor.plans
          const eligiblePlans = plans.filter((plan: any) => plan.includedTickets >= chatVolume)
          
          if (eligiblePlans.length > 0) {
            const cheapestPlan = eligiblePlans.sort((a: any, b: any) => a.base - b.base)[0]
            softwareCost = seatCost + cheapestPlan.base
          } else {
            const highestPlan = plans.sort((a: any, b: any) => b.includedTickets - a.includedTickets)[0]
            const overageTickets = Math.max(0, chatVolume - highestPlan.includedTickets)
            softwareCost = seatCost + highestPlan.base + (overageTickets * highestPlan.overage)
          }
        } else {
          // Ticket-based pricing only (like Gorgias)
          const plans = competitor.plans
          const eligiblePlans = plans.filter((plan: any) => plan.includedTickets >= chatVolume)

          if (eligiblePlans.length > 0) {
            const cheapestPlan = eligiblePlans.sort((a: any, b: any) => a.base - b.base)[0]
            softwareCost = cheapestPlan.base
          } else {
            const highestPlan = plans.sort((a: any, b: any) => b.includedTickets - a.includedTickets)[0]
            const overageTickets = Math.max(0, chatVolume - highestPlan.includedTickets)
            softwareCost = highestPlan.base + (overageTickets * highestPlan.overage)
          }
        }

        return {
          total: agentCost + softwareCost,
          agentCost,
          softwareCost
        }
      }

      // Calculate Garrio costs
      const garrioCostResult = calculateGarrioCost()
      costs["garrio"] = {
        total: garrioCostResult.total,
        agentCost: garrioCostResult.agentCost,
        softwareCost: garrioCostResult.softwareCost
      }
      const garrioPlanInfo = {
        planName: garrioCostResult.planName,
        effectiveAutomationRate: garrioCostResult.effectiveAutomationRate
      }

      // Calculate competitor costs
      competitorData.competitors.forEach((competitor) => {
        const cost = calculateCompetitorCost(competitor)
        costs[competitor.slug] = cost

        // Track highest competitor cost
        if (cost.total > highestCompetitorCost.cost) {
          highestCompetitorCost = { slug: competitor.slug, cost: cost.total }
        }
      })

      // Calculate savings compared to Garrio
      const garrioCost = costs["garrio"].total

      competitorData.competitors.forEach((competitor) => {
        const competitorCost = costs[competitor.slug].total
        savings[competitor.slug] = competitorCost - garrioCost
        roi[competitor.slug] = garrioCost > 0 ? (savings[competitor.slug] / garrioCost) * 100 : 0

        // Calculate hours saved
        const garrioHumanTickets = chatVolume * (1 - garrioPlanInfo.effectiveAutomationRate)
        const competitorHumanTickets = chatVolume * (1 - automationRates[competitor.slug])
        const hoursDiff = (competitorHumanTickets - garrioHumanTickets) / ticketsPerHour
        hoursSaved[competitor.slug] = hoursDiff
      })

      // Calculate upsell revenue (Garrio only)
      const upsellRevenue = showUpsellRevenue
        ? chatVolume * conversionRate * averageOrderValue * 0.02
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
        garrioPlanInfo,
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
    <div className="py-16 md:py-24 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BarChart2 className="w-4 h-4" />
            Detailed ROI Analysis
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            What's your support costing you?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get a detailed breakdown of your potential savings with Garrio's done-for-you customer support. 
            Compare costs, see time savings, and understand your ROI.
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
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                How many customer questions do you handle monthly?
              </h2>
              <div className="inline-flex items-center gap-3 bg-purple-50 px-6 py-4 rounded-xl">
                <span className="text-4xl font-bold text-purple-600 tabular-nums">{chatVolume.toLocaleString()}</span>
                <span className="text-gray-600 font-medium">interactions</span>
              </div>
            </div>
            
            <div className="mb-6">
              <Slider
                defaultValue={[750]}
                min={50}
                max={5000}
                step={50}
                onValueChange={handleSliderChange}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-3">
                <span className="font-medium">50</span>
                <span className="font-medium">500</span>
                <span className="font-medium">1,000</span>
                <span className="font-medium">2,500</span>
                <span className="font-medium">5,000+</span>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Savings Panel */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 border border-green-100 shadow-lg">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-900 mb-2">Your Savings</h2>
              </div>

              {results.highestCompetitorCost.slug && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-sm text-green-700 mb-2 font-medium">
                      Save vs {competitorData.competitors.find((app) => app.slug === results.highestCompetitorCost.slug)?.name}
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-green-800 mb-2 tabular-nums">
                      {formatCurrency(results.savings[results.highestCompetitorCost.slug] || 0)}
                    </div>
                    <div className="text-lg text-green-700 font-medium mb-4">
                      per {timePeriod === "monthly" ? "month" : "year"}
                    </div>
                    <div className="text-sm text-green-600 bg-green-50 px-4 py-2 rounded-lg inline-block">
                      {formatPercentage(results.roi[results.highestCompetitorCost.slug] || 0)} ROI
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center">
                        <BarChart2 className="h-5 w-5 text-green-600 mr-3" />
                        <span className="text-green-800 font-medium">Garrio Handled</span>
                      </div>
                      <span className="font-bold text-green-900">{formatPercentage((results.garrioPlanInfo?.effectiveAutomationRate || 0.7) * 100)}</span>
                    </div>

                    <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-blue-600 mr-3" />
                        <span className="text-blue-800 font-medium">Time Saved</span>
                      </div>
                      <span className="font-bold text-blue-900">
                        {Math.round(results.hoursSaved[results.highestCompetitorCost.slug] || 0)} hours
                      </span>
                    </div>

                    {showUpsellRevenue && results.upsellRevenue > 0 && (
                      <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                        <div className="flex items-center">
                          <DollarSign className="h-5 w-5 text-purple-600 mr-3" />
                          <span className="text-purple-800 font-medium">Upsell Revenue</span>
                        </div>
                        <span className="font-bold text-purple-900">{formatCurrency(results.upsellRevenue)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <div className="mt-8">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group" size="lg" asChild>
                  <Link
                    href={`https://apps.shopify.com/app-installation?utm_source=roi&utm_medium=calculator&utm_campaign=save_${Math.round(results.savings[results.highestCompetitorCost.slug] || 0)}&utm_content=${chatVolume}_chats`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleCtaClick}
                  >
                    Start Saving {formatCurrency(results.savings[results.highestCompetitorCost.slug] || 0)}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <p className="text-xs text-center text-green-600 mt-3 font-medium">
                  ✨ Free installation • No credit card • Live in 3 minutes
                </p>
              </div>
            </div>

            {/* Cost Chart */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {timePeriod === "monthly" ? "Monthly" : "Annual"} Cost Breakdown
                  </h2>
                  <p className="text-gray-600">Compare total costs across platforms</p>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                        <InfoCircle className="h-5 w-5 text-gray-600" />
                      </div>
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
                apps={[
                  { slug: "garrio", name: "Garrio", automationRate: results.garrioPlanInfo?.effectiveAutomationRate || 0.7 },
                  ...competitorData.competitors
                ]}
                formatCurrency={formatCurrency}
                timePeriod={timePeriod}
              />
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg mb-12">
            <Accordion type="single" collapsible>
              <AccordionItem value="advanced-settings">
                <AccordionTrigger
                  className="px-8 py-6 text-lg font-semibold"
                  onClick={() => {
                    // Fire analytics event
                    if (typeof window !== "undefined") {
                      console.log("Analytics event: roi_advanced_open")
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <RefreshCw className="h-5 w-5 text-purple-600" />
                    </div>
                    <span>Advanced Settings & Customization</span>
                  </div>
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
                    apps={[
                      { slug: "garrio", name: "Garrio", automationRate: results.garrioPlanInfo?.effectiveAutomationRate || 0.7 },
                      ...competitorData.competitors
                    ]}
                  />

                  <div className="mt-6 flex justify-end">
                    <Button
                      variant="outline"
                      className="flex items-center"
                      onClick={() => {
                        // Reset to defaults
                        setChatVolume(750) // Reset chat volume
                        setTimePeriod("monthly") // Reset time period
                        setAgentHourlyWage(37.48) // BLS data + benefits + management
                        setTicketsPerHour(4) // 15 minutes per interaction
                        setAutomationRates({
                          gorgias: 0.4,
                          reamaze: 0.35,
                          zendesk: 0.3,
                          tidio: 0.25
                        })
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
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100 p-8">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
                <InfoCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">How We Calculate Your Savings</h3>
                <div className="text-gray-700 space-y-2 leading-relaxed">
                  <p>
                    <strong>Industry Benchmarks:</strong> All data sourced from our verified claims document, including 15-minute average interaction times and competitor automation rates.
                  </p>
                  <p>
                    <strong>Real Costs:</strong> Agent costs based on BLS data ($20.59/hour median wage) plus 30% benefits/taxes and 40% management overhead. Software costs from current published pricing.
                  </p>
                  <p>
                    <strong>Transparent Sources:</strong> Automation rates and metrics derived from public case studies, official documentation, and verified customer data.
                  </p>
                </div>
                <div className="mt-4">
                  <Link 
                    href="/claims-sources" 
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium hover:underline"
                    target="_blank"
                  >
                    View detailed sources and methodology
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
