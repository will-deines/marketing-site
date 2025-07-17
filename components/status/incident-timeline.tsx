"use client"

import { useState } from "react"
import type { Incident } from "./status-page"
import { ChevronDown, AlertTriangle, AlertOctagon, CheckCircle, Clock } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

type IncidentTimelineProps = {
  incidents: Incident[]
  timeFilter: "today" | "7d" | "30d"
  onFilterChange: (filter: "today" | "7d" | "30d") => void
}

export default function IncidentTimeline({ incidents, timeFilter, onFilterChange }: IncidentTimelineProps) {
  const [expandedIncidents, setExpandedIncidents] = useState<string[]>([])

  // Filter incidents based on the selected time range
  const filteredIncidents = incidents.filter((incident) => {
    const incidentDate = new Date(incident.created)
    const now = new Date()

    switch (timeFilter) {
      case "today":
        return incidentDate.toDateString() === now.toDateString()
      case "7d":
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(now.getDate() - 7)
        return incidentDate >= sevenDaysAgo
      case "30d":
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(now.getDate() - 30)
        return incidentDate >= thirtyDaysAgo
      default:
        return true
    }
  })

  const toggleIncident = (id: string) => {
    setExpandedIncidents((prev) => (prev.includes(id) ? prev.filter((incidentId) => incidentId !== id) : [...prev, id]))

    if (!expandedIncidents.includes(id)) {
      trackEvent("status_incident_expand", { incident_id: id })
    }
  }

  const getImpactIcon = (impact: Incident["impact"]) => {
    switch (impact) {
      case "critical":
        return <AlertOctagon className="h-5 w-5 text-red-500" />
      case "major":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "minor":
        return <AlertTriangle className="h-5 w-5 text-amber-300" />
      default:
        return <CheckCircle className="h-5 w-5 text-emerald-500" />
    }
  }

  const getStatusIcon = (status: Incident["status"]) => {
    switch (status) {
      case "investigating":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "identified":
        return <AlertTriangle className="h-4 w-4 text-amber-400" />
      case "monitoring":
        return <AlertTriangle className="h-4 w-4 text-blue-500" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      default:
        return <Clock className="h-4 w-4 text-amber-500" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getImpactText = (impact: Incident["impact"]) => {
    switch (impact) {
      case "critical":
        return "Critical"
      case "major":
        return "Major"
      case "minor":
        return "Minor"
      default:
        return "None"
    }
  }

  const getStatusText = (status: Incident["status"]) => {
    switch (status) {
      case "investigating":
        return "Investigating"
      case "identified":
        return "Identified"
      case "monitoring":
        return "Monitoring"
      case "resolved":
        return "Resolved"
      default:
        return "Investigating"
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Incident Timeline</h2>

        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              timeFilter === "today" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => onFilterChange("today")}
          >
            Today
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              timeFilter === "7d" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => onFilterChange("7d")}
          >
            Past 7d
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              timeFilter === "30d" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => onFilterChange("30d")}
          >
            30d
          </button>
        </div>
      </div>

      {filteredIncidents.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No incidents reported in this time period.</div>
      ) : (
        <div className="space-y-4">
          {filteredIncidents.map((incident) => (
            <div key={incident.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => toggleIncident(incident.id)}
                aria-expanded={expandedIncidents.includes(incident.id)}
                aria-controls={`incident-details-${incident.id}`}
              >
                <div className="flex items-center">
                  {getImpactIcon(incident.impact)}
                  <div className="ml-3">
                    <h3 className="font-medium">{incident.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span className="mr-3">{formatDate(incident.created)}</span>
                      <span className="flex items-center">
                        {getStatusIcon(incident.status)}
                        <span className="ml-1">{getStatusText(incident.status)}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs mr-3 ${
                      incident.impact === "critical"
                        ? "bg-red-100 text-red-800"
                        : incident.impact === "major"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {getImpactText(incident.impact)}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      expandedIncidents.includes(incident.id) ? "transform rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {expandedIncidents.includes(incident.id) && (
                <div id={`incident-details-${incident.id}`} className="px-4 pb-4 animate-fade">
                  <div className="border-t border-gray-200 pt-4">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Affected Components</h4>
                      <div className="flex flex-wrap gap-2">
                        {incident.components.map((component) => (
                          <span key={component} className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-700">
                            {component}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Timeline</h4>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="min-w-[120px] text-xs text-gray-500">{formatDate(incident.created)}</div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-amber-500 mr-1" />
                            <span className="text-sm">Detected</span>
                          </div>
                        </div>

                        {incident.status === "resolved" && incident.resolved && (
                          <div className="flex items-start">
                            <div className="min-w-[120px] text-xs text-gray-500">{formatDate(incident.resolved)}</div>
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-emerald-500 mr-1" />
                              <span className="text-sm">Resolved</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Updates</h4>
                      <div className="space-y-4">
                        {incident.notes.map((note, index) => (
                          <div key={index} className="text-sm">
                            <div className="text-xs text-gray-500 mb-1">{formatDate(note.timestamp)}</div>
                            <div className="prose prose-sm max-w-none">{note.content}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
