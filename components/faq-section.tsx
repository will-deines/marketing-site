"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp, Clock, Zap, Shield, Coins, BarChart, HelpCircle } from "lucide-react"
import Script from "next/script"

interface FAQItem {
  id: string
  question: string
  answer: string
  icon: React.ReactNode
}

const faqs: FAQItem[] = [
  {
    id: "site-speed",
    question: "Will this slow down my site?",
    answer:
      "< 30 kB script, loads async after DOMContentLoaded. Our chat widget is designed to have minimal impact on your site's performance and won't affect your Core Web Vitals scores.",
    icon: <Zap className="h-5 w-5 text-purple-600" />,
  },
  {
    id: "turn-off-ai",
    question: "Can I turn off the AI at night?",
    answer:
      "Yes—use store hours or a command in the admin. You can set specific hours of operation or manually toggle the AI assistant on and off as needed.",
    icon: <Clock className="h-5 w-5 text-purple-600" />,
  },
  {
    id: "data-security",
    question: "How is my store data protected?",
    answer:
      "We use enterprise-grade encryption and never store customer payment details. All data is processed in compliance with GDPR and CCPA regulations.",
    icon: <Shield className="h-5 w-5 text-purple-600" />,
  },
  {
    id: "roi-calculation",
    question: "How do I measure the ROI?",
    answer:
      "Our dashboard shows conversion lift, support time saved, and upsell revenue. You can also integrate with your existing analytics tools for deeper insights.",
    icon: <BarChart className="h-5 w-5 text-purple-600" />,
  },
  {
    id: "pricing-changes",
    question: "Will pricing change as I grow?",
    answer:
      "Our tiered pricing scales with your business. You'll only pay for what you use, and we'll notify you before you reach any usage limits.",
    icon: <Coins className="h-5 w-5 text-purple-600" />,
  },
  {
    id: "support",
    question: "What kind of support do you offer?",
    answer:
      "Free tier includes community support, while paid plans include email support with 24-hour response times. Scale plan includes priority support with 4-hour SLA.",
    icon: <HelpCircle className="h-5 w-5 text-purple-600" />,
  },
]

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  // Generate the schema.org FAQPage markup
  const generateFAQSchema = () => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    }

    return JSON.stringify(schemaData)
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about our platform and how it can help your Shopify store.
          </p>
        </div>

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
                  <div className="flex">
                    <div
                      className="mr-3 transform transition-transform duration-500 ease-in-out translate-x-0 opacity-100"
                      style={{
                        animation: openItems.includes(faq.id) ? "slideInFromLeft 0.5s ease-out" : "none",
                      }}
                    >
                      {faq.icon}
                    </div>
                    <div className="text-gray-600">{faq.answer}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Schema.org FAQPage markup for SEO */}
      <Script id="faq-schema" type="application/ld+json">
        {generateFAQSchema()}
      </Script>
    </section>
  )
}
