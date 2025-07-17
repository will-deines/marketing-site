"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/lib/analytics"

interface StickyCtaProps {
  minutesSaved: number
}

export default function StickyCta({ minutesSaved }: StickyCtaProps) {
  const handleCtaClick = () => {
    trackEvent("live_demo_cta_click", { minutes_saved: minutesSaved })
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] z-50">
      <div className="container mx-auto px-4 h-[72px] flex items-center justify-between">
        <div className="hidden md:block">
          <p className="font-medium">Save {minutesSaved} min per 100 chats — Add Garrio to your store now</p>
        </div>
        <Button
          className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 h-12 px-6"
          asChild
          onClick={handleCtaClick}
        >
          <Link href="https://apps.shopify.com/garrio-chat" target="_blank" rel="noopener noreferrer">
            Add Garrio Free—1 Click Install
          </Link>
        </Button>
      </div>
    </div>
  )
}
