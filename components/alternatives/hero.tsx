"use client"

import { Play, Sparkles, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"


interface HeroProps {
  competitor: {
    name: string
    tagline: string
    logo: string
  }
}

export default function Hero({ competitor }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/product-showcase-mobile.avif" type="image/avif" />
          <source media="(max-width: 767px)" srcSet="/images/product-showcase-mobile.webp" type="image/webp" />
          <source media="(max-width: 767px)" srcSet="/images/product-showcase-mobile.jpg" type="image/jpeg" />
          <source srcSet="/images/product-showcase.avif" type="image/avif" />
          <source srcSet="/images/product-showcase.webp" type="image/webp" />
          <img 
            ref={videoRef}
            src="/images/product-showcase.jpg" 
            alt="Product management dashboard background" 
            className="absolute inset-0 w-full h-full object-cover filter blur-md scale-110 animate-slow-zoom" 
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
        </picture>
        {/* Enhanced Gradient Overlay with animated mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-purple-800/80 to-indigo-900/70 z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent z-10"></div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden z-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-3xl animate-float-slow"></div>
          
          {/* Small floating particles */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-float-particle"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-white/15 rounded-full animate-float-particle-delayed"></div>
          <div className="absolute bottom-40 left-20 w-2 h-2 bg-white/10 rounded-full animate-float-particle-slow"></div>
          <div className="absolute bottom-20 right-10 w-5 h-5 bg-white/25 rounded-full animate-float-particle"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        <div
          className={`max-w-4xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Enhanced Logo Comparison */}
          <div className="flex items-center mb-8 gap-3">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <span className="text-white text-lg font-semibold">Garrio</span>
            </div>
            <span className="text-white/60 text-lg">vs</span>
            <div className="relative h-10 w-32">
              <Image
                src={competitor.logo || "/placeholder.svg?height=40&width=120&query=company+logo"}
                alt={competitor.name}
                fill
                className="object-contain object-left opacity-80"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
          </div>

          {/* Main Headline with enhanced typography */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Stop answering tickets
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-indigo-200">
              yourself.
            </span>
          </h1>
          
          {/* Enhanced Description */}
          <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed max-w-3xl">
            {competitor.name} gives you a better inbox—we give you{" "}
            <span className="text-white font-semibold">your evenings back</span>. Our AI answers routine chats and
            our agents finish the tricky ones, so you never open another ticket.
          </p>

          {/* Enhanced CTA buttons with hover effects */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              size="lg" 
              className="bg-white text-purple-900 hover:bg-white/95 hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl group px-8 py-6 text-lg font-semibold" 
              asChild
            >
              <Link href="https://apps.shopify.com/app-installation" target="_blank" rel="noopener noreferrer">
                <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Add Garrio Free—1-Click Install
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/5 backdrop-blur-sm border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-200 px-8 py-6 text-lg"
              onClick={() => setShowModal(true)}
            >
              <Play className="mr-2 h-5 w-5" /> See Live Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Setup in 60 seconds</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative bg-black rounded-lg overflow-hidden max-w-4xl w-full">
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors z-10"
              onClick={() => setShowModal(false)}
              aria-label="Close video"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Garrio Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
