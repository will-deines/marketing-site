"use client"

import { useState } from "react"
import { Heart, Zap, Users, Eye, Palette, Shield, Sparkles } from "lucide-react"

interface Value {
  id: string
  title: string
  description: string
  story: string
  icon: React.ReactNode
  gradient: string
}

const values: Value[] = [
  {
    id: "founder-empathy",
    title: "Founder Empathy",
    description: "We've shipped on 3 AM coffee. Not anymore.",
    story: "Our CEO once missed his anniversary dinner answering support emails. Never again.",
    icon: <Heart className="w-6 h-6" />,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "bias-for-action",
    title: "Bias for Action",
    description: "Done beats perfect — unless it breaks a merchant.",
    story: "We ship features every Friday, but test on our own stores first.",
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: "human-first",
    title: "Human First",
    description: "AI is our tool, not the customer's barrier.",
    story: "Our AI detects frustration and routes to humans before customers ask.",
    icon: <Users className="w-6 h-6" />,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "transparency",
    title: "Transparency",
    description: "Changelog Fridays, public uptime, no hidden fees.",
    story: "We publish our pricing algorithm so merchants can predict their bills.",
    icon: <Eye className="w-6 h-6" />,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "craft",
    title: "Craft",
    description: "Pixels matter. Tone matters. Every chat feels on-brand.",
    story: "We spent 3 weeks perfecting our tone matcher before launch.",
    icon: <Palette className="w-6 h-6" />,
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    id: "ownership",
    title: "Ownership",
    description: "Every teammate can talk to a merchant — and does.",
    story: "Engineers do support rotations to feel the pain points firsthand.",
    icon: <Shield className="w-6 h-6" />,
    gradient: "from-indigo-500 to-purple-500",
  },
]

export default function ValuesGrid() {
  const [flippedCards, setFlippedCards] = useState<string[]>([])

  const toggleCard = (id: string) => {
    setFlippedCards((prev) => (prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]))
  }

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-purple-50 via-white to-indigo-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Core Values
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            What Drives
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Our Team
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The principles that guide every decision, feature, and conversation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div
              key={value.id}
              className={`relative h-80 perspective-1000 cursor-pointer`}
              onClick={() => toggleCard(value.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  toggleCard(value.id)
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={flippedCards.includes(value.id)}
              aria-label={`Value: ${value.title}. Press to reveal story.`}
            >
              <div
                className={`absolute inset-0 w-full h-full transition-all duration-700 transform-style-3d ${
                  flippedCards.includes(value.id) ? "rotate-y-180" : ""
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Front of card */}
                <div className="absolute inset-0 bg-white rounded-3xl p-8 shadow-xl backface-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                  <div className="h-full flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg mb-6`}>
                      {value.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed flex-1">{value.description}</p>
                    
                    <div className="mt-6 text-sm text-purple-600 font-medium bg-purple-50 px-4 py-2 rounded-full">
                      Click to read our story →
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} text-white rounded-3xl p-8 shadow-xl backface-hidden rotate-y-180`}>
                  <div className="h-full flex flex-col items-center text-center justify-center">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 border border-white/30">
                      {value.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                    <p className="text-white/90 text-lg leading-relaxed">{value.story}</p>
                    
                    <div className="mt-6 text-sm text-white/80 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                      Click to flip back
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${value.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  )
}
