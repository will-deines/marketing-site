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
    name: "Alex",
    company: "Roots & Resin",
    quote: "I ditched Zendesk in a day—my first upsell paid for six months.",
    avatar: "/placeholder.svg?height=80&width=80",
    logo: "/placeholder.svg?height=40&width=120",
  },
  {
    id: 2,
    name: "Sarah",
    company: "Urban Threads",
    quote: "Customer response time went from hours to seconds. Sales are up 32%.",
    avatar: "/placeholder.svg?height=80&width=80",
    logo: "/placeholder.svg?height=40&width=120",
  },
  {
    id: 3,
    name: "Michael",
    company: "Eco Essentials",
    quote: "The AI handles 80% of our customer questions. I can finally focus on growth.",
    avatar: "/placeholder.svg?height=80&width=80",
    logo: "/placeholder.svg?height=40&width=120",
  },
  {
    id: 4,
    name: "Jessica",
    company: "Handcrafted Haven",
    quote: "Our conversion rate jumped 18% after implementing the chat feature.",
    avatar: "/placeholder.svg?height=80&width=80",
    logo: "/placeholder.svg?height=40&width=120",
  },
  {
    id: 5,
    name: "David",
    company: "Minimal Goods",
    quote: "Setup took 10 minutes. The ROI was clear after the first week.",
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Loved by Indie Brands</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          See what Shopify store owners are saying about our platform
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
                className="absolute w-full max-w-md bg-white rounded-xl shadow-lg p-6 transition-all duration-500 hover:shadow-xl"
                style={{
                  ...getCardStyle(index),
                  transformStyle: "preserve-3d",
                }}
                onMouseEnter={() => {
                  setActiveIndex(index)
                }}
                className="absolute w-full max-w-md bg-white rounded-xl shadow-lg p-6 transition-all duration-500 hover:shadow-xl transform hover:-rotate-y-5 hover:-rotate-x-5"
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
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
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
