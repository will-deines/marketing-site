"use client";

import { Zap, Heart, Palette, Star, TrendingUp, Clock } from "lucide-react";
import type React from "react";
import { useState, useEffect, useRef } from "react";

interface Result {
  icon: React.ReactNode;
  title: string;
  description: string;
  metric: string;
  metricIcon: React.ReactNode;
  gradient: string;
}

const results: Result[] = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Instant responses",
    description: "Customers get answers immediately, even at 2 AM",
    metric: "15 second avg response",
    metricIcon: <Clock className="w-4 h-4" />,
    gradient: "from-yellow-400 to-orange-400",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Personal touch",
    description: "Every response sounds like it came from you",
    metric: "4.9★ satisfaction",
    metricIcon: <Star className="w-4 h-4" />,
    gradient: "from-pink-400 to-red-400",
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Creative time back",
    description: "Design and create instead of answering repetitive questions",
    metric: "20+ hours saved weekly",
    metricIcon: <TrendingUp className="w-4 h-4" />,
    gradient: "from-purple-400 to-indigo-400",
  },
];

export default function SimpleResults() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  // Auto-cycle through cards
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveCard((prev) => (prev === null || prev === 2 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Powerful Results
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Simple setup,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              transformative outcomes
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            No complex workflows or enterprise training. Just the results you've
            been dreaming of.
          </p>
        </div>

        <div ref={sectionRef} className="max-w-6xl mx-auto">
          {/* Results Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {results.map((result, index) => (
              <div
                key={result.title}
                className={`group relative transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div
                  className={`relative h-full bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform transition-transform duration-300 hover:scale-105 overflow-hidden will-change-transform ${
                    activeCard === index ? "ring-2 ring-indigo-200" : ""
                  }`}
                >
                  {/* Background gradient glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${result.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  <div className="relative p-8 md:p-10 text-center">
                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${result.gradient} rounded-2xl text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {result.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {result.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {result.description}
                    </p>

                    {/* Metric */}
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-50 to-indigo-50 px-6 py-3 rounded-full">
                      <div className="text-indigo-600">{result.metricIcon}</div>
                      <span className="font-semibold text-gray-900">
                        {result.metric}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-white rounded-3xl shadow-xl p-10 md:p-12 max-w-4xl mx-auto border border-indigo-100">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Quote Icon */}
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-2xl">
                    <svg
                      className="w-8 h-8 text-indigo-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <blockquote className="text-xl text-gray-700 mb-4 leading-relaxed">
                    "I went from checking support email every 30 minutes to
                    checking it once a week. My stress dropped, my creativity
                    returned, and my customers are happier than ever."
                  </blockquote>
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Chuck Sillari
                      </p>
                      <p className="text-gray-600">
                        Founder of Mortadella Head
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">
                    $2.3M
                  </div>
                  <div className="text-sm text-gray-600">Annual revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">98%</div>
                  <div className="text-sm text-gray-600">Support automated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">5★</div>
                  <div className="text-sm text-gray-600">Customer rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

