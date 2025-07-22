"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle2 } from "lucide-react"

export default function DeepDiveSections() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])
  const [visibleSections, setVisibleSections] = useState<boolean[]>([false, false, false])

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

    const currentSections = sectionsRef.current
    currentSections.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      currentSections.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Three things that matter most to your customers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fast answers, personal attention, and feeling like they&apos;re shopping with someone who truly gets their style.
          </p>
        </div>

        {/* Section 1: Instant, Personal Answers */}
        <div
          ref={(el) => (sectionsRef.current[0] = el)}
          className={`flex flex-col md:flex-row items-center mb-24 transition-all duration-1000 ${
            visibleSections[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h3 className="text-2xl font-bold mb-4">&quot;Does this come in a size small?&quot; gets answered instantly</h3>
            <p className="text-gray-700 mb-6">
              Your customers get immediate answers about sizing, colors, shipping, and availability—24/7, even while you&apos;re designing your next collection or taking a well-deserved break. It knows everything about your products, just like you do.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">Knows which colors are selling fast</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">Explains your sizing guide clearly</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">Shares your brand story naturally</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-gray-100 rounded-xl p-4 shadow-lg">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <picture>
                  <source
                    media="(max-width: 767px)"
                    srcSet="/images/ai-chat-blurred-mobile.avif"
                    type="image/avif"
                  />
                  <source
                    media="(max-width: 767px)"
                    srcSet="/images/ai-chat-blurred-mobile.webp"
                    type="image/webp"
                  />
                  <source
                    media="(max-width: 767px)"
                    srcSet="/images/ai-chat-blurred-mobile.jpg"
                    type="image/jpeg"
                  />
                  <source
                    media="(max-width: 1023px)"
                    srcSet="/images/ai-chat-blurred-tablet.avif"
                    type="image/avif"
                  />
                  <source
                    media="(max-width: 1023px)"
                    srcSet="/images/ai-chat-blurred-tablet.webp"
                    type="image/webp"
                  />
                  <source
                    media="(max-width: 1023px)"
                    srcSet="/images/ai-chat-blurred-tablet.jpg"
                    type="image/jpeg"
                  />
                  <source
                    srcSet="/images/ai-chat-blurred.avif"
                    type="image/avif"
                  />
                  <source
                    srcSet="/images/ai-chat-blurred.webp"
                    type="image/webp"
                  />
                  <img
                    src="/images/ai-chat-blurred.jpg"
                    alt="AI chat interface showing instant responses to product questions"
                    className="w-full h-full object-cover"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Complex Problems Get Real People */}
        <div
          ref={(el) => (sectionsRef.current[1] = el)}
          className={`flex flex-col md:flex-row-reverse items-center mb-24 transition-all duration-1000 ${
            visibleSections[1] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
            <h3 className="text-2xl font-bold mb-4">When something goes wrong, real people step in</h3>
            <p className="text-gray-700 mb-6">
              Damaged items, special requests, or angry customers? A real human who knows your brand takes over immediately. Your customers never feel abandoned or stuck with a robot.
            </p>
            <div className="bg-gray-800 text-white py-3 px-6 rounded-lg text-center">
              <span className="font-bold">&quot;I haven&apos;t touched our support email in three weeks.&quot;</span>
              <p className="text-sm text-gray-300 mt-1">— Sam, Clay & Oak</p>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-gray-100 rounded-xl p-4 shadow-lg">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <picture>
                  <source
                    media="(max-width: 767px)"
                    srcSet="/images/human-support-mobile.avif"
                    type="image/avif"
                  />
                  <source
                    media="(max-width: 767px)"
                    srcSet="/images/human-support-mobile.webp"
                    type="image/webp"
                  />
                  <source
                    media="(max-width: 767px)"
                    srcSet="/images/human-support-mobile.jpg"
                    type="image/jpeg"
                  />
                  <source
                    media="(max-width: 1023px)"
                    srcSet="/images/human-support-tablet.avif"
                    type="image/avif"
                  />
                  <source
                    media="(max-width: 1023px)"
                    srcSet="/images/human-support-tablet.webp"
                    type="image/webp"
                  />
                  <source
                    media="(max-width: 1023px)"
                    srcSet="/images/human-support-tablet.jpg"
                    type="image/jpeg"
                  />
                  <source
                    srcSet="/images/human-support.avif"
                    type="image/avif"
                  />
                  <source
                    srcSet="/images/human-support.webp"
                    type="image/webp"
                  />
                  <img
                    src="/images/human-support.jpg"
                    alt="Friendly customer support agent helping customers with care and attention"
                    className="w-full h-full object-cover"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Every conversation sounds like you wrote it */}
        <div
          ref={(el) => (sectionsRef.current[2] = el)}
          className={`flex flex-col md:flex-row items-center transition-all duration-1000 ${
            visibleSections[2] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h3 className="text-2xl font-bold mb-4">Every conversation sounds like you wrote it</h3>
            <p className="text-gray-700 mb-6">
              Whether it&apos;s AI or a real person responding, your customers always feel like they&apos;re talking to someone who truly understands your brand. No robotic responses or generic templates.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">Matches your brand voice perfectly</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">Suggests products they&apos;ll actually love</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">Builds relationships, not just transactions</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-3 text-white">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="font-medium text-sm">Live Chat</span>
                  <span className="ml-auto text-xs opacity-90">Online</span>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="p-4 space-y-4 bg-gray-50 min-h-[200px]">
                {/* AI Message */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-sm">AI</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white rounded-lg rounded-tl-sm p-4 shadow-sm border border-gray-100 max-w-[280px]">
                      <p className="text-gray-800 text-sm leading-relaxed">
                        I love that you&apos;re drawn to our sustainable collection! That necklace would look stunning with our matching bracelet—both are made from recycled metals. ♻️
                      </p>
                      <div className="text-xs text-gray-500 mt-2">Just now</div>
                    </div>
                  </div>
                </div>

                {/* Customer Message */}
                <div className="flex items-start space-x-3 justify-end">
                  <div className="flex-1 flex justify-end">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg rounded-tr-sm p-4 shadow-sm max-w-[280px]">
                      <p className="text-white text-sm leading-relaxed">
                        Perfect! I hadn&apos;t seen the bracelet yet. Adding both to my cart now! 🛒
                      </p>
                      <div className="text-xs text-purple-100 mt-2 text-right">Just now</div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-gray-600 font-bold text-sm">C</span>
                  </div>
                </div>

                {/* Typing Indicator */}
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-sm">AI</span>
                  </div>
                  <div className="bg-white rounded-lg rounded-tl-sm p-3 shadow-sm border border-gray-100">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
