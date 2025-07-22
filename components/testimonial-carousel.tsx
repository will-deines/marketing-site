"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

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

    // Calculate z-index, opacity, and transform based on position
    let zIndex = 5 - Math.min(Math.abs(position - 0), Math.abs(position - testimonials.length))
    if (position === 0) zIndex = 10

    let opacity = 1
    if (position !== 0 && position !== 1 && position !== testimonials.length - 1) {
      opacity = 0.7
    }

    let scale = 1
    if (position !== 0) {
      scale = 0.85
    }

    let translateX = "0%"
    if (position === 0) {
      translateX = "0%"
    } else if (position === 1) {
      translateX = "105%"
    } else if (position === testimonials.length - 1) {
      translateX = "-105%"
    } else if (position < testimonials.length / 2) {
      translateX = "200%"
    } else {
      translateX = "-200%"
    }

    return {
      zIndex,
      opacity,
      transform: `translateX(${translateX}) scale(${scale})`,
      transition: "all 0.5s ease-in-out",
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Real Stories from Bootstrapped Founders</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          See how founders like you got their creative energy back and accelerated their growth
        </p>

        <div
          className="relative h-[400px] md:h-[300px] overflow-hidden"
          ref={carouselRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="absolute w-full max-w-md bg-white rounded-xl shadow-lg p-6 transition-all duration-500 hover:shadow-xl transform hover:-rotate-y-5 hover:-rotate-x-5"
                style={{
                  ...getCardStyle(index),
                  transformStyle: "preserve-3d",
                }}
                onMouseEnter={() => {
                  setActiveIndex(index)
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.company}</p>
                    </div>
                  </div>
                  <div className="relative h-10 w-24">
                    <Image
                      src={testimonial.logo || "/placeholder.svg"}
                      alt={`${testimonial.company} logo`}
                      fill
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-purple-600" : "bg-gray-300"}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
