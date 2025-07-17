import type { SystemStatus } from "./status-page"
import { CheckCircle, AlertTriangle, AlertOctagon } from "lucide-react"

type BannerProps = {
  status: SystemStatus
}

export default function CurrentSummaryBanner({ status }: BannerProps) {
  const getBannerContent = () => {
    switch (status) {
      case "operational":
        return {
          icon: <CheckCircle className="h-6 w-6" />,
          text: "All Systems Operational",
          bgColor: "bg-emerald-500",
          textColor: "text-white",
        }
      case "degraded":
        return {
          icon: <AlertTriangle className="h-6 w-6" />,
          text: "Partial Degradation",
          subtext: "Some chat replies may be delayed — we're investigating.",
          bgColor: "bg-amber-400",
          textColor: "text-black",
        }
      case "outage":
        return {
          icon: <AlertOctagon className="h-6 w-6" />,
          text: "Major Outage",
          subtext: "We're experiencing significant issues. Our team is working on a fix.",
          bgColor: "bg-red-500",
          textColor: "text-white",
        }
      default:
        return {
          icon: <CheckCircle className="h-6 w-6" />,
          text: "All Systems Operational",
          bgColor: "bg-emerald-500",
          textColor: "text-white",
        }
    }
  }

  const { icon, text, subtext, bgColor, textColor } = getBannerContent()

  return (
    <div
      className={`w-full ${bgColor} transition-colors duration-250 ease-in-out sticky top-0 z-10`}
      role="status"
      aria-live="polite"
    >
      <div className="container mx-auto px-4 py-3 flex items-center">
        <div className={`mr-2 ${textColor}`}>{icon}</div>
        <div>
          <p className={`font-medium ${textColor}`}>{text}</p>
          {subtext && <p className={`text-sm mt-0.5 ${textColor} opacity-90`}>{subtext}</p>}
        </div>
      </div>
    </div>
  )
}
