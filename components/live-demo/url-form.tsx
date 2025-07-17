"use client"

import type React from "react"

import { useState, type RefObject } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface UrlFormProps {
  onSubmit: (url: string) => void
  inputRef: RefObject<HTMLInputElement>
}

export default function UrlForm({ onSubmit, inputRef }: UrlFormProps) {
  const [url, setUrl] = useState("")
  const [isValid, setIsValid] = useState(false)

  // Validate URL as user types
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUrl(value)

    // Basic validation - must be a URL
    try {
      new URL(value)
      setIsValid(true)
    } catch {
      setIsValid(false)
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid) {
      onSubmit(url)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            ref={inputRef}
            type="url"
            placeholder="https://your-store.myshopify.com/products/example"
            value={url}
            onChange={handleUrlChange}
            className="h-12 w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            aria-label="Enter a Shopify URL"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={!isValid}
          className="h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg"
        >
          Start Demo
        </Button>
      </div>
    </form>
  )
}
