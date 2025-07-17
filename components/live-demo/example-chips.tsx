"use client"

interface ExampleChipsProps {
  onSelect: (url: string) => void
}

// Example Shopify URLs for quick testing
const examples = [
  {
    label: "Fashion Store",
    url: "https://allbirds.myshopify.com/products/mens-wool-runners",
  },
  {
    label: "Beauty Shop",
    url: "https://glossier.myshopify.com/products/boy-brow",
  },
  {
    label: "Home Goods",
    url: "https://brooklinen.myshopify.com/products/classic-core-sheet-set",
  },
]

export default function ExampleChips({ onSelect }: ExampleChipsProps) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-3">Or try one of these examples:</p>
      <div className="flex flex-wrap gap-2">
        {examples.map((example) => (
          <button
            key={example.label}
            onClick={() => onSelect(example.url)}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors"
            aria-label={`Try ${example.label} example`}
          >
            {example.label}
          </button>
        ))}
      </div>
    </div>
  )
}
