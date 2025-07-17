"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const steps = [
    {
      id: "export",
      title: "Export tickets",
      description: `Export your data from ${competitorName} with our step-by-step guide`,
      icon: "/icons/export-icon.png",
    },
    {
      id: "import",
      title: "1-click import",
      description: "Our team handles the data migration for you",
      icon: "/icons/import-icon.svg",
    },
    {
      id: "done",
      title: "Done in 14 days",
      description: "We'll have you up and running in two weeks or less",
      icon: "/icons/done-icon.svg",
    },
  ]

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Seamless Migration</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          We make it easy to switch from {competitorName} to Garrio
        </p>

        <div className="max-w-4xl mx-auto">
          {/* Migration Steps */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-16 left-0 right-0 h-1 bg-gray-200 z-0 hidden md:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`bg-white rounded-xl shadow-md p-6 text-center relative z-10 transition-all duration-1000 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="relative h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center">
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-purple-600 rounded-full text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <Image
                        src={step.icon || "/placeholder.svg?height=32&width=32&query=icon"}
                        alt={step.title}
                        width={32}
                        height={32}
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>

                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-16 right-0 transform translate-x-1/2 hidden md:block">
                      <ArrowRight className="h-8 w-8 text-purple-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Migration Note */}
          <div
            className={`mt-12 bg-purple-100 rounded-lg p-6 text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "450ms" }}
          >
            <p className="text-purple-800 font-bold text-lg">We migrate {competitorName} data free of charge</p>
            <p className="text-purple-700 mt-2">
              Our migration specialists will handle the entire process, ensuring a smooth transition with zero downtime.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
