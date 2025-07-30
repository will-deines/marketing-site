"use client";

import { Sparkles, MessageCircle, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function FinalCTA() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-400"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main content */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/20">
              <Sparkles className="w-4 h-4" />
              Ready to transform your support?
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Stop losing sales to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200">
                slow support
              </span>
            </h2>

            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
              Join 500+ Shopify stores that turned their support from a cost
              center into a revenue engine.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button
                size="lg"
                className="bg-white text-purple-900 hover:bg-white/90 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 text-lg px-8 py-6 h-auto rounded-2xl font-semibold group"
                asChild
              >
                <Link
                  href="https://apps.shopify.com/garrio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Sparkles className="w-5 h-5" />
                  Start Free Today
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm text-lg px-8 py-6 h-auto rounded-2xl font-semibold group"
                asChild
              >
                <Link
                  href="#"
                  onClick={() =>
                    window.open("https://garrio.ai/demo", "_blank")
                  }
                  className="flex items-center gap-3"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat with our team
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-white/80" />
                <div className="text-3xl font-bold text-white">5 min</div>
              </div>
              <p className="text-white/70">Setup time</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-white/80" />
                <div className="text-3xl font-bold text-white">250 chats</div>
              </div>
              <p className="text-white/70">Free forever</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-white/80" />
                <div className="text-3xl font-bold text-white">98%</div>
              </div>
              <p className="text-white/70">Done for you</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
