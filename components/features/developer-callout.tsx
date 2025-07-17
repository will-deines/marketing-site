"use client"

import { useEffect, useState, useRef } from "react"

export default function DeveloperCallout() {
  const [typedText, setTypedText] = useState("")
  const codeRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const codeSnippet = `curl -X POST https://api.garrio.ai/v1/actions/check_order \\
  -H "X-Shopify-Store: yours.myshopify.com" \\
  -d '{"order_id":12345}'`

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (codeRef.current) {
      observer.observe(codeRef.current)
    }

    return () => {
      if (codeRef.current) {
        observer.unobserve(codeRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let i = 0
    const typeInterval = setInterval(() => {
      if (i < codeSnippet.length) {
        setTypedText(codeSnippet.substring(0, i + 1))
        i++
      } else {
        clearInterval(typeInterval)
      }
    }, 30)

    return () => clearInterval(typeInterval)
  }, [isVisible, codeSnippet])

  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-4">For Developers</h3>
          <div ref={codeRef} className="bg-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-green-400">{typedText}</pre>
          </div>
          <p className="mt-4 text-gray-300">Open API & webhooks for custom flows.</p>
        </div>
      </div>
    </section>
  )
}
