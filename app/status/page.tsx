import type { Metadata } from "next"
import StatusPage from "@/components/status/status-page"

export const metadata: Metadata = {
  title: "System Status | Garrio",
  description: "Real-time updates on Garrio platform health, incidents, and uptime metrics.",
}

export default function Status() {
  return <StatusPage />
}
