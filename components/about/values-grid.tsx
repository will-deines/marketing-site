"use client"

import { useState } from "react"

interface Value {
  id: string
  title: string
  description: string
  story: string
}

const values: Value[] = [
  {
    id: "founder-empathy",
    title: "Founder Empathy",
    description: "We've shipped on 3 AM coffee. Not anymore.",
    story: "Our CEO once missed his anniversary dinner answering support emails. Never again.",
  },
  {
    id: "bias-for-action",
    title: "Bias for Action",
    description: "Done beats perfect — unless it breaks a merchant.",
    story: "We ship features every Friday, but test on our own stores first.",
  },
  {
    id: "human-first",
    title: "Human First",
    description: "AI is our tool, not the customer's barrier.",
    story: "Our AI detects frustration and routes to humans before customers ask.",
  },
  {
    id: "transparency",
    title: "Transparency",
    description: "Changelog Fridays, public uptime, no hidden fees.",
    story: "We publish our pricing algorithm so merchants can predict their bills.",
  },
  {
    id: "craft",
    title: "Craft",
    description: "Pixels matter. Tone matters. Every chat feels on-brand.",
    story: "We spent 3 weeks perfecting our tone matcher before launch.",
  },
  {
    id: "ownership",
    title: "Ownership",
    description: "Every teammate can talk to a merchant — and does.",
    story: "Engineers do support rotations to feel the pain points firsthand.",
  },
]

export default function ValuesGrid() {
  const [flippedCards, setFlippedCards] = useState<string[]>([])

  const toggleCard = (id: string) => {
    setFlippedCards((prev) => (prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]))
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Values</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {values.map((value) => (
            <div
              key={value.id}
              className={`relative h-64 perspective-1000 cursor-pointer`}
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
                className={`absolute inset-0 w-full h-full transition-all duration-500 transform-style-3d ${
                  flippedCards.includes(value.id) ? "rotate-y-180" : ""
                }`}
              >
                {/* Front of card */}
                <div className="absolute inset-0 bg-white rounded-xl border border-gray-200 p-6 shadow-md backface-hidden">
                  <div className="h-full flex flex-col justify-center items-center text-center">
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                    <div className="mt-4 text-sm text-purple-600">Tap to see story</div>
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 bg-purple-600 text-white rounded-xl p-6 shadow-md backface-hidden rotate-y-180">
                  <div className="h-full flex flex-col justify-center items-center text-center">
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p>{value.story}</p>
                    <div className="mt-4 text-sm text-white/80">Tap to flip back</div>
                  </div>
                </div>
              </div>
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
