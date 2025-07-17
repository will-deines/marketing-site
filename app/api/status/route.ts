import { NextResponse } from "next/server"

export async function GET() {
  // In a real implementation, this would fetch from the Statuspage API
  // For now, we'll return mock data

  const mockData = {
    status: "operational", // 'operational' | 'degraded' | 'outage'
    components: [
      {
        id: "web-app",
        name: "Web App",
        status: "operational",
        latency: 87,
        lastIncidentDate: null,
        uptime: 99.98,
      },
      {
        id: "chat-runtime",
        name: "Chat Runtime",
        status: "operational",
        latency: 112,
        lastIncidentDate: "2023-04-15T14:32:00Z",
        uptime: 99.95,
      },
      {
        id: "api",
        name: "API",
        status: "operational",
        latency: 95,
        lastIncidentDate: null,
        uptime: 99.99,
      },
      {
        id: "embeddings",
        name: "Embeddings",
        status: "operational",
        latency: 143,
        lastIncidentDate: "2023-03-22T09:15:00Z",
        uptime: 99.92,
      },
      {
        id: "third-party",
        name: "Third-party Integrations",
        status: "operational",
        latency: 156,
        lastIncidentDate: "2023-04-02T18:45:00Z",
        uptime: 99.9,
      },
    ],
    incidents: [
      {
        id: "incident-1",
        title: "Increased Chat Response Latency",
        impact: "minor",
        status: "resolved",
        created: "2023-04-15T14:32:00Z",
        updated: "2023-04-15T16:45:00Z",
        resolved: "2023-04-15T16:45:00Z",
        components: ["Chat Runtime"],
        notes: [
          {
            timestamp: "2023-04-15T14:32:00Z",
            content: "We are investigating reports of increased latency in chat responses.",
          },
          {
            timestamp: "2023-04-15T15:10:00Z",
            content:
              "We have identified the issue as a database connection pool saturation. Our team is working on a fix.",
          },
          {
            timestamp: "2023-04-15T16:45:00Z",
            content:
              "The issue has been resolved. We have increased the connection pool size and implemented better load balancing. All systems are now operating normally.",
          },
        ],
      },
      {
        id: "incident-2",
        title: "Third-party Integration Disruption",
        impact: "minor",
        status: "resolved",
        created: "2023-04-02T18:45:00Z",
        updated: "2023-04-02T20:30:00Z",
        resolved: "2023-04-02T20:30:00Z",
        components: ["Third-party Integrations"],
        notes: [
          {
            timestamp: "2023-04-02T18:45:00Z",
            content: "We are experiencing issues with some third-party integrations. Our team is investigating.",
          },
          {
            timestamp: "2023-04-02T19:15:00Z",
            content:
              "The issue has been identified as an authentication problem with our OAuth provider. We are working with them to resolve the issue.",
          },
          {
            timestamp: "2023-04-02T20:30:00Z",
            content:
              "The authentication issue has been resolved. All third-party integrations are now functioning normally.",
          },
        ],
      },
      {
        id: "incident-3",
        title: "Embedding Service Degradation",
        impact: "major",
        status: "resolved",
        created: "2023-03-22T09:15:00Z",
        updated: "2023-03-22T13:40:00Z",
        resolved: "2023-03-22T13:40:00Z",
        components: ["Embeddings"],
        notes: [
          {
            timestamp: "2023-03-22T09:15:00Z",
            content: "We are investigating reports of slow embedding generation and occasional failures.",
          },
          {
            timestamp: "2023-03-22T10:05:00Z",
            content:
              "We have identified the issue as a resource constraint in our embedding service. We are scaling up capacity to address the problem.",
          },
          {
            timestamp: "2023-03-22T11:30:00Z",
            content:
              "We have deployed additional capacity and are monitoring the service. Performance is improving but not yet at normal levels.",
          },
          {
            timestamp: "2023-03-22T13:40:00Z",
            content:
              "The embedding service is now operating normally. We have implemented auto-scaling to prevent similar issues in the future.",
          },
        ],
      },
    ],
    uptimeData: Array.from({ length: 90 }, (_, i) => {
      // Generate random uptime data for the last 90 days
      // Most days should be close to 100%, with occasional dips
      const date = new Date()
      date.setDate(date.getDate() - (89 - i))

      // Base uptime is high (99.8% to 100%)
      let uptime = 99.8 + Math.random() * 0.2

      // Occasionally add a small dip (1 in 15 chance)
      if (Math.random() < 0.067) {
        uptime = 99.5 + Math.random() * 0.3
      }

      // Very rarely add a larger dip (1 in 90 chance)
      if (Math.random() < 0.011) {
        uptime = 98.5 + Math.random() * 1.0
      }

      return {
        date: date.toISOString().split("T")[0],
        uptime: uptime,
      }
    }),
  }

  return NextResponse.json(mockData)
}
