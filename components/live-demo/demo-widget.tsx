"use client"

import { useEffect, useRef } from "react"

interface DemoWidgetProps {
  pageData: any
}

export default function DemoWidget({ pageData }: DemoWidgetProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    // Create the script element with the LOAD object
    if (!scriptRef.current) {
      scriptRef.current = document.createElement("script")
      scriptRef.current.id = "garrio-load"
      scriptRef.current.text = `
        window.LOAD = {
          context: ${JSON.stringify(pageData)},
          meta: { 
            source: "live-demo", 
            timestamp: "${new Date().toISOString()}" 
          }
        };
      `

      // Insert the script before the iframe
      if (iframeRef.current && iframeRef.current.parentNode) {
        iframeRef.current.parentNode.insertBefore(scriptRef.current, iframeRef.current)
      }
    }

    return () => {
      // Clean up script on unmount
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current)
        scriptRef.current = null
      }
    }
  }, [pageData])

  return (
    <div className="w-full h-[calc(100vh-72px)]">
      <iframe
        ref={iframeRef}
        src="https://widget.garrio.com/demo"
        className="w-full h-full border-0"
        title="Garrio Chat Demo"
        allow="clipboard-write"
        aria-label="Garrio Chat Demo Widget"
      ></iframe>
    </div>
  )
}
