"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface JobRole {
  id: string
  title: string
  department: string
  location: string
  url: string
}

interface Benefit {
  emoji: string
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    emoji: "🩺",
    title: "99% health premiums",
    description: "We cover 99% of health, dental, and vision insurance premiums for you and your dependents.",
  },
  {
    emoji: "🌴",
    title: "Unlimited PTO",
    description: "Take the time you need to recharge, with a 3-week minimum vacation policy.",
  },
  {
    emoji: "🛠️",
    title: "$1K desk budget",
    description: "Set up your perfect home office with our equipment stipend.",
  },
  {
    emoji: "💻",
    title: "Remote-first",
    description: "Work from anywhere with internet. We have team members across 6 time zones.",
  },
  {
    emoji: "📚",
    title: "Learning stipend",
    description: "$2,000 annual budget for courses, books, and conferences.",
  },
  {
    emoji: "🏆",
    title: "Profit sharing",
    description: "Everyone shares in the company's success with quarterly profit sharing.",
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
    <section id="careers" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Build the Future of Support</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Join our team and help reshape how Shopify merchants connect with their customers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Benefits List */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Why Join Garrio</h3>
            <div className="space-y-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex">
                  <div className="text-3xl mr-4">{benefit.emoji}</div>
                  <div>
                    <h4 className="font-bold">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open Roles */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Open Roles</h3>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-100 animate-pulse h-24 rounded-lg"></div>
                ))}
              </div>
            ) : jobRoles.length > 0 ? (
              <div className="space-y-4">
                {jobRoles.map((role) => (
                  <Link key={role.id} href={role.url} className="block">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-lg">{role.title}</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline">{role.department}</Badge>
                        <Badge variant="secondary">{role.location}</Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600 mb-4">
                  We don't have any open positions right now, but we're always looking for exceptional talent.
                </p>
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Don't see your role? Pitch us!</p>
              <Button variant="outline" asChild>
                <Link href="mailto:careers@garrio.ai">careers@garrio.ai</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
