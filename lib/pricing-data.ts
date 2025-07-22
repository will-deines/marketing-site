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
    name: "Free Plan",
    price: "$0",
    priceDetail: "forever",
    includedChats: 250,
    extraChatPrice: "$0.10 ea.",
    features: [
      { title: "Live analytics dashboard tracks chat volume & resolutions", included: true },
      { title: "AI feedback loop trains the industry model from your ratings", included: true },
      { title: "Industry-tuned LLM answers, ready out-of-the-box", included: true },
      { title: "Peer community for tips & troubleshooting", included: true },
    ],
    ctaText: "Add for Free",
    ctaLink: "https://apps.shopify.com/app-installation",
    available: true,
  },
  {
    id: "starter",
    name: "Starter Plan",
    price: "$10",
    priceDetail: "credit to start",
    includedChats: 350,
    extraChatPrice: "$0.10 ea.",
    features: [
      { title: "Everything in the Free Plan, plus:", included: true },
      { title: "100 extra chats to help you grow", included: true },
      { title: "Hard cap—never pay more than your spending cap", included: true },
      { title: "Adjust cap anytime for total bill control", included: true },
    ],
    ctaText: "Start for $10",
    ctaLink: "#",
    available: true,
  },
  {
    id: "essentials",
    name: "Essentials Plan",
    badge: "Popular",
    price: "$200",
    priceDetail: "minimum",
    includedChats: 350,
    extraChatPrice: "$1.00 ea.",
    features: [
      { title: "Everything in the Starter Plan, plus:", included: true },
      { title: "Human reps handle AI escalations 24/7", included: true },
      { title: "24 hr email response time; real people on every ticket", included: true },
      { title: "Brand-trained AI fine-tuned to your store data", included: true },
      { title: "Priority email support from our CX team", included: true },
    ],
    ctaText: "Start for $200",
    ctaLink: "#",
    available: true,
    popular: true,
  },
  {
    id: "professional",
    name: "Professional Plan",
    price: "$500",
    priceDetail: "minimum",
    includedChats: 350,
    extraChatPrice: "$1.00 ea.",
    features: [
      { title: "Everything in the Essentials Plan, plus:", included: true },
      { title: "Monthly custom-model refresh keeps answers current", included: true },
      { title: "Agents spot gaps and fast-feed new data to your AI", included: true },
      { title: "Priority response & dedicated success manager", included: true },
    ],
    ctaText: "Start for $500",
    ctaLink: "#",
    available: true,
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
      essentials: "350/mo",
      professional: "350/mo",
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
    id: "analytics",
    name: "Live analytics dashboard",
    plans: {
      free: "Basic tracking",
      starter: "Volume & resolutions",
      essentials: "Advanced metrics",
      professional: "Custom dashboards",
    },
  },
  {
    id: "ai-feedback",
    name: "AI feedback loop",
    description: "Trains industry model from your ratings",
    plans: {
      free: true,
      starter: true,
      essentials: true,
      professional: true,
    },
  },
  {
    id: "human-escalations",
    name: "Human agent escalations",
    plans: {
      free: "No escalations",
      starter: "No escalations", 
      essentials: "24/7 human reps",
      professional: "Priority escalations",
    },
  },
  {
    id: "brand-training",
    name: "Brand-trained AI",
    description: "Fine-tuned to your store data",
    plans: {
      free: false,
      starter: false,
      essentials: "Custom training",
      professional: "Advanced training",
    },
  },
  {
    id: "model-refresh",
    name: "Custom model refresh",
    description: "Monthly updates to keep answers current",
    plans: {
      free: false,
      starter: false,
      essentials: false,
      professional: "Monthly refresh",
    },
  },
  {
    id: "support",
    name: "Support level",
    plans: {
      free: "Community",
      starter: "Community",
      essentials: "Priority email (24hr)",
      professional: "Dedicated manager",
    },
  },
]

export const calculateCost = (chats: number) => {
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
