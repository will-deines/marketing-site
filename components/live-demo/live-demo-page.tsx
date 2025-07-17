"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import UrlForm from "@/components/live-demo/url-form"
import ExampleChips from "@/components/live-demo/example-chips"
import LoadingState from "@/components/live-demo/loading-state"
import DemoWidget from "@/components/live-demo/demo-widget"
import StickyCta from "@/components/live-demo/sticky-cta"
import { parseShopifyUrl } from "@/lib/shopify-parser"
import { trackEvent } from "@/lib/analytics"

// Page states
type PageState = "idle" | "loading" | "demo" | "error"

export default function LiveDemoPage() {
  // State
  const [pageState, setPageState] = useState<PageState>("idle")
  const [url, setUrl] = useState("")
  const [pageData, setPageData] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [minutesSaved, setMinutesSaved] = useState(7)

  // Refs
  const inputRef = useRef<HTMLInputElement>(null)
  const startTime = useRef<number>(0)

  // Hooks
  const { toast } = useToast()
  const router = useRouter()

  // Auto-focus input on page load (desktop only)
  useEffect(() => {
    if (window.innerWidth >= 768 && inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Handle URL submission
  const handleSubmit = async (submittedUrl: string) => {
    // Validate URL format
    if (!submittedUrl.includes("shopify.com") && !submittedUrl.includes("myshopify.com")) {
      toast({
        title: "Invalid URL",
        description: "That page doesn't look like a Shopify store.",
        variant: "destructive",
      })
      trackEvent("live_demo_parse_error", { error_type: "non_shopify_url" })
      return
    }

    // Update state and track event
    setUrl(submittedUrl)
    setPageState("loading")
    startTime.current = Date.now()
    trackEvent("live_demo_url_submit", {
      domain: new URL(submittedUrl).hostname,
      path: new URL(submittedUrl).pathname,
    })

    try {
      // Simulate network request to parse Shopify page
      const data = await parseShopifyUrl(submittedUrl)

      // Track success and timing
      const parseTime = Date.now() - startTime.current
      trackEvent("live_demo_parse_success", { ms_parse: parseTime })

      // Update state with parsed data
      setPageData(data)
      setPageState("demo")

      // Announce to screen readers that demo is loaded
      const announcement = document.createElement("div")
      announcement.setAttribute("role", "status")
      announcement.setAttribute("aria-live", "polite")
      announcement.className = "sr-only"
      announcement.textContent = "Demo loaded, start chatting"
      document.body.appendChild(announcement)

      // Remove announcement after it's read
      setTimeout(() => {
        document.body.removeChild(announcement)
      }, 1000)
    } catch (error: any) {
      // Handle errors
      setPageState("error")
      setErrorMessage(error.message || "An unknown error occurred")

      toast({
        title: "Error",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      })

      trackEvent("live_demo_parse_error", { error_type: error.code || "unknown" })
    }
  }

  // Handle widget events from iframe
  const handleWidgetEvent = (event: MessageEvent) => {
    // Only process messages from our widget
    if (event.origin !== "https://widget.garrio.com") return

    try {
      const data = JSON.parse(event.data)

      if (data.type === "widget_event") {
        trackEvent("live_demo_widget_event", {
          step_id: data.step_id,
          ms_step: data.ms_step,
        })

        // Update minutes saved based on step completion
        if (data.step_id === "resolved") {
          setMinutesSaved(Math.round(data.minutes_saved || 7))
        }
      }
    } catch (e) {
      // Ignore invalid messages
      console.error("Invalid message from widget:", e)
    }
  }

  // Listen for widget events
  useEffect(() => {
    window.addEventListener("message", handleWidgetEvent)
    return () => {
      window.removeEventListener("message", handleWidgetEvent)
    }
  }, [])

  // Handle retry after error
  const handleRetry = () => {
    setPageState("idle")
    setErrorMessage("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Header - hidden in demo state */}
      {pageState !== "demo" && (
        <header className="py-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {pageState === "loading" ? "Fetching page data…" : "Test Garrio on your Shopify page."}
            </h1>
            <p className="text-gray-600">
              {pageState === "loading"
                ? "This will just take a moment..."
                : "Paste any Shopify URL and see Garrio reply in real time."}
            </p>
          </div>
        </header>
      )}

      {/* Main content */}
      <main className={`flex-1 ${pageState === "demo" ? "p-0" : "p-4"}`}>
        {pageState === "idle" && (
          <div className="max-w-xl mx-auto">
            <UrlForm onSubmit={handleSubmit} inputRef={inputRef} />
            <ExampleChips onSelect={setUrl} />
          </div>
        )}

        {pageState === "loading" && <LoadingState />}

        {pageState === "demo" && pageData && <DemoWidget pageData={pageData} />}
      </main>

      {/* Sticky CTA - only visible in demo state */}
      {pageState === "demo" && <StickyCta minutesSaved={minutesSaved} />}

      {/* Toast notifications */}
      <Toaster />
    </div>
  )
}
