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
    <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            Questions & Answers
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Everything you need to 
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">know to get started</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Common questions from founders who want to reclaim their time and transform 
            their customer experience with Garrio.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className={`bg-white rounded-3xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  openItems.includes(faq.id) ? 'ring-2 ring-blue-200' : ''
                }`}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="flex justify-between items-center w-full px-8 py-6 text-left hover:bg-blue-50/30 focus:outline-none focus:bg-blue-50/30 transition-all duration-200 group"
                  aria-expanded={openItems.includes(faq.id)}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex items-start gap-4 flex-1 pr-4">
                    <div className="bg-blue-100 p-2.5 rounded-xl flex-shrink-0 mt-0.5 group-hover:bg-blue-200 transition-colors">
                      {faq.icon}
                    </div>
                    <span className="font-semibold text-gray-900 text-lg leading-relaxed">
                      {faq.question}
                    </span>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <div className={`p-2 rounded-full transition-all duration-200 ${
                      openItems.includes(faq.id) 
                        ? 'bg-blue-200 text-blue-700' 
                        : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                    }`}>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          openItems.includes(faq.id) ? 'transform rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                </button>
                
                {openItems.includes(faq.id) && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="px-8 pb-8"
                    role="region"
                    aria-labelledby={`faq-question-${faq.id}`}
                  >
                    <div className="ml-14 pl-4 border-l-2 border-blue-200">
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Contact CTA */}
        <div className="mt-20 text-center">
          <div className="bg-white/80 backdrop-blur rounded-3xl border border-blue-200 p-8 max-w-3xl mx-auto shadow-xl">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="bg-blue-100 p-4 rounded-2xl">
                <HelpCircle className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-900">Still have questions?</h3>
                <p className="text-gray-600 text-lg">We're here to help you get started</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:hello@garrio.ai"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Get in touch
              </a>
              <span className="text-gray-500">or</span>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors hover:underline"
              >
                Visit our help center
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Schema.org FAQPage markup for SEO */}
      <Script id="faq-schema" type="application/ld+json">
        {generateFAQSchema()}
      </Script>
    </section>
  )
}
