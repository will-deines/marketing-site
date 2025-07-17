type EventProps = {
  [key: string]: any
}

export function trackEvent(eventName: string, props?: EventProps) {
  // In a real implementation, this would send events to your analytics provider
  console.log(`[Analytics] Event: ${eventName}`, props)

  // Example implementation for Google Analytics
  if (typeof window !== "undefined" && "gtag" in window) {
    // @ts-ignore
    window.gtag("event", eventName, props)
  }
}
