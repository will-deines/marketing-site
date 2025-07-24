"use client"

import { CheckCircle, AlertTriangle, AlertOctagon } from "lucide-react"
import { useState } from "react"

import type { Component } from "./status-page"

type ComponentGridProps = {
  components: Component[]
}

export default function ComponentGrid({ components }: ComponentGridProps) {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null)

  const getStatusIcon = (status: Component["status"]) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case "degraded":
        return <AlertTriangle className="h-4 w-4 text-amber-400" />
      case "outage":
        return <AlertOctagon className="h-4 w-4 text-red-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
    }
  }

  const getStatusText = (status: Component["status"]) => {
    switch (status) {
      case "operational":
        return "Operational"
      case "degraded":
        return "Degraded"
      case "outage":
        return "Outage"
      default:
        return "Operational"
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No incidents"

    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Components</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {components.map((component) => (
          <div
            key={component.id}
            className="border border-gray-200 rounded-xl p-4 transition-all duration-250 hover:shadow-lg hover:-translate-y-0.5"
            onMouseEnter={() => setHoveredComponent(component.id)}
            onMouseLeave={() => setHoveredComponent(null)}
            tabIndex={0}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{component.name}</h3>
              <div className="flex items-center">
                {getStatusIcon(component.status)}
                <span className="ml-1 text-sm text-gray-600">{getStatusText(component.status)}</span>
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <span>Latency: {component.latency}ms</span>
              <span>Last incident: {formatDate(component.lastIncidentDate)}</span>
            </div>

            {hoveredComponent === component.id && (
              <div className="mt-2 text-xs bg-gray-50 p-2 rounded-md animate-fade">
                {component.uptime.toFixed(2)}% uptime last 90 days
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
