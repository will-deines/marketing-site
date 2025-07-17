export interface PlanFeature {
  title: string
  included: boolean
}

export interface Plan {
  id: string
  name: string
  badge?: string
  price: string
  priceDetail: string
  includedChats: number
  extraChatPrice: string
  features: PlanFeature[]
  ctaText: string
  ctaLink: string
  available: boolean
  popular?: boolean
}

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    priceDetail: "forever",
    includedChats: 250,
    extraChatPrice: "$0.10 ea.",
    features: [
      { title: "AI-powered chat widget", included: true },
      { title: "Order lookup integration", included: true },
      { title: "Basic analytics dashboard", included: true },
      { title: "1 human-handoff email", included: true },
      { title: "Community support", included: true },
    ],
    ctaText: "Start free",
    ctaLink: "https://apps.shopify.com/app-installation",
    available: true,
  },
  {
    id: "starter",
    name: "Starter",
    badge: "Popular",
    price: "$10",
    priceDetail: "credit to start",
    includedChats: 350,
    extraChatPrice: "$0.10 ea.",
    features: [
      { title: "Everything in Free", included: true },
      { title: "Unlimited human-handoff emails", included: true },
      { title: "Advanced analytics", included: true },
      { title: "Custom branding", included: true },
      { title: "Priority support", included: true },
    ],
    ctaText: "Upgrade in app",
    ctaLink: "#",
    available: true,
    popular: true,
  },
  {
    id: "essentials",
    name: "Essentials",
    badge: "Coming Soon",
    price: "$200",
    priceDetail: "minimum",
    includedChats: 350,
    extraChatPrice: "$1.00 ea.",
    features: [
      { title: "Everything in Starter", included: true },
      { title: "Multiple agent accounts", included: true },
      { title: "Advanced routing rules", included: true },
      { title: "Custom integrations", included: true },
      { title: "24/7 support", included: true },
    ],
    ctaText: "Join waitlist",
    ctaLink: "#",
    available: false,
  },
  {
    id: "professional",
    name: "Professional",
    badge: "Coming Soon",
    price: "$500",
    priceDetail: "minimum",
    includedChats: 1000,
    extraChatPrice: "$1.00 ea.",
    features: [
      { title: "Everything in Essentials", included: true },
      { title: "Custom model refresh", included: true },
      { title: "Enterprise SLA", included: true },
      { title: "Dedicated account manager", included: true },
      { title: "Custom AI training", included: true },
    ],
    ctaText: "Join waitlist",
    ctaLink: "#",
    available: false,
  },
]

export interface ComparisonFeature {
  id: string
  name: string
  description?: string
  plans: {
    [key: string]: boolean | string
  }
}

export const comparisonFeatures: ComparisonFeature[] = [
  {
    id: "chats",
    name: "Chats included",
    plans: {
      free: "250/mo",
      starter: "350/mo",
      essentials: "350/mo + agents",
      professional: "1,000/mo + agents",
    },
  },
  {
    id: "overage",
    name: "Overage rate",
    plans: {
      free: "$0.10/chat",
      starter: "$0.10/chat",
      essentials: "$1.00/chat",
      professional: "$1.00/chat",
    },
  },
  {
    id: "ai-improvement",
    name: "AI improvement loop",
    plans: {
      free: true,
      starter: true,
      essentials: true,
      professional: true,
    },
  },
  {
    id: "analytics",
    name: "Analytics dashboard",
    plans: {
      free: "Basic",
      starter: "Advanced",
      essentials: "Advanced",
      professional: "Custom",
    },
  },
  {
    id: "usage-cap",
    name: "Usage cap controls",
    plans: {
      free: false,
      starter: true,
      essentials: true,
      professional: true,
    },
  },
  {
    id: "human-agent",
    name: "Human-agent escalations",
    plans: {
      free: "1 email",
      starter: "Unlimited",
      essentials: "Unlimited + routing",
      professional: "Unlimited + priority",
    },
  },
  {
    id: "model-refresh",
    name: "Custom model refresh",
    plans: {
      free: false,
      starter: false,
      essentials: false,
      professional: true,
    },
  },
  {
    id: "sla",
    name: "SLA & priority support",
    plans: {
      free: false,
      starter: "Email support",
      essentials: "24/7 support",
      professional: "Dedicated manager",
    },
  },
]

export const calculateCost = (chats: number, plan: "free" | "starter") => {
  const freePlan = plans.find((p) => p.id === "free")!
  const starterPlan = plans.find((p) => p.id === "starter")!

  const freeIncluded = freePlan.includedChats
  const starterIncluded = starterPlan.includedChats

  const overageRate = 0.1 // $0.10 per extra chat

  let freeCost = 0
  let starterCost = 0

  // Calculate free plan cost
  if (chats > freeIncluded) {
    freeCost = (chats - freeIncluded) * overageRate
  }

  // Calculate starter plan cost
  if (chats > starterIncluded) {
    starterCost = (chats - starterIncluded) * overageRate
  }

  return {
    free: freeCost,
    starter: starterCost,
    savings: freeCost - starterCost,
  }
}
