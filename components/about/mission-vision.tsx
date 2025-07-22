"use client"

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
    <section id="mission-vision" ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Mission Statement - Left 40% */}
          <div className="md:w-2/5">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why We Exist</h2>
            <div className="relative">
              <p className="text-2xl md:text-3xl font-medium leading-tight text-gray-800 mb-4">
                So every founder who left everything to chase their vision can get back to creating the brands their customers will love.
              </p>
              {/* Animated accent bar */}
              <div
                ref={accentRef}
                className="h-1 bg-purple-600 transition-all duration-1000 ease-out"
                style={{ width: isVisible ? "100%" : "0%" }}
              ></div>
            </div>
          </div>

          {/* Bullet Promises - Right 60% */}
          <div className="md:w-3/5">
            <ul className="space-y-6">
              <li
                className={`flex items-start transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
              >
                <span className="text-3xl mr-4">🕒</span>
                <div>
                  <h3 className="text-xl font-bold mb-2">Give you your creative energy back</h3>
                  <p className="text-gray-600">
                    Stop spending your best hours on &ldquo;Where&apos;s my order?&rdquo; emails. Get back to designing, creating, and building the brand you dreamed about.
                  </p>
                </div>
              </li>
              <li
                className={`flex items-start transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: "150ms" }}
              >
                <span className="text-3xl mr-4">💬</span>
                <div>
                  <h3 className="text-xl font-bold mb-2">Keep your customers as obsessed as you are</h3>
                  <p className="text-gray-600">
                    Your customers fell in love with your brand because of your passion. We make sure every interaction—from AI to human support—reflects that same care and attention.
                  </p>
                </div>
              </li>
              <li
                className={`flex items-start transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                <span className="text-3xl mr-4">💸</span>
                <div>
                  <h3 className="text-xl font-bold mb-2">Turn every conversation into growth</h3>
                  <p className="text-gray-600">
                    You&apos;re bootstrapped, so every dollar counts. Our support doesn&apos;t just solve problems—it discovers opportunities to showcase products your customers will actually want.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
