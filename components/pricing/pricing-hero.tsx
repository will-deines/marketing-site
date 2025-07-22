"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DollarSign, Sparkles, Calculator, ChevronDown } from "lucide-react"

export default function PricingHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-400"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-200"></div>
      </div>

      {/* Floating icons decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-32 text-white/10">
          <DollarSign className="w-24 h-24 animate-float" />
        </div>
        <div className="absolute bottom-32 left-20 text-white/10">
          <Sparkles className="w-20 h-20 animate-float animation-delay-200" />
        </div>
        <div className="absolute top-1/3 left-1/4 text-white/10">
          <Calculator className="w-16 h-16 animate-float animation-delay-400" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}>
            <DollarSign className="w-4 h-4" />
            Transparent, flexible pricing
          </div>

          {/* Main heading */}
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            Support tools for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200">
              indie brands competing
            </span>
            <br />
            with giants
          </h1>

          {/* Subheading */}
          <p className={`text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            Instant, elevated customer experience that puts you totally in control—without wasting your time.
          </p>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <Button 
              size="lg" 
              className="bg-white text-purple-900 hover:bg-white/90 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 text-lg px-8 py-6 h-auto rounded-2xl font-semibold group"
              asChild
            >
              <Link href="https://apps.shopify.com/app-installation" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                Install Free on Shopify
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm text-lg px-8 py-6 h-auto rounded-2xl font-semibold group"
              asChild
            >
              <Link href="#calculator" className="flex items-center gap-3">
                <Calculator className="w-5 h-5" />
                Calculate Your Cost
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-8 text-white/70 text-sm transition-all duration-1000 delay-800 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Free forever on first 50 chats</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <ChevronDown className="w-8 h-8 text-white/50 animate-bounce" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
