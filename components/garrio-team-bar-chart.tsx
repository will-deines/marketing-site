"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts"
import { Download, Brain, RefreshCw, Mail, MessageSquare, TrendingUp, Users } from "lucide-react"

interface StepData {
  step: number
  name: string
  percentage: number
  icon: React.ReactNode
  title: string
  description: string
  benefit: string
}

const stepData: StepData[] = [
  {
    step: 1,
    name: "Install",
    percentage: 5,
    icon: <Download className="w-5 h-5" />,
    title: "One-click Shopify install",
    description: "3-minute setup, your Garrio team is ready",
    benefit: "From chaos to calm in minutes"
  },
  {
    step: 2,
    name: "Learn",
    percentage: 15,
    icon: <Brain className="w-5 h-5" />,
    title: "Team learns your brand",
    description: "Masters your products, policies, and voice",
    benefit: "No training needed—instant expertise"
  },
  {
    step: 3,
    name: "Connect",
    percentage: 35,
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Real-time integration",
    description: "Syncs with every order and update",
    benefit: "Always current, never outdated"
  },
  {
    step: 4,
    name: "Organize",
    percentage: 55,
    icon: <Mail className="w-5 h-5" />,
    title: "Email chaos organized",
    description: "Categorizes and prioritizes automatically",
    benefit: "Your inbox becomes manageable"
  },
  {
    step: 5,
    name: "Draft",
    percentage: 75,
    icon: <MessageSquare className="w-5 h-5" />,
    title: "Team drafts responses",
    description: "First response ready for your review",
    benefit: "Just approve and send"
  },
  {
    step: 6,
    name: "Improve",
    percentage: 85,
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Gets smarter daily",
    description: "Every interaction improves performance",
    benefit: "Your team evolves with you"
  },
  {
    step: 7,
    name: "Complete",
    percentage: 100,
    icon: <Users className="w-5 h-5" />,
    title: "100% coverage",
    description: "Full support, you stay in control",
    benefit: "Focus on growing your business"
  }
]

export default function GarrioTeamBarChart() {
  const [activeStep, setActiveStep] = useState(0)
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
      setActiveStep((prev) => (prev + 1) % stepData.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [inView, isHovering, hasStarted])

  // Start animation when in view
  useEffect(() => {
    if (inView && !hasStarted) {
      setTimeout(() => setHasStarted(true), 500)
    }
  }, [inView, hasStarted])

  const currentStepData = stepData[activeStep]

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white/95 backdrop-blur p-4 rounded-xl shadow-xl border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
              {data.icon}
            </div>
            <p className="font-semibold text-gray-900">{data.title}</p>
          </div>
          <p className="text-sm text-gray-600 mb-1">{data.description}</p>
          <p className="text-sm font-medium text-purple-600">{data.benefit}</p>
        </div>
      )
    }
    return null
  }

  return (
    <section 
      ref={ref}
      id="how-it-works"
      className="py-20 md:py-32 bg-gradient-to-br from-purple-50 via-white to-indigo-50 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            Your Transformation Journey
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Your Garrio team takes over in 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600"> 7 steps</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI agents and human experts working together as one team
          </p>
        </div>

        {/* Dynamic Step Display */}
        <div className={`text-center mb-12 transition-all duration-500 ${hasStarted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-white/80 backdrop-blur rounded-2xl px-8 py-6 shadow-lg border border-purple-100 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-3 rounded-xl text-purple-600">
                {currentStepData?.icon}
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-900">
                  Step {currentStepData?.step}: {currentStepData?.title}
                </h3>
                <p className="text-lg text-gray-600">{currentStepData?.description}</p>
              </div>
            </div>
            <p className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {currentStepData?.benefit}
            </p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/60 backdrop-blur rounded-3xl p-8 shadow-xl border border-purple-100">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stepData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                  barGap={8}
                  onMouseMove={(state) => {
                    if (state.activeTooltipIndex !== undefined) {
                      setActiveStep(state.activeTooltipIndex)
                      setIsHovering(true)
                    }
                  }}
                  onMouseLeave={() => {
                    setIsHovering(false)
                  }}
                >
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 14, fill: '#6B7280' }}
                    tickLine={false}
                    axisLine={{ stroke: '#E5E7EB' }}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tick={{ fontSize: 14, fill: '#6B7280' }}
                    tickLine={false}
                    axisLine={{ stroke: '#E5E7EB' }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ fill: 'transparent' }}
                  />
                  <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
                    {stepData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          hasStarted && index === activeStep 
                            ? "url(#activeGradient)" 
                            : "#E5E7EB"
                        }
                        className="transition-all duration-300"
                      />
                    ))}
                  </Bar>
                  <defs>
                    <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9333EA" stopOpacity={1} />
                      <stop offset="100%" stopColor="#6366F1" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {stepData.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeStep 
                      ? 'w-8 bg-gradient-to-r from-purple-600 to-indigo-600' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => {
                    setActiveStep(index)
                    setIsHovering(true)
                    setTimeout(() => setIsHovering(false), 5000)
                  }}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-12 text-center">
          <div className="bg-white/80 backdrop-blur rounded-2xl border border-purple-200 p-6 max-w-2xl mx-auto shadow-lg">
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="font-semibold text-purple-600">In just 7 steps</span>, your support work goes from 0% to 100% handled. 
              Your Garrio team of AI and human agents work together seamlessly, 
              <span className="font-semibold"> so you can focus on what you love.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}