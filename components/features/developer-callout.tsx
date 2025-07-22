"use client"

import { useEffect, useState, useRef } from "react"

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

  return (
    <section className="py-16 bg-purple-50">
      <div className="container mx-auto px-4">
        <div
          ref={sectionRef}
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
            You deserve work-life balance
          </h3>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">🌙</div>
              <h4 className="font-semibold mb-2">No more midnight panic</h4>
              <p className="text-gray-600 text-sm">
                Your customers get help 24/7, even when you're offline
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">📱</div>
              <h4 className="font-semibold mb-2">Vacation mode: ON</h4>
              <p className="text-gray-600 text-sm">
                Travel without worrying about your inbox exploding
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">🎯</div>
              <h4 className="font-semibold mb-2">Focus on what you love</h4>
              <p className="text-gray-600 text-sm">
                Spend time creating, not answering repetitive questions
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-lg">
            Because your energy should go toward building the business you dreamed of, not drowning in support tickets.
          </p>
        </div>
      </div>
    </section>
  )
}
