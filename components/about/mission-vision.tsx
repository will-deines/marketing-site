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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
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
                Free every Shopify merchant from support busy-work so they can build the brands shoppers love.
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
                  <h3 className="text-xl font-bold mb-2">Save founders 10 hrs/wk</h3>
                  <p className="text-gray-600">
                    Reclaim your nights and weekends. Our AI handles routine questions while our team manages complex
                    issues.
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
                  <h3 className="text-xl font-bold mb-2">Delight 100% of shoppers</h3>
                  <p className="text-gray-600">
                    Every customer gets an instant, accurate response that feels like your brand—whether from AI or our
                    human team.
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
                  <h3 className="text-xl font-bold mb-2">Turn chats into checkout</h3>
                  <p className="text-gray-600">
                    Support shouldn't just be a cost center. Our AI suggests relevant products and offers, turning
                    service into sales.
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
