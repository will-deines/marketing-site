"use client"

import { Rss, Copy, Check } from "lucide-react"
import type React from "react"
import { useState } from "react"

import { trackEvent } from "@/lib/analytics"

export default function SubscribeCTA() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setIsSubmitting(true)

    try {
      // In a real implementation, this would submit to an API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSuccess(true)
      trackEvent("status_subscribe", { method: "email" })

      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail("")
        setIsSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Failed to subscribe:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyWebhookUrl = () => {
    // In a real implementation, this would be the actual webhook URL
    const webhookUrl = "https://status.garrio.com/api/v1/webhooks/incidents"

    navigator.clipboard.writeText(webhookUrl)
    setCopied(true)
    trackEvent("status_webhook_copied")

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-[hsl(var(--brand-primary)/0.1)] rounded-xl p-6 mb-12">
      <h2 className="text-xl font-semibold mb-2">Stay in the loop</h2>
      <p className="text-gray-600 mb-6">Get incident updates by email or RSS.</p>

      <div className="flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-primary))] focus:border-transparent"
              aria-label="Email address"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="bg-[hsl(var(--brand-primary))] text-white px-4 py-2 rounded-r-lg font-medium disabled:opacity-70"
            >
              {isSubmitting ? "Subscribing..." : isSuccess ? "Subscribed!" : "Get Updates"}
            </button>
          </div>
        </form>

        <div className="flex gap-2">
          <a
            href="/status/rss"
            className="flex items-center justify-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            onClick={() => trackEvent("status_subscribe", { method: "rss" })}
            aria-label="Subscribe via RSS"
          >
            <Rss className="h-5 w-5 text-gray-700" />
          </a>

          <button
            onClick={copyWebhookUrl}
            className="flex items-center justify-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors relative"
            aria-label="Copy webhook URL"
          >
            {copied ? <Check className="h-5 w-5 text-emerald-600" /> : <Copy className="h-5 w-5 text-gray-700" />}

            {copied && (
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded animate-fade">
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
