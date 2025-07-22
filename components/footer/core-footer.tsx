import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

export default function CoreFooter() {
  return (
    <div className="bg-[#0E0F11] text-[#E5E5E7] py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-y-8 gap-x-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-4 relative h-12 w-32">
              <div className="group relative h-12 w-32 cursor-pointer">
                {/* Animated logo would go here - using placeholder for now */}
                <div className="absolute inset-0 flex items-center justify-start text-white font-bold text-xl">
                  Garrio
                </div>
              </div>
            </div>
            <p className="text-sm text-[#E5E5E7]/80">AI sales & support built only for Shopify&apos;s indie merchants.</p>
          </div>

          {/* Product Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <div className="flex items-center mb-3 text-green-400">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              <span className="text-sm">All systems go</span>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/updates"
                  className="text-sm text-[#E5E5E7]/80 hover:text-purple-400 transition-colors relative overflow-hidden group"
                >
                  <span className="relative inline-block">
                    Changelog
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/roadmap"
                  className="text-sm text-[#E5E5E7]/80 hover:text-purple-400 transition-colors relative overflow-hidden group"
                >
                  <span className="relative inline-block">
                    Roadmap
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-[#E5E5E7]/80 hover:text-purple-400 transition-colors relative overflow-hidden group"
                >
                  <span className="relative inline-block">
                    Docs
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/api"
                  className="text-sm text-[#E5E5E7]/80 hover:text-purple-400 transition-colors relative overflow-hidden group"
                >
                  <span className="relative inline-block">
                    API Reference
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://apps.shopify.com/garrio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#E5E5E7]/80 hover:text-purple-400 transition-colors relative overflow-hidden group"
                >
                  <span className="relative inline-block">
                    Shopify App Store
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-[#E5E5E7]/80 hover:text-purple-400 transition-colors relative overflow-hidden group"
                >
                  <span className="relative inline-block">
                    Blog
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[#E5E5E7]/80 hover:text-purple-400 transition-colors relative overflow-hidden group"
                >
                  <span className="relative inline-block">
                    About
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-[#E5E5E7]/80 hover:text-purple-400 transition-colors relative overflow-hidden group"
                >
                  <span className="relative inline-block">
                    Careers
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/press-kit.zip"
                  className="text-sm text-[#E5E5E7]/80 hover:text-purple-400 transition-colors relative overflow-hidden group"
                >
                  <span className="relative inline-block">
                    Press kit
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-[#E5E5E7]/80 hover:text-purple-400 transition-colors relative overflow-hidden group"
                >
                  <span className="relative inline-block">
                    Contact
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
            </ul>
            <p className="text-xs text-[#E5E5E7]/60 mt-3">We&apos;re remote ☕️ 🌍</p>
          </div>

          {/* Legal Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-[#E5E5E7]/80 hover:text-purple-400 transition-colors relative overflow-hidden group"
                  rel="legal"
                >
                  <span className="relative inline-block">
                    Terms of Service
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-[#E5E5E7]/80 hover:text-purple-400 transition-colors relative overflow-hidden group"
                  rel="legal"
                >
                  <span className="relative inline-block">
                    Privacy & GDPR
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dpa.pdf"
                  className="text-sm text-[#E5E5E7]/80 hover:text-purple-400 transition-colors relative overflow-hidden group"
                  rel="legal"
                >
                  <span className="relative inline-block">
                    DPA (PDF)
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <button className="text-sm text-[#E5E5E7]/80 hover:text-purple-400 transition-colors">
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <Link
                href="https://twitter.com/garrio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-[#E5E5E7]/50 hover:text-[#E5E5E7] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link
                href="https://linkedin.com/company/garrio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[#E5E5E7]/50 hover:text-[#E5E5E7] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
              <Link
                href="https://youtube.com/garrio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-[#E5E5E7]/50 hover:text-[#E5E5E7] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </Link>
              <Link
                href="https://discord.gg/garrio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="text-[#E5E5E7]/50 hover:text-[#E5E5E7] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="12" r="1"></circle>
                  <circle cx="15" cy="12" r="1"></circle>
                  <path d="M7.5 7.5c3.5-1 5.5-1 9 0"></path>
                  <path d="M7 16.5c3.5 1 6.5 1 10 0"></path>
                  <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5l-1 2.5"></path>
                  <path d="M8.5 17c0 1-1.356 3-1.832 3-1.429 0-2.698-1.667-3.333-3-.635-1.667-.48-5.833 1.428-11.5C6.151 4.485 7.545 4.16 9 4l1 2.5"></path>
                </svg>
              </Link>
            </div>
            <p className="text-sm text-[#E5E5E7]/80">Join 400+ builders</p>
          </div>
        </div>
      </div>
    </div>
  )
}
