"use client"

import { ChevronDown, MessageSquare, Shield, Zap, HeadphonesIcon, Settings } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface FaqProps {
  competitorName: string
}

export default function Faq({ competitorName }: FaqProps) {
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
      {
        threshold: 0.1,
      },
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

  const faqs = [
    {
      id: "feature-parity",
      icon: MessageSquare,
      iconColor: "from-purple-500 to-indigo-600",
      question: `Does Garrio have feature parity with ${competitorName}?`,
      answer: `Yes, Garrio includes all core ${competitorName} features plus AI-powered automation that handles tickets for you. Our platform is designed specifically for Shopify merchants, with deep integrations that allow for seamless order management, customer data access, and automated responses.`,
    },
    {
      id: "seo-impact",
      icon: Zap,
      iconColor: "from-blue-500 to-cyan-600",
      question: "Will switching affect my SEO or site performance?",
      answer:
        "No, Garrio's lightweight widget (under 30kb) loads asynchronously and won't impact your Core Web Vitals or SEO. Our script is optimized to have minimal impact on page load times and user experience, ensuring your store's performance remains optimal.",
    },
    {
      id: "customization",
      icon: Settings,
      iconColor: "from-pink-500 to-rose-600",
      question: "Can I customize the chat widget to match my brand?",
      answer:
        "Absolutely. Garrio offers full customization of colors, fonts, and messaging to match your brand identity. You can also set custom triggers, create targeted messages for specific pages, and personalize the chat experience based on customer data from Shopify.",
    },
    {
      id: "sla",
      icon: HeadphonesIcon,
      iconColor: "from-green-500 to-emerald-600",
      question: "What kind of SLA does Garrio offer?",
      answer:
        "Free tier includes community support, while paid plans include email support with 24-hour response times. Scale plan includes priority support with 4-hour SLA. Our team is available to help with any issues you might encounter, ensuring your customer support never misses a beat.",
    },
    {
      id: "security",
      icon: Shield,
      iconColor: "from-orange-500 to-red-600",
      question: "How does Garrio handle data security?",
      answer:
        "Garrio uses enterprise-grade encryption and is SOC 2 compliant. We never store customer payment details and are fully GDPR and CCPA compliant. Your data security is our top priority, and we maintain strict protocols to ensure all customer information remains protected.",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-900 to-indigo-700 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Common questions about switching from {competitorName} to Garrio
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => {
            const Icon = faq.icon
            const isOpen = openItems.includes(faq.id)
            
            return (
              <div 
                key={faq.id} 
                className={`mb-4 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border ${
                  isOpen ? "border-purple-200" : "border-gray-100"
                }`}>
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="flex items-center justify-between w-full p-6 md:p-8 text-left group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 focus:ring-offset-2 rounded-2xl"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`hidden md:flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${faq.iconColor} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6 text-gray-700" />
                      </div>
                      <span className="text-lg md:text-xl font-semibold text-gray-900 pr-4">{faq.question}</span>
                    </div>
                    <div className={`flex-shrink-0 ml-4 transition-all duration-300 ${isOpen ? "rotate-180" : ""}`}>
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                        <ChevronDown className="h-5 w-5 text-purple-600" />
                      </div>
                    </div>
                  </button>
                  
                  <div 
                    id={`faq-answer-${faq.id}`}
                    className={`transition-all duration-500 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8">
                      <div className="border-t border-gray-100 pt-4 md:pt-6">
                        <p className="text-gray-600 leading-relaxed text-lg md:ml-16">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional help CTA */}
        <div className={`text-center mt-12 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`} style={{ transitionDelay: "600ms" }}>
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a href="/contact" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors">
            Contact our migration team
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
