"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Download, 
  FileText, 
  Palette, 
  Mail, 
  Copy, 
  Check,
  Sparkles,
  Image as ImageIcon,
  AlertCircle,
  X
} from "lucide-react"
import { Logo } from "@/components/ui/logo"


const brandColors = [
  { name: "Purple", hex: "#9333EA", variable: "--color-primary" },
  { name: "Indigo", hex: "#6366F1", variable: "--color-secondary" },
  { name: "Yellow", hex: "#FBBF24", variable: "--color-accent" },
  { name: "Gray", hex: "#111827", variable: "--color-text" },
  { name: "White", hex: "#FFFFFF", variable: "--color-background" },
]

const logoAssets = [
  { name: "Logo Light", file: "/brand/garrio-logo-light.svg", bg: "light" },
  { name: "Logo Dark", file: "/brand/garrio-logo-dark.svg", bg: "dark" },
  { name: "Logo Transparent", file: "/brand/garrio-logo-transparent.svg", bg: "gradient" },
  { name: "Icon Light", file: "/brand/garrio-icon-light.svg", bg: "light" },
  { name: "Icon Dark", file: "/brand/garrio-icon-dark.svg", bg: "dark" },
  { name: "Icon Transparent", file: "/brand/garrio-icon-transparent.svg", bg: "gradient" },
]

const downloadableAssets = [
  { name: "SVG Logos", files: ["garrio-logo-light.svg", "garrio-logo-dark.svg", "garrio-icon-light.svg"], format: "SVG" },
  { name: "PNG Icons", files: ["garrio-icon-light-512.png", "garrio-icon-dark-512.png"], format: "PNG" },
  { name: "Social Media", files: ["garrio-social-square-1024.png", "garrio-social-og-1200x630.png"], format: "PNG" },
  { name: "App Icons", files: ["shopify-app-icon-1200.png", "google-app-icon-120.png"], format: "PNG" },
]

