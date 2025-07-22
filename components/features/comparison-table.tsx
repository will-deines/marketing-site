"use client"

import { useEffect, useState, useRef } from "react"
import { Check, X, Info, FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import ClaimsModal from "@/components/ui/claims-modal"
import competitorsData from "@/data/competitors.json"

interface ComparisonItem {
  category: "outcome" | "product" | "pricing" | "trust"
  feature: string
  tooltip?: string
  garrio: {
    value: string | boolean | number
    highlight?: boolean
    note?: string
  }
  gorgias: {
    value: string | boolean | number
    note?: string
  }
  reamaze: {
    value: string | boolean | number
    note?: string
  }
  zendesk: {
    value: string | boolean | number
    note?: string
  }
  tidio: {
    value: string | boolean | number
    note?: string
  }
}

// Helper function to get company data by slug
const getCompanyData = (slug: string) => {
  return competitorsData.find(company => company.slug === slug)
}

// Helper function to format values for display
const formatValue = (value: boolean | string, note?: string) => {
  if (typeof value === "boolean") {
    return { value, note }
  }
  if (value === "limited") {
    return { value, note }
  }
  return { value, note }
}

// Generate comparison data from JSON
const generateComparisonData = (): ComparisonItem[] => {
  const garrio = getCompanyData("garrio")!
  const gorgias = getCompanyData("gorgias")!
  const reamaze = getCompanyData("reamaze")!
  const zendesk = getCompanyData("zendesk")!
  const tidio = getCompanyData("tidio")!

  return [
    // Core outcome rows
    {
      category: "outcome",
      feature: "Never answer tickets yourself",
      tooltip: "Based on Garrio's done-for-you support service",
      garrio: { value: garrio.featureFlags.doneForYouSupportService, highlight: true },
      gorgias: { value: gorgias.featureFlags.doneForYouSupportService },
      reamaze: { value: reamaze.featureFlags.doneForYouSupportService },
      zendesk: formatValue(zendesk.featureFlags.doneForYouSupportService, zendesk.featureFlags.doneForYouSupportServiceNote),
      tidio: { value: tidio.featureFlags.doneForYouSupportService },
    },
    {
      category: "outcome",
      feature: "Average first response time",
      tooltip: "Industry-reported average response times for customer inquiries",
      garrio: { value: garrio.performance.avgFirstResponseTime, highlight: true },
      gorgias: { value: gorgias.performance.avgFirstResponseTime, note: gorgias.performance.avgFirstResponseTimeNote },
      reamaze: { value: reamaze.performance.avgFirstResponseTime, note: reamaze.performance.avgFirstResponseTimeNote },
      zendesk: { value: zendesk.performance.avgFirstResponseTime, note: zendesk.performance.avgFirstResponseTimeNote },
      tidio: { value: tidio.performance.avgFirstResponseTime, note: tidio.performance.avgFirstResponseTimeNote },
    },
    {
      category: "outcome",
      feature: "Avg. minutes saved per interaction",
      tooltip: "Calculated from AI deflection rates and done-for-you service. Based on 15-minute average interaction time.",
      garrio: { value: garrio.performance.minutesSavedPerInteraction, highlight: true, note: garrio.performance.minutesSavedNote },
      gorgias: { value: gorgias.performance.minutesSavedPerInteraction, note: gorgias.performance.minutesSavedNote },
      reamaze: { value: reamaze.performance.minutesSavedPerInteraction, note: reamaze.performance.minutesSavedNote },
      zendesk: { value: zendesk.performance.minutesSavedPerInteraction, note: zendesk.performance.minutesSavedNote },
      tidio: { value: tidio.performance.minutesSavedPerInteraction, note: tidio.performance.minutesSavedNote },
    },

    // Product differentiators
    {
      category: "product",
      feature: "Shopify 1-click actions",
      garrio: { value: garrio.featureFlags.oneClickShopifyActions, highlight: true },
      gorgias: formatValue(gorgias.featureFlags.oneClickShopifyActions, gorgias.featureFlags.oneClickShopifyActionsNote),
      reamaze: formatValue(reamaze.featureFlags.oneClickShopifyActions, reamaze.featureFlags.oneClickShopifyActionsNote),
      zendesk: formatValue(zendesk.featureFlags.oneClickShopifyActions, zendesk.featureFlags.oneClickShopifyActionsNote),
      tidio: { value: tidio.featureFlags.oneClickShopifyActions },
    },
    {
      category: "product",
      feature: "Built-in upsell engine",
      tooltip: "AI suggests relevant products during support conversations",
      garrio: { value: garrio.featureFlags.builtInUpsells, highlight: true },
      gorgias: formatValue(gorgias.featureFlags.builtInUpsells, gorgias.featureFlags.builtInUpsellsNote),
      reamaze: { value: reamaze.featureFlags.builtInUpsells },
      zendesk: formatValue(zendesk.featureFlags.builtInUpsells, zendesk.featureFlags.builtInUpsellsNote),
      tidio: formatValue(tidio.featureFlags.builtInUpsells, tidio.featureFlags.builtInUpsellsNote),
    },
    {
      category: "product",
      feature: "Done-for-you support service",
      garrio: { value: garrio.featureFlags.doneForYouSupportService, highlight: true },
      gorgias: { value: gorgias.featureFlags.doneForYouSupportService },
      reamaze: { value: reamaze.featureFlags.doneForYouSupportService },
      zendesk: formatValue(zendesk.featureFlags.doneForYouSupportService, zendesk.featureFlags.doneForYouSupportServiceNote),
      tidio: { value: tidio.featureFlags.doneForYouSupportService },
    },

    // Pricing/entry rows
    {
      category: "pricing",
      feature: "Free tier availability",
      garrio: { value: garrio.pricing.freeTierDescription, highlight: true },
      gorgias: { value: gorgias.pricing.freeTierDescription },
      reamaze: { value: reamaze.pricing.freeTierDescription },
      zendesk: { value: zendesk.pricing.freeTierDescription },
      tidio: { value: tidio.pricing.freeTierDescription },
    },
    {
      category: "pricing",
      feature: "Overage rate per chat",
      garrio: { value: `$${garrio.pricing.overagePerTicket.toFixed(2)}`, highlight: true },
      gorgias: { value: `$${gorgias.pricing.overagePerTicket.toFixed(2)}` },
      reamaze: { value: `$${reamaze.pricing.overagePerTicket.toFixed(2)}` },
      zendesk: { value: "Tiered pricing" },
      tidio: { value: `$${tidio.pricing.overagePerTicket.toFixed(2)}` },
    },
    {
      category: "pricing",
      feature: "Migration service cost",
      garrio: { value: garrio.pricing.migrationCost, highlight: true },
      gorgias: { value: gorgias.pricing.migrationCost },
      reamaze: { value: reamaze.pricing.migrationCost },
      zendesk: { value: zendesk.pricing.migrationCost },
      tidio: { value: tidio.pricing.migrationCost },
    },

    // Trust rows
    {
      category: "trust",
      feature: "Shopify rating",
      tooltip: "As of July 2025",
      garrio: { value: `${garrio.shopifyRating}★`, highlight: true },
      gorgias: { value: `${gorgias.shopifyRating}★` },
      reamaze: { value: `${reamaze.shopifyRating}★` },
      zendesk: { value: `${zendesk.shopifyRating}★` },
      tidio: { value: `${tidio.shopifyRating}★` },
    },
    {
      category: "trust",
      feature: "Stores using",
      tooltip: "Actual installation counts as of July 2025",
      garrio: { value: `${garrio.approxUsers.toLocaleString()}+`, highlight: true },
      gorgias: { value: gorgias.approxUsers.toLocaleString() },
      reamaze: { value: `${reamaze.approxUsers.toLocaleString()}+` },
      zendesk: { value: zendesk.approxUsers.toLocaleString() },
      tidio: { value: tidio.approxUsers.toLocaleString() },
    },
  ]
}

const comparisonData: ComparisonItem[] = generateComparisonData()

export default function ComparisonTable() {
  const [, setIsSticky] = useState(false)
  const [visibleRows, setVisibleRows] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"full" | "swipe" | "accordion">("full")
  const tableRef = useRef<HTMLTableElement>(null)
  const headerRef = useRef<HTMLTableSectionElement>(null)
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([])

  // Set view mode based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setViewMode("full")
      } else if (window.innerWidth >= 768) {
        setViewMode("swipe")
      } else {
        setViewMode("accordion")
      }
    }

    handleResize() // Initial check
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (!tableRef.current || !headerRef.current) return

      const tableTop = tableRef.current.getBoundingClientRect().top
      const tableBottom = tableRef.current.getBoundingClientRect().bottom

      if (tableTop < 0 && tableBottom > headerRef.current.offsetHeight) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle row visibility for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = rowRefs.current.findIndex((ref) => ref === entry.target)
          if (index !== -1 && entry.isIntersecting) {
            setVisibleRows((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index]
              }
              return prev
            })
          }
        })
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" },
    )

    rowRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      rowRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  // Initialize row refs
  useEffect(() => {
    rowRefs.current = rowRefs.current.slice(0, comparisonData.length)
  }, [])

  const renderValue = (item: { value: string | boolean | number; note?: string }, isGarrio = false) => {
    if (typeof item.value === "boolean") {
      return item.value ? (
        <Check className={`h-6 w-6 ${isGarrio ? "text-green-500" : "text-green-400"} mx-auto`} />
      ) : (
        <X className="h-6 w-6 text-gray-400 mx-auto" />
      )
    }

    if (item.value === "limited") {
      return (
        <div className="flex flex-col items-center">
          <div className="text-amber-500 font-medium mb-1">Limited</div>
          {item.note && <span className="text-xs text-gray-500">{item.note}</span>}
        </div>
      )
    }

    return (
      <div className={`${isGarrio ? "font-bold text-purple-700" : "text-gray-700"}`}>
        {item.value}
        {item.note && <div className="text-xs text-gray-500 mt-1">{item.note}</div>}
      </div>
    )
  }

  // Group data by category
  const outcomeRows = comparisonData.filter((item) => item.category === "outcome")
  const productRows = comparisonData.filter((item) => item.category === "product")
  const pricingRows = comparisonData.filter((item) => item.category === "pricing")
  const trustRows = comparisonData.filter((item) => item.category === "trust")


  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Which platform lets you focus on what you love?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Compare what matters most: your time, your customers&apos; happiness, and your peace of mind.
          </p>
          
          {/* Sources Link */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <ClaimsModal 
              title="Comparison Claims & Sources"
              size="lg"
              trigger={
                <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-800">
                  <FileText className="h-4 w-4 mr-2" />
                  View Sources & Claims
                </Button>
              }
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
            <table className="w-full min-w-[800px]" ref={tableRef}>
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="sticky top-0 bg-gray-50 text-left p-4 font-semibold text-gray-900 border-r border-gray-200 z-10">
                    Feature
                  </th>
                  <th className="sticky top-0 bg-gradient-to-b from-purple-50 to-purple-100 text-center p-4 font-bold text-purple-800 border-2 border-purple-200 relative z-10">
                    <div className="flex flex-col items-center">
                      <span className="text-lg">Garrio</span>
                      <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full mt-1">RECOMMENDED</span>
                    </div>
                  </th>
                  <th className="sticky top-0 bg-gray-50 text-center p-4 font-semibold text-gray-700 border-r border-gray-200 z-10">
                    Gorgias
                  </th>
                  <th className="sticky top-0 bg-gray-50 text-center p-4 font-semibold text-gray-700 border-r border-gray-200 z-10">
                    Re:amaze
                  </th>
                  <th className="sticky top-0 bg-gray-50 text-center p-4 font-semibold text-gray-700 border-r border-gray-200 z-10">
                    Zendesk
                  </th>
                  <th className="sticky top-0 bg-gray-50 text-center p-4 font-semibold text-gray-700 z-10">
                    Tidio
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Time & Peace of Mind Category */}
                <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
                  <td colSpan={6} className="py-3 px-4 font-semibold text-gray-800 text-sm md:text-base border-t-2 border-gray-200">
                    Time & Peace of Mind
                  </td>
                </tr>
                {outcomeRows.map((item, index) => (
                  <tr 
                    key={`outcome-${index}`}
                    ref={(el) => (rowRefs.current[index] = el)}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-all duration-500 ${
                      visibleRows.includes(index) ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <td className="p-3 md:p-4 font-medium text-sm md:text-base border-r border-gray-200">
                      <div className="flex items-center">
                        {item.feature}
                        {item.tooltip && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-3 w-3 md:h-4 md:w-4 text-gray-400 ml-2 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs p-2 bg-gray-800 text-white">
                                <p>{item.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </td>
                    <td className={`text-center p-3 md:p-4 text-sm md:text-base border-2 border-purple-200 ${item.garrio.highlight ? "bg-gradient-to-r from-purple-50 to-purple-100" : ""}`}>
                      {renderValue(item.garrio, true)}
                    </td>
                    <td className="text-center p-3 md:p-4 text-sm md:text-base border-r border-gray-200">
                      {renderValue(item.gorgias)}
                    </td>
                    <td className="text-center p-3 md:p-4 text-sm md:text-base border-r border-gray-200">
                      {renderValue(item.reamaze)}
                    </td>
                    <td className="text-center p-3 md:p-4 text-sm md:text-base border-r border-gray-200">
                      {renderValue(item.zendesk)}
                    </td>
                    <td className="text-center p-3 md:p-4 text-sm md:text-base">
                      {renderValue(item.tidio)}
                    </td>
                  </tr>
                ))}

                {/* Features That Actually Matter Category */}
                <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
                  <td colSpan={6} className="py-3 px-4 font-semibold text-gray-800 text-sm md:text-base border-t-2 border-gray-200">
                    Features That Actually Matter
                  </td>
                </tr>
                {productRows.map((item, index) => (
                  <tr 
                    key={`product-${index}`}
                    ref={(el) => (rowRefs.current[outcomeRows.length + index] = el)}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-all duration-500 ${
                      visibleRows.includes(outcomeRows.length + index) ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: `${(outcomeRows.length + index) * 50}ms` }}
                  >
                    <td className="p-3 md:p-4 font-medium text-sm md:text-base border-r border-gray-200">
                      <div className="flex items-center">
                        {item.feature}
                        {item.tooltip && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-3 w-3 md:h-4 md:w-4 text-gray-400 ml-2 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs p-2 bg-gray-800 text-white">
                                <p>{item.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </td>
                    <td className={`text-center p-3 md:p-4 text-sm md:text-base border-2 border-purple-200 ${item.garrio.highlight ? "bg-gradient-to-r from-purple-50 to-purple-100" : ""}`}>
                      {renderValue(item.garrio, true)}
                    </td>
                    <td className="text-center p-3 md:p-4 text-sm md:text-base border-r border-gray-200">
                      {renderValue(item.gorgias)}
                    </td>
                    <td className="text-center p-3 md:p-4 text-sm md:text-base border-r border-gray-200">
                      {renderValue(item.reamaze)}
                    </td>
                    <td className="text-center p-3 md:p-4 text-sm md:text-base border-r border-gray-200">
                      {renderValue(item.zendesk)}
                    </td>
                    <td className="text-center p-3 md:p-4 text-sm md:text-base">
                      {renderValue(item.tidio)}
                    </td>
                  </tr>
                ))}

                {/* Budget & Getting Started Category */}
                <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
                  <td colSpan={6} className="py-3 px-4 font-semibold text-gray-800 text-sm md:text-base border-t-2 border-gray-200">
                    Budget & Getting Started
                  </td>
                </tr>
                {pricingRows.map((item, index) => (
                  <tr 
                    key={`pricing-${index}`}
                    ref={(el) => (rowRefs.current[outcomeRows.length + productRows.length + index] = el)}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-all duration-500 ${
                      visibleRows.includes(outcomeRows.length + productRows.length + index) ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: `${(outcomeRows.length + productRows.length + index) * 50}ms` }}
                  >
                    <td className="p-3 md:p-4 font-medium text-sm md:text-base border-r border-gray-200">
                      <div className="flex items-center">
                        {item.feature}
                        {item.tooltip && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-3 w-3 md:h-4 md:w-4 text-gray-400 ml-2 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs p-2 bg-gray-800 text-white">
                                <p>{item.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </td>
                    <td className={`text-center p-3 md:p-4 text-sm md:text-base border-2 border-purple-200 ${item.garrio.highlight ? "bg-gradient-to-r from-purple-50 to-purple-100" : ""}`}>
                      {renderValue(item.garrio, true)}
                    </td>
                    <td className="text-center p-3 md:p-4 text-sm md:text-base border-r border-gray-200">
                      {renderValue(item.gorgias)}
                    </td>
                    <td className="text-center p-3 md:p-4 text-sm md:text-base border-r border-gray-200">
                      {renderValue(item.reamaze)}
                    </td>
                    <td className="text-center p-3 md:p-4 text-sm md:text-base border-r border-gray-200">
                      {renderValue(item.zendesk)}
                    </td>
                    <td className="text-center p-3 md:p-4 text-sm md:text-base">
                      {renderValue(item.tidio)}
                    </td>
                  </tr>
                ))}

                {/* Social Proof & Community Category */}
                <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
                  <td colSpan={6} className="py-3 px-4 font-semibold text-gray-800 text-sm md:text-base border-t-2 border-gray-200">
                    Social Proof & Community
                  </td>
                </tr>
                {trustRows.map((item, index) => (
                  <tr 
                    key={`trust-${index}`}
                    ref={(el) => (rowRefs.current[outcomeRows.length + productRows.length + pricingRows.length + index] = el)}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-all duration-500 ${
                      visibleRows.includes(outcomeRows.length + productRows.length + pricingRows.length + index) ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: `${(outcomeRows.length + productRows.length + pricingRows.length + index) * 50}ms` }}
                  >
                    <td className="p-3 md:p-4 font-medium text-sm md:text-base border-r border-gray-200">
                      <div className="flex items-center">
                        {item.feature}
                        {item.tooltip && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-3 w-3 md:h-4 md:w-4 text-gray-400 ml-2 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs p-2 bg-gray-800 text-white">
                                <p>{item.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </td>
                    <td className={`text-center p-3 md:p-4 text-sm md:text-base border-2 border-purple-200 ${item.garrio.highlight ? "bg-gradient-to-r from-purple-50 to-purple-100" : ""}`}>
                      {renderValue(item.garrio, true)}
                    </td>
                    <td className="text-center p-3 md:p-4 text-sm md:text-base border-r border-gray-200">
                      {renderValue(item.gorgias)}
                    </td>
                    <td className="text-center p-3 md:p-4 text-sm md:text-base border-r border-gray-200">
                      {renderValue(item.reamaze)}
                    </td>
                    <td className="text-center p-3 md:p-4 text-sm md:text-base border-r border-gray-200">
                      {renderValue(item.zendesk)}
                    </td>
                    <td className="text-center p-3 md:p-4 text-sm md:text-base">
                      {renderValue(item.tidio)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {viewMode === "accordion" ? (
            // Accordion view for mobile
            <div className="space-y-4">
              {["Gorgias", "Re:amaze", "Zendesk", "Tidio"].map((competitor) => (
                <details key={competitor} className="bg-white rounded-lg shadow-sm">
                  <summary className="p-4 font-bold cursor-pointer flex justify-between items-center">
                    {competitor} vs Garrio
                    <span className="text-purple-600">Compare</span>
                  </summary>
                  <div className="p-4 border-t border-gray-200">
                    {comparisonData.map((item, index) => (
                      <div key={index} className="py-3 border-b border-gray-100 last:border-b-0">
                        <div className="font-medium mb-2">{item.feature}</div>
                        <div className="flex justify-between">
                          <div className="font-bold text-purple-700">
                            Garrio:{" "}
                            {typeof item.garrio.value === "boolean"
                              ? item.garrio.value
                                ? "Yes"
                                : "No"
                              : item.garrio.value}
                          </div>
                          <div className="text-gray-700">
                            {competitor}:{" "}
                            {typeof item[competitor.toLowerCase() as keyof typeof item].value === "boolean"
                              ? item[competitor.toLowerCase() as keyof typeof item].value
                                ? "Yes"
                                : "No"
                              : item[competitor.toLowerCase() as keyof typeof item].value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          ) : null}

          {/* Last updated note */}
          <div className="text-right text-xs text-gray-500 mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} • <Link href="/claims-sources" className="text-blue-600 hover:underline">View sources</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
