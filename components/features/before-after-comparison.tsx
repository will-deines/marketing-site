"use client"

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
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The reality of growing without proper support</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every bootstrapped founder knows this cycle. You're not alone—and you don&apos;t have to stay stuck in it.
          </p>
        </div>

        <div
          ref={sectionRef}
          className={`relative max-w-6xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Before: The Struggle */}
            <div className="bg-gradient-to-br from-red-50 via-white to-orange-50 rounded-xl p-8 shadow-lg border border-red-200 relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-100 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-100 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <div className="text-red-600 text-sm font-semibold mb-6 flex items-center">
                  <span className="text-2xl mr-2">😰</span>
                  Before Garrio: The endless cycle
                </div>
                
                <div className="space-y-6">
                  {/* Inbox chaos */}
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-red-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Urgent messages piling up</div>
                      </div>
                      <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                        ⚠ Unresolved
                      </div>
                    </div>
                    
                    <div className="space-y-3 pl-11">
                      <div className="bg-red-50 p-3 rounded-lg border-l-2 border-red-300">
                        <div className="text-xs text-red-600 font-medium mb-1">11:47 PM ⏰</div>
                        <div className="text-sm text-gray-700">"Where's my order? It's been 3 days!"</div>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg border-l-2 border-orange-300">
                        <div className="text-xs text-orange-600 font-medium mb-1">12:23 AM ⏰</div>
                        <div className="text-sm text-gray-700">"Does this come in size small?"</div>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg border-l-2 border-yellow-300">
                        <div className="text-xs text-yellow-600 font-medium mb-1">6:15 AM ⏰</div>
                        <div className="text-sm text-gray-700">"Can I return this? What's your policy?"</div>
                      </div>
                    </div>
                  </div>

                  {/* Exhaustion outcome */}
                  <div className="bg-gradient-to-r from-red-100 via-red-50 to-orange-50 p-6 rounded-xl border border-red-100">
                    <div className="text-center">
                      <div className="text-5xl mb-4">😴 → 😰 → ☕ → 😵</div>
                      <div className="text-xl font-bold text-red-700 mb-2">Your creative energy, drained</div>
                      <div className="text-red-600 mb-4">Every. Single. Day.</div>
                      
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">47</div>
                          <div className="text-xs text-gray-600">Emails waiting</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">3</div>
                          <div className="text-xs text-gray-600">Angry customers</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">0</div>
                          <div className="text-xs text-gray-600">Creative hours</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* After: The Freedom */}
            <div className="bg-gradient-to-br from-green-50 via-white to-purple-50 rounded-xl p-8 shadow-lg border border-green-200 relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-100 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <div className="text-green-600 text-sm font-semibold mb-6 flex items-center">
                  <span className="text-2xl mr-2">✨</span>
                  After Garrio: Focus on what you love
                </div>
                
                <div className="space-y-6">
                  {/* Auto-handled messages */}
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-green-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="text-sm text-gray-600 font-medium">3 customers helped automatically</div>
                      </div>
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        ✓ All Resolved
                      </div>
                    </div>
                    
                    <div className="space-y-3 pl-11">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-green-600 font-medium mb-1">Order Status ✓</div>
                        <div className="text-sm text-gray-700">"Your order #1234 shipped via FedEx. Track here: [link]"</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-green-600 font-medium mb-1">Size Recommendation ✓</div>
                        <div className="text-sm text-gray-700">"That style runs small - I'd recommend a medium based on your previous orders."</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-green-600 font-medium mb-1">Return Process ✓</div>
                        <div className="text-sm text-gray-700">"You have 30 days for returns. Here's your prepaid label: [link]"</div>
                      </div>
                    </div>
                  </div>

                  {/* Sleep outcome */}
                  <div className="bg-gradient-to-r from-purple-100 via-purple-50 to-green-50 p-6 rounded-xl border border-purple-100">
                    <div className="text-center">
                      <div className="text-5xl mb-4">😴💤</div>
                      <div className="text-xl font-bold text-purple-700 mb-2">Sleep peacefully</div>
                      <div className="text-purple-600 mb-4">Wake up to happy customers & new ideas</div>
                      
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">0</div>
                          <div className="text-xs text-gray-600">Emails waiting</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">3</div>
                          <div className="text-xs text-gray-600">Happy customers</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">8</div>
                          <div className="text-xs text-gray-600">Hours of freedom</div>
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