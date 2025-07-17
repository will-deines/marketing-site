"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

export default function DeepDiveSections() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])
  const [visibleSections, setVisibleSections] = useState<boolean[]>([false, false, false, false, false])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionsRef.current.findIndex((ref) => ref === entry.target)
          if (index !== -1 && entry.isIntersecting) {
            setVisibleSections((prev) => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
          }
        })
      },
      { threshold: 0.2 },
    )

    sectionsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      sectionsRef.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features That Set Us Apart</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how Garrio transforms customer support from a cost center to a revenue generator.
          </p>
        </div>

        {/* Section 4A: Hyper-Contextual AI Replies */}
        <div
          ref={(el) => (sectionsRef.current[0] = el)}
          className={`flex flex-col md:flex-row items-center mb-24 transition-all duration-1000 ${
            visibleSections[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h3 className="text-2xl font-bold mb-4">Hyper-Contextual AI Replies</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Knows stock & variants in real time</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Pulls shipping status from fulfillment APIs</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Learns FAQ on autopilot</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-gray-100 rounded-xl p-4 shadow-lg">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/shopify-chat-interaction.png"
                  alt="AI chat widget showing contextual product information"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4B: Actionable Chat Runtime */}
        <div
          ref={(el) => (sectionsRef.current[1] = el)}
          className={`flex flex-col md:flex-row-reverse items-center mb-24 transition-all duration-1000 ${
            visibleSections[1] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
            <h3 className="text-2xl font-bold mb-4">Actionable Chat Runtime</h3>
            <p className="text-gray-700 mb-6">
              Our AI doesn't just chat—it takes action. Edit orders, process returns, and apply discounts directly from
              the conversation.
            </p>
            <div className="bg-purple-100 rounded-full px-6 py-3 inline-block">
              <span className="text-purple-800 font-bold">Avg. resolution time cut 48%</span>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-gray-100 rounded-xl p-4 shadow-lg">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src="/background-video.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4C: Done-For-You Escalations */}
        <div
          ref={(el) => (sectionsRef.current[2] = el)}
          className={`flex flex-col md:flex-row items-center mb-24 transition-all duration-1000 ${
            visibleSections[2] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h3 className="text-2xl font-bold mb-4">Done-For-You Escalations</h3>
            <p className="text-gray-700 mb-6">
              When AI can't solve an issue, it doesn't just flag it—our human agents take over and resolve it
              completely.
            </p>
            <div className="bg-gray-100 p-6 rounded-lg border-l-4 border-purple-600 italic">
              <p className="text-gray-700">"I haven't touched our support email in three weeks."</p>
              <p className="text-gray-500 mt-2">— Sam, Clay & Oak</p>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-gray-100 rounded-xl p-4 shadow-lg">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src="/background-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 px-6 py-3 rounded-full shadow-lg">
                    <span className="text-2xl font-bold text-green-600">Inbox: 0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4D: Turn Support into Sales */}
        <div
          ref={(el) => (sectionsRef.current[3] = el)}
          className={`flex flex-col md:flex-row-reverse items-center mb-24 transition-all duration-1000 ${
            visibleSections[3] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
            <h3 className="text-2xl font-bold mb-4">Turn Support into Sales</h3>
            <p className="text-gray-700 mb-6">
              Our AI doesn't just solve problems—it identifies opportunities to increase your average order value
              through relevant product recommendations.
            </p>
            <div className="bg-gray-800 text-white py-3 px-6 rounded-lg text-center">
              <span className="font-bold">$5.60 extra AOV per assisted chat</span>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-gray-100 rounded-xl p-4 shadow-lg">
              <div className="relative rounded-lg overflow-hidden">
                <div className="carousel flex transition-transform duration-500">
                  <div className="carousel-item min-w-full p-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start mb-3">
                        <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <span className="text-purple-600 font-bold">G</span>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3 text-gray-700">
                          <p>
                            I see you're looking at the ceramic mug. Would you like to see our matching coasters?
                            They're on sale this week.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <span className="text-gray-600 font-bold">C</span>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3 text-gray-700">
                          <p>Yes, that would be perfect! Please add a set to my cart.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4E: Continuous Improvement Loop */}
        <div
          ref={(el) => (sectionsRef.current[4] = el)}
          className={`flex flex-col md:flex-row items-center transition-all duration-1000 ${
            visibleSections[4] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h3 className="text-2xl font-bold mb-4">Continuous Improvement Loop</h3>
            <p className="text-gray-700 mb-6">
              Our AI gets smarter with every interaction. Customer feedback is automatically incorporated into model
              improvements.
            </p>
            <p className="text-sm text-gray-500 italic">We ship weekly model tweaks. You do nothing.</p>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-gray-100 rounded-xl p-4 shadow-lg">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src="/ai-feedback-training-dashboard.png"
                  alt="Analytics dashboard showing AI improvement metrics"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
