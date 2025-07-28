"use client";

import {
  Sparkles,
  Zap,
  ArrowRight,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

import { Button } from "@/components/ui/button";

export default function HomeHero() {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/homepage-hero.webp"
        >
          <source src="/videos/homepage-hero.av1.webm" type="video/webm" />
          <source src="/videos/homepage-hero.h265.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-indigo-900/80 to-blue-900/70 z-10"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center min-h-screen relative z-20 pt-16">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 py-12 sm:py-16 md:py-20">
          {/* Main headline */}
          <div
            className={`space-y-4 sm:space-y-5 md:space-y-6 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-[2.75rem] leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white sm:leading-[0.9]">
              Build the brand
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200">
                you always
              </span>
              <br />
              dreamed of
            </h1>
          </div>

          {/* Subheadline */}
          <p
            className={`text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Your AI + human support team handles every customer while you focus
            on growth
          </p>

          {/* CTA buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 justify-center pt-4 sm:pt-6 transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Button
              size="lg"
              className="bg-white text-purple-900 hover:bg-white/90 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 text-sm sm:text-base md:text-lg px-5 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 h-auto rounded-2xl font-semibold group"
              asChild
            >
              <Link
                href="https://apps.shopify.com/garrio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3"
              >
                <Zap className="w-4 sm:w-5 h-4 sm:h-5" />
                Start Building Today
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm text-sm sm:text-base md:text-lg px-5 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 h-auto rounded-2xl font-semibold"
              asChild
            >
              <Link href="#how-it-works" className="flex items-center gap-2">
                See How It Works
                <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5" />
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 pt-6 sm:pt-8 md:pt-10 text-white/70 text-xs sm:text-sm transition-all duration-1000 delay-800 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
              <span>5-minute setup</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
              <span>500+ founders trust us</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/70" />
          </div>
        </div>
      </div>
    </section>
  );
}

