"use client"

import { ArrowRight, Download, Upload, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface MigrationCtaProps {
  competitorName: string
}

export default function MigrationCta({ competitorName }: MigrationCtaProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.2,
      },
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

  const steps = [
    {
      id: "export",
      title: "Export your data",
      description: `Export from ${competitorName} with our step-by-step guide`,
      icon: Download,
      color: "from-blue-500 to-indigo-600",
      lightColor: "from-blue-50 to-indigo-50",
    },
    {
      id: "import",
      title: "1-click import",
      description: "Our team handles the entire migration process",
      icon: Upload,
      color: "from-purple-500 to-pink-600",
      lightColor: "from-purple-50 to-pink-50",
    },
    {
      id: "done",
      title: "Go live in 14 days",
      description: "Start saving time with automated support",
      icon: CheckCircle2,
      color: "from-green-500 to-emerald-600",
      lightColor: "from-green-50 to-emerald-50",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-100/50 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-100/50 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-900 to-indigo-700 bg-clip-text text-transparent">
            Seamless Migration
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We make it easy to switch from {competitorName} to Garrio
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Migration Steps */}
          <div className="relative">
            {/* Enhanced Connecting Line */}
            <div className="absolute top-24 left-[16.666%] right-[16.666%] h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 z-0 hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 scale-x-0 animate-[scale-x-100_3s_ease-out_forwards]" style={{ transformOrigin: 'left' }}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.id}
                    className={`group relative transition-all duration-700 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center relative z-10 border border-purple-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                      {/* Icon container */}
                      <div className="flex justify-center mb-6">
                        <div className={`relative h-20 w-20 bg-gradient-to-br ${step.lightColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <div className={`absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br ${step.color} rounded-full text-white flex items-center justify-center text-lg font-bold shadow-lg`}>
                            {index + 1}
                          </div>
                          <Icon className={`h-10 w-10 bg-gradient-to-br ${step.color} bg-clip-text`} style={{ color: 'transparent', stroke: 'url(#gradient)', strokeWidth: 2 }} />
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>

                      {/* Enhanced Arrow for desktop */}
                      {index < steps.length - 1 && (
                        <div className="absolute top-24 -right-6 transform translate-x-1/2 hidden md:block">
                          <div className="relative">
                            <ArrowRight className={`h-10 w-10 text-purple-400 animate-pulse`} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Enhanced Migration Note */}
          <div
            className={`mt-16 relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-8 md:p-10 text-center relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm font-medium mb-4">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Free Migration Service
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  We migrate {competitorName} data free of charge
                </h3>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                  Our migration specialists will handle the entire process, ensuring a smooth transition with zero downtime. 
                  Most migrations complete in 7-14 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
