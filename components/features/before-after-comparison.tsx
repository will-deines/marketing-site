"use client"

import { AlertCircle, Clock, TrendingDown, XCircle, CheckCircle, Zap, Sparkles, ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

export default function BeforeAfterComparison() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const currentSection = sectionRef.current
    if (currentSection) {
      observer.observe(currentSection)
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection)
      }
    }
  }, [])

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-gray-50 via-white to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <AlertCircle className="w-4 h-4" />
            The Founder's Journey
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            From exhaustion to 
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">empowerment</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every bootstrapped founder knows this cycle. Here's how Garrio breaks it.
          </p>
        </div>

        <div
          ref={sectionRef}
          className={`relative max-w-7xl mx-auto`}
        >
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Before: The Struggle */}
            <div className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}>
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-red-100 relative overflow-hidden group hover:shadow-3xl transition-all duration-300">
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-transparent to-orange-50 opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-red-100 p-3 rounded-2xl">
                      <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Before Garrio</h3>
                      <p className="text-sm text-red-600">The endless support cycle</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Pain points */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-red-100 p-2 rounded-xl flex-shrink-0">
                          <Clock className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Late night email marathons</h4>
                          <p className="text-gray-600 text-sm">Answering "Where's my order?" at 11:47 PM instead of sleeping</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-orange-100 p-2 rounded-xl flex-shrink-0">
                          <TrendingDown className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Lost sales while offline</h4>
                          <p className="text-gray-600 text-sm">Potential customers leave when questions go unanswered</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-yellow-100 p-2 rounded-xl flex-shrink-0">
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Creative energy drained</h4>
                          <p className="text-gray-600 text-sm">Zero time for product development or marketing</p>
                        </div>
                      </div>
                    </div>

                    {/* Impact stats */}
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-2xl border border-red-100">
                      <h4 className="font-semibold text-red-900 mb-4 text-center">The daily toll</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-red-600">20+</div>
                          <div className="text-xs text-gray-600">Hours/week on support</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-orange-600">$5K</div>
                          <div className="text-xs text-gray-600">Lost revenue/month</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-yellow-600">0</div>
                          <div className="text-xs text-gray-600">Hours for growth</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* After: The Freedom */}
            <div className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}>
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-green-100 relative overflow-hidden group hover:shadow-3xl transition-all duration-300">
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-transparent to-purple-50 opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-green-100 p-3 rounded-2xl">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">After Garrio</h3>
                      <p className="text-sm text-green-600">Focus on what you love</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Benefits */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-green-100 p-2 rounded-xl flex-shrink-0">
                          <Zap className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">24/7 instant responses</h4>
                          <p className="text-gray-600 text-sm">Your team handles everything while you sleep peacefully</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-100 p-2 rounded-xl flex-shrink-0">
                          <TrendingUp className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Turn questions into sales</h4>
                          <p className="text-gray-600 text-sm">Smart upsells and recommendations boost revenue</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-2 rounded-xl flex-shrink-0">
                          <Sparkles className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Focus on creation</h4>
                          <p className="text-gray-600 text-sm">Finally have time for product development and growth</p>
                        </div>
                      </div>
                    </div>

                    {/* Success stats */}
                    <div className="bg-gradient-to-br from-green-50 to-purple-50 p-6 rounded-2xl border border-green-100">
                      <h4 className="font-semibold text-green-900 mb-4 text-center">Your new reality</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600">98%</div>
                          <div className="text-xs text-gray-600">Auto-resolved</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600">20+</div>
                          <div className="text-xs text-gray-600">Hours saved/week</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">32%</div>
                          <div className="text-xs text-gray-600">Revenue increase</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Center CTA */}
          <div className={`mt-16 text-center transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <div className="bg-white/80 backdrop-blur rounded-3xl border border-purple-200 p-8 max-w-2xl mx-auto shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to reclaim your creative energy?</h3>
              <p className="text-gray-600 mb-6">Join 500+ founders who chose growth over burnout</p>
              <Link
                href="https://apps.shopify.com/app-installation"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 group"
              >
                Start your transformation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}