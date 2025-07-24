"use client"

import type React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function EmptyState() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real implementation, you would call your API
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, source: 'blog-empty-state' }),
      // });

      setIsSuccess(true)
      setEmail("")
    } catch (error) {
      console.error("Failed to subscribe:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
      <h2 className="text-xl font-bold mb-3">No guides yet—subscribe for updates.</h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        We&apos;re working on new content for this category. Subscribe to be notified when new guides are published.
      </p>

      {isSuccess ? (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg max-w-md mx-auto">
          Thanks for subscribing! We&apos;ll notify you when new content is available.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      )}
    </div>
  )
}
