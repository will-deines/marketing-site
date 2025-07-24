"use client";

import React from "react";

import { useState } from "react";
import {
  Clock,
  DollarSign,
  Brain,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

interface FeaturePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  highlight: string;
  gradient: string;
}

const featurePillars: FeaturePillar[] = [
  {
    id: "works-for-you",
    title: "24/7 Support Team",
    subtitle: "Always on, so you don't have to be",
    description:
      "Your AI + human team handles everything while you sleep, design, or live your life.",
    icon: <Clock className="h-6 w-6" />,
    features: [
      "Instant responses any time of day",
      "Complex issues escalated to humans",
      "Learns your brand voice perfectly",
    ],
    highlight: "Save 20+ hours weekly",
    gradient: "from-purple-600 to-indigo-600",
  },
  {
    id: "shopify-native",
    title: "Brand Intelligence",
    subtitle: "Knows your business inside out",
    description:
      "Understands your products, policies, and inventory like a seasoned employee.",
    icon: <Brain className="h-6 w-6" />,
    features: [
      "Real-time inventory awareness",
      "Product-specific recommendations",
      "Policy-compliant responses",
    ],
    highlight: "98% accurate responses",
    gradient: "from-blue-600 to-purple-600",
  },
  {
    id: "revenue-engine",
    title: "Revenue Engine",
    subtitle: "Turn questions into sales",
    description:
      "Every support interaction becomes an opportunity to showcase more products.",
    icon: <DollarSign className="h-6 w-6" />,
    features: [
      "Smart product suggestions",
      "Natural upselling in context",
      "Abandoned cart recovery",
    ],
    highlight: "32% revenue increase",
    gradient: "from-green-600 to-emerald-600",
  },
];

export default function FeaturePillars() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation when component mounts
  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="feature-pillars"
      className="py-20 md:py-32 bg-gradient-to-br from-purple-50 via-white to-indigo-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            Core Features
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Customer service that
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              works the way you do
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Because you started your brand to create, not to answer the same
            questions over and over.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featurePillars.map((pillar, index) => (
            <div
              key={pillar.id}
              id={pillar.id}
              className={`group relative transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(pillar.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-full bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                {/* Gradient accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-2"
                  style={{
                    background: pillar.id === "works-for-you"
                      ? "linear-gradient(to right, #9333ea, #6366f1)"
                      : pillar.id === "shopify-native"
                      ? "linear-gradient(to right, #2563eb, #9333ea)"
                      : "linear-gradient(to right, #16a34a, #10b981)"
                  }}
                ></div>

                {/* Hover gradient overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  style={{
                    background: pillar.id === "works-for-you"
                      ? "linear-gradient(to bottom right, #9333ea, #6366f1)"
                      : pillar.id === "shopify-native"
                      ? "linear-gradient(to bottom right, #2563eb, #9333ea)"
                      : "linear-gradient(to bottom right, #16a34a, #10b981)"
                  }}
                ></div>

                <div className="relative p-8 md:p-10">
                  {/* Icon and highlight */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="p-4 rounded-2xl text-white shadow-lg"
                      style={{
                        background: pillar.id === "works-for-you" 
                          ? "linear-gradient(to bottom right, #9333ea, #6366f1)"
                          : pillar.id === "shopify-native"
                          ? "linear-gradient(to bottom right, #2563eb, #9333ea)"
                          : "linear-gradient(to bottom right, #16a34a, #10b981)"
                      }}
                    >
                      {pillar.icon}
                    </div>
                    <div className="text-sm font-semibold">
                      <span 
                        style={{
                          background: pillar.id === "works-for-you"
                            ? "linear-gradient(to right, #9333ea, #6366f1)"
                            : pillar.id === "shopify-native"
                            ? "linear-gradient(to right, #2563eb, #9333ea)"
                            : "linear-gradient(to right, #16a34a, #10b981)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {pillar.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Title and subtitle */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{pillar.subtitle}</p>

                  {/* Description */}
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-3 mb-8">
                    {pillar.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:text-purple-700 transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-lg text-gray-600 mb-8">
            Ready to see how it all works together?
          </p>
          <a
            href="#interactive-flow"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            See it in action
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

