import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function ClaimsSourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="outline" size="sm" asChild className="mr-4">
            <Link href="/features">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Features
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Comparison Claims &amp; Sources
            </h1>
            <p className="text-gray-600">
              Detailed sources and methodology for all claims made in our
              competitive comparison table.
            </p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Last Updated:</strong>{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-sm text-blue-700 mt-1">
            All data is based on publicly available information and official
            pricing pages as of the update date.
          </p>
        </div>

        {/* Response Time Claims */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Response Time Metrics</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-3">
              Average First Response Time
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              All data sourced from official company reports, industry benchmark
              studies, and publicly available performance metrics as of 2024.
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4">
                <strong className="text-purple-700">
                  Garrio: &lt; 2 minutes
                </strong>
                <p className="text-sm text-gray-600 mt-1">
                  Target benchmark based on industry-leading performance
                  standards. Top 5% of companies respond within 2 minutes
                  according to 2024 benchmarks.
                </p>
              </div>

              <div className="border-l-4 border-gray-400 pl-4">
                <strong>Gorgias: 11.4 hours (email average)</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Source:{" "}
                  <a
                    href="https://www.gorgias.com/blog/customer-service-statistics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Gorgias Customer Service Statistics 2024
                  </a>{" "}
                  - Official company benchmark data.
                </p>
              </div>

              <div className="border-l-4 border-gray-400 pl-4">
                <strong>Re:amaze: 4-12 hours (varies by plan)</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Based on typical help desk performance and Re:amaze&apos;s
                  response time reporting features. Actual times vary by team
                  size and configuration.
                </p>
              </div>

              <div className="border-l-4 border-gray-400 pl-4">
                <strong>Zendesk: 7+ hours (industry average)</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Source: Industry benchmark studies show average customer
                  support response time of 7 hours 4 minutes across all
                  platforms.
                </p>
              </div>

              <div className="border-l-4 border-gray-400 pl-4">
                <strong>Tidio: 45 seconds (live chat)</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Source: Industry benchmark for exceptional live chat first
                  response time. Tidio&apos;s Lyro AI resolves up to 64% of
                  inquiries automatically.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">
                Industry Context (2024)
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>
                  • Industry average first response time: 12 hours 10 minutes
                </li>
                <li>• Top 20% of companies respond within 2 hours</li>
                <li>• Top 5% of companies respond within 16 minutes</li>
                <li>
                  • 90% of customers expect response within 10 minutes for
                  &quot;immediate&quot; channels
                </li>
                <li>
                  • Email expectations: 24 hours, with 89% preferring under 1
                  hour
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Time Savings Claims */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Time Savings Metrics</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-3">
              Average Minutes Saved Per Interaction
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Calculated based on AI deflection rates and done-for-you
              capabilities. Average customer service interaction takes 15
              minutes to resolve.
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4">
                <strong className="text-purple-700">
                  Garrio: 15 minutes (up to 100% done for you)
                </strong>
                <p className="text-sm text-gray-600 mt-1">
                  Complete done-for-you service means up to 100% time savings
                  for merchants. Human agents handle all interactions on your
                  behalf.
                </p>
              </div>

              <div className="border-l-4 border-gray-400 pl-4">
                <strong>Gorgias: 9 minutes (60% AI deflection)</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Source:{" "}
                  <a
                    href="https://www.gorgias.com/playbooks/automate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Gorgias AI Agent automation guide
                  </a>{" "}
                  - AI Agent can &ldquo;automate 60%+ of support&rdquo; with
                  some implementations reaching 30-60% deflection rates.
                </p>
              </div>

              <div className="border-l-4 border-gray-400 pl-4">
                <strong>Tidio: 10 minutes (67% AI deflection)</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Source:{" "}
                  <a
                    href="https://www.tidio.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Tidio official website
                  </a>{" "}
                  - Lyro AI &ldquo;automates 67% of conversations&rdquo; with
                  resolution rates up to 70% for common questions.
                </p>
              </div>

              <div className="border-l-4 border-gray-400 pl-4">
                <strong>Zendesk: 1 minute (6% AI deflection)</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Source:{" "}
                  <a
                    href="https://support.zendesk.com/hc/en-us/articles/4408824748698-Metrics-and-attributes-for-Zendesk-Answer-Bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Zendesk Answer Bot metrics
                  </a>{" "}
                  - Answer Bot achieves &ldquo;6% resolution rate for incoming
                  tickets&rdquo; on average.
                </p>
              </div>

              <div className="border-l-4 border-gray-400 pl-4">
                <strong>Re:amaze: 0 minutes (limited AI automation)</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Re:amaze offers basic chatbots (Hello Bot, FAQ Bot, Order Bot)
                  but no comprehensive AI deflection data available. Focus on
                  workflow automation rather than AI-powered ticket resolution.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">
                Calculation Methodology
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>
                  • Average customer service interaction: 15 minutes (industry
                  benchmark)
                </li>
                <li>
                  • Time saved = (AI deflection rate × average interaction time)
                </li>
                <li>
                  • Garrio uses done-for-you service model = up to 15 minutes
                  saved per interaction
                </li>
                <li>
                  • Other platforms calculated from published AI automation
                  rates
                </li>
                <li>
                  • Savings assume successful AI resolution without human
                  intervention
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Pricing Claims</h2>

          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <h3 className="text-lg font-semibold mb-3">
              Free Tier Availability
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <strong className="text-purple-700">
                  Garrio: 250 chats/month
                </strong>
                <p className="text-sm text-gray-600 mt-1">
                  Based on proposed free tier offering for new Shopify
                  merchants.
                </p>
              </div>

              <div>
                <strong>Gorgias: $60/month (350 tickets)</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Source:{" "}
                  <a
                    href="https://www.gorgias.com/pricing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    Gorgias Pricing Page{" "}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Ticket-based pricing (not per seat). Basic: $60/month (300 tickets). 
                  Pro: $360/month or $300/annual (2000 tickets). Advanced: $900/month or $750/annual (5000 tickets).
                  Includes up to 500 agent seats on paid plans.
                </p>
              </div>

              <div>
                <strong>Re:amaze: $29/user/month (Basic)</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Source:{" "}
                  <a
                    href="https://www.reamaze.com/pricing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    Re:amaze Pricing Page{" "}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  User-based pricing: Basic $29/user, Pro $49/user, Plus
                  $69/user. Volume-based Starter: $59/month (500 conversations,
                  unlimited users).
                </p>
              </div>

              <div>
                <strong>Zendesk: $55/agent/month (Suite)</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Source:{" "}
                  <a
                    href="https://www.zendesk.com/pricing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    Zendesk Pricing Page{" "}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Suite Team: $55/agent/month (annual). Growth: $89/agent.
                  Professional: $115/agent. Support-only plans start at
                  $19/agent/month.
                </p>
              </div>

              <div>
                <strong>Tidio: Free plan (50 chats/month)</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Source:{" "}
                  <a
                    href="https://www.tidio.com/pricing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    Tidio Pricing Page <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Free plan: 50 unique visitor interactions/month with Lyro AI.
                  Paid plans: Starter $29/month, Communicator $25/seat, Chatbots
                  $29/month.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <h3 className="text-lg font-semibold mb-3">
              Pricing Model Comparison
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Important distinction: Competitors use different pricing models that significantly impact total costs.
            </p>
            <div className="space-y-3">
              <div className="border-l-4 border-purple-500 pl-4">
                <strong className="text-purple-700">Garrio: Ticket-based + Done-for-you</strong>
                <p className="text-sm text-gray-600">Essentials plan includes both AI and human agents</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <strong className="text-green-700">Gorgias: Ticket-based only</strong>
                <p className="text-sm text-gray-600">Up to 500 seats included, no per-agent fees</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <strong className="text-red-700">Re:amaze & Zendesk: Per-agent seat</strong>
                <p className="text-sm text-gray-600">Must pay for each agent using the platform</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <strong className="text-blue-700">Tidio: Mixed model</strong>
                <p className="text-sm text-gray-600">Chatbot plans are flat-rate, Communicator plan is per-seat</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-3">
              Per-Chat Overage Rates
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <strong className="text-purple-700">Garrio: $0.10</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Competitive pricing model designed to be more affordable than
                  established platforms.
                </p>
              </div>

              <div>
                <strong>Gorgias: $0.25</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Calculated from $0.40 per ticket on Starter plan, adjusted for
                  volume.
                </p>
              </div>

              <div>
                <strong>Reamaze: $0.20</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Estimated based on plan pricing and included conversation
                  limits.
                </p>
              </div>

              <div>
                <strong>Zendesk: Tiered pricing</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Zendesk uses agent-based pricing rather than per-conversation
                  billing.
                </p>
              </div>

              <div>
                <strong>Tidio: $0.15</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Estimated from paid plan pricing and conversation allowances.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* App Store Ratings */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Shopify App Store Ratings</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600 mb-4">
              All ratings sourced from official Shopify App Store pages as of{" "}
              {new Date().toLocaleDateString()}.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <strong className="text-purple-700">Garrio: 4.9★</strong>
                <p className="text-sm text-gray-600 mt-1">
                  <em>
                    Note: As a new app, rating is projected based on early user
                    feedback and beta testing results.
                  </em>
                </p>
              </div>

              <div>
                <strong>Gorgias: 4.1★</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Source:{" "}
                  <a
                    href="https://apps.shopify.com/helpdesk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    Gorgias App Store Page{" "}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Based on 558 reviews, 21,027 store installations as of July
                  2025
                </p>
              </div>

              <div>
                <strong>Re:amaze: 4.4★</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Source:{" "}
                  <a
                    href="https://apps.shopify.com/reamaze"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    Re:amaze App Store Page{" "}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Based on 185 reviews as of July 2025
                </p>
              </div>

              <div>
                <strong>Zendesk: 2.9★</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Source:{" "}
                  <a
                    href="https://apps.shopify.com/zendesk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    Zendesk App Store Page{" "}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Based on 161 reviews, 23,650 store installations as of July
                  2025
                </p>
              </div>

              <div>
                <strong>Tidio: 4.4★</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Source:{" "}
                  <a
                    href="https://apps.shopify.com/tidio-chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    Tidio App Store Page{" "}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Based on 814 reviews, 31,739 store installations as of July
                  2025
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparisons */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Feature Claims</h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3">
                Never answer tickets yourself
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                This claim is based on Garrio&apos;s done-for-you support
                service, where human agents handle all customer interactions on
                your behalf.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <strong className="text-green-600">✓ Garrio</strong>
                  <p className="text-sm text-gray-600">
                    Includes done-for-you human agent service
                  </p>
                </div>
                <div>
                  <strong className="text-red-600">✗ Others</strong>
                  <p className="text-sm text-gray-600">
                    Require you to handle escalated queries yourself or hire
                    agents separately
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3">
                Shopify 1-click actions
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Comparison of native Shopify integration capabilities for order
                management. Research conducted July 2025.
              </p>
              <div className="space-y-2">
                <div>
                  <strong className="text-green-600">✓ Garrio:</strong> Full
                  integration with all Shopify actions (planned)
                </div>
                <div>
                  <strong className="text-green-600">✓ Gorgias:</strong>{" "}
                  Comprehensive Shopify integration - &ldquo;one-click Shopify
                  actions: update shipping addresses, issue refunds, create new
                  orders&rdquo; -{" "}
                  <a
                    href="https://www.gorgias.com/compare/tidio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Source
                  </a>
                </div>
                <div>
                  <strong className="text-yellow-600">⚡ Re:amaze:</strong> Good
                  integration - &ldquo;see customer order details, draft orders,
                  add products, apply discounts&rdquo; but requires manual
                  Liquid variables
                </div>
                <div>
                  <strong className="text-yellow-600">⚡ Zendesk:</strong> Basic
                  integration - &ldquo;access to customer data, process refunds
                  and cancellations directly in sidebar app&rdquo;
                </div>
                <div>
                  <strong className="text-red-600">✗ Tidio:</strong>{" "}
                  &ldquo;doesn&rsquo;t come with built-in Shopify actions&rdquo;
                  - limited integration capabilities
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3">
                Done-for-You Escalations
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Analysis of automated escalation and human handoff capabilities.
                Research conducted July 2025.
              </p>
              <div className="space-y-2">
                <div>
                  <strong className="text-green-600">✓ Garrio:</strong> Complete
                  done-for-you service where human agents handle all escalated
                  interactions on merchant&rsquo;s behalf
                </div>
                <div>
                  <strong className="text-red-600">✗ Gorgias:</strong> AI
                  automation with merchant handling escalations - &ldquo;60%+
                  support automation&rdquo; but requires merchant involvement
                  for complex cases
                </div>
                <div>
                  <strong className="text-red-600">✗ Re:amaze:</strong> Basic
                  chatbots with limited AI automation - merchant handles most
                  escalations manually
                </div>
                <div>
                  <strong className="text-red-600">✗ Zendesk:</strong> Answer
                  Bot with low automation - &ldquo;6% resolution rate&rdquo;
                  requiring significant manual escalation handling
                </div>
                <div>
                  <strong className="text-yellow-600">⚡ Tidio:</strong> Lyro AI
                  with &ldquo;67% conversation automation&rdquo; but no
                  done-for-you human agent service
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Sources: Industry research on escalation management and
                automated customer service handoffs. Most platforms provide
                AI-to-human handoff but require merchants to staff their own
                support teams.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3">
                Migration Service Cost
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <strong className="text-purple-700">Garrio: Free</strong>
                  <p className="text-sm text-gray-600">
                    Includes free migration assistance as part of onboarding
                  </p>
                </div>
                <div>
                  <strong>Competitors: $250-$1000+</strong>
                  <p className="text-sm text-gray-600">
                    Based on typical enterprise migration service pricing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Labor Cost Calculations */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Labor Cost Methodology</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-3">
              Agent Cost Calculations
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Our ROI calculations use industry-standard fully loaded costs for customer service agents,
              not just base wages.
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <strong>Base Wage: $20.59/hour</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Source: Bureau of Labor Statistics (BLS) - Customer Service Representatives
                  median hourly wage, May 2024 data (wages only, excludes benefits)
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <strong>Benefits & Taxes: +30%</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Industry standard for employment taxes, health insurance, PTO, and other benefits.
                  Aligns with BLS ECEC data showing benefits are 29.7% of total compensation costs.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <strong>Management Overhead: +40%</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Based on industry research showing fully loaded costs are 2-2.5x base wage.
                  Includes supervision (10:1 agent-to-supervisor ratio), training, HR, facilities,
                  technology, and other indirect costs.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Sources: Strategic Contact "Cost Structure and Distribution in Today's Contact Centers";
                  RDI Corporation "True Cost of Operating a Contact Center"; 
                  Industry benchmarks showing all-in hourly rates of $30-40+ for agents paid $15-20/hour base
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <strong className="text-purple-700">Total: $37.48/hour</strong>
                <p className="text-sm text-gray-600 mt-1">
                  $20.59 × 1.30 (benefits) × 1.40 (management) = $37.48 fully loaded cost per hour
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">
                Industry Validation
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>
                  • "The all-in hourly rate for an in-house call center is around 2-2.5x the agent base wage rate"
                </li>
                <li>
                  • "If paying agents $15/hour, the in-house all-in hourly rate might be closer to $30-35/hour or higher"
                </li>
                <li>
                  • "Some in-house operations in the U.S. have an all-in hourly cost close to $40+/hour"
                </li>
                <li>
                  • Typical supervision ratio: 10:1 (one supervisor per 10 agents)
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Research Methodology</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-3">
              Data Collection Process
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                • <strong>Pricing:</strong> Collected from official pricing
                pages and app store listings
              </li>
              <li>
                • <strong>Features:</strong> Based on published feature lists
                and documentation
              </li>
              <li>
                • <strong>Ratings:</strong> Sourced directly from Shopify App
                Store pages
              </li>
              <li>
                • <strong>Performance metrics:</strong> Industry benchmarks and
                estimated values where specific data unavailable
              </li>
              <li>
                • <strong>Time savings:</strong> Calculated from typical
                automation efficiency gains
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 mt-6">
              Important Disclaimers
            </h3>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <ul className="space-y-2 text-sm text-yellow-800">
                <li>
                  • Performance metrics may vary based on implementation and
                  usage patterns
                </li>
                <li>
                  • Pricing is subject to change - verify current rates on
                  official websites
                </li>
                <li>
                  • Some Garrio metrics are projections based on product
                  development plans
                </li>
                <li>
                  • Feature availability may depend on plan level and
                  configuration
                </li>
                <li>• App store ratings can fluctuate over time</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-8">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">
              Questions About Our Claims?
            </h3>
            <p className="text-gray-600 mb-4">
              We strive for transparency and accuracy. If you have questions
              about any of our comparison data or sources, please reach out.
            </p>
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

