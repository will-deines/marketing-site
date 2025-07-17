"use client"

interface BlogHeroProps {
  vertical: string[]
  setVertical: (vertical: string[]) => void
  allVerticals: string[]
  verticalLabels: Record<string, string>
}

export default function BlogHero({ vertical, setVertical, allVerticals, verticalLabels }: BlogHeroProps) {
  // Toggle vertical filter
  const toggleVertical = (v: string) => {
    if (vertical.includes(v)) {
      setVertical(vertical.filter((item) => item !== v))
    } else {
      setVertical([...vertical, v])
    }
  }

  return (
    <div className="bg-gradient-to-r from-purple-900 to-purple-600 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Garrio Growth Library</h1>
          <p className="text-xl md:text-2xl mb-12">Actionable CX playbooks for Shopify merchants.</p>

          {/* Vertical Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {allVerticals.map((v) => (
              <button
                key={v}
                onClick={() => toggleVertical(v)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  vertical.includes(v) ? "bg-white text-purple-700" : "bg-white/20 hover:bg-white/30"
                }`}
                aria-pressed={vertical.includes(v)}
              >
                {verticalLabels[v] || v}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
