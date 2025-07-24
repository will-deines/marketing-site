"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Calendar, Lightbulb, Rocket, Trophy, Sparkles } from "lucide-react"

interface TimelineStep {
  id: string
  date: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  icon: React.ReactNode
  gradient: string
}

const timelineSteps: TimelineStep[] = [
  {
    id: "2009",
    date: "2009",
    title: "DTC Brand Launch",
    description: "Started our own direct-to-consumer brand, learning firsthand what it takes to build something from scratch.",
    imageSrc: "/images/founder-2009-launch.jpg",
    imageAlt: "Startup founders working late night in garage office with laptops and shipping boxes",
    icon: <Rocket className="w-6 h-6" />,
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    id: "2012",
    date: "2012",
    title: "Black Friday Chaos",
    description: "First Black Friday/Cyber Monday doubled our customer support overnight. The explosive growth was both thrilling and terrifying.",
    imageSrc: "/images/founder-2012-blackfriday-v2.jpg",
    imageAlt: "Chaotic warehouse during Black Friday with packages piling up everywhere",
    icon: <Calendar className="w-6 h-6" />,
    gradient: "from-red-500 to-orange-500",
  },
  {
    id: "2021",
    date: "2021",
    title: "Finally in Control",
    description: "After years of growing, adding tech, and building teams, we finally had control. But it took a huge team and complex tech stack.",
    imageSrc: "/images/founder-2021-control.jpg",
    imageAlt: "Modern open office with organized support team and success metrics on displays",
    icon: <Trophy className="w-6 h-6" />,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "2022",
    date: "2022",
    title: "The Garrio Vision",
    description: "Left to build Garrio because customer support shouldn't be this hard. We knew there had to be a better way.",
    imageSrc: "/images/founder-2022-vision.jpg",
    imageAlt: "Founder at whiteboard sketching AI automation flowchart with sticky notes",
    icon: <Lightbulb className="w-6 h-6" />,
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: "2024",
    date: "2024",
    title: "First Customer Success",
    description: "Our first Garrio customer automated 100% of chats, reaching customers 24/7, capturing revenue and preventing returns before they happen.",
    imageSrc: "/images/founder-2024-success-v2.jpg",
    imageAlt: "Artisan dressmaker focused on creating handmade clothing in her sunlit workshop",
    icon: <Rocket className="w-6 h-6" />,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "2025",
    date: "2025",
    title: "Full-Service Support",
    description: "Garrio expands to manage complete customer support teams for our customers - the solution we wished we had years ago.",
    imageSrc: "/images/founder-2025-fullservice-v2.jpg",
    imageAlt: "Happy customer service representative with headphones smiling while helping customers on MacBook",
    icon: <Trophy className="w-6 h-6" />,
    gradient: "from-indigo-500 to-purple-500",
  },
]

