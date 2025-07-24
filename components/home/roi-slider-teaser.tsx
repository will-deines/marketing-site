"use client";

import { Clock, DollarSign, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import ClaimsModal from "@/components/ui/claims-modal";
import { cn } from "@/lib/utils";

// ROI calculation function - calculates both time and money savings
// Data sourced from /claims-sources - verified industry benchmarks
const calculateSavings = (interactions: number) => {
  const automationRate = 0.98; // 98% automation rate for Garrio (from claims data)
  const avgTimePerInteraction = 15; // minutes per interaction (industry benchmark)
  const agentWage = 14; // USD per hour (from ROI pricing data)

  const automatedInteractions = interactions * automationRate;
  const humanInteractions = interactions * (1 - automationRate);

  // Time savings calculation
  const totalTimeWithoutAI = interactions * avgTimePerInteraction; // minutes
  const timeWithAI = humanInteractions * avgTimePerInteraction; // only human interactions take time
  const timeSaved = totalTimeWithoutAI - timeWithAI; // minutes saved
  const hoursSaved = Math.round(timeSaved / 60); // hours, rounded to nearest whole

  // Money savings calculation
  const costWithoutAI = (totalTimeWithoutAI / 60) * agentWage;
  const costWithAI = (timeWithAI / 60) * agentWage;
  const moneySaved = Math.round(costWithoutAI - costWithAI);

  return {
    hoursSaved,
    moneySaved,
    automatedInteractions: Math.round(automatedInteractions),
  };
};

// Animation utility for smooth number transitions
const animateValue = (
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void,
) => {
  const startTime = performance.now();

  const updateValue = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;

    if (elapsedTime > duration) {
      callback(end);
      return;
    }

    const progress = elapsedTime / duration;
    const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
    const currentValue = Math.round(start + (end - start) * easedProgress);

    callback(currentValue);
    requestAnimationFrame(updateValue);
  };

  requestAnimationFrame(updateValue);
};

export default function ROISliderTeaser() {
  const [interactions, setInteractions] = useState(250);
  const [displayedHours, setDisplayedHours] = useState(0);
  const [displayedMoney, setDisplayedMoney] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousHours = useRef(0);
  const previousMoney = useRef(0);

  // Calculate initial savings on mount
  useEffect(() => {
    const savings = calculateSavings(interactions);
    setDisplayedHours(savings.hoursSaved);
    setDisplayedMoney(savings.moneySaved);
    previousHours.current = savings.hoursSaved;
    previousMoney.current = savings.moneySaved;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- interactions excluded: only for initial calc, updates handled by handleSliderChange with animation

  // Handle slider change with animated transition
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInteractions = Number.parseInt(e.target.value, 10);
    setInteractions(newInteractions);

    const newSavings = calculateSavings(newInteractions);

    // Animate hours saved
    animateValue(previousHours.current, newSavings.hoursSaved, 200, (value) => {
      setDisplayedHours(Math.round(value));
    });

    // Animate money saved
    animateValue(previousMoney.current, newSavings.moneySaved, 200, (value) => {
      setDisplayedMoney(Math.round(value));
    });

    previousHours.current = newSavings.hoursSaved;
    previousMoney.current = newSavings.moneySaved;

    // Track analytics event (debounced)
    const timer = setTimeout(() => {
      console.log("roi_slider_change", {
        interactions: newInteractions,
        hoursSaved: newSavings.hoursSaved,
        moneySaved: newSavings.moneySaved,
      });
    }, 200);

    return () => clearTimeout(timer);
  };

  // Track CTA click
  const handleCTAClick = () => {
    // Analytics tracking
    console.log("roi_teaser_cta_click", {
      interactions: interactions,
      hoursSaved: displayedHours,
      moneySaved: displayedMoney,
    });
  };

  // Intersection Observer for fade-in effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className={cn(
        "bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20 px-4 transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
      )}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            Stop trading time for customer support
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            What if you never had to answer
            <br />
            <span className="text-purple-600">the same question twice?</span>
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            You started a business to build something amazing, not to be a
            full-time customer service rep. See how much time you get back with
            support that actually works.
          </p>
        </div>

        {/* Interactive Calculator */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
          {/* Slider Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <label
                htmlFor="roi-slider"
                className="text-lg font-semibold text-gray-900 block mb-2"
              >
                How many customer questions do you handle each month?
              </label>
              <div className="inline-flex items-center gap-3 bg-purple-50 px-6 py-3 rounded-xl">
                <span className="text-3xl font-bold text-purple-600 tabular-nums">
                  {interactions.toLocaleString()}
                </span>
                <span className="text-gray-600 font-medium">interactions</span>
              </div>
            </div>

            {/* Custom Slider */}
            <div className="relative">
              <input
                type="range"
                id="roi-slider"
                min={50}
                max={2000}
                step={50}
                value={interactions}
                onChange={handleSliderChange}
                className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                aria-valuetext={`${interactions} customer interactions per month`}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-3">
                <span className="font-medium">50</span>
                <span className="font-medium">500</span>
                <span className="font-medium">1,000</span>
                <span className="font-medium">1,500</span>
                <span className="font-medium">2,000+</span>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Time Savings */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 text-center border border-blue-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div
                className="text-4xl md:text-5xl font-bold text-blue-700 mb-2 tabular-nums"
                aria-live="polite"
              >
                {displayedHours}
              </div>
              <p className="text-blue-700 font-semibold text-lg mb-2">
                hours saved
              </p>
              <p className="text-blue-600 text-sm leading-relaxed">
                Time you can spend on product development, marketing, or
                actually taking a break
              </p>
            </div>

            {/* Cost Savings */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 text-center border border-green-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div
                className="text-4xl md:text-5xl font-bold text-green-700 mb-2 tabular-nums"
                aria-live="polite"
              >
                ${displayedMoney}
              </div>
              <p className="text-green-700 font-semibold text-lg mb-2">
                cost saved monthly
              </p>
              <p className="text-green-600 text-sm leading-relaxed">
                Money you save vs. hiring someone to handle customer support
                full-time
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 group"
                asChild
                onClick={handleCTAClick}
                aria-label={`See detailed ROI breakdown with ${interactions} interactions`}
              >
                <Link
                  href={`/roi-calculator?interactions=${interactions}&utm_source=home_roi_teaser`}
                >
                  Get my full savings breakdown
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <ClaimsModal
                title="ROI Calculation Methodology"
                size="md"
                trigger={
                  <button className="text-gray-500 hover:text-gray-700 font-medium text-sm underline underline-offset-4 hover:underline-offset-2 transition-all">
                    How we calculate this
                  </button>
                }
              />
            </div>

            <p className="text-xs text-gray-500 mt-6 flex items-center justify-center gap-2">
              <span>✨ Based on real customer data</span>
              <span>•</span>
              <span>⚡ See results in under 3 minutes</span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #7c3aed;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #7c3aed;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
        }

        .slider::-webkit-slider-track {
          background: linear-gradient(
            to right,
            #7c3aed 0%,
            #7c3aed ${((interactions - 50) / (2000 - 50)) * 100}%,
            #e5e7eb ${((interactions - 50) / (2000 - 50)) * 100}%,
            #e5e7eb 100%
          );
          border-radius: 6px;
        }
      `}</style>
    </section>
  );
}
