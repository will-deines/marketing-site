"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  id: string
  company: string
  logo: string
  person: string
  role: string
  metric: string
  quote: string
  avatar: string
  previousPlatform: string
}

// This would typically come from a CMS or API
const allTestimonials: Testimonial[] = [
  {
    id: "roots-resin",
    company: "Roots & Resin",
    logo: "/testimonials/roots-resin-logo.svg",
    person: "Alex J.",
    role: "Founder",
    metric: "↓71% response time",
    quote: "I ditched Gorgias in a day—my first upsell paid for six months.",
    avatar: "/testimonials/alex-j.jpg",
    previousPlatform: "gorgias",
  },
  {
    id: "urban-threads",
    company: "Urban Threads",
    logo: "/testimonials/urban-threads-logo.svg",
    person: "Sarah K.",
    role: "Head of CX",
    metric: "↑32% sales",
    quote: "Customer response time went from hours to seconds. Sales are up 32%.",
    avatar: "/testimonials/sarah-k.jpg",
    previousPlatform: "gorgias",
  },
  {
    id: "eco-essentials",
    company: "Eco Essentials",
    logo: "/testimonials/eco-essentials-logo.svg",
    person: "Michael T.",
    role: "CEO",
    metric: "80% automation",
    quote: "The AI handles 80% of our customer questions. I can finally focus on growth.",
    avatar: "/testimonials/michael-t.jpg",
    previousPlatform: "reamaze",
  },
  {
    id: "minimal-goods",
    company: "Minimal Goods",
    logo: "/testimonials/minimal-goods-logo.svg",
    person: "David L.",
    role: "Founder",
    metric: "10 min setup",
    quote: "Setup took 10 minutes. The ROI was clear after the first week.",
    avatar: "/testimonials/david-l.jpg",
    previousPlatform: "zendesk",
  },
  {
    id: "clay-oak",
    company: "Clay & Oak",
    logo: "/testimonials/clay-oak-logo.svg",
    person: "Sam B.",
    role: "Operations",
    metric: "↑29% CSAT",
    quote: "The AI-to-human handoff is seamless. Our customers love it.",
    avatar: "/testimonials/sam-b.jpg",
    previousPlatform: "zendesk",
  },
  {
    id: "vintage-vinyl",
    company: "Vintage Vinyl",
    logo: "/testimonials/vintage-vinyl-logo.svg",
    person: "Jamie R.",
    role: "Owner",
    metric: "↑15% AOV",
    quote: "Customers spend more when they get instant answers to their questions.",
    avatar: "/testimonials/jamie-r.jpg",
    previousPlatform: "reamaze",
  },
  {
    id: "glow-beauty",
    company: "Glow Beauty",
    logo: "/testimonials/glow-beauty-logo.svg",
    person: "Emma P.",
    role: "Marketing",
    metric: "↑28% conversion",
    quote: "Our chat-to-purchase rate doubled after implementing Garrio.",
    avatar: "/testimonials/emma-p.jpg",
    previousPlatform: "tidio",
  },
  {
    id: "tech-haven",
    company: "Tech Haven",
    logo: "/testimonials/tech-haven-logo.svg",
    person: "Ryan M.",
    role: "CTO",
    metric: "↓45% support cost",
    quote: "Complex tech support questions handled perfectly by the AI.",
    avatar: "/testimonials/ryan-m.jpg",
    previousPlatform: "tidio",
  },
]

interface TestimonialCarouselProps {
  caseStudyIds: string[]
  competitorName: string
}

export default function TestimonialCarousel({ caseStudyIds, competitorName }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Filter testimonials based on case study IDs and competitor
  useEffect(() => {
    const filteredTestimonials = allTestimonials.filter(
      (testimonial) =>
        caseStudyIds.includes(testimonial.id) ||
        testimonial.previousPlatform.toLowerCase() === competitorName.toLowerCase(),
    )
    setTestimonials(filteredTestimonials.length > 0 ? filteredTestimonials : allTestimonials.slice(0, 3))
  }, [caseStudyIds, competitorName])

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused && testimonials.length > 1) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      }, 5000) // Change testimonial every 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, testimonials.length])

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    setIsPaused(true) // Pause auto-play when user interacts
  }

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    setIsPaused(true) // Pause auto-play when user interacts
  }

  const goToTestimonial = (index: number) => {
    setActiveIndex(index)
    setIsPaused(true) // Pause auto-play when user interacts
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-900 to-indigo-700 bg-clip-text text-transparent">
            Hear from Merchants Who Switched
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real stories from Shopify merchants who moved from {competitorName} to Garrio
          </p>
        </div>

        <div 
          className="relative max-w-5xl mx-auto" 
          ref={carouselRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Testimonial Cards */}
          <div className="relative h-[350px] md:h-[280px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 bg-white rounded-2xl shadow-2xl p-8 md:p-10 transition-all duration-700 border border-purple-100 ${
                  index === activeIndex ? "opacity-100 z-10 translate-y-0 scale-100" : "opacity-0 z-0 translate-y-8 scale-95"
                }`}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  {/* Avatar and Company */}
                  <div className="flex flex-col items-center md:items-start flex-shrink-0">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 ring-4 ring-purple-100">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg?height=80&width=80&query=person"}
                        alt={testimonial.person}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative h-10 w-28 mb-3">
                      <Image
                        src={testimonial.logo || "/placeholder.svg?height=40&width=112&query=company+logo"}
                        alt={testimonial.company}
                        fill
                        className="object-contain object-center"
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <div className="font-semibold text-gray-900">{testimonial.person}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 font-bold px-4 py-2 rounded-full text-sm mb-4">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      {testimonial.metric}
                    </div>
                    <blockquote className="text-gray-800 text-xl md:text-2xl font-light italic leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Navigation Controls */}
          <div className="flex justify-center mt-10 space-x-6">
            <button
              onClick={prevTestimonial}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-purple-50 transition-all duration-200 border border-purple-100"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-purple-600" />
            </button>
            <div className="flex items-center space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? "bg-purple-600 scale-125 shadow-lg" 
                      : "bg-gray-300 hover:bg-purple-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-purple-50 transition-all duration-200 border border-purple-100"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-purple-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
