"use client"

import { useEffect, useState, useRef } from "react"
import { Moon, Smartphone, Target, Heart, Sparkles, Coffee } from "lucide-react"

export default function PeaceOfMindCallout() {
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

  const benefits = [
    {
      icon: <Moon className="w-8 h-8" />,
      title: "No more midnight panic",
      description: "Your customers get help 24/7, even when you're offline",
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Vacation mode: ON",
      description: "Travel without worrying about your inbox exploding",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Focus on what you love",
      description: "Spend time creating, not answering repetitive questions",
      gradient: "from-pink-500 to-red-500",
      bgGradient: "from-pink-50 to-red-50"
    }
  ]

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-400"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={sectionRef}
          className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-md">
            <Heart className="w-4 h-4" />
            Peace of Mind
          </div>
          
          <h3 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            You deserve
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              work-life balance
            </span>
          </h3>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
            Because your energy should go toward building the business you dreamed of, not drowning in support tickets.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className={`group relative transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden border border-purple-100">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl text-white shadow-lg mb-6`}>
                      {benefit.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom CTA section */}
          <div className={`bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-purple-200 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`} style={{ transitionDelay: "600ms" }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
                  <Coffee className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Ready to reclaim your time?</h4>
                  <p className="text-sm sm:text-base text-gray-600">Join 500+ founders who chose balance over burnout</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-center sm:text-right">
                  <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">20+ hours</div>
                  <div className="text-xs sm:text-sm text-gray-600">saved per week</div>
                </div>
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
