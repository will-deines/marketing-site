"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  id: number
  company: string
  logo: {
    src: string
    alt: string
  }
  person: string
  plan: string
  metric: string
  quote: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    company: "Urban Threads",
    logo: {
      src: "/abstract-urban-threads.png",
      alt: "Brand logo: Urban Threads",
    },
    person: "Sarah K.",
    plan: "Growth",
    metric: "Response time ↓ 70%",
    quote: "We stopped drowning in tickets. Our team can finally focus on growth.",
  },
  {
    id: 2,
    company: "Eco Essentials",
    logo: {
      src: "/leafy-eco-circle.png",
      alt: "Brand logo: Eco Essentials",
    },
    person: "Michael T.",
    plan: "Free",
    metric: "Sales up 23%",
    quote: "The AI suggests perfect upsells that customers actually buy.",
  },
  {
    id: 3,
    company: "Minimal Goods",
    logo: {
      src: "/abstract-minimal-goods.png",
      alt: "Brand logo: Minimal Goods",
    },
    person: "David L.",
    plan: "Scale",
    metric: "18 hrs saved/week",
    quote: "Setup took minutes, the ROI was clear after the first week.",
  },
  {
    id: 4,
    company: "Clay & Oak",
    logo: {
      src: "/earthy-oak-mark.png",
      alt: "Brand logo: Clay & Oak",
    },
    person: "Sam B.",
    plan: "Growth",
    metric: "CSAT up 32%",
    quote: "The AI-to-human handoff is seamless. Our customers love it.",
  },
  {
    id: 5,
    company: "Roots & Resin",
    logo: {
      src: "/intertwined-nature-craft.png",
      alt: "Brand logo: Roots & Resin",
    },
    person: "Alex J.",
    plan: "Free",
    metric: "ROI of 320%",
    quote: "I ditched Zendesk in a day—my first upsell paid for six months.",
  },
  {
    id: 6,
    company: "Vintage Vinyl",
    logo: {
      src: "/spinning-grooves.png",
      alt: "Brand logo: Vintage Vinyl",
    },
    person: "Jamie R.",
    plan: "Growth",
    metric: "AOV +15%",
    quote: "Customers spend more when they get instant answers to their questions.",
  },
  {
    id: 7,
    company: "Glow Beauty",
    logo: {
      src: "/radiant-glow-logo.png",
      alt: "Brand logo: Glow Beauty",
    },
    person: "Emma P.",
    plan: "Scale",
    metric: "Conversion +28%",
    quote: "Our chat-to-purchase rate doubled after implementing Garrio.",
  },
  {
    id: 8,
    company: "Tech Haven",
    logo: {
      src: "/tech-haven-logo.png",
      alt: "Brand logo: Tech Haven",
    },
    person: "Ryan M.",
    plan: "Growth",
    metric: "Support cost ↓ 45%",
    quote: "Complex tech support questions handled perfectly by the AI.",
  },
]

