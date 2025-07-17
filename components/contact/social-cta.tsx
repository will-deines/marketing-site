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
    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-md p-8 text-center text-white">
      <h2 className="text-2xl font-bold mb-4">Join 3k+ CX builders on social media</h2>
      <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
        Connect with our community of Shopify merchants and customer experience professionals to share insights and stay
        updated.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={() => handleSocialClick(link.id)}
            className="flex items-center bg-white/10 hover:bg-white/20 rounded-full px-6 py-3 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="w-8 h-8 flex items-center justify-center bg-white rounded-full mr-2 text-indigo-600">
              {link.icon}
            </span>
            <span className="font-medium">{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
