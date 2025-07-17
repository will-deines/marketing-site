"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

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
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          style={{ objectFit: "cover" }}
        >
          <source src="/background-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-purple-600/70 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        <div
          className={`max-w-3xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center mb-6">
            <div className="text-white text-xl font-bold">Garrio vs</div>
            <div className="relative h-10 w-32 ml-3">
              <Image
                src={competitor.logo || "/placeholder.svg?height=40&width=120&query=company+logo"}
                alt={competitor.name}
                fill
                className="object-contain object-left"
                style={{ filter: "brightness(0) invert(1)" }} // Make logo white
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Stop answering tickets yourself.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            {competitor.name} gives you a better inbox—we give you your evenings back. Our AI answers routine chats and
            our agents finish the tricky ones, so you never open another ticket.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-white/90" asChild>
              <Link href="https://apps.shopify.com/app-installation" target="_blank" rel="noopener noreferrer">
                Add Garrio Free—1-Click Install
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white/10"
              onClick={() => setShowModal(true)}
            >
              <Play className="mr-2 h-5 w-5" /> See Live Demo
            </Button>
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
