"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function CtaRail() {
  const searchParams = useSearchParams()

  // Get current filters for analytics
  const currentFilters = {
    vertical: searchParams.getAll("vertical"),
    funnel: searchParams.get("funnel"),
    minReadingTime: searchParams.get("minReadingTime"),
    maxReadingTime: searchParams.get("maxReadingTime"),
  }

  // Track CTA click
  const trackCtaClick = () => {
    if (typeof window !== "undefined") {
      console.log("Analytics event: blog_cta_rail_click", {
        currentFilters,
      })
    }
  }

  return (
    <div className="bg-purple-50 rounded-lg border border-purple-100 p-6">
      <h3 className="text-lg font-bold text-purple-900 mb-3">Ready to transform your customer support?</h3>
      <p className="text-purple-800 mb-4">Join 2,247 stores saving 10 hrs/wk with automated customer support.</p>
      <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
        <Link
          href="https://apps.shopify.com/app-installation"
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackCtaClick}
        >
          Add Garrio Free—1 Click
        </Link>
      </Button>
      <p className="text-xs text-center text-purple-700 mt-2">No credit card • Up in 3 min</p>
    </div>
  )
}
