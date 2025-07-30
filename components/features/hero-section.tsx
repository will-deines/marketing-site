"use client";

import { ChevronDown, Sparkles, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

import { Button } from "@/components/ui/button";


export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Restart video every 8 seconds for seamless loop
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const interval = setInterval(() => {
      if (videoElement) {
        videoElement.currentTime = 0;
        videoElement.play();
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Animate timeline in sync with video
  useEffect(() => {
    const videoElement = videoRef.current;
    const timelineElement = timelineRef.current;
    if (!videoElement || !timelineElement) return;

    const handleTimeUpdate = () => {
      const progress = (videoElement.currentTime / videoElement.duration) * 100;
      const steps = timelineElement.querySelectorAll(".timeline-step");

      steps.forEach((step, index) => {
        const stepEl = step as HTMLElement;
        const threshold = (index + 1) * 25;

        if (progress >= threshold) {
          stepEl.classList.add("active");
        } else {
          stepEl.classList.remove("active");
        }
      });
    };

    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    return () =>
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  // Fade in animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("feature-pillars");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-400"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-200"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center min-h-screen relative pt-16">
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
              Moving on from
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200">
                Shopify Inbox?
              </span>
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
            Built for growing brands who deserve better than basic but are too
            smart to overpay.
          </p>

          {/* CTAs */}
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
                Get Your Freedom Back
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm text-sm sm:text-base md:text-lg px-5 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 h-auto rounded-2xl font-semibold"
              onClick={scrollToFeatures}
            >
              See How It Works
              <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 pt-6 sm:pt-8 md:pt-10 text-white/70 text-xs sm:text-sm transition-all duration-1000 delay-800 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>5-minute setup</span>
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
