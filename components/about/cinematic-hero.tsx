"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, ChevronDown, Sparkles, Rocket, Users } from "lucide-react"

export default function CinematicHero() {
  const [isVisible, setIsVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const scrollToStory = () => {
    const storySection = document.getElementById("mission-vision")
    if (storySection) {
      storySection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectFit: "cover" }}
          poster="/images/about-hero.jpg"
        >
          <source src="/videos/about-hero.av1.webm" type="video/webm" />
          <source src="/videos/about-hero.h265.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-indigo-900/80 to-blue-900/70 z-10"></div>
      </div>

      {/* Floating animated icons */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        <div className="absolute top-1/4 left-10 animate-float">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
            <Heart className="w-8 h-8 text-white/80" />
          </div>
        </div>
        <div className="absolute top-1/3 right-20 animate-float animation-delay-400">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
            <Rocket className="w-10 h-10 text-white/80" />
          </div>
        </div>
        <div className="absolute bottom-1/4 left-1/4 animate-float animation-delay-800">
          <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
            <Users className="w-7 h-7 text-white/80" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        <div className="max-w-4xl">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/20 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Our Story
          </div>

          {/* Main content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              You launched to build
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200">
                something that matters
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed max-w-3xl">
              We built Garrio because we know what it&apos;s like to chase your dream, bootstrap a brand, and get buried under &ldquo;Where&rsquo;s my order?&rdquo; messages.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-purple-900 hover:bg-white/90 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 text-lg px-8 py-6 h-auto rounded-2xl font-semibold group"
                onClick={scrollToStory}
              >
                <span className="flex items-center gap-3">
                  Our Story
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm text-lg px-8 py-6 h-auto rounded-2xl font-semibold"
                asChild
              >
                <a href="#careers">Join Our Team</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`} style={{ transitionDelay: "800ms" }}>
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-800 {
          animation-delay: 800ms;
        }
      `}</style>
    </section>
  )
}
