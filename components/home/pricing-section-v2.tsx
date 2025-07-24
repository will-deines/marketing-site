"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  Info,
  ChevronRight,
  X,
  CornerRightDown,
  DollarSign,
  Sparkles,
  ArrowRight,
} from "lucide-react";
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
    <section className="py-20 md:py-32 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <DollarSign className="w-4 h-4" />
            Simple, Transparent Pricing
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Start free, grow with
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              confidence
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Built for founders who need to see ROI from day one. Start with our
            generous free tier, then scale seamlessly as your business grows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8 max-w-6xl mx-auto">
          {sortedPlans.map((plan) => (
            <div key={plan.id} className="relative group">
              {/* Annotation space above each card */}
              <div className="h-6 relative overflow-visible mb-2">
                {plan.popular && (
                  <div className="absolute top-0 right-0 z-50">
                    <div
                      className="text-gray-700 text-lg font-medium italic transform -rotate-6 px-2 py-1 relative whitespace-nowrap transition-transform duration-300 group-hover:-rotate-3"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Most popular for small brands
                      <CornerRightDown
                        className="absolute -bottom-6 right-2 w-6 h-6 text-gray-500 opacity-80 transition-all duration-300 group-hover:rotate-6 group-hover:text-purple-600"
                        style={{ transform: "rotate(15deg)" }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* The actual plan card */}
              <div
                className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-8px] hover:scale-[1.02] overflow-hidden flex flex-col h-full border ${
                  plan.popular
                    ? "border-purple-200 ring-4 ring-purple-100 ring-opacity-50"
                    : "border-gray-100 hover:border-purple-200"
                }`}
              >
                {/* Plan Label Badge */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                        plan.id === "free"
                          ? "bg-purple-100 text-purple-700"
                          : plan.id === "starter"
                            ? "bg-indigo-100 text-indigo-700"
                            : plan.id === "essentials"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {plan.id === "free" && <Sparkles className="w-3 h-3" />}
                      {plan.name}
                    </div>
                  </div>
                  {/* Price */}
                  <div className="mb-8">
                    <div className="text-center mb-4">
                      <div className="inline-flex items-baseline gap-1">
                        {plan.price.includes("$") && (
                          <span className="text-2xl text-gray-600 font-medium">
                            $
                          </span>
                        )}
                        <span className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
                          {plan.price.replace("$", "")}
                        </span>
                        {/* Cost Estimator Tooltip for Starter */}
                        {plan.id === "starter" && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  className="ml-2 text-gray-400 hover:text-purple-600 transition-colors"
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
                              <TooltipContent
                                className="bg-gray-900 text-white text-sm p-4 max-w-xs z-50"
                                side="top"
                                sideOffset={10}
                              >
                                <p>
                                  350 chats cost $10. Extra chats = $0.10 each.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-2 font-medium">
                        {plan.priceDetail}
                      </div>
                    </div>

                    {/* Usage note */}
                    {plan.extraChatPrice && plan.id !== "free" && (
                      <p className="text-sm text-gray-500">
                        +{plan.extraChatPrice} per extra chat
                      </p>
                    )}
                  </div>

                  {/* Chat Limit Badge */}
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 px-4 py-3 rounded-xl mb-6">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-purple-800 font-semibold text-sm">
                        {plan.includedChats.toLocaleString()} chats included
                      </span>
                    </div>
                  </div>

                  {/* Feature List */}
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="bg-green-100 p-1 rounded-full flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 leading-relaxed">
                          {feature.title}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  {plan.available ? (
                    <Button
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 group ${
                        plan.id === "free"
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                          : "border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white bg-white"
                      }`}
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
                        className="flex items-center justify-center gap-2"
                      >
                        {plan.id === "free"
                          ? "Add for Free"
                          : `Start for ${plan.price}`}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      className="w-full py-4 px-6 rounded-xl font-semibold text-lg border-2 border-gray-400 text-gray-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200 group"
                      onClick={() => {
                        openWaitlist(plan.id);
                        trackEvent("pricing_cta_click", {
                          planId: plan.id,
                          availability: false,
                        });
                      }}
                      aria-label={`Join waitlist for Garrio ${plan.name} Plan`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {plan.id === "professional"
                          ? "Talk to Sales"
                          : "Join Waitlist"}
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
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
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="bg-white/60 backdrop-blur rounded-2xl border border-purple-100 p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  What's included in every plan
                </h3>
                <p className="text-gray-600 text-sm">
                  No hidden fees, no surprises
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Industry-smart AI that learns your business</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Instant Shopify integration</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Analytics that actually matter</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Need something custom?{" "}
                <Link
                  href="/contact"
                  className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
                >
                  We'll work with your budget
                </Link>
                .
              </p>
            </div>
          </div>
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
