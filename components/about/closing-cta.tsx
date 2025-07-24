"use client"

import { Play, Sparkles, ArrowRight, Star, Zap, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"


export default function ClosingCTA() {
  const [showModal, setShowModal] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById('cta-section')?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    const element = document.getElementById('cta-section')
    element?.addEventListener('mousemove', handleMouseMove)
    return () => element?.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section id="cta-section" className="relative w-full py-20 md:py-28 overflow-hidden">
      {/* Multi-layer gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-700 to-pink-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_120%,rgba(219,39,119,0.4),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_80%_-20%,rgba(147,51,234,0.4),transparent)]" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* Floating elements that follow mouse */}
      <div 
        className="absolute pointer-events-none"
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.3s ease-out'
        }}
      >
        <div className="w-20 h-20 bg-white/10 rounded-full blur-xl" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10">
        <Star className="w-6 h-6 text-white/20 animate-pulse" />
      </div>
      <div className="absolute top-20 right-20">
        <Sparkles className="w-8 h-8 text-white/20 animate-spin-slow" />
      </div>
      <div className="absolute bottom-20 left-20">
        <Zap className="w-6 h-6 text-white/20 animate-pulse delay-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium text-white">Join 10,000+ merchants</span>
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </div>

          {/* Heading with gradient animation */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to 
            <span className="relative">
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"> reclaim your weekends</span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 rounded-full opacity-80" />
            </span>
            ?
          </h2>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
            Join thousands of Shopify merchants who&apos;ve transformed their customer support experience with AI-powered automation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="group relative bg-white text-purple-900 hover:bg-white/95 text-lg px-8 py-6 h-auto shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300 overflow-hidden" 
              asChild
            >
              <Link href="https://apps.shopify.com/app-installation" target="_blank" rel="noopener noreferrer">
                <span className="relative z-10 flex items-center">
                  Install Free on Shopify
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50 text-lg px-8 py-6 h-auto transform hover:scale-105 transition-all duration-300"
              onClick={() => setShowModal(true)}
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> 
              Watch 2-min demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span>4.9/5 on Shopify</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/30" />
            <span>No credit card required</span>
            <div className="hidden sm:block w-px h-4 bg-white/30" />
            <span>Setup in 5 minutes</span>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="relative bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl transform scale-100 animate-modal-enter">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <button
              className="absolute top-4 right-4 text-white bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300 z-10 group"
              onClick={() => setShowModal(false)}
              aria-label="Close video"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>
            <div className="aspect-video bg-black">
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

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-3deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes modal-enter {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        .animate-modal-enter {
          animation: modal-enter 0.3s ease-out forwards;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </section>
  )
}
