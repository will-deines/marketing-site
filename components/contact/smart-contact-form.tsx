"use client"

import { Check, Loader2, Upload } from "lucide-react"
import Link from "next/link"
import type React from "react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

import { trackEvent } from "@/lib/analytics"


type FormData = {
  name: string
  email: string
  storeUrl?: string
  topic: string
  message: string
  website?: string // honeypot
}

export default function SmartContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [fileAttachment, setFileAttachment] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [charCount, setCharCount] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>()
  const topic = watch("topic")
  const message = watch("message")

  useEffect(() => {
    if (message) {
      setCharCount(message.length)
    } else {
      setCharCount(0)
    }
  }, [message])

  const onSubmit = async (data: FormData) => {
    // Check honeypot
    if (data.website) {
      console.log("Bot detected")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call

      // Track event
      trackEvent("contact_submit", {
        topic: data.topic,
        hasStoreURL: !!data.storeUrl,
      })

      // Reset form and show success
      reset()
      setFileAttachment(null)
      setIsSuccess(true)
      setIsSubmitting(false)
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsSubmitting(false)
      // Show error toast (would implement with a toast library)
      alert("There was an error submitting your form. Please try again.")
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFileError(null)

    if (!file) return

    // Check file type
    const validTypes = ["image/jpeg", "image/png", "application/pdf"]
    if (!validTypes.includes(file.type)) {
      setFileError("Please upload a PNG, JPG, or PDF file")
      return
    }

    // Check file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File must be less than 5MB")
      return
    }

    setFileAttachment(file)
  }

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    trackEvent("contact_topic_select", { topic: e.target.value })
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-purple-100 animate-fade-in-up">
      {isSuccess ? (
        <div
          className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 text-center animate-fade-in-up"
          aria-live="polite"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl shadow-lg mb-6">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Thanks! We&apos;ll be in touch within 24h</h3>
          <p className="text-gray-600 mb-6 text-lg">Meanwhile, why not explore our platform?</p>
          <Link
            href="/features"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Explore Features
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" role="form">
          {/* Honeypot field - hidden from users but bots will fill it */}
          <div className="hidden">
            <input type="text" {...register("website")} tabIndex={-1} aria-hidden="true" />
          </div>

          <div className="space-y-4">
            <div className="form-field-slide-up">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className={`w-full px-5 py-3.5 border ${errors.name ? "border-red-300 focus:ring-red-500" : "border-gray-200 focus:ring-purple-500"} rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 hover:border-purple-300`}
                placeholder="John Doe"
                aria-label="Full name"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="form-field-slide-up-delay-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className={`w-full px-5 py-3.5 border ${errors.email ? "border-red-300 focus:ring-red-500" : "border-gray-200 focus:ring-purple-500"} rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 hover:border-purple-300`}
                placeholder="you@yourstore.com"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-field-slide-up-delay-2">
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                What can we help you with?
              </label>
              <select
                id="topic"
                className={`w-full px-5 py-3.5 border ${errors.topic ? "border-red-300 focus:ring-red-500" : "border-gray-200 focus:ring-purple-500"} rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 hover:border-purple-300 cursor-pointer`}
                aria-invalid={errors.topic ? "true" : "false"}
                aria-describedby={errors.topic ? "topic-error" : undefined}
                {...register("topic", { required: "Please select a topic" })}
                onChange={handleTopicChange}
              >
                <option value="">Select a topic</option>
                <option value="Support">Support</option>
                <option value="Sales">Sales</option>
                <option value="Partnerships">Partnerships</option>
                <option value="Press">Press</option>
                <option value="Other">Other</option>
              </select>
              {errors.topic && (
                <p id="topic-error" className="mt-1 text-sm text-red-600">
                  {errors.topic.message}
                </p>
              )}
            </div>

            {topic === "Support" && (
              <div className="animate-fade form-field-slide-up">
                <label htmlFor="storeUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Shopify Store URL (optional)
                </label>
                <input
                  id="storeUrl"
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition"
                  placeholder="https://mycoolstore.myshopify.com"
                  {...register("storeUrl")}
                />
                <p className="mt-1 text-xs text-gray-500">Helps us provide faster support</p>
              </div>
            )}

            <div className="form-field-slide-up-delay-3">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  rows={5}
                  className={`w-full px-5 py-3.5 border ${errors.message ? "border-red-300 focus:ring-red-500" : "border-gray-200 focus:ring-purple-500"} rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 hover:border-purple-300 resize-none`}
                  placeholder="Tell us what's on your mind…"
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 20,
                      message: "Message must be at least 20 characters",
                    },
                  })}
                ></textarea>
                <div className="absolute bottom-2 right-2 text-xs text-gray-500">{charCount}/20</div>
              </div>
              {errors.message && (
                <p id="message-error" className="mt-1 text-sm text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className="form-field-slide-up-delay-4">
              <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-1">
                Attachment (optional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="attachment"
                      className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="attachment"
                        name="attachment"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png,.pdf"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF up to 5MB</p>
                  {fileAttachment && <p className="text-sm text-indigo-600">{fileAttachment.name}</p>}
                </div>
              </div>
              {fileError && <p className="mt-1 text-sm text-red-600">{fileError}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70 disabled:transform-none form-field-slide-up-delay-4"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      )}
    </div>
  )
}
