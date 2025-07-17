"use client"

import { ArrowUp } from "lucide-react"

export default function MicroFooter() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="bg-[#0E0F11] py-6 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-[#E5E5E7]/60 text-sm">© 2025 Garrio, Inc. · Crafted remotely from 🇺🇸 & 🌎 · v2.1.0</div>
          <button
            onClick={scrollToTop}
            className="text-[#E5E5E7]/60 hover:text-[#E5E5E7] transition-colors flex items-center text-sm"
            aria-label="Back to top"
          >
            <span className="mr-1">Back to top</span>
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
