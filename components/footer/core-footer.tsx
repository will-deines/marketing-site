"use client"

import Link from "next/link"
import { useState } from "react"
import { CheckCircle2, MessageSquare, Sparkles, ChevronDown } from "lucide-react"

interface FooterSectionProps {
  title: string
  sectionId: string
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}

function FooterSection({ title, sectionId, children, isOpen, onToggle }: FooterSectionProps) {
  return (
    <div className="lg:col-span-1 border-t lg:border-0 border-gray-800 pt-4 lg:pt-0">
      <button
        onClick={onToggle}
        className="lg:hidden flex items-center justify-between w-full text-left mb-4 py-2"
      >
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <h3 className="hidden lg:block text-lg font-semibold mb-6 text-white">{title}</h3>
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block space-y-2`}>
        {children}
      </div>
    </div>
  )
}

export default function CoreFooter() {
  const [openSections, setOpenSections] = useState<string[]>([])

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-[#E5E5E7] py-12 lg:py-20 relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Mobile: Brand section always visible */}
        <div className="lg:hidden mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 p-2.5 rounded-xl group-hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <MessageSquare className="w-7 h-7 text-white" />
                  <Sparkles className="absolute -bottom-1 -right-1 w-3.5 h-3.5 text-yellow-300 animate-sparkle-brief" />
                </div>
              </div>
            </div>
            <span className="text-white font-bold text-2xl">Garrio</span>
          </div>
          <p className="text-sm text-[#E5E5E7]/70 leading-relaxed mb-6">AI sales & support built exclusively for ambitious Shopify founders.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-y-4 lg:gap-y-12 gap-x-8">
          {/* Brand Column - Desktop only */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 p-2.5 rounded-xl group-hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <MessageSquare className="w-7 h-7 text-white" />
                      <Sparkles className="absolute -bottom-1 -right-1 w-3.5 h-3.5 text-yellow-300 animate-sparkle-brief" />
                    </div>
                  </div>
                </div>
                <span className="text-white font-bold text-2xl">Garrio</span>
              </div>
            </div>
            <p className="text-sm text-[#E5E5E7]/70 leading-relaxed">AI sales & support built exclusively for ambitious Shopify founders.</p>
          </div>

          {/* Product Column - Commented out for now */}
          {/* <FooterSection
            title="Product"
            sectionId="product"
            isOpen={openSections.includes('product')}
            onToggle={() => toggleSection('product')}
          >
            <div className="flex items-center mb-4 text-green-400 bg-green-400/10 rounded-full px-3 py-1.5 inline-flex">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">All systems operational</span>
            </div>
            <ul className="space-y-2">
                <li>
                  <Link
                    href="/updates"
                    className="text-sm text-[#E5E5E7]/60 hover:text-white transition-all duration-300 relative overflow-hidden group inline-block"
                  >
                    <span className="relative inline-flex items-center gap-2">
                      Changelog
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/roadmap"
                    className="text-sm text-[#E5E5E7]/60 hover:text-white transition-all duration-300 relative overflow-hidden group inline-block"
                  >
                    <span className="relative inline-flex items-center gap-2">
                      Roadmap
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
              </ul>
          </FooterSection> */}

          {/* Resources Column */}
          <FooterSection
            title="Resources"
            sectionId="resources"
            isOpen={openSections.includes('resources')}
            onToggle={() => toggleSection('resources')}
          >
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://apps.shopify.com/garrio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#E5E5E7]/60 hover:text-white transition-all duration-300 relative overflow-hidden group inline-block"
                >
                  <span className="relative inline-flex items-center gap-2">
                    Shopify App Store
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-[#E5E5E7]/60 hover:text-white transition-all duration-300 relative overflow-hidden group inline-block"
                >
                  <span className="relative inline-flex items-center gap-2">
                    Blog
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </FooterSection>

          {/* Company Column */}
          <FooterSection
            title="Company"
            sectionId="company"
            isOpen={openSections.includes('company')}
            onToggle={() => toggleSection('company')}
          >
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[#E5E5E7]/60 hover:text-white transition-all duration-300 relative overflow-hidden group inline-block"
                >
                  <span className="relative inline-flex items-center gap-2">
                    About
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about#careers"
                  className="text-sm text-[#E5E5E7]/60 hover:text-white transition-all duration-300 relative overflow-hidden group inline-block"
                >
                  <span className="relative inline-flex items-center gap-2">
                    Careers
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about#press-kit"
                  className="text-sm text-[#E5E5E7]/60 hover:text-white transition-all duration-300 relative overflow-hidden group inline-block"
                >
                  <span className="relative inline-flex items-center gap-2">
                    Press kit
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-[#E5E5E7]/60 hover:text-white transition-all duration-300 relative overflow-hidden group inline-block"
                >
                  <span className="relative inline-flex items-center gap-2">
                    Contact
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-gray-800">
              <p className="text-xs text-[#E5E5E7]/50 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Remote team ☕️ 🌍
              </p>
            </div>
          </FooterSection>

          {/* Legal Column */}
          <FooterSection
            title="Legal"
            sectionId="legal"
            isOpen={openSections.includes('legal')}
            onToggle={() => toggleSection('legal')}
          >
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-sm text-[#E5E5E7]/60 hover:text-white transition-all duration-300 relative overflow-hidden group inline-block"
                  rel="legal"
                >
                  <span className="relative inline-flex items-center gap-2">
                    Terms of Service
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-[#E5E5E7]/60 hover:text-white transition-all duration-300 relative overflow-hidden group inline-block"
                  rel="legal"
                >
                  <span className="relative inline-flex items-center gap-2">
                    Privacy Policy
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/ccpa-disclosures"
                  className="text-sm text-[#E5E5E7]/60 hover:text-white transition-all duration-300 relative overflow-hidden group inline-block"
                  rel="legal"
                >
                  <span className="relative inline-flex items-center gap-2">
                    CCPA Disclosures
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/data-privacy-framework"
                  className="text-sm text-[#E5E5E7]/60 hover:text-white transition-all duration-300 relative overflow-hidden group inline-block"
                  rel="legal"
                >
                  <span className="relative inline-flex items-center gap-2">
                    Data Privacy Framework
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </FooterSection>

          {/* Social Column */}
          <FooterSection
            title="Connect"
            sectionId="connect"
            isOpen={openSections.includes('connect')}
            onToggle={() => toggleSection('connect')}
          >
            <div className="flex space-x-5 mb-6">
              <Link
                href="https://twitter.com/garrio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-[#E5E5E7]/40 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5"
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
                className="text-[#E5E5E7]/40 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5"
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
                className="text-[#E5E5E7]/40 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5"
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
                className="text-[#E5E5E7]/40 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5"
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
            <div className="mt-6 pt-4 border-t border-gray-800">
              <p className="text-sm text-[#E5E5E7]/60">Join <span className="text-purple-400 font-semibold">500+</span> founders</p>
            </div>
          </FooterSection>
        </div>

        {/* Mobile Social Links - Bottom */}
        <div className="lg:hidden mt-8 pt-8 border-t border-gray-800">
          <div className="flex justify-center space-x-6">
            <Link
              href="https://twitter.com/garrio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-[#E5E5E7]/40 hover:text-white transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
              className="text-[#E5E5E7]/40 hover:text-white transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
              className="text-[#E5E5E7]/40 hover:text-white transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
              className="text-[#E5E5E7]/40 hover:text-white transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
          <p className="text-center text-sm text-[#E5E5E7]/60 mt-4">Join <span className="text-purple-400 font-semibold">500+</span> founders</p>
        </div>
      </div>
    </div>
  )
}
