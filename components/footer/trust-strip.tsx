import Link from "next/link"

export default function TrustStrip() {
  return (
    <div className="bg-[#0E0F11] border-t border-b border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-8">
          {/* Payment & Security Badges */}
          <div className="flex flex-wrap justify-center gap-6">
            <div className="opacity-50 hover:opacity-80 transition-opacity">
              <span className="text-white text-sm">Stripe Partner</span>
            </div>
            <div className="opacity-50 hover:opacity-80 transition-opacity">
              <span className="text-white text-sm">PCI DSS Level 1</span>
            </div>
            <div className="opacity-50 hover:opacity-80 transition-opacity">
              <span className="text-white text-sm">SOC 2 Type II (soon)</span>
            </div>
          </div>

          {/* Built for Shopify Badge */}
          <Link
            href="https://apps.shopify.com/garrio"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-50 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center">
              <span className="text-white text-sm mr-2">Built for</span>
              <span className="text-white font-bold">Shopify</span>
            </div>
          </Link>

          {/* QSBS / US-Based Note */}
          <div className="opacity-50 hover:opacity-80 transition-opacity">
            <span className="text-white text-sm">US-Based LLC • QSBS Eligible</span>
          </div>
        </div>
      </div>
    </div>
  )
}
