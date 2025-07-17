"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

interface ClosingCtaProps {
  competitorName: string
}

export default function ClosingCta({ competitorName }: ClosingCtaProps) {
  return (
    <section className="w-full bg-gradient-to-r from-purple-800 to-purple-600 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to leave {competitorName} headaches behind?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of Shopify merchants who've transformed their customer support experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-white/90" asChild>
              <Link href="https://apps.shopify.com/app-installation" target="_blank" rel="noopener noreferrer">
                Add Garrio Free—1-Click Install
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="#" onClick={() => window.open("https://garrio.com/demo", "_blank")}>
                <Calendar className="mr-2 h-5 w-5" /> Book a Demo
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
