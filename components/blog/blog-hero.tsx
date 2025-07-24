"use client"

import { Sparkles, BookOpen, ChevronDown } from "lucide-react"

interface BlogHeroProps {
  vertical: string[]
  setVertical: (vertical: string[]) => void
  allVerticals: string[]
  verticalLabels: Record<string, string>
}

export default function BlogHero({ vertical, setVertical, allVerticals, verticalLabels }: BlogHeroProps) {
  // Toggle vertical filter
  const toggleVertical = (v: string) => {
    if (vertical.includes(v)) {
      setVertical(vertical.filter((item) => item !== v))
    } else {
      setVertical([...vertical, v])
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center min-h-screen relative pt-16">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 py-12 sm:py-16 md:py-20">
          {/* Elegant badge */}
          <div className="hidden md:inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-6 py-3 rounded-full text-sm font-medium border border-white/20 animate-fade-in">
            <BookOpen className="w-4 h-4" />
            For Shopify founders ready to scale
          </div>

          {/* Main headline */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 animate-fade-in-up">
            <h1 className="text-[2.75rem] leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white sm:leading-[0.9]">
              Growth
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200">
                Library
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Actionable CX playbooks that turn customer questions into sales opportunities
          </p>

          {/* Enhanced Vertical Pills */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-4 sm:pt-6 md:pt-8 animate-fade-in-up animation-delay-400">
            {allVerticals.map((v, index) => (
              <button
                key={v}
                onClick={() => toggleVertical(v)}
                style={{ animationDelay: `${400 + index * 100}ms` }}
                className={`px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105 animate-fade-in-up ${
                  vertical.includes(v) 
                    ? "bg-white text-purple-700 shadow-2xl" 
                    : "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 text-white"
                }`}
                aria-pressed={vertical.includes(v)}
              >
                {verticalLabels[v] || v}
              </button>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 pt-6 sm:pt-8 md:pt-10 text-white/60 text-xs sm:text-sm animate-fade-in animation-delay-600">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
              <span>50+ proven playbooks</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Real case studies</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Free access</span>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator - Mobile only */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:hidden">
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/70" />
          </div>
        </div>
      </div>
    </div>
  )
}
