import Link from "next/link"

export default function TrustStrip() {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-b border-gray-700/50 py-10 relative overflow-hidden">
      {/* Animated gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center items-center">
          {/* Built for Shopify Badge */}
          <Link
            href="https://apps.shopify.com/garrio"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-600/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300">
                <span className="text-white/80 text-sm">Built for</span>
                <span className="text-green-400 font-bold">Shopify</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
