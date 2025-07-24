"use client";

import { useState } from "react";
import Image from "next/image";
import { Users, Award, Sparkles } from "lucide-react";

interface Investor {
  id: string;
  name: string;
  logo: string;
  description?: string;
}

const investors: Investor[] = [
  {
    id: "simplisafe",
    name: "SimpliSafe",
    logo: "/investors/simplisafe-logo.png",
    description: "DTC Security Pioneer",
  },
  {
    id: "workshop",
    name: "Workshop.dev",
    logo: "/investors/workshop-dev-logo.png",
    description: "Venture Studio & Investor",
  },
];

export default function InvestorStrip() {
  const [hoveredInvestor, setHoveredInvestor] = useState<string | null>(null);

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,rgba(147,51,234,0.1),transparent)]" />
      </div>

      {/* Floating elements */}
      <div className="absolute top-10 left-10 animate-pulse">
        <div className="w-2 h-2 bg-purple-400 rounded-full opacity-60" />
      </div>
      <div className="absolute bottom-10 right-10 animate-pulse delay-300">
        <div className="w-3 h-3 bg-purple-300 rounded-full opacity-40" />
      </div>
      <div className="absolute top-1/2 left-20 animate-pulse delay-700">
        <div className="w-2 h-2 bg-purple-500 rounded-full opacity-30" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header with Badge */}
        <div className="flex flex-col items-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-50 border border-purple-200/50 rounded-full mb-4">
            <Award className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">
              Backed by Industry Leaders
            </span>
            <Sparkles className="w-3 h-3 text-purple-500" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-purple-900 to-purple-600 bg-clip-text text-transparent">
            Built by Successful Operators
          </h3>
        </div>

        {/* Investor Cards */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 max-w-4xl mx-auto">
          {investors.map((investor, index) => (
            <div
              key={investor.id}
              className={`group relative rounded-2xl border p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 backdrop-blur-sm ${
                investor.id === "simplisafe"
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-gray-600"
                  : "bg-gradient-to-br from-indigo-100 to-blue-100 border-indigo-200/50 hover:border-indigo-300"
              }`}
              onMouseEnter={() => setHoveredInvestor(investor.id)}
              onMouseLeave={() => setHoveredInvestor(null)}
            >
              {/* Gradient glow on hover */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  investor.id === "simplisafe"
                    ? "bg-gradient-to-r from-orange-400/0 via-orange-400/20 to-orange-400/0"
                    : "bg-gradient-to-r from-indigo-400/0 via-indigo-400/10 to-indigo-400/0"
                }`}
              />

              <div className="relative z-10">
                <div className="relative h-16 w-40 mb-4">
                  <Image
                    src={
                      investor.logo || "/placeholder.svg?height=64&width=160"
                    }
                    alt={investor.name}
                    fill
                    className={`object-contain transition-all duration-500 ${
                      hoveredInvestor === investor.id
                        ? "filter-none scale-110"
                        : "opacity-80 group-hover:opacity-100"
                    }`}
                  />
                </div>

                {/* Investor details */}
                <div className="text-center">
                  <p
                    className={`font-semibold ${investor.id === "simplisafe" ? "text-white" : "text-gray-900"}`}
                  >
                    {investor.name}
                  </p>
                  {investor.description && (
                    <p
                      className={`text-sm mt-1 ${investor.id === "simplisafe" ? "text-gray-300" : "text-gray-600"}`}
                    >
                      {investor.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom text with gradient */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 font-medium">
            Backed by operators who&apos;ve built
            <span className="bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent font-bold">
              {" "}
              billion-dollar companies
            </span>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Our investors bring deep expertise in SaaS, e-commerce, and customer
            experience
          </p>
        </div>
      </div>
    </section>
  );
}
