"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Quote, Star, Users, TrendingUp, Heart } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  company: string
  quote: string
  avatar: string
  logo: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emma",
    company: "Bloom & Scent (Artisan Candles)",
    quote: "I launched my brand from my kitchen table. Now I&apos;m doing $80K/month and Garrio handles support so I can focus on creating new collections that my customers actually want.",
    avatar: "/placeholder.svg?height=80&width=80",
    logo: "/placeholder.svg?height=40&width=120",
  },
  {
    id: 2,
    name: "Sarah",
    company: "Urban Threads (Fashion)",
    quote: "I was spending 4 hours a day on customer emails. Now that time goes to design and sourcing. Sales are up 32% because I&apos;m actually building the brand, not just managing it.",
    avatar: "/placeholder.svg?height=80&width=80",
    logo: "/placeholder.svg?height=40&width=120",
  },
  {
    id: 3,
    name: "Maya",
    company: "Clean Beauty Co. (Skincare)",
    quote: "As a bootstrapped founder, every dollar matters. Garrio pays for itself with the first few upsells, and I don&apos;t need to hire support staff until I hit 8 figures.",
    avatar: "/placeholder.svg?height=80&width=80",
    logo: "/placeholder.svg?height=40&width=120",
  },
  {
    id: 4,
    name: "Jessica",
    company: "Wild & Free (Sustainable Fashion)",
    quote: "I built this brand to make a difference, not to answer 'What's your return policy?' 50 times a day. Now customers get instant answers and I get my evenings back.",
    avatar: "/placeholder.svg?height=80&width=80",
    logo: "/placeholder.svg?height=40&width=120",
  },
  {
    id: 5,
    name: "Rachel",
    company: "Nourish Naturally (Food Products)",
    quote: "Went from drowning in order status questions to actually having time for product development. My customers are happier and I&apos;m not working 80-hour weeks anymore.",
    avatar: "/placeholder.svg?height=80&width=80",
    logo: "/placeholder.svg?height=40&width=120",
  },
]

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Auto-rotate carousel
  useEffect(() => {
    if (isHovering) return

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isHovering])

  // Calculate positions and styles for each card
  const getCardStyle = (index: number) => {
    const position = (index - activeIndex + testimonials.length) % testimonials.length

    // Only show center card and immediate neighbors
    const isVisible = position === 0 || position === 1 || position === testimonials.length - 1

    // Calculate z-index, opacity, and transform based on position
    let zIndex = 5 - Math.min(Math.abs(position - 0), Math.abs(position - testimonials.length))
    if (position === 0) zIndex = 10

    const opacity = isVisible ? (position === 0 ? 1 : 0.6) : 0
    const scale = position === 0 ? 1 : 0.85

    let translateX = "0%"
    if (position === 0) {
      translateX = "0%"
    } else if (position === 1) {
      translateX = "105%"
    } else if (position === testimonials.length - 1) {
      translateX = "-105%"
    } else {
      translateX = "200%" // Hide off-screen cards further away
    }

    return {
      zIndex: isVisible ? zIndex : -1,
      opacity,
      transform: `translate3d(${translateX === "0%" ? "0" : translateX === "105%" ? "105%" : translateX === "-105%" ? "-105%" : "200%"}, 0, 0) scale(${scale})`,
      transition: "transform 0.5s ease-out, opacity 0.3s ease-out",
      willChange: "transform, opacity",
      visibility: isVisible ? 'visible' : 'hidden',
    }
  }

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-orange-50 via-white to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Founder Stories
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Real stories from 
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600">bootstrapped founders</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how founders like you got their creative energy back, reclaimed their evenings, 
            and accelerated their growth without burning out.
          </p>
        </div>

        <div
          className="relative h-[600px] md:h-[500px] overflow-hidden"
          ref={carouselRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="absolute w-full max-w-lg transform-gpu"
                style={{
                  ...getCardStyle(index),
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
                onMouseEnter={() => {
                  setActiveIndex(index)
                }}
              >
                <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-orange-100 hover:shadow-3xl transition-all duration-500 hover:scale-105">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="bg-gradient-to-r from-orange-100 to-pink-100 p-3 rounded-xl">
                      <Quote className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-base md:text-lg leading-relaxed text-gray-900 text-center mb-6 font-medium">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author Section */}
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden ring-3 ring-orange-100">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                        <p className="text-orange-600 font-medium text-sm">{testimonial.company}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Users className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-500">Bootstrapped Founder</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Success Metric */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-center gap-2 text-xs">
                      <div className="bg-green-100 p-1 rounded">
                        <TrendingUp className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-600 font-medium">Growing sustainably with Garrio</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className="relative flex items-center justify-center w-8 h-4 group"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`rounded-full transition-all duration-300 ease-out ${
                  index === activeIndex
                    ? "w-8 h-3 bg-gradient-to-r from-orange-500 to-pink-500"
                    : "w-3 h-3 bg-gray-300 group-hover:bg-orange-300"
                }`}
              />
            </button>
          ))}
        </div>
        
        {/* Stats Banner */}
        <div className="mt-16 bg-white/60 backdrop-blur rounded-2xl border border-orange-100 p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-orange-100 p-3 rounded-xl mb-3">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-gray-600">Happy founders</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-3 rounded-xl mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">32%</div>
              <div className="text-gray-600">Average revenue increase</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-xl mb-3">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">98%</div>
              <div className="text-gray-600">Would recommend</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
