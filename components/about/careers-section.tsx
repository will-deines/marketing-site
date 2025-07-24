"use client"

import { 
  Heart, 
  Palmtree, 
  Wrench, 
  Home, 
  BookOpen, 
  Trophy, 
  MapPin, 
  Briefcase, 
  ArrowRight,
  Sparkles,
  Mail
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"


interface JobRole {
  id: string
  title: string
  department: string
  location: string
  url: string
}

interface Benefit {
  icon: React.ElementType
  title: string
  description: string
  gradient: string
}

const benefits: Benefit[] = [
  {
    icon: Heart,
    title: "99% health premiums",
    description: "We cover 99% of health, dental, and vision insurance premiums for you and your dependents.",
    gradient: "from-red-500 to-pink-500",
  },
  {
    icon: Palmtree,
    title: "Unlimited PTO",
    description: "Take the time you need to recharge, with a 3-week minimum vacation policy.",
    gradient: "from-green-500 to-teal-500",
  },
  {
    icon: Wrench,
    title: "$1K desk budget",
    description: "Set up your perfect home office with our equipment stipend.",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: Home,
    title: "Remote-first",
    description: "Work from anywhere with internet. We have team members across 6 time zones.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: BookOpen,
    title: "Learning stipend",
    description: "$2,000 annual budget for courses, books, and conferences.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Trophy,
    title: "Profit sharing",
    description: "Everyone shares in the company's success with quarterly profit sharing.",
    gradient: "from-amber-500 to-red-500",
  },
]

// Mock job roles - in a real implementation, these would be fetched from an API
const mockJobRoles: JobRole[] = [
  {
    id: "senior-ml-engineer",
    title: "Senior ML Engineer",
    department: "Engineering",
    location: "Remote - US-East",
    url: "/careers/senior-ml-engineer",
  },
  {
    id: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Remote - Global",
    url: "/careers/product-designer",
  },
  {
    id: "customer-success-manager",
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote - US",
    url: "/careers/customer-success-manager",
  },
  {
    id: "growth-marketer",
    title: "Growth Marketer",
    department: "Marketing",
    location: "Remote - US/Canada",
    url: "/careers/growth-marketer",
  },
]

export default function CareersSection() {
  const [jobRoles, setJobRoles] = useState<JobRole[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Simulate API fetch
  useEffect(() => {
    const fetchJobs = async () => {
      // In a real implementation, this would be an API call
      // const response = await fetch('https://api.lever.co/v0/postings/garrio?mode=json');
      // const data = await response.json();

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setJobRoles(mockJobRoles)
      setIsLoading(false)
    }

    fetchJobs()
  }, [])

  return (
    <section id="careers" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_at_50%_-50px,rgba(147,51,234,0.15),transparent)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header with badge */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200/50 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">We&apos;re Hiring</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-900 to-purple-600 bg-clip-text text-transparent">
            Build the Future of Support
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join our team and help reshape how Shopify merchants connect with their customers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Benefits List */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-gray-900">Why Join Garrio</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon
                return (
                  <div 
                    key={benefit.title} 
                    className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100 hover:border-purple-200"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-50/0 to-pink-50/0 group-hover:from-purple-50/50 group-hover:to-pink-50/50 rounded-2xl transition-all duration-300" />
                    
                    <div className="relative z-10 flex items-start">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${benefit.gradient} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 text-transparent bg-gradient-to-r ${benefit.gradient} bg-clip-text`} strokeWidth={2} fill="currentColor" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{benefit.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Open Roles */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Open Roles</h3>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                  {jobRoles.length} Openings
                </Badge>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="relative overflow-hidden bg-gray-50 h-28 rounded-xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    </div>
                  ))}
                </div>
              ) : jobRoles.length > 0 ? (
                <div className="space-y-4">
                  {jobRoles.map((role) => (
                    <Link key={role.id} href={role.url} className="block group">
                      <div className="relative bg-gradient-to-r from-purple-50/50 to-pink-50/50 border border-purple-100 rounded-xl p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                        {/* Hover gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/0 via-purple-100/20 to-purple-100/0 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
                        
                        <div className="relative z-10">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-bold text-lg text-gray-900 group-hover:text-purple-700 transition-colors">
                                {role.title}
                              </h4>
                              <div className="flex flex-wrap gap-2 mt-3">
                                <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">
                                  <Briefcase className="w-3 h-3 mr-1" />
                                  {role.department}
                                </Badge>
                                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {role.location}
                                </Badge>
                              </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-purple-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 text-center border border-purple-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-700 font-medium mb-2">
                    No open positions at the moment
                  </p>
                  <p className="text-gray-600 text-sm">
                    We&apos;re always looking for exceptional talent.
                  </p>
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-gray-700 font-medium mb-4">Don&apos;t see your role? Pitch us!</p>
                  <Button 
                    variant="outline" 
                    className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 group"
                    asChild
                  >
                    <Link href="mailto:careers@garrio.ai">
                      <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      careers@garrio.ai
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  )
}
