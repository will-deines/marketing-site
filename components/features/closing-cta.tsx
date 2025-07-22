"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Play, Star } from "lucide-react"

export default function ClosingCTA() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-400"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-200"></div>
      </div>
      
      {/* Stars decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 text-white/20">
          <Star className="w-6 h-6 animate-pulse" />
        </div>
        <div className="absolute top-32 right-32 text-white/20">
          <Star className="w-4 h-4 animate-pulse animation-delay-200" />
        </div>
        <div className="absolute bottom-20 left-1/3 text-white/20">
          <Star className="w-5 h-5 animate-pulse animation-delay-400" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/20">
            <Sparkles className="w-4 h-4" />
            Join 500+ founders who chose freedom
          </div>
          
          {/* Main heading */}
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Ready to reclaim
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200">
              your passion?
            </span>
          </h2>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Get back to what you love most: creating beautiful things your customers can't wait to buy.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-purple-900 hover:bg-white/90 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 text-lg px-8 py-6 h-auto rounded-2xl font-semibold group"
              asChild
            >
              <Link href="https://apps.shopify.com/app-installation" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                Start Free Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm text-lg px-8 py-6 h-auto rounded-2xl font-semibold group"
              asChild
            >
              <Link href="#" onClick={() => window.open("https://garrio.ai/demo", "_blank")} className="flex items-center gap-3">
                <Play className="w-5 h-5" />
                See How It Works
              </Link>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Free forever on first 50 chats</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>5-minute setup</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
