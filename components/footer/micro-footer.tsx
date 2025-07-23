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
    <div className="bg-black py-8 border-t border-gray-800/50 relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-[#E5E5E7]/50 text-sm">
            <span>© 2025 Garrio, Inc.</span>
            <span className="text-gray-600">•</span>
            <span className="flex items-center gap-1">
              Crafted with 
              <span className="text-red-500 animate-pulse">♥</span>
              remotely
            </span>
            <span className="text-gray-600">•</span>
            <span className="font-mono text-xs bg-gray-800/50 px-2 py-1 rounded-md border border-gray-700/50">v2.1.0</span>
          </div>
          <button
            onClick={scrollToTop}
            className="group text-[#E5E5E7]/50 hover:text-white transition-all duration-300 flex items-center gap-2 text-sm px-4 py-2 rounded-lg hover:bg-white/5"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </div>
  )
}
