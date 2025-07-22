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
    id: "setup-time",
    question: "How long does setup take?",
    answer:
      "Just 5 minutes. Install our Shopify app, and our AI starts answering customer questions immediately. No training, no configuration—it works right out of the box with industry-specific knowledge for your business.",
    icon: <Clock className="h-5 w-5 text-purple-600" />,
  },
  {
    id: "ai-accuracy",
    question: "How accurate is the AI for my industry?",
    answer:
      "Our AI is pre-trained on industry-specific datasets for e-commerce, SaaS, and service businesses. It understands your products, policies, and common customer questions from day one, getting smarter with every conversation.",
    icon: <Zap className="h-5 w-5 text-purple-600" />,
  },
  {
    id: "human-backup",
    question: "What happens when AI can&apos;t help?",
    answer:
      "On our Essentials and Professional plans, human agents automatically handle complex issues 24/7. They're trained in your industry and have access to your store data to provide expert support.",
    icon: <HelpCircle className="h-5 w-5 text-purple-600" />,
  },
  {
    id: "pricing-model",
    question: "How does pricing work?",
    answer:
      "Start free with 250 AI chats per month. Starter plan gives you 350 chats for $10 credit. Essentials ($200/mo) and Professional ($500/mo) add human agent support. Pay only for what you use with transparent pricing.",
    icon: <Coins className="h-5 w-5 text-purple-600" />,
  },
  {
    id: "data-security",
    question: "Is my customer data secure?",
    answer:
      "Yes. We're SOC-2 certified with enterprise-grade encryption. We never store payment details and all data processing complies with GDPR and CCPA regulations. Your customer data stays protected.",
    icon: <Shield className="h-5 w-5 text-purple-600" />,
  },
  {
    id: "channels-supported",
    question: "What channels does it support?",
    answer:
      "Currently we support website chat, email, and are expanding to Meta, TikTok, and SMS. All conversations flow into one unified inbox so you never miss a customer inquiry.",
    icon: <BarChart className="h-5 w-5 text-purple-600" />,
  },
  {
    id: "scaling-business",
    question: "Will it handle my business growth?",
    answer:
      "Absolutely. Our infrastructure automatically scales from startup to enterprise volumes. Handle seasonal spikes, expand to new channels, and grow your business without growing support headaches.",
    icon: <Zap className="h-5 w-5 text-purple-600" />,
  },
  {
    id: "roi-measurement",
    question: "How do I measure the ROI?",
    answer:
      "Our dashboard tracks response times (from hours to seconds), AI resolution rates (typically 70%+), cost savings vs traditional support, and revenue from AI-driven upsells and cross-sells.",
    icon: <BarChart className="h-5 w-5 text-purple-600" />,
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
            Everything you need to know about setting up and scaling your customer support with Garrio.
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
                <div id={`faq-answer-${faq.id}`} className="mt-2 p-4 bg-white rounded-b-lg border-t border-gray-100">
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
