"use client"

import { HelpCircle, Play, BookOpen, Activity } from "lucide-react"
import Link from "next/link"

import { trackEvent } from "@/lib/analytics"

const links = [
  {
    id: "faq",
    title: "Frequently Asked Questions",
    description: "Find quick answers to common questions",
    icon: <HelpCircle className="w-5 h-5" />,
    href: "/pricing#faq",
  },
  {
    id: "features",
    title: "Platform Features",
    description: "Explore all Garrio capabilities",
    icon: <Play className="w-5 h-5" />,
    href: "/features",
  },
  {
    id: "growth-library",
    title: "Growth Library",
    description: "CX playbooks and benchmarks",
    icon: <BookOpen className="w-5 h-5" />,
    href: "/blog",
  },
  {
    id: "status",
    title: "System Status",
    description: "Check our current uptime and incidents",
    icon: <Activity className="w-5 h-5" />,
    href: "https://status.garrio.com",
  },
]

export default function SelfServeLinks() {
  const handleLinkClick = (linkId: string) => {
    trackEvent("contact_link_click", { link_id: linkId })
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-indigo-100 animate-fade-in-up animation-delay-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Resources</h2>
      <div className="space-y-3">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            onClick={() => handleLinkClick(link.id)}
            className="flex items-start p-5 bg-gradient-to-r from-gray-50 to-indigo-50/50 rounded-xl hover:from-purple-50 hover:to-indigo-50 border border-transparent hover:border-purple-200 transition-all duration-300 group hover:shadow-lg hover:scale-[1.02]"
          >
            <div className="flex-shrink-0 mr-4 mt-0.5">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-md group-hover:shadow-lg transition-all duration-300">
                {link.icon}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">{link.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{link.description}</p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-all duration-300 transform group-hover:translate-x-1 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  )
}
