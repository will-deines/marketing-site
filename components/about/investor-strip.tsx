"use client"

import { useState } from "react"
import Image from "next/image"

interface Investor {
  id: string
  name: string
  logo: string
}

const investors: Investor[] = [
  {
    id: "simplisafe",
    name: "SimpliSafe",
    logo: "/investors/simplisafe-logo.png",
  },
  {
    id: "workshop",
    name: "Workshop.dev",
    logo: "/investors/workshop-dev-logo.png",
  },
]

export default function InvestorStrip() {
  const [hoveredInvestor, setHoveredInvestor] = useState<string | null>(null)

  return (
    <section className="py-12 bg-gray-50 border-t border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {investors.map((investor) => (
            <div
              key={investor.id}
              className="relative h-12 w-32"
              onMouseEnter={() => setHoveredInvestor(investor.id)}
              onMouseLeave={() => setHoveredInvestor(null)}
            >
              <Image
                src={investor.logo ? investor.logo : "/placeholder.svg?height=48&width=128&query=company+logo"}
                alt={investor.name}
                fill
                className={`object-contain transition-all duration-300 ${
                  hoveredInvestor === investor.id ? "filter-none" : "grayscale opacity-70"
                }`}
              />
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 mt-8">Backed by operators from SimpliSafe and Workshop.dev</p>
      </div>
    </section>
  )
}
