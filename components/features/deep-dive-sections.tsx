"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Zap,
  Users,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

export default function DeepDiveSections() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionsRef.current.findIndex(
            (ref) => ref === entry.target,
          );
          if (index !== -1 && entry.isIntersecting) {
            setVisibleSections((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.2 },
    );

    const currentSections = sectionsRef.current;
    currentSections.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentSections.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            Deep Dive
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Three things that matter most
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              to your customers
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Fast answers, personal attention, and feeling like they&apos;re
            shopping with someone who truly gets their style.
          </p>
        </div>

        {/* Section 1: Instant, Personal Answers */}
        <div
          id="instant-answers"
          ref={(el) => (sectionsRef.current[0] = el)}
          className={`flex flex-col lg:flex-row items-center gap-12 mb-32 transition-all duration-1000 ${
            visibleSections[0]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Instant Intelligence
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
              &quot;Does this come in a size small?&quot;
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                gets answered instantly
              </span>
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Your customers get immediate answers about sizing, colors,
              shipping, and availability—24/7, even while you&apos;re designing
              your next collection or taking a well-deserved break. It knows
              everything about your products, just like you do.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-xl flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-gray-700">
                  Knows which colors are selling fast and suggests alternatives
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-xl flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-gray-700">
                  Explains your sizing guide clearly with personalized
                  recommendations
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-xl flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-gray-700">
                  Shares your brand story naturally while building connections
                </span>
              </li>
            </ul>
            <div className="inline-flex items-center gap-2 text-blue-600 font-semibold group cursor-pointer">
              <span>See it in action</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative">
              {/* Decorative background elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-2 border border-blue-100">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <picture>
                    <source
                      media="(max-width: 767px)"
                      srcSet="/images/ai-chat-blurred-mobile.avif"
                      type="image/avif"
                    />
                    <source
                      media="(max-width: 767px)"
                      srcSet="/images/ai-chat-blurred-mobile.webp"
                      type="image/webp"
                    />
                    <source
                      media="(max-width: 767px)"
                      srcSet="/images/ai-chat-blurred-mobile.jpg"
                      type="image/jpeg"
                    />
                    <source
                      media="(max-width: 1023px)"
                      srcSet="/images/ai-chat-blurred-tablet.avif"
                      type="image/avif"
                    />
                    <source
                      media="(max-width: 1023px)"
                      srcSet="/images/ai-chat-blurred-tablet.webp"
                      type="image/webp"
                    />
                    <source
                      media="(max-width: 1023px)"
                      srcSet="/images/ai-chat-blurred-tablet.jpg"
                      type="image/jpeg"
                    />
                    <source
                      srcSet="/images/ai-chat-blurred.avif"
                      type="image/avif"
                    />
                    <source
                      srcSet="/images/ai-chat-blurred.webp"
                      type="image/webp"
                    />
                    <img
                      src="/images/ai-chat-blurred.jpg"
                      alt="AI chat interface showing instant responses to product questions"
                      className="w-full h-full object-cover"
                    />
                  </picture>
                </div>
                {/* Floating stat badge */}
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-xl">
                  <div className="text-2xl font-bold">15 sec</div>
                  <div className="text-sm opacity-90">avg response</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Complex Problems Get Real People */}
        <div
          id="human-support"
          ref={(el) => (sectionsRef.current[1] = el)}
          className={`flex flex-col lg:flex-row-reverse items-center gap-12 mb-32 transition-all duration-1000 ${
            visibleSections[1]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Human Expertise
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
              When something goes wrong,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                real people step in
              </span>
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Damaged items, special requests, or angry customers? A real human
              who knows your brand takes over immediately. Your customers never
              feel abandoned or stuck with a robot.
            </p>

            {/* Testimonial card */}
            <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden mb-8">
              <div className="absolute top-0 right-0 text-purple-200 opacity-10">
                <svg
                  className="w-32 h-32"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div className="relative z-10">
                <p className="text-xl font-medium mb-4 leading-relaxed">
                  &quot;I haven&apos;t touched our support email in three weeks.
                  It&apos;s like having a whole team without the overhead.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold">S</span>
                  </div>
                  <div>
                    <p className="font-semibold">Ryan McCrady</p>
                    <p className="text-sm text-purple-200">HOAst (Services)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">2%</div>
                <div className="text-sm text-gray-600">Need human help</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">5 min</div>
                <div className="text-sm text-gray-600">Avg resolution</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">100%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative">
              {/* Decorative background elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-200 to-pink-200 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-2 border border-purple-100">
                <div className="relative aspect-video rounded-2xl overflow-hidden">
                  <picture>
                    <source
                      media="(max-width: 767px)"
                      srcSet="/images/human-support-mobile.avif"
                      type="image/avif"
                    />
                    <source
                      media="(max-width: 767px)"
                      srcSet="/images/human-support-mobile.webp"
                      type="image/webp"
                    />
                    <source
                      media="(max-width: 767px)"
                      srcSet="/images/human-support-mobile.jpg"
                      type="image/jpeg"
                    />
                    <source
                      media="(max-width: 1023px)"
                      srcSet="/images/human-support-tablet.avif"
                      type="image/avif"
                    />
                    <source
                      media="(max-width: 1023px)"
                      srcSet="/images/human-support-tablet.webp"
                      type="image/webp"
                    />
                    <source
                      media="(max-width: 1023px)"
                      srcSet="/images/human-support-tablet.jpg"
                      type="image/jpeg"
                    />
                    <source
                      srcSet="/images/human-support.avif"
                      type="image/avif"
                    />
                    <source
                      srcSet="/images/human-support.webp"
                      type="image/webp"
                    />
                    <img
                      src="/images/human-support.jpg"
                      alt="Friendly customer support agent helping customers with care and attention"
                      className="w-full h-full object-cover"
                    />
                  </picture>
                </div>
                {/* Floating badge */}
                <div className="absolute -top-4 -left-4 bg-gradient-to-br from-purple-600 to-pink-600 text-white px-4 py-2 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">
                      Human available 24/7
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Every conversation sounds like you wrote it */}
        <div
          id="brand-voice"
          ref={(el) => (sectionsRef.current[2] = el)}
          className={`flex flex-col lg:flex-row items-center gap-12 transition-all duration-1000 ${
            visibleSections[2]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" />
              Brand Alignment
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
              Every conversation sounds like
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                you wrote it yourself
              </span>
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Whether it&apos;s AI or a real person responding, your customers
              always feel like they&apos;re talking to someone who truly
              understands your brand. No robotic responses or generic templates.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-2 rounded-xl flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-gray-700">
                  Matches your brand voice perfectly in every interaction
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-2 rounded-xl flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-gray-700">
                  Suggests products they&apos;ll actually love based on context
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-2 rounded-xl flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-gray-700">
                  Builds lasting relationships, not just transactions
                </span>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative">
              {/* Decorative background elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-emerald-200 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl border border-green-100 overflow-hidden">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 text-white">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></div>
                    <span className="font-medium">Garrio Live Chat</span>
                    <span className="ml-auto text-sm opacity-90">
                      Always Online
                    </span>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-6 space-y-5 bg-gradient-to-br from-gray-50 to-green-50/30 min-h-[350px]">
                  {/* AI Message */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-xs">G</span>
                    </div>
                    <div className="flex-1">
                      <div className="bg-white rounded-2xl rounded-tl-sm p-5 shadow-sm border border-green-100 max-w-[320px]">
                        <p className="text-gray-800 leading-relaxed">
                          I love that you&apos;re drawn to our sustainable
                          collection! That necklace would look stunning with our
                          matching bracelet—both are made from recycled metals.
                          ♻️
                        </p>
                        <div className="text-xs text-gray-500 mt-3 flex items-center gap-2">
                          <span>Just now</span>
                          <span className="text-green-600">• AI Agent</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Message */}
                  <div className="flex items-start space-x-3 justify-end">
                    <div className="flex-1 flex justify-end">
                      <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl rounded-tr-sm p-5 shadow-sm max-w-[320px]">
                        <p className="text-white leading-relaxed">
                          Perfect! I hadn&apos;t seen the bracelet yet. Adding
                          both to my cart now! 🛒
                        </p>
                        <div className="text-xs text-green-100 mt-3 text-right">
                          Just now
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-gray-700 font-bold text-xs">
                        YP
                      </span>
                    </div>
                  </div>

                  {/* Typing Indicator */}
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-xs">G</span>
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm border border-green-100">
                      <div className="flex space-x-1.5">
                        <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2.5 h-2.5 bg-green-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2.5 h-2.5 bg-green-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom stats bar */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-white text-sm">
                  <div className="flex items-center justify-between">
                    <span className="opacity-90">4.9★ Customer Rating</span>
                    <span className="opacity-90">15 sec avg response</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
