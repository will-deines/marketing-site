"use client"

import { useEffect, useRef, useState } from "react"

export default function ProblemSolutionSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
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

  return (
    <section ref={sectionRef} className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Instant Answers, Happier Customers</h2>

        <div className="flex flex-col md:flex-row">
          {/* Problem Column (Dark) */}
          <div
            className={`w-full md:w-1/2 bg-gray-900 text-white p-8 md:p-12 rounded-t-lg md:rounded-l-lg md:rounded-tr-none transition-all duration-700 ease-in-out ${
              isInView ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
            }`}
          >
            <div className="h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-8 text-purple-400">Pain</h3>
              <div className="flex-1 flex flex-col justify-center">
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4">Chats piling up?</h4>
                  <p className="text-gray-300 text-lg">DIY store owners answer the same questions 38× a week.</p>
                </div>

                <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                    <div className="p-6 max-w-sm mx-auto">
                      <div className="flex items-start space-x-4 animate-pulse">
                        <div className="h-12 w-12 rounded-full bg-gray-700"></div>
                        <div className="flex-1 space-y-2 py-1">
                          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-700 rounded"></div>
                            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-start space-x-4 animate-pulse">
                        <div className="h-12 w-12 rounded-full bg-gray-700"></div>
                        <div className="flex-1 space-y-2 py-1">
                          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-700 rounded"></div>
                            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-start space-x-4 animate-pulse">
                        <div className="h-12 w-12 rounded-full bg-gray-700"></div>
                        <div className="flex-1 space-y-2 py-1">
                          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-700 rounded"></div>
                            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Column (Light) */}
          <div
            className={`w-full md:w-1/2 bg-white p-8 md:p-12 rounded-b-lg md:rounded-r-lg md:rounded-bl-none shadow-lg transition-all duration-700 ease-in-out ${
              isInView ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-8 text-purple-600">Relief</h3>
              <div className="flex-1 flex flex-col justify-center">
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4">Let Garrio Chat reply in &lt;300 ms.</h4>
                  <p className="text-gray-700 text-lg">Inline order lookups, discounts, and upsells—no extra clicks.</p>
                </div>

                <div className="relative h-64 md:h-80 overflow-hidden rounded-lg border border-gray-200">
                  <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
                    <div className="p-6 max-w-sm mx-auto">
                      <div className="flex items-start space-x-4">
                        <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-600 font-bold">G</span>
                        </div>
                        <div className="flex-1 space-y-2 py-1">
                          <div className="bg-purple-100 p-3 rounded-lg text-gray-800">
                            Hello! I can help you track your order #12345. It's currently in transit and will arrive
                            tomorrow.
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-start space-x-4">
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-bold">C</span>
                        </div>
                        <div className="flex-1 space-y-2 py-1">
                          <div className="bg-gray-200 p-3 rounded-lg text-gray-800">
                            Can I get a discount on my next order?
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-start space-x-4">
                        <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-600 font-bold">G</span>
                        </div>
                        <div className="flex-1 space-y-2 py-1">
                          <div className="bg-purple-100 p-3 rounded-lg text-gray-800">
                            I've created a special 10% discount code for you: HAPPY10. Would you like to browse our new
                            arrivals?
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
