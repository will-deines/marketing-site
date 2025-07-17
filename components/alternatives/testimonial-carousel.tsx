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
  const carouselRef = useRef<HTMLDivElement>(null)

  // Filter testimonials based on case study IDs and competitor
  useEffect(() => {
    const filteredTestimonials = allTestimonials.filter(
      (testimonial) =>
        caseStudyIds.includes(testimonial.id) ||
        testimonial.previousPlatform.toLowerCase() === competitorName.toLowerCase(),
    )
    setTestimonials(filteredTestimonials.length > 0 ? filteredTestimonials : allTestimonials.slice(0, 3))
  }, [caseStudyIds, competitorName])

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Hear from Merchants Who Switched</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Real stories from Shopify merchants who moved from {competitorName} to Garrio
        </p>

        <div className="relative max-w-4xl mx-auto" ref={carouselRef}>
          {/* Testimonial Cards */}
          <div className="relative h-[300px] md:h-[250px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 bg-white rounded-xl shadow-lg p-6 transition-all duration-500 ${
                  index === activeIndex ? "opacity-100 z-10 translate-y-0" : "opacity-0 z-0 translate-y-8"
                }`}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* Avatar and Company */}
                  <div className="flex flex-col items-center md:items-start">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg?height=64&width=64&query=person"}
                        alt={testimonial.person}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative h-8 w-24 mb-2">
                      <Image
                        src={testimonial.logo || "/placeholder.svg?height=32&width=96&query=company+logo"}
                        alt={testimonial.company}
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.person}, {testimonial.role}
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="flex-1">
                    <div className="bg-purple-100 text-purple-800 font-bold px-3 py-1 rounded-full text-sm inline-block mb-3">
                      {testimonial.metric}
                    </div>
                    <p className="text-gray-800 text-lg italic">"{testimonial.quote}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeIndex ? "bg-purple-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
