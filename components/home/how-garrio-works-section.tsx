"use client"

import { Download, Brain, RefreshCw, Mail, MessageSquare, TrendingUp, Users, Heart } from "lucide-react"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

import { Progress } from "@/components/ui/progress"

interface WorkflowStep {
  id: number
  percentage: number
  icon: React.ReactNode
  title: string
  description: string
  founderBenefit: string
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    percentage: 5,
    icon: <Download className="w-5 h-5" />,
    title: "One-click Shopify install",
    description: "3-minute setup, your Garrio team is ready to go",
    founderBenefit: "From overwhelmed to organized in minutes"
  },
  {
    id: 2,
    percentage: 15,
    icon: <Brain className="w-5 h-5" />,
    title: "Team learns your brand",
    description: "Your team masters your products, policies, and brand voice",
    founderBenefit: "No training needed—they know your business instantly"
  },
  {
    id: 3,
    percentage: 35,
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Real-time order integration",
    description: "Your team stays current with every order and update",
    founderBenefit: "Never manually look up order status again"
  },
  {
    id: 4,
    percentage: 55,
    icon: <Mail className="w-5 h-5" />,
    title: "Email organization",
    description: "Your team organizes the chaos and prioritizes what matters",
    founderBenefit: "Your inbox becomes a place of peace, not panic"
  },
  {
    id: 5,
    percentage: 75,
    icon: <MessageSquare className="w-5 h-5" />,
    title: "Team drafts responses",
    description: "Your team writes the first response, ready for your review",
    founderBenefit: "Every email gets handled, you just approve and send"
  },
  {
    id: 6,
    percentage: 85,
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Feedback makes team smarter",
    description: "Every correction makes your team better and faster",
    founderBenefit: "Your team gets smarter while you sleep"
  },
  {
    id: 7,
    percentage: 100,
    icon: <Users className="w-5 h-5" />,
    title: "Complete coverage",
    description: "Your team handles everything, you stay in control",
    founderBenefit: "Finally free to build the business you dreamed of"
  }
]

export default function HowGarrioWorksSection() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  // Auto-advance functionality
  useEffect(() => {
    if (!inView || isHovering || !hasStarted) return

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= workflowSteps.length - 1) {
          // Reset to beginning after showing complete story
          setTimeout(() => setCurrentStep(0), 1000)
          return prev
        }
        return prev + 1
      })
    }, 3500)

    return () => clearInterval(interval)
  }, [inView, isHovering, hasStarted])

  // Start animation when in view
  useEffect(() => {
    if (inView && !hasStarted) {
      setTimeout(() => setHasStarted(true), 500)
    }
  }, [inView, hasStarted])

  const handleStepHover = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const currentStepData = workflowSteps[currentStep]

  return (
    <section 
      ref={ref}
      className="py-20 md:py-32 bg-gradient-to-br from-purple-50 via-white to-indigo-50 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-purple-100 text-purple-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            <Brain className="w-4 h-4" />
            Meet Your Team
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your Garrio team: 
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Hearts and Smarts working as one
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
            AI agents and human experts collaborate seamlessly to handle your support.
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Here's how your Garrio team takes over...
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Current Step Display */}
          <div className="text-center mb-16">
            <div className={`transition-all duration-500 ${hasStarted ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-4'}`}>
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur rounded-2xl px-8 py-4 shadow-lg border border-purple-100 mb-6">
                <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                  {currentStepData?.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {currentStepData?.title}
                  </h3>
                  <p className="text-purple-600 font-medium">
                    {currentStepData?.description}
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                <p className="text-xl font-semibold">
                  {currentStepData?.founderBenefit}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-6" onMouseLeave={handleMouseLeave}>
            {workflowSteps.map((step, index) => (
              <div
                key={step.id}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  index === currentStep ? 'transform scale-105' : 'hover:transform hover:scale-102'
                }`}
                onMouseEnter={() => handleStepHover(index)}
              >
                <div className="bg-white/60 backdrop-blur rounded-2xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-6">
                    {/* Step Icon and Info */}
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className={`p-3 rounded-xl transition-colors duration-300 ${
                        index === currentStep 
                          ? 'bg-purple-100 text-purple-600' 
                          : 'bg-gray-100 text-gray-600 group-hover:bg-purple-50 group-hover:text-purple-500'
                      }`}>
                        {step.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className={`font-semibold text-lg transition-colors duration-300 ${
                          index === currentStep ? 'text-purple-900' : 'text-gray-700 group-hover:text-purple-800'
                        }`}>
                          {step.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-48 flex items-center gap-3">
                      <Progress
                        value={hasStarted && index <= currentStep ? step.percentage : 0}
                        className={`h-3 transition-all duration-700 ${
                          index === currentStep ? 'ring-2 ring-purple-200' : ''
                        }`}
                      />
                      <span className={`text-sm font-bold min-w-[3rem] transition-colors duration-300 ${
                        index === currentStep ? 'text-purple-600' : 'text-gray-500'
                      }`}>
                        {step.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-20 text-center">
            <div className="bg-white/80 backdrop-blur rounded-3xl border border-purple-200 p-8 max-w-3xl mx-auto shadow-xl">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <Heart className="w-6 h-6 text-purple-600" />
                    <Brain className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-gray-900">Your transformation is complete</h3>
                  <p className="text-gray-600 text-lg">From overwhelmed founder to supported CEO</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                In just 7 steps, your Garrio team takes over 100% of your customer support work. 
                You stay in control, they handle the execution. 
                <span className="font-semibold text-purple-600"> Welcome to the business you always dreamed of building.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}