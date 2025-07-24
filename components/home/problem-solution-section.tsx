"use client";

import {
  Clock,
  MessageSquare,
  TrendingDown,
  TrendingUp,
  Zap,
  Heart,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ProblemSolutionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
      },
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

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-purple-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            The founder's dilemma
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
            You built a{" "}
            <em className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 not-italic">
              brand
            </em>
            <br />
            not a{" "}
            <em
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-orange-600
              not-italic"
            >
              helpdesk
            </em>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Let your Garrio team handle the “Where’s my order?” chaos so you can
            get back to designing, sourcing, and scaling the next sell‑out drop.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Problem Side */}
          <div
            className={`transition-all duration-700 ease-in-out ${
              isInView
                ? "translate-x-0 opacity-100"
                : "-translate-x-20 opacity-0"
            }`}
          >
            <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 border border-red-100 h-full flex flex-col">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-red-100 p-3 sm:p-4 rounded-2xl">
                  <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    The Reality Check
                  </h3>
                  <p className="text-red-600 font-medium text-sm sm:text-base">
                    What's actually happening
                  </p>
                </div>
              </div>

              <div className="space-y-8 flex-1">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 sm:p-6">
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                    Your day looks like this:
                  </h4>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Clock className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">
                          6 AM - 11 PM
                        </p>
                        <p className="text-gray-700">
                          Constantly checking messages, fielding the same
                          questions over and over
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:gap-4">
                      <MessageSquare className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">
                          47 support tickets today
                        </p>
                        <p className="text-gray-700">
                          "Where's my order?" "What's your return policy?" "Can
                          I change my address?"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:gap-4">
                      <Heart className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Zero time for creativity
                        </p>
                        <p className="text-gray-700">
                          That product idea you had? Still in your notes from 3
                          months ago.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 text-white rounded-2xl p-4 sm:p-6">
                  <p className="text-base sm:text-lg italic leading-relaxed">
                    "I built this brand to create something meaningful, but I
                    spend more time answering 'Where's my order?' than actually
                    building the business."
                  </p>
                  <p className="text-gray-400 mt-3 text-sm">
                    — Every founder, every day
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Side */}
          <div
            className={`transition-all duration-700 ease-in-out ${
              isInView
                ? "translate-x-0 opacity-100"
                : "translate-x-20 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 border border-purple-100 h-full flex flex-col">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-purple-100 p-3 sm:p-4 rounded-2xl">
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Get Your Vision Back
                  </h3>
                  <p className="text-purple-600 font-medium text-sm sm:text-base">
                    What's possible with Garrio
                  </p>
                </div>
              </div>

              <div className="space-y-8 flex-1">
                <div className="bg-white/60 backdrop-blur border border-purple-200 rounded-2xl p-4 sm:p-6">
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                    Your new reality:
                  </h4>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          8 hours of pure creative time
                        </p>
                        <p className="text-gray-700">
                          Work on your next product launch while support runs
                          itself
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Zero interruptions
                        </p>
                        <p className="text-gray-700">
                          Every customer question handled instantly,
                          professionally, on-brand
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          More revenue, less effort
                        </p>
                        <p className="text-gray-700">
                          AI catches upsells while you sleep. Human agents
                          handle the complex stuff.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-base sm:text-lg font-semibold mb-2">
                        The transformation
                      </p>
                      <p className="text-sm sm:text-base leading-relaxed opacity-90">
                        Within 48 hours: Your customers get instant, helpful
                        responses. Within 2 weeks: You remember why you started
                        this business in the first place.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA extending from bottom */}
              <div className="mt-8">
                <Link
                  href="https://apps.shopify.com/garrio?utm_source=homepage_problem_solution&utm_medium=cta&utm_campaign=free_install"
                  className="block bg-white/80 backdrop-blur rounded-2xl p-4 sm:p-6 border border-purple-200 hover:bg-white/90 hover:border-purple-300 hover:shadow-lg transition-all duration-200 group cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 text-lg group-hover:text-purple-700 transition-colors">
                        Ready to reclaim your time?
                      </p>
                      <p className="text-gray-600">
                        Start with 250 free interactions
                      </p>
                    </div>
                    <ArrowRight className="w-8 h-8 text-purple-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
