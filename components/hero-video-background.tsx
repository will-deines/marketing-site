"use client"

import type { ReactNode } from "react";
import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

interface HeroVideoBackgroundProps {
  // Video configuration
  videoSrc: string
  posterSrc?: string
  fallbackImage?: string
  
  // Visual effects
  blur?: "none" | "sm" | "md" | "lg"
  scale?: "none" | "110" | "120" | "150"
  brightness?: "none" | "50" | "75" | "90"
  
  // Overlay configuration
  overlay?: "black" | "purple-gradient" | "purple-solid" | "none"
  overlayOpacity?: "40" | "50" | "60" | "70" | "80"
  
  // Layout
  height?: "screen" | "auto" | string
  className?: string
  
  // Content
  children: ReactNode
  
  // Advanced options
  restartInterval?: number // Restart video every N seconds (like features page)
  intersectionObserver?: boolean // Pause when out of view for battery optimization
  
  // Accessibility
  reducedMotionFallback?: string // Background image for reduced motion users
}

export default function HeroVideoBackground({
  videoSrc,
  posterSrc,
  fallbackImage,
  blur = "none",
  scale = "none", 
  brightness = "none",
  overlay = "black",
  overlayOpacity = "40",
  height = "screen",
  className,
  children,
  restartInterval,
  intersectionObserver = true,
  reducedMotionFallback
}: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Helper function to generate responsive poster URLs
  const getPosterUrls = (basePosterSrc?: string) => {
    if (!basePosterSrc) return null
    
    // Extract the base name from the poster URL (e.g., "/images/homepage-hero.jpg" -> "homepage-hero")
    const match = basePosterSrc.match(/\/images\/(.+)\.jpg$/)
    if (!match) return { desktop: basePosterSrc }
    
    const baseName = match[1]
    return {
      // AVIF versions (best compression)
      mobileAvif: `/images/${baseName}-mobile.avif`,
      tabletAvif: `/images/${baseName}-tablet.avif`,
      desktopAvif: `/images/${baseName}.avif`,
      
      // WebP versions (good compression)
      mobileWebp: `/images/${baseName}-mobile.webp`,
      tabletWebp: `/images/${baseName}-tablet.webp`,
      desktopWebp: `/images/${baseName}.webp`,
      
      // JPEG fallbacks
      mobile: `/images/${baseName}-mobile.jpg`,
      tablet: `/images/${baseName}-tablet.jpg`, 
      desktop: basePosterSrc
    }
  }

  const posterUrls = getPosterUrls(posterSrc)

  // Handle video restart interval (like features page 8-second restart)
  useEffect(() => {
    if (!restartInterval || !videoRef.current) return

    const interval = setInterval(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play()
      }
    }, restartInterval * 1000)

    return () => clearInterval(interval)
  }, [restartInterval])

  // Handle intersection observer for battery optimization
  useEffect(() => {
    if (!intersectionObserver || !videoRef.current || !containerRef.current) return

    const video = videoRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Silently handle play failures
            })
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [intersectionObserver])

  // Build video classes based on props
  const videoClasses = cn(
    "absolute inset-0 w-full h-full object-cover",
    {
      // Blur effects
      "filter blur-sm": blur === "sm",
      "filter blur-md": blur === "md", 
      "filter blur-lg": blur === "lg",
      
      // Scale effects
      "scale-110": scale === "110",
      "scale-120": scale === "120", 
      "scale-150": scale === "150",
      
      // Brightness effects
      "brightness-50": brightness === "50",
      "brightness-75": brightness === "75",
      "brightness-90": brightness === "90",
    }
  )

  // Build overlay classes based on props
  const overlayClasses = cn(
    "absolute inset-0",
    {
      // Black overlays
      [`bg-black/${overlayOpacity}`]: overlay === "black",
      
      // Purple gradient
      "bg-gradient-to-r from-purple-900/80 to-purple-600/70": overlay === "purple-gradient",
      
      // Purple solid
      [`bg-purple-900/${overlayOpacity}`]: overlay === "purple-solid",
    }
  )

  // Build container classes
  const containerClasses = cn(
    "relative w-full flex items-center justify-center overflow-hidden",
    {
      "min-h-screen": height === "screen",
      "h-auto": height === "auto",
    },
    className
  )

  return (
    <section ref={containerRef} className={cn(containerClasses, "hero-video-container")} style={{ height: height !== "screen" && height !== "auto" ? height : undefined }}>
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className={videoClasses}
          style={{ objectFit: "cover" }}
          poster={posterUrls?.desktop || posterSrc}
        >
          <source src={`${videoSrc}.av1.webm`} type="video/webm" />
          <source src={`${videoSrc}.h265.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        
        {/* Overlay */}
        {overlay !== "none" && (
          <div className={cn(overlayClasses, "z-10")} />
        )}
      </div>

      {/* Responsive Poster and Reduced Motion Fallbacks */}
      <style jsx>{`
        .hero-video-container {
          ${posterUrls ? `
            --poster-mobile-avif: url('${posterUrls.mobileAvif}');
            --poster-tablet-avif: url('${posterUrls.tabletAvif}');
            --poster-desktop-avif: url('${posterUrls.desktopAvif}');
            --poster-mobile-webp: url('${posterUrls.mobileWebp}');
            --poster-tablet-webp: url('${posterUrls.tabletWebp}');
            --poster-desktop-webp: url('${posterUrls.desktopWebp}');
            --poster-mobile: url('${posterUrls.mobile}');
            --poster-tablet: url('${posterUrls.tablet}');
            --poster-desktop: url('${posterUrls.desktop}');
          ` : ''}
        }
        
        @supports (background-image: url('data:image/avif;base64,')) {
          @media (prefers-reduced-motion: reduce) {
            .hero-video-container {
              background-image: ${posterUrls ? 'var(--poster-desktop-avif)' : `url('${reducedMotionFallback || fallbackImage || posterSrc}')`};
            }
            
            ${posterUrls ? `
              @media (max-width: 640px) {
                .hero-video-container {
                  background-image: var(--poster-mobile-avif);
                }
              }
              
              @media (min-width: 641px) and (max-width: 1024px) {
                .hero-video-container {
                  background-image: var(--poster-tablet-avif);
                }
              }
            ` : ''}
          }
        }
        
        @supports not (background-image: url('data:image/avif;base64,')) and (background-image: url('data:image/webp;base64,')) {
          @media (prefers-reduced-motion: reduce) {
            .hero-video-container {
              background-image: ${posterUrls ? 'var(--poster-desktop-webp)' : `url('${reducedMotionFallback || fallbackImage || posterSrc}')`};
            }
            
            ${posterUrls ? `
              @media (max-width: 640px) {
                .hero-video-container {
                  background-image: var(--poster-mobile-webp);
                }
              }
              
              @media (min-width: 641px) and (max-width: 1024px) {
                .hero-video-container {
                  background-image: var(--poster-tablet-webp);
                }
              }
            ` : ''}
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .hero-video-container video {
            display: none;
          }
          .hero-video-container {
            background-image: ${posterUrls ? 'var(--poster-desktop)' : `url('${reducedMotionFallback || fallbackImage || posterSrc}')`};
            background-size: cover;
            background-position: center;
          }
          
          ${posterUrls ? `
            @media (max-width: 640px) {
              .hero-video-container {
                background-image: var(--poster-mobile);
              }
            }
            
            @media (min-width: 641px) and (max-width: 1024px) {
              .hero-video-container {
                background-image: var(--poster-tablet);
              }
            }
          ` : ''}
        }
      `}</style>

      {/* Content */}
      <div className="relative z-20 w-full">
        {children}
      </div>
    </section>
  )
}