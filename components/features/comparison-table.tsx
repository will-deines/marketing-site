"use client"

import { useEffect, useState, useRef } from "react"
import { Check, X, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

const comparisonData: ComparisonItem[] = [
  // Core outcome rows
  {
    category: "outcome",
    feature: "Never answer tickets yourself",
    tooltip: "Based on Garrio's done-for-you escalation service",
    garrio: { value: true, highlight: true },
    gorgias: { value: false },
    reamaze: { value: false },
    zendesk: { value: false },
    tidio: { value: false },
  },
  {
    category: "outcome",
    feature: "First-reply time with AI",
    tooltip: "Median response time based on last 10,000 conversations",
    garrio: { value: "15 sec", highlight: true },
    gorgias: { value: "38 sec" },
    reamaze: { value: "45 sec" },
    zendesk: { value: "60 sec" },
    tidio: { value: "30 sec" },
  },
  {
    category: "outcome",
    feature: "Avg. minutes saved / 100 chats",
    tooltip: "Based on customer reported time savings",
    garrio: { value: 320, highlight: true },
    gorgias: { value: 180 },
    reamaze: { value: 150 },
    zendesk: { value: 200 },
    tidio: { value: 120 },
  },

  // Product differentiators
  {
    category: "product",
    feature: "Shopify 1-click actions",
    garrio: { value: true, highlight: true },
    gorgias: { value: "limited", note: "macros only" },
    reamaze: { value: "limited", note: "basic actions" },
    zendesk: { value: "limited", note: "custom app" },
    tidio: { value: false },
  },
  {
    category: "product",
    feature: "Built-in upsell engine",
    tooltip: "AI suggests relevant products during support conversations",
    garrio: { value: true, highlight: true },
    gorgias: { value: "limited", note: "Add-on" },
    reamaze: { value: false },
    zendesk: { value: "limited", note: "Add-on" },
    tidio: { value: "limited", note: "basic" },
  },
  {
    category: "product",
    feature: "Outsourced agents option",
    garrio: { value: true, highlight: true },
    gorgias: { value: false },
    reamaze: { value: false },
    zendesk: { value: "limited", note: "via partners" },
    tidio: { value: false },
  },

  // Pricing/entry rows
  {
    category: "pricing",
    feature: "Free tier availability",
    garrio: { value: "250 chats/mo", highlight: true },
    gorgias: { value: "Limited tickets $10/mo" },
    reamaze: { value: "No free tier" },
    zendesk: { value: "14-day trial" },
    tidio: { value: "Limited features" },
  },
  {
    category: "pricing",
    feature: "Overage rate per chat",
    garrio: { value: "$0.10", highlight: true },
    gorgias: { value: "$0.25" },
    reamaze: { value: "$0.20" },
    zendesk: { value: "Tiered pricing" },
    tidio: { value: "$0.15" },
  },
  {
    category: "pricing",
    feature: "Migration service cost",
    garrio: { value: "Free", highlight: true },
    gorgias: { value: "$500+" },
    reamaze: { value: "$250" },
    zendesk: { value: "$1000+" },
    tidio: { value: "Self-service" },
  },

  // Trust rows
  {
    category: "trust",
    feature: "Shopify rating",
    tooltip: "As of April 2025",
    garrio: { value: "4.9★", highlight: true },
    gorgias: { value: "4.3★" },
    reamaze: { value: "4.1★" },
    zendesk: { value: "3.8★" },
    tidio: { value: "4.5★" },
  },
  {
    category: "trust",
    feature: "Stores using",
    tooltip: "Approximate number based on public data",
    garrio: { value: "2,500+", highlight: true },
    gorgias: { value: "10,000+" },
    reamaze: { value: "5,000+" },
    zendesk: { value: "20,000+" },
    tidio: { value: "8,000+" },
  },
]

export default function ComparisonTable() {
  const [isSticky, setIsSticky] = useState(false)
  const [visibleRows, setVisibleRows] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"full" | "swipe" | "accordion">("full")
  const tableRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

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

  // Render category header
  const renderCategoryHeader = (title: string) => (
    <div className="col-span-5 bg-gray-100 py-2 px-4 font-medium text-gray-700">{title}</div>
  )

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Side-by-Side Comparison</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how Garrio stacks up against other customer support platforms.
          </p>
        </div>

        <div ref={tableRef} className="relative overflow-hidden">
          {viewMode === "full" || viewMode === "swipe" ? (
            <>
              {/* Sticky header */}
              <div
                ref={headerRef}
                className={`bg-white z-20 transition-all duration-300 ${isSticky ? "sticky top-0 shadow-md" : ""}`}
              >
                <div className={`${viewMode === "swipe" ? "min-w-max overflow-x-auto" : ""}`}>
                  <div className="grid grid-cols-5 gap-4 p-4">
                    <div className="font-bold text-gray-700">Feature</div>
                    <div className="font-bold text-purple-700 bg-purple-50 p-3 rounded-lg text-center border-l-4 border-purple-600">
                      Garrio
                    </div>
                    <div className="font-bold text-gray-700 text-center">Gorgias</div>
                    <div className="font-bold text-gray-700 text-center">Re:amaze</div>
                    <div className="font-bold text-gray-700 text-center">Zendesk</div>
                  </div>
                </div>
              </div>

              {/* Table body */}
              <div className={`${viewMode === "swipe" ? "overflow-x-auto" : ""}`}>
                <div className={`${viewMode === "swipe" ? "min-w-max" : ""}`}>
                  {/* Outcome Rows */}
                  {renderCategoryHeader("Core Outcomes")}
                  {outcomeRows.map((item, index) => (
                    <div
                      key={`outcome-${index}`}
                      ref={(el) => (rowRefs.current[index] = el)}
                      className={`grid grid-cols-5 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-opacity duration-500 ${
                        visibleRows.includes(index) ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <div className="font-medium flex items-center">
                        {item.feature}
                        {item.tooltip && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-gray-400 ml-2 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs p-2 bg-gray-800 text-white">
                                <p>{item.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <div className={`text-center p-2 ${item.garrio.highlight ? "bg-purple-50 rounded-lg" : ""}`}>
                        {renderValue(item.garrio, true)}
                      </div>
                      <div className="text-center">{renderValue(item.gorgias)}</div>
                      <div className="text-center">{renderValue(item.reamaze)}</div>
                      <div className="text-center">{renderValue(item.zendesk)}</div>
                    </div>
                  ))}

                  {/* Product Rows */}
                  {renderCategoryHeader("Product Differentiators")}
                  {productRows.map((item, index) => (
                    <div
                      key={`product-${index}`}
                      ref={(el) => (rowRefs.current[outcomeRows.length + index] = el)}
                      className={`grid grid-cols-5 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-opacity duration-500 ${
                        visibleRows.includes(outcomeRows.length + index) ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ transitionDelay: `${(outcomeRows.length + index) * 50}ms` }}
                    >
                      <div className="font-medium flex items-center">
                        {item.feature}
                        {item.tooltip && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-gray-400 ml-2 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs p-2 bg-gray-800 text-white">
                                <p>{item.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <div className={`text-center p-2 ${item.garrio.highlight ? "bg-purple-50 rounded-lg" : ""}`}>
                        {renderValue(item.garrio, true)}
                      </div>
                      <div className="text-center">{renderValue(item.gorgias)}</div>
                      <div className="text-center">{renderValue(item.reamaze)}</div>
                      <div className="text-center">{renderValue(item.zendesk)}</div>
                    </div>
                  ))}

                  {/* Pricing Rows */}
                  {renderCategoryHeader("Pricing & Entry")}
                  {pricingRows.map((item, index) => (
                    <div
                      key={`pricing-${index}`}
                      ref={(el) => (rowRefs.current[outcomeRows.length + productRows.length + index] = el)}
                      className={`grid grid-cols-5 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-opacity duration-500 ${
                        visibleRows.includes(outcomeRows.length + productRows.length + index)
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                      style={{ transitionDelay: `${(outcomeRows.length + productRows.length + index) * 50}ms` }}
                    >
                      <div className="font-medium flex items-center">
                        {item.feature}
                        {item.tooltip && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-gray-400 ml-2 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs p-2 bg-gray-800 text-white">
                                <p>{item.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <div className={`text-center p-2 ${item.garrio.highlight ? "bg-purple-50 rounded-lg" : ""}`}>
                        {renderValue(item.garrio, true)}
                      </div>
                      <div className="text-center">{renderValue(item.gorgias)}</div>
                      <div className="text-center">{renderValue(item.reamaze)}</div>
                      <div className="text-center">{renderValue(item.zendesk)}</div>
                    </div>
                  ))}

                  {/* Trust Rows */}
                  {renderCategoryHeader("Trust & Adoption")}
                  {trustRows.map((item, index) => (
                    <div
                      key={`trust-${index}`}
                      ref={(el) =>
                        (rowRefs.current[outcomeRows.length + productRows.length + pricingRows.length + index] = el)
                      }
                      className={`grid grid-cols-5 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-opacity duration-500 ${
                        visibleRows.includes(outcomeRows.length + productRows.length + pricingRows.length + index)
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                      style={{
                        transitionDelay: `${(outcomeRows.length + productRows.length + pricingRows.length + index) * 50}ms`,
                      }}
                    >
                      <div className="font-medium flex items-center">
                        {item.feature}
                        {item.tooltip && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-gray-400 ml-2 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs p-2 bg-gray-800 text-white">
                                <p>{item.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <div className={`text-center p-2 ${item.garrio.highlight ? "bg-purple-50 rounded-lg" : ""}`}>
                        {renderValue(item.garrio, true)}
                      </div>
                      <div className="text-center">{renderValue(item.gorgias)}</div>
                      <div className="text-center">{renderValue(item.reamaze)}</div>
                      <div className="text-center">{renderValue(item.zendesk)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            // Accordion view for mobile
            <div className="space-y-4">
              {["Gorgias", "Re:amaze", "Zendesk", "Tidio"].map((competitor, idx) => (
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
          )}

          {/* Last updated note */}
          <div className="text-right text-xs text-gray-500 mt-4">Last updated: April 23, 2025</div>
        </div>
      </div>
    </section>
  )
}
