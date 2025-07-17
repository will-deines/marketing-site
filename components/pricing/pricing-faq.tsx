"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    id: "switch-plans",
    question: "Can I switch plans anytime?",
    answer:
      "Yes—changes take effect instantly via Shopify Billing API. You can upgrade or downgrade your plan at any time from your Garrio dashboard.",
  },
  {
    id: "rollover",
    question: "Do unused chats roll over?",
    answer:
      "Not today; we price to keep the Free tier generous. Unused chats do not roll over to the next billing cycle, but we've designed our pricing to be fair and transparent.",
  },
  {
    id: "contract",
    question: "Is there a long-term contract?",
    answer:
      "Never. Month-to-month or usage-only. You can cancel your subscription at any time without any penalties or long-term commitments.",
  },
  {
    id: "overage",
    question: "How do overages work?",
    answer:
      "If you exceed your plan's included chat limit, you'll be charged the per-chat overage rate for each additional chat. You can set usage caps in your dashboard to prevent unexpected charges.",
  },
  {
    id: "billing-cycle",
    question: "When does billing occur?",
    answer:
      "Billing occurs monthly through the Shopify Billing API. Your first charge will be prorated based on when you upgrade from the Free plan.",
  },
]

export default function PricingFAQ() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about our pricing and billing.
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
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
