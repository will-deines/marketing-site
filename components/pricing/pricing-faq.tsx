"use client"

import { ChevronDown, HelpCircle, Clock, DollarSign, FileText, Calendar } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface FAQItem {
  id: string
  question: string
  answer: string
  icon: React.ReactNode
}

const faqs: FAQItem[] = [
  {
    id: "switch-plans",
    question: "Can I switch plans anytime?",
    answer:
      "Yes—changes take effect instantly via Shopify Billing API. You can upgrade or downgrade your plan at any time from your Garrio dashboard.",
    icon: <Clock className="w-5 h-5" />
  },
  {
    id: "rollover",
    question: "Do unused chats roll over?",
    answer:
      "Not today; we price to keep the Free tier generous. Unused chats do not roll over to the next billing cycle, but we've designed our pricing to be fair and transparent.",
    icon: <DollarSign className="w-5 h-5" />
  },
  {
    id: "contract",
    question: "Is there a long-term contract?",
    answer:
      "Never. Month-to-month or usage-only. You can cancel your subscription at any time without any penalties or long-term commitments.",
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: "overage",
    question: "How do overages work?",
    answer:
      "If you exceed your plan's included chat limit, you'll be charged the per-chat overage rate for each additional chat. You can set usage caps in your dashboard to prevent unexpected charges.",
    icon: <DollarSign className="w-5 h-5" />
  },
  {
    id: "billing-cycle",
    question: "When does billing occur?",
    answer:
      "Billing occurs monthly through the Shopify Billing API. Your first charge will be prorated based on when you upgrade from the Free plan.",
    icon: <Calendar className="w-5 h-5" />
  },
]

export default function PricingFAQ() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const currentSection = sectionRef.current
    if (currentSection) {
      observer.observe(currentSection)
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection)
      }
    }
  }, [])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4" ref={sectionRef}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            FAQs
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Frequently asked
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get answers to common questions about our pricing and billing.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id} 
              className={`mb-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border ${
                openItems.includes(faq.id) ? 'border-indigo-200' : 'border-gray-100'
              }`}>
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="flex items-center justify-between w-full p-6 md:p-8 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 group"
                  aria-expanded={openItems.includes(faq.id)}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      openItems.includes(faq.id) 
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg' 
                        : 'bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600'
                    }`}>
                      {faq.icon}
                    </div>
                    <span className="text-lg font-semibold text-gray-900 text-left">{faq.question}</span>
                  </div>
                  <ChevronDown className={`h-6 w-6 text-gray-500 transition-all duration-300 ${
                    openItems.includes(faq.id) ? 'rotate-180' : ''
                  } group-hover:text-indigo-600`} />
                </button>
                {openItems.includes(faq.id) && (
                  <div 
                    id={`faq-answer-${faq.id}`} 
                    className="px-6 md:px-8 pb-6 md:pb-8"
                  >
                    <div className="ml-16 pt-2">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">Still have questions?</p>
          <a 
            href="mailto:support@garrio.ai" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  )
}
