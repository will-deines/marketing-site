"use client"

import { useEffect, useState } from "react"
import CurrentSummaryBanner from "./current-summary-banner"
import ComponentGrid from "./component-grid"
import UptimeChart from "./uptime-chart"
import IncidentTimeline from "./incident-timeline"
import SubscribeCTA from "./subscribe-cta"
import StatusFooter from "./status-footer"
import { trackEvent } from "@/lib/analytics"

// Types for our status data
export type SystemStatus = "operational" | "degraded" | "outage"
export type Component = {
  id: string
  name: string
  status: SystemStatus
  latency: number
  lastIncidentDate: string | null
  uptime: number
}
export type Incident = {
  id: string
  title: string
  impact: "none" | "minor" | "major" | "critical"
  status: "investigating" | "identified" | "monitoring" | "resolved"
  created: string
  updated: string
  resolved?: string
  components: string[]
  notes: {
    timestamp: string
    content: string
  }[]
}
export type StatusData = {
  status: SystemStatus
  components: Component[]
  incidents: Incident[]
  uptimeData: { date: string; uptime: number }[]
}

export default function StatusPage() {
  const [statusData, setStatusData] = useState<StatusData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeFilter, setTimeFilter] = useState<"today" | "7d" | "30d">("7d")

  // Fetch status data
  const fetchStatusData = async () => {
    try {
      // In a real implementation, this would fetch from the Statuspage API
      // For now, we'll use mock data
      const response = await fetch("/api/status")
      const data = await response.json()
      setStatusData(data)
    } catch (error) {
      console.error("Failed to fetch status data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch and set up polling
  useEffect(() => {
    fetchStatusData()

    // Poll for updates every 60 seconds
    const interval = setInterval(fetchStatusData, 60000)

    return () => clearInterval(interval)
  }, [])

  // Handle filter change
  const handleFilterChange = (filter: "today" | "7d" | "30d") => {
    setTimeFilter(filter)
    trackEvent("status_filter_change", { filter })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!statusData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">Status Unavailable</h1>
          <p className="text-gray-600">We're having trouble loading the status information. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <CurrentSummaryBanner status={statusData.status} />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-8">Garrio System Status</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ComponentGrid components={statusData.components} />
          <UptimeChart data={statusData.uptimeData} />
        </div>

        <IncidentTimeline
          incidents={statusData.incidents}
          timeFilter={timeFilter}
          onFilterChange={handleFilterChange}
        />

        <SubscribeCTA />
      </main>

      <StatusFooter />
    </div>
  )
}
