"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Check, Info, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { plans } from "@/lib/pricing-data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { trackEvent } from "@/lib/analytics";

export default function PricingSectionV2() {
  const [waitlistPlan, setWaitlistPlan] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sort plans in the correct order: Free, Starter, Essentials, Professional
  const sortedPlans = [...plans].sort((a, b) => {
    const order = { free: 0, starter: 1, essentials: 2, professional: 3 };
    return (
      order[a.id as keyof typeof order] - order[b.id as keyof typeof order]
    );
  });

  const openWaitlist = (planId: string) => {
    setWaitlistPlan(planId);
    setIsSubmitted(false);
    document.body.style.overflow = "hidden";

    // Focus the input after a short delay to ensure the modal is visible
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);

    trackEvent("pricing_waitlist_open", { planId });
  };

  const closeWaitlist = () => {
    setWaitlistPlan(null);
    document.body.style.overflow = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !waitlistPlan) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    trackEvent("pricing_waitlist_submit", { planId: waitlistPlan, email });

    // Reset form after 3 seconds
    setTimeout(() => {
      setEmail("");
    }, 3000);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && waitlistPlan) {
        closeWaitlist();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [waitlistPlan]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeWaitlist();
      }
    };

    if (waitlistPlan) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [waitlistPlan]);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-9">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pick Your Plan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Start free and only pay as you grow. Built for founders who need to
            see ROI from day one.
          </p>
        </div>

        {/* Handwritten annotation pointing to popular plan */}
        <div className="relative max-w-6xl mx-auto h-12 mb-3">
          <div className="absolute left-1/2 transform -translate-x-16 z-50">
            <div
              className="text-gray-500 text-base italic transform -rotate-6 px-2 py-1 relative"
              style={{ fontFamily: "Dancing Script, cursive" }}
            >
              Most popular for small brands
              {/* Curved line positioned at the end of the text */}
              <svg
                className="absolute -bottom-8 right-2 w-8 h-8"
                viewBox="0 0 32 32"
                fill="none"
                style={{ transform: "rotate(45deg)" }}
              >
                <path
                  d="M 16 4 A 12 12 0 0 1 28 16"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="4,2"
                  opacity="0.7"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8 max-w-6xl mx-auto">
          {sortedPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 hover:translate-y-[-4px] hover:scale-[1.02] overflow-hidden flex flex-col ${
                plan.popular ? "border border-purple-200" : ""
              }`}
            >
              {/* Plan Label Ribbon */}
              <div
                className={`absolute top-0 left-0 px-4 py-1 text-white text-sm font-medium ${
                  plan.id === "free"
                    ? "bg-purple-600"
                    : plan.id === "starter"
                      ? "bg-indigo-600"
                      : "bg-gray-400"
                }`}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)",
                  paddingRight: "1.5rem",
                }}
              >
                {plan.name}
              </div>

              {/* Corner Triangle - Uses clipping to advantage */}
              {plan.popular && (
                <div
                  className="absolute top-0 right-0 w-[50px] h-[50px] bg-indigo-600"
                  style={{ clipPath: "polygon(100% 0%, 100% 100%, 0% 0%)" }}
                />
              )}

              <div className="p-6 md:p-8 flex flex-col flex-1">
                {/* Price */}
                <div className="mt-6 mb-4">
                  <div className="flex items-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-500 ml-1">
                      {plan.priceDetail}
                    </span>

                    {/* Cost Estimator Tooltip for Starter */}
                    {plan.id === "starter" && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              className="ml-2 text-gray-400 hover:text-gray-600"
                              onClick={() =>
                                trackEvent("pricing_tooltip_open", {
                                  planId: plan.id,
                                })
                              }
                              aria-label="Price information"
                            >
                              <Info size={16} />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-900 text-white text-xs p-3">
                            <p>350 chats cost $10. Extra chats = $0.10 each.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>

                  {/* Usage note */}
                  {plan.extraChatPrice && plan.id !== "free" && (
                    <p className="text-sm text-gray-500 mt-1">
                      +{plan.extraChatPrice} per extra chat
                    </p>
                  )}
                </div>

                {/* Chat Limit Badge */}
                <div className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
                  {plan.includedChats} chats included
                </div>

                {/* Feature List */}
                <ul className="space-y-3 mb-8 text-sm leading-relaxed list-disc pl-4 flex-grow">
                  {plan.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature.title}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                {plan.available ? (
                  <Button
                    className={`w-full ${
                      plan.id === "free"
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "border-purple-600 text-purple-600 hover:bg-purple-50"
                    }`}
                    variant={plan.id === "free" ? "default" : "outline"}
                    asChild
                    onClick={() =>
                      trackEvent("pricing_cta_click", {
                        planId: plan.id,
                        availability: true,
                      })
                    }
                    aria-label={`Start Garrio ${plan.name} Plan`}
                  >
                    <Link
                      href={`${plan.ctaLink}?plan=${plan.id}&utm_source=pricing_strip`}
                    >
                      {plan.id === "free"
                        ? "Add for Free"
                        : `Start for ${plan.price}`}
                    </Link>
                  </Button>
                ) : (
                  <Button
                    className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                    variant="outline"
                    onClick={() => {
                      openWaitlist(plan.id);
                      trackEvent("pricing_cta_click", {
                        planId: plan.id,
                        availability: false,
                      });
                    }}
                    aria-label={`Join waitlist for Garrio ${plan.name} Plan`}
                  >
                    {plan.id === "professional"
                      ? "Talk to Sales"
                      : "Join Waitlist"}{" "}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                )}

                {/* Locked Overlay for Unavailable Plans */}
                {!plan.available && (
                  <div
                    className="absolute inset-0 bg-white/75 backdrop-blur-sm flex items-center justify-center"
                    role="presentation"
                  >
                    <div className="text-gray-500 font-medium bg-white/80 px-4 py-2 rounded-lg shadow-sm">
                      Coming Soon
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 max-w-2xl mx-auto">
            Every plan includes industry-smart AI that learns your business,
            instant Shopify integration, and analytics that matter.
            <br />
            Need something custom?{" "}
            <Link href="#" className="text-purple-600 hover:underline">
              We&apos;ll work with your budget
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Waitlist Modal */}
      {waitlistPlan && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-xl p-6 max-w-md w-full animate-slide-up shadow-xl"
            role="dialog"
            aria-labelledby="waitlist-title"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 id="waitlist-title" className="text-xl font-bold">
                Join the Waitlist
              </h3>
              <button
                onClick={closeWaitlist}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="bg-green-100 text-green-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Check size={32} />
                </div>
                <h4 className="text-xl font-semibold mb-2">
                  You&apos;re on the list!
                </h4>
                <p className="text-gray-600">
                  We&apos;ll notify you as soon as the{" "}
                  {sortedPlans.find((p) => p.id === waitlistPlan)?.name} plan
                  becomes available.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <p className="text-gray-600 mb-4">
                  Be the first to know when our{" "}
                  {sortedPlans.find((p) => p.id === waitlistPlan)?.name} plan
                  launches.
                </p>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email address
                  </label>
                  <input
                    ref={inputRef}
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Join Waitlist"}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