export default function SocialProofReel() {
  const [isPaused, setIsPaused] = useState(false)
  const [activeQuote, setActiveQuote] = useState<Testimonial | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const topRowRef = useRef<HTMLDivElement>(null)
  const bottomRowRef = useRef<HTMLDivElement>(null)
  const centerPointRef = useRef<HTMLDivElement>(null)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Handle marquee animation
  useEffect(() => {
    const topRow = topRowRef.current
    const bottomRow = bottomRowRef.current

    if (!topRow || !bottomRow) return

    if (isPaused || prefersReducedMotion) {
      topRow.style.animationPlayState = "paused"
      bottomRow.style.animationPlayState = "paused"
    } else {
      topRow.style.animationPlayState = "running"
      bottomRow.style.animationPlayState = "running"
    }
  }, [isPaused, prefersReducedMotion])

  // Check for centered logos and update active quote
  useEffect(() => {
    if (prefersReducedMotion) return

    const checkCenteredLogo = () => {
      if (isPaused || !centerPointRef.current) return

      const centerPoint = centerPointRef.current.getBoundingClientRect()
      const centerX = centerPoint.left + centerPoint.width / 2

      // Get all logo elements
      const logoElements = document.querySelectorAll(".logo-item")

      // Find the closest logo to center
      let closestLogo = null
      let minDistance = Number.POSITIVE_INFINITY

      logoElements.forEach((logo) => {
        const rect = logo.getBoundingClientRect()
        const logoCenter = rect.left + rect.width / 2
        const distance = Math.abs(logoCenter - centerX)

        if (distance < minDistance) {
          minDistance = distance
          closestLogo = logo
        }
      })

      // If we found a close logo and it's near the center
      if (closestLogo && minDistance < 50) {
        const logoId = Number.parseInt(closestLogo.getAttribute("data-id") || "0")
        const testimonial = testimonials.find((t) => t.id === logoId)
        if (testimonial && (!activeQuote || activeQuote.id !== testimonial.id)) {
          setActiveQuote(testimonial)
        }
      }
    }

    const interval = setInterval(checkCenteredLogo, 300)
    return () => clearInterval(interval)
  }, [isPaused, activeQuote, prefersReducedMotion])

  // Manual navigation for accessibility
  const navigateQuote = (direction: "prev" | "next") => {
    if (!activeQuote) {
      setActiveQuote(testimonials[0])
      return
    }

    const currentIndex = testimonials.findIndex((t) => t.id === activeQuote.id)
    let newIndex

    if (direction === "next") {
      newIndex = (currentIndex + 1) % testimonials.length
    } else {
      newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
    }

    setActiveQuote(testimonials[newIndex])
  }

  return (
    <section className="py-16 bg-white border-t border-b border-gray-200">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Trusted by Shopify Merchants</h2>
      </div>

      <div className="relative overflow-hidden">
        {/* Center point reference (invisible) */}
        <div
          ref={centerPointRef}
          className="absolute left-1/2 top-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 z-10"
          aria-hidden="true"
        ></div>

        {/* Top row of logos */}
        <div
          className="flex space-x-12 py-8 logo-row"
          ref={topRowRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {testimonials.concat(testimonials).map((testimonial, index) => (
            <div
              key={`top-${testimonial.id}-${index}`}
              className="logo-item flex-shrink-0 w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
              data-id={testimonial.id}
              onClick={() => setActiveQuote(testimonial)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setActiveQuote(testimonial)
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View testimonial from ${testimonial.company}`}
            >
              <Image
                src={testimonial.logo.src || "/placeholder.svg"}
                alt={testimonial.logo.alt}
                fill
                className="object-contain object-center"
              />
            </div>
          ))}
        </div>

        {/* Bottom row of logos (reversed direction) */}
        <div
          className="flex space-x-12 py-8 logo-row-reverse"
          ref={bottomRowRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {testimonials
            .concat(testimonials)
            .reverse()
            .map((testimonial, index) => (
              <div
                key={`bottom-${testimonial.id}-${index}`}
                className="logo-item flex-shrink-0 w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                data-id={testimonial.id}
                onClick={() => setActiveQuote(testimonial)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setActiveQuote(testimonial)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View testimonial from ${testimonial.company}`}
              >
                <Image
                  src={testimonial.logo.src || "/placeholder.svg"}
                  alt={testimonial.logo.alt}
                  fill
                  className="object-contain object-center"
                />
              </div>
            ))}
        </div>

        {/* Testimonial overlay */}
        {activeQuote && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-md text-center transform transition-all duration-300 animate-fade-in"
              aria-live="polite"
            >
              <div className="mb-3">
                <span className="inline-block bg-purple-100 text-purple-800 font-bold px-3 py-1 rounded-full text-sm">
                  {activeQuote.metric}
                </span>
              </div>
              <p className="text-gray-800 text-lg italic mb-4">"{activeQuote.quote}"</p>
              <p className="text-gray-600">
                {activeQuote.person}, {activeQuote.company} <span className="text-gray-400">|</span> {activeQuote.plan}
              </p>
            </div>
          </div>
        )}

        {/* Manual navigation controls (for accessibility) */}
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={() => navigateQuote("prev")}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => navigateQuote("next")}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Trust badges */}
      <div className="container mx-auto px-4 mt-12">
        <div className="h-px bg-gray-200 mb-8"></div>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="grayscale hover:grayscale-0 transition-all duration-300">
            <div className="flex items-center">
              <span className="text-gray-600 font-medium">Built for</span>
              <span className="font-bold ml-2">Shopify</span>
            </div>
          </div>
          <div className="grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-gray-600 font-medium">SOC 2 Compliant</span>
          </div>
          <div className="grayscale hover:grayscale-0 transition-all duration-300">
            <div className="flex items-center">
              <span className="text-gray-600 font-medium">4.9★ Shopify Rating</span>
            </div>
          </div>
          <div className="grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-gray-600 font-medium">G2 High Performer 2025</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .logo-row {
          animation: marquee 40s linear infinite;
        }
        
        .logo-row-reverse {
          animation: marquee-reverse 45s linear infinite;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  )
}
