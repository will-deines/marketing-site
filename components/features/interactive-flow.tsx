"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface FlowStep {
  id: string
  title: string
  description: string
  videoSrc: string
}

const flowSteps: FlowStep[] = [
  {
    id: "step1",
    title: "AI Instant Answer",
    description: "Immediate order status lookup and response",
    videoSrc: "/background-video.mp4", // Using placeholder video
  },
  {
    id: "step2",
    title: "AI Detects Edge-Case",
    description: "Identifies damaged item request that needs special handling",
    videoSrc: "/background-video.mp4", // Using placeholder video
  },
  {
    id: "step3",
    title: "Auto-Escalate",
    description: "Email composed and tagged for human agent review",
    videoSrc: "/background-video.mp4", // Using placeholder video
  },
  {
    id: "step4",
    title: "Human Agent Resolution",
    description: "Refund processed, customer satisfaction achieved",
    videoSrc: "/background-video.mp4", // Using placeholder video
  },
]

export default function InteractiveFlow() {
  const [activeStep, setActiveStep] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Initialize video refs
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, flowSteps.length)
  }, [])

  // Handle step change
  useEffect(() => {
    // Reset all videos
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeStep) {
          video.currentTime = 0
          video.play()
        } else {
          video.pause()
        }
      }
    })
  }, [activeStep])

  // Handle hover scrubbing
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isHovering || !containerRef.current) return

    const containerWidth = containerRef.current.offsetWidth
    const relativeX = e.nativeEvent.offsetX
    const stepIndex = Math.floor((relativeX / containerWidth) * flowSteps.length)

    if (stepIndex >= 0 && stepIndex < flowSteps.length) {
      setActiveStep(stepIndex)
    }
  }

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % flowSteps.length)
  }

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + flowSteps.length) % flowSteps.length)
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See the Hand-Off</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the seamless transition from AI to human support in action.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Interactive stepper */}
          <div
            ref={containerRef}
            className="relative bg-white rounded-xl shadow-lg overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
          >
            {/* Video container */}
            <div className="relative aspect-video">
              {flowSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    activeStep === index ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={step.videoSrc} type="video/mp4" />
                  </video>

                  {/* Step info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
                    <h3 className="font-bold text-lg">{step.title}</h3>
                    <p className="text-sm text-white/80">{step.description}</p>
                  </div>
                </div>
              ))}

              {/* Navigation arrows */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-20"
                onClick={prevStep}
                aria-label="Previous step"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-20"
                onClick={nextStep}
                aria-label="Next step"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Step indicators */}
            <div className="flex justify-center p-4 bg-gray-100">
              {flowSteps.map((step, index) => (
                <button
                  key={step.id}
                  className={`w-3 h-3 rounded-full mx-2 transition-all ${
                    activeStep === index ? "bg-purple-600 scale-125" : "bg-gray-300"
                  }`}
                  onClick={() => setActiveStep(index)}
                  aria-label={`Go to step ${index + 1}: ${step.title}`}
                />
              ))}
            </div>
          </div>

          {/* Caption ribbon */}
          <div className="bg-purple-600 text-white text-center py-4 rounded-b-xl shadow-md">
            <p className="text-lg font-medium">Zero tickets left for you, zero loops for them.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
