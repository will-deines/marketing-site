"use client"

import { FileText, ExternalLink, Info } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"

interface ClaimsModalProps {
  trigger?: React.ReactNode
  title?: string
  size?: "sm" | "md" | "lg"
}

export default function ClaimsModal({ 
  trigger, 
  title = "Claims & Sources",
  size = "md" 
}: ClaimsModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsOpen(false)
    document.body.style.overflow = ""
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal()
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl", 
    lg: "max-w-4xl"
  }

  return (
    <>
      {/* Trigger */}
      {trigger ? (
        <div onClick={openModal} className="cursor-pointer">
          {trigger}
        </div>
      ) : (
        <button
          onClick={openModal}
          className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="View sources and claims"
        >
          <Info className="h-3 w-3" />
          <span>Sources</span>
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div 
            className={`bg-white rounded-xl shadow-xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-hidden animate-slide-up`}
            role="dialog"
            aria-labelledby="claims-modal-title"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 id="claims-modal-title" className="text-xl font-bold flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                {title}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-4">
                <p className="text-gray-600">
                  All comparison data is based on publicly available information, official pricing pages, 
                  and documented features validated through web research as of July 2025.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Research Sources Include:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Official Shopify App Store ratings and installation counts</li>
                    <li>• Published pricing pages from each platform (July 2025)</li>
                    <li>• Feature documentation and integration capabilities</li>
                    <li>• Industry benchmarks for customer service response times</li>
                    <li>• Competitor comparison pages and official claims</li>
                    <li>• User-reported metrics and verified testimonials</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Validation Method:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Web search verification of all competitor claims</li>
                    <li>• Cross-reference with official documentation</li>
                    <li>• Updated competitor data including current pricing and ratings</li>
                    <li>• Feature capability research through platform comparisons</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">Important Notes:</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Some Garrio metrics are projections based on development plans</li>
                    <li>• Performance may vary based on implementation and usage patterns</li>
                    <li>• Pricing is subject to change - verify current rates on official websites</li>
                    <li>• App store ratings can fluctuate over time</li>
                    <li>• Response times depend on implementation and team configuration</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <Button asChild className="flex-1">
                <Link href="/claims-sources" target="_blank" onClick={closeModal}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Detailed Sources
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact" onClick={closeModal}>
                  Questions?
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}