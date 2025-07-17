"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-media-query"

interface TimelineStep {
  id: string
  date: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

const timelineSteps: TimelineStep[] = [
  {
    id: "q2-2023",
    date: "'23 Q2",
    title: "The Problem",
    description: "200 unread 'Where's my order?' e-mails. We felt the pain firsthand.",
    imageSrc: "/cluttered-inbox.png",
    imageAlt: "Cluttered inbox with hundreds of customer support emails",
  },
  {
    id: "q4-2023",
    date: "'23 Q4",
    title: "The Prototype",
    description: "Prototype LLM + Shopify APO integration in a weekend hackathon.",
    imageSrc: "/sketch-notebook.png",
    imageAlt: "Sketch notebook with early Garrio prototype designs",
  },
  {
    id: "q1-2024",
    date: "'24 Q1",
    title: "First Success",
    description: "First store cut ticket volume 60% in week 1.",
    imageSrc: "/beta-testimonial.png",
    imageAlt: "Beta customer testimonial showing 60% reduction in support tickets",
  },
  {
    id: "now",
    date: "'25 Now",
    title: "Scaling Impact",
    description: "Garrio handles 1.2M chats/month — and counting.",
    imageSrc: "/growth-chart.png",
    imageAlt: "Growth chart showing Garrio's increasing impact",
  },
]

export default function FoundingStory() {
  const [activeStep, setActiveStep] = useState(0)
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const timelineRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const isDesktop = useMediaQuery("(min-width: 768px)")

  // Initialize step refs
  useEffect(() => {
    stepRefs.current = stepRefs.current.slice(0, timelineSteps.length)
  }, [])

  // Handle scroll-based activation on desktop
  useEffect(() => {
    if (!isDesktop) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = stepRefs.current.findIndex((ref) => ref === entry.target)
          if (index !== -1 && entry.isIntersecting) {
            setActiveStep(index)
            setVisibleSteps((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index]
              }
              return prev
            })
          }
        })
      },
      {
        threshold: 0.6,
        rootMargin: "-100px 0px -100px 0px",
      },
    )

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      stepRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [isDesktop])

  // Handle horizontal scroll snap on mobile
  useEffect(() => {
    if (isDesktop || !timelineRef.current) return

    const handleScroll = () => {
      if (!timelineRef.current) return

      const { scrollLeft, scrollWidth, clientWidth } = timelineRef.current
      const scrollPercentage = scrollLeft / (scrollWidth - clientWidth)
      const stepIndex = Math.min(Math.floor(scrollPercentage * timelineSteps.length), timelineSteps.length - 1)

      setActiveStep(stepIndex)
      setVisibleSteps((prev) => {
        if (!prev.includes(stepIndex)) {
          return [...prev, stepIndex]
        }
        return prev
      })
    }

    timelineRef.current.addEventListener("scroll", handleScroll)
    return () => {
      if (timelineRef.current) {
        timelineRef.current.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isDesktop])

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Journey</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          From identifying a problem to building a solution that helps thousands of Shopify merchants.
        </p>
      </div>

      {isDesktop ? (
        // Desktop: Vertical Timeline
        <div className="container mx-auto px-4">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2"></div>

            {timelineSteps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => (stepRefs.current[index] = el)}
                className={`relative mb-24 last:mb-0 transition-all duration-500 ${
                  visibleSteps.includes(index) ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center`}
                >
                  {/* Date marker */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ${
                        activeStep === index
                          ? "bg-purple-600 text-white"
                          : "bg-white text-gray-500 border border-gray-300"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="text-sm font-bold mt-2">{step.date}</div>
                  </div>

                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <div
                      className={`bg-white p-6 rounded-lg shadow-md transform transition-transform duration-500 ${
                        activeStep === index ? "scale-105" : "scale-100"
                      }`}
                    >
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`md:w-1/2 mt-6 md:mt-0 ${index % 2 === 0 ? "md:pl-16" : "md:pr-16"}`}>
                    <div
                      className={`relative h-64 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-500 ${
                        activeStep === index ? "scale-105" : "scale-100"
                      }`}
                    >
                      <Image
                        src={
                          step.imageSrc ? step.imageSrc : "/placeholder.svg?height=300&width=400&query=timeline+step"
                        }
                        alt={step.imageAlt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Mobile: Horizontal Timeline with Snap Scroll
        <div
          ref={timelineRef}
          className="flex overflow-x-auto snap-x snap-mandatory pb-8 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {timelineSteps.map((step, index) => (
            <div key={step.id} className="flex-shrink-0 w-80 mx-4 snap-center">
              <div
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ${
                  activeStep === index ? "transform scale-105" : ""
                }`}
              >
                <div className="relative h-48">
                  <Image
                    src={step.imageSrc ? step.imageSrc : "/placeholder.svg?height=300&width=400&query=timeline+step"}
                    alt={step.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-purple-600">{step.date}</span>
                    <span className="text-xs text-gray-500">Step {index + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile indicator dots */}
      {!isDesktop && (
        <div className="flex justify-center mt-4 space-x-2">
          {timelineSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                activeStep === index ? "bg-purple-600" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      )}

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