export default function FoundingStory() {
  const [activeStep, setActiveStep] = useState(0)
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const [timelineProgress, setTimelineProgress] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const isDesktop = useMediaQuery("(min-width: 768px)")

  // Initialize step refs
  useEffect(() => {
    stepRefs.current = stepRefs.current.slice(0, timelineSteps.length)
  }, [])

  // Handle scroll-based activation on desktop using overall scroll position
  useEffect(() => {
    if (!isDesktop) return

    let animationFrame: number | null = null
    let lastActiveStep = -1

    const handleScroll = () => {
      if (animationFrame) return

      animationFrame = requestAnimationFrame(() => {
        const windowHeight = window.innerHeight
        const scrollY = window.scrollY
        
        // Find the timeline section's position
        const firstStep = stepRefs.current[0]
        const lastStep = stepRefs.current[stepRefs.current.length - 1]
        
        if (!firstStep || !lastStep) {
          animationFrame = null
          return
        }

        const timelineStart = firstStep.getBoundingClientRect().top + scrollY - windowHeight * 0.5
        const timelineEnd = lastStep.getBoundingClientRect().bottom + scrollY - windowHeight * 0.5
        const timelineHeight = timelineEnd - timelineStart

        // Calculate progress through the timeline (0 to 1)
        const progress = Math.max(0, Math.min(1, (scrollY - timelineStart) / timelineHeight))
        
        // Update the timeline progress for the vertical line
        setTimelineProgress(progress * 100)
        
        // Determine which step should be active based on progress
        const activeIndex = Math.min(
          Math.floor(progress * timelineSteps.length),
          timelineSteps.length - 1
        )

        // Only update if the active step has changed
        if (activeIndex !== lastActiveStep && activeIndex >= 0) {
          lastActiveStep = activeIndex
          setActiveStep(activeIndex)
          
          // Add all steps up to and including the active one to visible steps
          setVisibleSteps((prev) => {
            const newVisible = [...prev]
            for (let i = 0; i <= activeIndex; i++) {
              if (!newVisible.includes(i)) {
                newVisible.push(i)
              }
            }
            return newVisible
          })
        }

        animationFrame = null
      })
    }

    // Initial check
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
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

    const currentTimeline = timelineRef.current
    currentTimeline.addEventListener("scroll", handleScroll)
    return () => {
      if (currentTimeline) {
        currentTimeline.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isDesktop])

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Our Journey
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">How We
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Got Here
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We started Garrio because we lived the founder struggle. Here&apos;s how we went from drowning in customer emails to helping thousands of founders reclaim their creative time.
          </p>
        </div>
      </div>

      {isDesktop ? (
        // Desktop: Vertical Timeline
        <div className="container mx-auto px-4">
          <div className="relative">
            {/* Vertical line with gradient */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2 rounded-full overflow-hidden">
              {/* Progress line */}
              <div 
                className="absolute left-0 top-0 w-full bg-gradient-to-b from-purple-500 via-indigo-500 to-purple-500 transition-all duration-300 ease-out"
                style={{ height: `${timelineProgress}%` }}
              ></div>
            </div>

            {timelineSteps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => (stepRefs.current[index] = el)}
                className={`relative mb-20 last:mb-0 transition-all duration-1000 ${
                  visibleSteps.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div
                  className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center`}
                >
                  {/* Date marker with icon */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center z-10 transition-all duration-700 ease-out shadow-lg ${
                        activeStep === index
                          ? `bg-gradient-to-br ${step.gradient} text-white scale-125`
                          : "bg-white text-gray-500 border-2 border-gray-200 scale-100"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div className="text-sm font-bold mt-3 bg-white px-3 py-1 rounded-full shadow-md transition-all duration-500">{step.date}</div>
                  </div>

                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <div
                      className={`bg-white p-6 rounded-3xl shadow-xl transform transition-all duration-700 ease-out border ${
                        activeStep === index ? "scale-105 border-purple-200 shadow-2xl" : "scale-100 border-gray-100"
                      }`}
                    >
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`md:w-1/2 mt-6 md:mt-0 ${index % 2 === 0 ? "md:pl-16" : "md:pr-16"}`}>
                    <div
                      className={`relative h-56 rounded-3xl overflow-hidden shadow-xl transform transition-all duration-700 ease-out border-2 ${
                        activeStep === index ? "scale-105 border-purple-200 shadow-2xl" : "scale-100 border-transparent"
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
                className={`bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 border-2 ${
                  activeStep === index ? "transform scale-105 border-purple-200" : "border-transparent"
                }`}
              >
                <div className="relative h-48">
                  <Image
                    src={step.imageSrc ? step.imageSrc : "/placeholder.svg?height=300&width=400&query=timeline+step"}
                    alt={step.imageAlt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} text-white flex items-center justify-center shadow-lg`}>
                      {step.icon}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">{step.date}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{index + 1} of {timelineSteps.length}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
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
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeStep === index ? "bg-gradient-to-r from-purple-600 to-indigo-600 scale-125" : "bg-gray-300"
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
