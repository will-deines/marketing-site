"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ClosingCTA() {
  return (
    <section className="w-full bg-gradient-to-r from-purple-800 to-purple-600 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to reclaim your passion?</h2>
          <p className="text-xl text-white/80 mb-8">Get back to what you love most: creating beautiful things your customers can&apos;t wait to buy.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-white/90" asChild>
              <Link href="https://apps.shopify.com/app-installation" target="_blank" rel="noopener noreferrer">
                Start Free Today
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="#" onClick={() => window.open("https://garrio.ai/demo", "_blank")}>
                See How It Works
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
