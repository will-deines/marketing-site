"use client"

import Link from "next/link"
import { HelpCircle, Play, BookOpen, Activity } from "lucide-react"
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
    id: "live-demo",
    title: "Try Our Live Demo",
    description: "See Garrio in action on your store",
    icon: <Play className="w-5 h-5" />,
    href: "/live-demo",
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
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Resources</h2>
      <div className="space-y-3">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            onClick={() => handleLinkClick(link.id)}
            className="flex items-start p-4 bg-gray-100 rounded-lg hover:bg-indigo-50 transition duration-200 group"
            style={{ transform: "translateY(0)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            <div className="flex-shrink-0 mr-4 mt-1 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200">
              {link.icon}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{link.title}</h3>
              <p className="text-sm text-gray-600">{link.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
