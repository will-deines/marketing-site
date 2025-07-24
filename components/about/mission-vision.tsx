"use client"

import { Target, Clock, MessageCircle, TrendingUp, Heart } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function MissionVision() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const accentRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  // Animate accent bar width
  useEffect(() => {
    if (isVisible && accentRef.current) {
      accentRef.current.style.width = "100%"
    }
  }, [isVisible])

  return (
    <section id="mission-vision" ref={sectionRef} className="py-20 md:py-32 bg-gradient-to-br from-purple-50 via-white to-indigo-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Badge */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <Target className="w-4 h-4" />
            Our Mission
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-16 items-start">
          {/* Mission Statement - Left 40% */}
          <div className="md:w-2/5">
            <div className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Why We
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                  Exist
                </span>
              </h2>
              <div className="relative">
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-700 mb-6">
                  So every founder who left everything to chase their vision can get back to creating the brands their customers will love.
                </p>
                {/* Animated accent bar */}
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    ref={accentRef}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-1000 ease-out rounded-full"
                    style={{ width: isVisible ? "100%" : "0%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bullet Promises - Right 60% */}
          <div className="md:w-3/5">
            <div className="space-y-8">
              <div
                className={`group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-purple-100 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Give you your creative energy back</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Stop spending your best hours on &ldquo;Where&apos;s my order?&rdquo; emails. Get back to designing, creating, and building the brand you dreamed about.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-indigo-100 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Keep your customers as obsessed as you are</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Your customers fell in love with your brand because of your passion. We make sure every interaction—from AI to human support—reflects that same care and attention.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-purple-100 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Turn every conversation into growth</h3>
                    <p className="text-gray-600 leading-relaxed">
                      You&apos;re bootstrapped, so every dollar counts. Our support doesn&apos;t just solve problems—it discovers opportunities to showcase products your customers will actually want.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-20 text-center">
          <div className={`inline-flex items-center gap-3 text-purple-600 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`} style={{ transitionDelay: "600ms" }}>
            <Heart className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-medium">Built with love for bootstrapped founders</span>
            <Heart className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
