"use client";

import {
  Clock,
  DollarSign,
  TrendingUp,
  Zap,
  Calendar,
  Sparkles,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Feature {
  name: string;
  garrio: string;
  competitor: string;
  garrioPositive?: boolean;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    name: "Time back in your week",
    garrio: "20+ hours saved",
    competitor: "More management overhead",
    garrioPositive: true,
    icon: <Clock className="w-5 h-5" />,
  },
  {
    name: "Never miss a sale after hours",
    garrio: "Your team answers instantly 24/7",
    competitor: "Lost revenue when offline",
    garrioPositive: true,
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    name: "Monthly investment",
    garrio: "$200/mo + usage",
    competitor: "$3,000-5,000/mo per person",
    garrioPositive: true,
    icon: <DollarSign className="w-5 h-5" />,
  },
  {
    name: "Turn support into revenue",
    garrio: "Your team suggests perfect upsells",
    competitor: "Support costs, doesn't sell",
    garrioPositive: true,
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    name: "Ready to work today",
    garrio: "5-minute setup",
    competitor: "6-8 weeks to hire & train",
    garrioPositive: true,
    icon: <Zap className="w-5 h-5" />,
  },
  {
    name: "Scales with your growth",
    garrio: "Handle 10x traffic instantly",
    competitor: "Panic hire during busy seasons",
    garrioPositive: true,
    icon: <Calendar className="w-5 h-5" />,
  },
];

export default function ComparisonSnapshotV2() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    const element = document.getElementById("comparison-snapshot");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section
      id="comparison-snapshot"
      className="py-16 md:py-32 bg-gradient-to-br from-green-50 via-white to-emerald-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            The Smart Choice
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Stop drowning, start
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              thriving
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            You're already wearing 10 hats. Let your Garrio team handle customer
            support so you can focus on growing your brand.
          </p>
        </div>

        <div
          className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Column Headers - Desktop Only */}
          <div className="hidden md:grid grid-cols-3 gap-6 mb-8">
            <div></div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl p-6 shadow-xl">
                <h3 className="text-2xl font-bold mb-2">With Garrio</h3>
                <p className="text-green-50">Your business works for you</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 text-gray-700 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-2">Do-It-Yourself</h3>
                <p className="text-gray-500">You work for your business</p>
              </div>
            </div>
          </div>

          {/* Mobile Headers */}
          <div className="md:hidden mb-6">
            <div className="flex gap-2 justify-center">
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Garrio
              </div>
              <div className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                DIY
              </div>
            </div>
          </div>

          {/* Feature Rows */}
          <div className="space-y-4 md:space-y-4">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className={`transition-all duration-500 ${
                  isVisible
                    ? `opacity-100 translate-x-0`
                    : `opacity-0 ${index % 2 === 0 ? "-translate-x-10" : "translate-x-10"}`
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Desktop Layout */}
                <div className="hidden md:grid grid-cols-3 gap-4">
                  {/* Feature Name */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex items-center gap-4">
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-xl text-green-600 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <h4 className="font-semibold text-gray-900 text-lg leading-tight">
                      {feature.name}
                    </h4>
                  </div>

                  {/* Garrio Solution */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur opacity-30 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-green-200 hover:border-green-300 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <p className="font-semibold text-green-700">
                          {feature.garrio}
                        </p>
                      </div>
                      <div className="h-1 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full"></div>
                    </div>
                  </div>

                  {/* DIY Drawback */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3">
                      <XCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <p className="text-gray-600">{feature.competitor}</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Layout - Single Card */}
                <div className="md:hidden bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  {/* Feature Header */}
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-2.5 rounded-lg text-green-600 flex-shrink-0">
                        {feature.icon}
                      </div>
                      <h4 className="font-semibold text-gray-900 text-base leading-tight">
                        {feature.name}
                      </h4>
                    </div>
                  </div>

                  {/* Comparison Content */}
                  <div className="p-4 space-y-3">
                    {/* Garrio */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-green-700 mb-1">
                            Garrio
                          </p>
                          <p className="text-sm text-green-800 font-medium">
                            {feature.garrio}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* DIY */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-gray-500 mb-1">
                            DIY
                          </p>
                          <p className="text-sm text-gray-600">
                            {feature.competitor}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary CTA */}
          <div className="mt-12 md:mt-16 text-center">
            <div className="bg-white/80 backdrop-blur rounded-3xl border border-green-200 p-6 md:p-8 max-w-3xl mx-auto shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                <div className="bg-green-100 p-3 md:p-4 rounded-2xl">
                  <TrendingUp className="w-6 md:w-8 h-6 md:h-8 text-green-600" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                    Ready to reclaim your time?
                  </h3>
                  <p className="text-gray-600 text-base md:text-lg">
                    Join 500+ founders who chose growth over burnout
                  </p>
                </div>
              </div>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                See your potential savings
                <TrendingUp className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
