"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FinalCTA() {
  return (
    <section className="w-full bg-gradient-to-r from-purple-800 to-purple-600 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-0">
            Ready to boost sales for $0 up-front?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-white/90" asChild>
              <Link href="https://apps.shopify.com/app-installation" target="_blank" rel="noopener noreferrer">
                Add Garrio Chat
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="#" onClick={() => window.open("https://garrio.com/demo", "_blank")}>
                Chat with our team
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
