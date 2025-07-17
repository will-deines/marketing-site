"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { TriangleIcon as ExclamationTriangleIcon, Loader2Icon } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

// Example chips data - in a real implementation, this would come from /data/demo-examples.json
const EXAMPLE_CHIPS = [
  { label: "Dress", url: "https://example-store.myshopify.com/products/summer-dress" },
  { label: "Serum", url: "https://example-store.myshopify.com/products/vitamin-c-serum" },
  { label: "Headphones", url: "https://example-store.myshopify.com/products/wireless-headphones" },
]

// Shopify URL validation regex
const SHOPIFY_URL_REGEX = /https?:\/\/([a-z0-9-]+\.)?(myshopify\.com|[a-z0-9-]+\.[a-z]{2,})\/.+/

export default function InlineDemoBlock() {
  const [url, setUrl] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // Validate URL with regex
  const isValidUrl = url.trim() !== "" && SHOPIFY_URL_REGEX.test(url)

  // Handle URL input change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  // Handle example chip click
  const handleChipClick = (chipUrl: string) => {
    setUrl(chipUrl)
    if (inputRef.current) {
      inputRef.current.focus()
    }
    trackEvent("inline_demo_chip_click", { url: chipUrl })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValidUrl) {
      showError("Hmm… that doesn't look like a Shopify page.")
      if (formRef.current) {
        formRef.current.classList.add("animate-shake")
        setTimeout(() => {
          formRef.current?.classList.remove("animate-shake")
        }, 300)
      }
      return
    }

    setIsValidating(true)
    trackEvent("inline_demo_submit", { url })

    try {
      // In a real implementation, you would validate the URL with a HEAD request
      // For now, we'll just simulate a delay and assume it's valid
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Redirect to the live demo page
      trackEvent("inline_demo_redirect", { url })
      window.location.href = `/live-demo?url=${encodeURIComponent(url)}&utm_source=home_inline`
    } catch (error) {
      showError("We couldn't validate this URL. Please try another Shopify page.")
      trackEvent("inline_demo_invalid", { reason: "validation_failed", url })
      setIsValidating(false)
    }
  }

  // Show error toast
  const showError = (message: string) => {
    setErrorMessage(message)
    setShowToast(true)
    trackEvent("inline_demo_invalid", { reason: "invalid_url", url })

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setShowToast(false)
    }, 5000)
  }

  // Handle toast dismiss
  const dismissToast = () => {
    setShowToast(false)
  }

  // Intersection Observer for fade-in effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Add shake animation to globals.css
  useEffect(() => {
    const style = document.createElement("style")
    style.innerHTML = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
      }
      .animate-shake {
        animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`bg-gray-50 py-16 md:py-20 lg:py-24 px-4 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      id="inline-demo"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-semibold text-center">
          Watch Garrio Answer Your Shoppers in 30 Seconds
        </h2>
        <p className="text-base text-gray-600 mt-2 mb-8 text-center">
          Paste any Shopify product URL (or try one below) and see instant AI + human support.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-2 lg:gap-2 mb-4">
          <div className="flex-grow lg:w-3/5">
            <input
              ref={inputRef}
              type="url"
              value={url}
              onChange={handleUrlChange}
              placeholder="https://yourstore.com/products/..."
              className="w-full h-14 px-5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600 transition-shadow duration-150"
              aria-label="Shopify product URL"
              style={
                {
                  "--track-color": "#e5e7eb",
                  "--thumb-color": "#6366F1",
                } as React.CSSProperties
              }
            />
          </div>
          <button
            type="submit"
            disabled={!isValidUrl || isValidating}
            className="h-14 px-6 rounded-lg font-medium bg-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-100 hover:scale-102 hover:shadow-md lg:w-2/5"
            aria-disabled={!isValidUrl || isValidating}
          >
            {isValidating ? (
              <span className="flex items-center justify-center">
                <Loader2Icon className="animate-spin mr-2 h-5 w-5" />
                Launching...
              </span>
            ) : (
              "Start Demo"
            )}
          </button>
        </form>

        <div className="flex flex-wrap gap-2 justify-center">
          {EXAMPLE_CHIPS.map((chip, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleChipClick(chip.url)}
              className="inline-flex items-center h-8 px-3 text-sm rounded-full bg-purple-600/10 text-purple-600 hover:bg-purple-600/20 transition-colors"
              aria-pressed={url === chip.url}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Toast */}
      {showToast && (
        <div
          role="alert"
          aria-live="assertive"
          className="fixed bottom-6 inset-x-4 md:inset-x-auto md:right-8 bg-red-50 text-red-700 rounded-md px-4 py-3 shadow-lg flex items-center justify-between"
        >
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={dismissToast}
            className="ml-4 text-red-500 hover:text-red-700"
            aria-label="Dismiss error message"
          >
            &times;
          </button>
        </div>
      )}
    </section>
  )
}
