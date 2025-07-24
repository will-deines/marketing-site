"use client";

import {
  ChevronLeft,
  ChevronRight,
  Star,
  Shield,
  Trophy,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface Testimonial {
  id: number;
  company: string;
  logo: {
    src: string;
    alt: string;
  };
  person: string;
  plan: string;
  metric: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    company: "HOAst",
    logo: {
      src: "/abstract-urban-threads.png",
      alt: "Brand logo: Mortadella Head",
    },
    person: "Ryan",
    plan: "Enterprise",
    metric: "Response time ↓ 90%",
    quote:
      "Finally, I can focus on building the business intead of answering 'Where's my order?' emails.",
  },
  {
    id: 2,
    company: "Mortadella Head",
    logo: {
      src: "/leafy-eco-circle.png",
      alt: "Brand logo: Mortadella Head",
    },
    person: "Chuck",
    plan: "Free",
    metric: "Sales up 23%",
    quote: "The AI suggests perfect upsells that customers actually buy.",
  },
  {
    id: 3,
    company: "Harbor Hose",
    logo: {
      src: "/abstract-minimal-goods.png",
      alt: "Brand logo: Harbor Hose",
    },
    person: "Mike",
    plan: "Scale",
    metric: "18 hrs saved/week",
    quote:
      "As an entrepreneur, this gave me my evenings back. Setup took minutes.",
  },
];

export default function SocialProofReel() {
  const [isPaused, setIsPaused] = useState(false);
  const [activeQuote, setActiveQuote] = useState<Testimonial | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const centerPointRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Handle marquee animation
  useEffect(() => {
    const topRow = topRowRef.current;
    const bottomRow = bottomRowRef.current;

    if (!topRow || !bottomRow) return;

    if (isPaused || prefersReducedMotion) {
      topRow.style.animationPlayState = "paused";
      bottomRow.style.animationPlayState = "paused";
    } else {
      topRow.style.animationPlayState = "running";
      bottomRow.style.animationPlayState = "running";
    }
  }, [isPaused, prefersReducedMotion]);

  // Check for centered logos and update active quote
  useEffect(() => {
    if (prefersReducedMotion) return;

    const checkCenteredLogo = () => {
      if (isPaused || !centerPointRef.current) return;

      const centerPoint = centerPointRef.current.getBoundingClientRect();
      const centerX = centerPoint.left + centerPoint.width / 2;

      // Get all logo elements
      const logoElements = document.querySelectorAll(".logo-item");

      // Find the closest logo to center
      let closestLogo = null;
      let minDistance = Number.POSITIVE_INFINITY;

      logoElements.forEach((logo) => {
        const rect = logo.getBoundingClientRect();
        const logoCenter = rect.left + rect.width / 2;
        const distance = Math.abs(logoCenter - centerX);

        if (distance < minDistance) {
          minDistance = distance;
          closestLogo = logo;
        }
      });

      // If we found a close logo and it's near the center
      if (closestLogo && minDistance < 50) {
        const logoId = Number.parseInt(
          closestLogo.getAttribute("data-id") || "0",
        );
        const testimonial = testimonials.find((t) => t.id === logoId);
        if (
          testimonial &&
          (!activeQuote || activeQuote.id !== testimonial.id)
        ) {
          setActiveQuote(testimonial);
        }
      }
    };

    const interval = setInterval(checkCenteredLogo, 300);
    return () => clearInterval(interval);
  }, [isPaused, activeQuote, prefersReducedMotion]);

  // Manual navigation for accessibility
  const navigateQuote = (direction: "prev" | "next") => {
    if (!activeQuote) {
      setActiveQuote(testimonials[0]);
      return;
    }

    const currentIndex = testimonials.findIndex((t) => t.id === activeQuote.id);
    let newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % testimonials.length;
    } else {
      newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    }

    setActiveQuote(testimonials[newIndex]);
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-purple-50 via-white to-indigo-50 overflow-hidden">
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Social Proof
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Trusted by founders
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              who get it
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of bootstrapped entrepreneurs who found their freedom
            from customer support chaos.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden bg-white/50 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-100 mx-4 md:mx-8">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Center point reference (invisible) */}
        <div
          ref={centerPointRef}
          className="absolute left-1/2 top-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 z-10"
          aria-hidden="true"
        ></div>

        {/* Top row of logos */}
        <div
          className="flex space-x-16 py-10 logo-row"
          ref={topRowRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {testimonials.concat(testimonials).map((testimonial, index) => (
            <div
              key={`top-${testimonial.id}-${index}`}
              className="logo-item flex-shrink-0 w-36 h-20 relative grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer group"
              data-id={testimonial.id}
              onClick={() => setActiveQuote(testimonial)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveQuote(testimonial);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View testimonial from ${testimonial.company}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Image
                src={testimonial.logo.src || "/placeholder.svg"}
                alt={testimonial.logo.alt}
                fill
                className="object-contain object-center p-4 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Bottom row of logos (reversed direction) */}
        <div
          className="flex space-x-16 py-10 logo-row-reverse border-t border-purple-100"
          ref={bottomRowRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {testimonials
            .concat(testimonials)
            .reverse()
            .map((testimonial, index) => (
              <div
                key={`bottom-${testimonial.id}-${index}`}
                className="logo-item flex-shrink-0 w-36 h-20 relative grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer group"
                data-id={testimonial.id}
                onClick={() => setActiveQuote(testimonial)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveQuote(testimonial);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View testimonial from ${testimonial.company}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Image
                  src={testimonial.logo.src || "/placeholder.svg"}
                  alt={testimonial.logo.alt}
                  fill
                  className="object-contain object-center p-4 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
        </div>

        {/* Testimonial overlay */}
        {activeQuote && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="bg-white backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-lg text-center transform transition-all duration-500 animate-fade-in border border-purple-200"
              aria-live="polite"
            >
              <div className="mb-4">
                <span className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold px-4 py-2 rounded-full text-sm shadow-md">
                  {activeQuote.metric}
                </span>
              </div>
              <p className="text-gray-900 text-xl italic mb-6 leading-relaxed">
                &ldquo;{activeQuote.quote}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold">
                  {activeQuote.person.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    {activeQuote.person}
                  </p>
                  <p className="text-sm text-gray-600">
                    {activeQuote.company} • {activeQuote.plan} Plan
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Manual navigation controls (for accessibility) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          <button
            onClick={() => navigateQuote("prev")}
            className="p-3 bg-white/80 backdrop-blur rounded-full hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-purple-600 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => navigateQuote("next")}
            className="p-3 bg-white/80 backdrop-blur rounded-full hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-purple-600 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .logo-row {
          animation: marquee 40s linear infinite;
        }

        .logo-row-reverse {
          animation: marquee-reverse 45s linear infinite;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </section>
  );
}
