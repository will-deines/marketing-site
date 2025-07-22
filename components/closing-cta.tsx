"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles, Clock, Users, TrendingUp, Zap } from "lucide-react"

export default function ClosingCTA() {
  const [isPulsing, setIsPulsing] = useState(false)

  // Set up pulsing animation every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(true)

      // Reset pulsing state after animation completes
      setTimeout(() => {
        setIsPulsing(false)
      }, 1000)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden">
      {/* Elegant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Ready to transform your business?
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Your customers are 
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-white">
              waiting
            </span>
          </h2>
          
          <p className="text-white/90 text-xl md:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed">
            Don't let another potential sale slip away while you're stuck answering emails. 
            Set up Garrio in 3 minutes and start converting every question into revenue.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <div className="bg-white/20 p-3 rounded-xl inline-flex mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">3 min</div>
              <div className="text-white/80">Setup time</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <div className="bg-white/20 p-3 rounded-xl inline-flex mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-white/80">Done for you</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <div className="bg-white/20 p-3 rounded-xl inline-flex mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-white/80">Happy founders</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className={`bg-white text-purple-900 hover:bg-white/95 text-xl font-semibold px-12 py-6 h-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group ${
              isPulsing ? "animate-pulse-once scale-105" : ""
            }`}
            asChild
          >
            <Link 
              href="https://apps.shopify.com/app-installation?utm_source=homepage_closing_cta&utm_medium=cta&utm_campaign=free_install" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <Zap className="w-6 h-6" />
              Start Building Your Dream Business
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Free forever plan available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Cancel anytime</span>
            </div>
          </div>

          <p className="text-white/70 mt-8 text-lg">
            Join 500+ founders who chose growth over endless emails
          </p>
        </div>
      </div>
    </section>
  )
}