export default function PressResources() {
  const [activeTab, setActiveTab] = useState<"press" | "brand">("press")
  const [copiedHex, setCopiedHex] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedHex(text)
    setTimeout(() => setCopiedHex(null), 2000)
  }

  return (
    <section id="press-kit" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Press & Resources</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Everything you need to write about or work with Garrio.
        </p>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                activeTab === "press" ? "bg-purple-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("press")}
            >
              Press Kit
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                activeTab === "brand" ? "bg-purple-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("brand")}
            >
              Brand Assets
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {activeTab === "press" ? (
            <div>
              {/* Press Kit Download */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold mb-2">Press Kit</h3>
                    <p className="text-gray-600">
                      Download our press kit with logos, product screenshots, and company information.
                    </p>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                    <Link href="/press-kit.zip" download>
                      <Download className="mr-2 h-4 w-4" /> Download Press Kit
                    </Link>
                  </Button>
                </div>
              </div>


              {/* Media Contact */}
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <p className="text-gray-600">
                  For press inquiries, please contact{" "}
                  <Link href="mailto:press@garrio.ai" className="text-purple-600 hover:underline">
                    press@garrio.ai
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <div>
              {/* Brand Assets */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md mb-8">
                <h3 className="text-xl font-bold mb-4">Brand Guidelines</h3>

                {/* Primary Logo Display */}
                <div className="mb-8">
                  <h4 className="font-bold mb-3">Primary Logo</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gray-50 p-6 rounded-lg flex items-center justify-center">
                      <Logo size="lg" variant="gradient" />
                    </div>
                    <div className="bg-gray-900 p-6 rounded-lg flex items-center justify-center">
                      <Logo size="lg" variant="dark" />
                    </div>
                    <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-6 rounded-lg flex items-center justify-center">
                      <Logo size="lg" variant="light" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <Logo size="sm" showText={false} />
                      <p className="text-xs text-gray-500 mt-2">Small Icon</p>
                    </div>
                    <div className="text-center">
                      <Logo size="md" showText={false} />
                      <p className="text-xs text-gray-500 mt-2">Medium Icon</p>
                    </div>
                    <div className="text-center">
                      <Logo size="lg" showText={false} />
                      <p className="text-xs text-gray-500 mt-2">Large Icon</p>
                    </div>
                    <div className="text-center">
                      <Logo size="xl" showText={false} />
                      <p className="text-xs text-gray-500 mt-2">XL Icon</p>
                    </div>
                  </div>
                </div>

                {/* Logo Usage */}
                <div className="mb-8">
                  <h4 className="font-bold mb-3">Logo Files (Static Versions)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {logoAssets.map((asset) => (
                      <div 
                        key={asset.name}
                        className={`p-4 rounded-lg ${
                          asset.bg === "dark" 
                            ? "bg-gray-800 border border-gray-700" 
                            : asset.bg === "gradient"
                            ? "bg-gradient-to-br from-purple-100 to-indigo-100 border border-purple-200"
                            : "bg-white border border-gray-200"
                        }`}
                      >
                        <div className="h-16 relative mb-2">
                          <Image
                            src={asset.file}
                            alt={asset.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <p className={`text-sm ${asset.bg === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                          {asset.name}
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2 w-full"
                          asChild
                        >
                          <Link href={asset.file} download>
                            <Download className="mr-2 h-3 w-3" /> Download
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Palette */}
                <div className="mb-8">
                  <h4 className="font-bold mb-3">Color Palette</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {brandColors.map((color) => (
                      <div 
                        key={color.name} 
                        className="text-center cursor-pointer group"
                        onClick={() => copyToClipboard(color.hex)}
                      >
                        <div
                          className="h-16 rounded-md mb-2 border border-gray-200 relative overflow-hidden group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: color.hex }}
                        >
                          {copiedHex === color.hex && (
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                              <Check className="h-6 w-6 text-white" />
                            </div>
                          )}
                        </div>
                        <p className="font-medium text-sm">{color.name}</p>
                        <p className="text-xs text-gray-500 group-hover:text-purple-600 transition-colors">
                          {color.hex}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">Click to copy hex code</p>
                </div>

                {/* Logo Misuse */}
                <div>
                  <h4 className="font-bold mb-3">Logo Misuse</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-100 p-3 rounded-lg text-center">
                      <div className="h-12 relative mb-2 opacity-50">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image
                            src={"/brand/garrio-logo-light.svg"}
                            alt="Don't stretch the logo"
                            width={120}
                            height={40}
                            className="object-contain"
                            style={{ transform: "scaleX(1.5)" }}
                          />
                        </div>
                      </div>
                      <p className="text-sm text-red-600">Don&apos;t stretch the logo</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg text-center">
                      <div className="h-12 relative mb-2 opacity-50">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image
                            src={"/brand/garrio-logo-light.svg"}
                            alt="Don't change colors"
                            width={120}
                            height={40}
                            className="object-contain hue-rotate-60"
                          />
                        </div>
                      </div>
                      <p className="text-sm text-red-600">Don&apos;t change colors</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg text-center">
                      <div className="h-12 relative mb-2 opacity-50">
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-pink-500 to-yellow-500">
                          <Image
                            src={"/brand/garrio-logo-dark.svg"}
                            alt="Don't use on busy backgrounds"
                            width={120}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <p className="text-sm text-red-600">Don&apos;t use on busy backgrounds</p>
                    </div>
                  </div>
                </div>

                {/* Download Assets */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-bold mb-3">Download Assets</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {downloadableAssets.map((pack) => (
                      <div key={pack.name} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium">{pack.name}</h5>
                            <p className="text-sm text-gray-600">
                              {pack.files.length} files • {pack.format}
                            </p>
                          </div>
                          <Badge variant="secondary">{pack.format}</Badge>
                        </div>
                        <div className="mt-3 space-y-1">
                          {pack.files.map((file) => (
                            <Link
                              key={file}
                              href={`/brand/${file}`}
                              download
                              className="text-xs text-purple-600 hover:underline block"
                            >
                              {file}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <strong>Need all assets?</strong> Download our complete brand package including all logo variants, 
                      colors, and usage guidelines.
                    </p>
                    <Button 
                      className="mt-3 bg-purple-600 hover:bg-purple-700"
                      asChild
                    >
                      <Link href="/brand/README.md" download>
                        <Download className="mr-2 h-4 w-4" /> Download Brand Guidelines
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
