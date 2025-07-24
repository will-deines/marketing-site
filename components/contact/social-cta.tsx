"use client"

import { Twitter, Linkedin, MessageSquare } from "lucide-react"

import { trackEvent } from "@/lib/analytics"

const socialLinks = [
  {
    id: "twitter",
    name: "Twitter",
    icon: <Twitter className="w-5 h-5" />,
    href: "https://twitter.com/garrioapp",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: <Linkedin className="w-5 h-5" />,
    href: "https://linkedin.com/company/garrio",
  },
  {
    id: "slack",
    name: "Slack Community",
    icon: <MessageSquare className="w-5 h-5" />,
    href: "https://garrio.com/slack",
  },
]

export default function SocialCta() {
  const handleSocialClick = (platform: string) => {
    trackEvent("social_link_click", { platform })
  }

  return (
    <div className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 rounded-3xl shadow-2xl p-12 text-center text-white overflow-hidden animate-fade-in-up">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join 500+ founders in our community</h2>
        <p className="text-purple-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
          Connect with ambitious Shopify merchants who are transforming their customer experience
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => handleSocialClick(link.id)}
              className="group flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-2xl px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/20 hover:border-white/40"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="w-10 h-10 flex items-center justify-center bg-white rounded-xl mr-3 text-purple-600 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                {link.icon}
              </span>
              <span className="font-semibold text-lg">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
