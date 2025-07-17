"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FaqProps {
  competitorName: string
}

export default function Faq({ competitorName }: FaqProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const faqs = [
    {
      id: "feature-parity",
      question: `Does Garrio have feature parity with ${competitorName}?`,
      answer: `Yes, Garrio includes all core ${competitorName} features plus AI-powered automation that handles tickets for you. Our platform is designed specifically for Shopify merchants, with deep integrations that allow for seamless order management, customer data access, and automated responses.`,
    },
    {
      id: "seo-impact",
      question: "Will switching affect my SEO or site performance?",
      answer:
        "No, Garrio's lightweight widget (under 30kb) loads asynchronously and won't impact your Core Web Vitals or SEO. Our script is optimized to have minimal impact on page load times and user experience, ensuring your store's performance remains optimal.",
    },
    {
      id: "customization",
      question: "Can I customize the chat widget to match my brand?",
      answer:
        "Absolutely. Garrio offers full customization of colors, fonts, and messaging to match your brand identity. You can also set custom triggers, create targeted messages for specific pages, and personalize the chat experience based on customer data from Shopify.",
    },
    {
      id: "sla",
      question: "What kind of SLA does Garrio offer?",
      answer:
        "Free tier includes community support, while paid plans include email support with 24-hour response times. Scale plan includes priority support with 4-hour SLA. Our team is available to help with any issues you might encounter, ensuring your customer support never misses a beat.",
    },
    {
      id: "security",
      question: "How does Garrio handle data security?",
      answer:
        "Garrio uses enterprise-grade encryption and is SOC 2 compliant. We never store customer payment details and are fully GDPR and CCPA compliant. Your data security is our top priority, and we maintain strict protocols to ensure all customer information remains protected.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Common questions about switching from {competitorName} to Garrio
        </p>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <div key={faq.id} className="mb-4">
              <button
                onClick={() => toggleItem(faq.id)}
                className="flex justify-between items-center w-full p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                aria-expanded={openItems.includes(faq.id)}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="font-medium text-left">{faq.question}</span>
                {openItems.includes(faq.id) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openItems.includes(faq.id) && (
                <div id={`faq-answer-${faq.id}`} className="p-4 bg-white rounded-b-lg border-t border-gray-100">
                  <p className="text-gray-600 max-w-[32ch] md:max-w-none">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
