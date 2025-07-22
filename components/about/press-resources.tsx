"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"


const brandColors = [
  { name: "Purple", hex: "#9333EA", variable: "--color-primary" },
  { name: "Light Purple", hex: "#A855F7", variable: "--color-primary-light" },
  { name: "Dark Purple", hex: "#7E22CE", variable: "--color-primary-dark" },
  { name: "Gray", hex: "#6B7280", variable: "--color-text" },
  { name: "Light Gray", hex: "#E5E7EB", variable: "--color-background-light" },
]

export default function PressResources() {
  const [activeTab, setActiveTab] = useState<"press" | "brand">("press")

  return (
    <section className="py-16 md:py-24 bg-gray-50">
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

                {/* Logo Usage */}
                <div className="mb-8">
                  <h4 className="font-bold mb-3">Logo</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 border border-gray-200 rounded-lg">
                      <div className="h-16 relative mb-2">
                        <Image
                          src={"/logo-dark.svg"}
                          alt="Garrio logo - dark version"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <p className="text-sm text-gray-600">Dark version (for light backgrounds)</p>
                    </div>
                    <div className="bg-gray-800 p-4 border border-gray-700 rounded-lg">
                      <div className="h-16 relative mb-2">
                        <Image
                          src={"/logo-light.svg"}
                          alt="Garrio logo - light version"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <p className="text-sm text-gray-300">Light version (for dark backgrounds)</p>
                    </div>
                  </div>
                </div>

                {/* Color Palette */}
                <div className="mb-8">
                  <h4 className="font-bold mb-3">Color Palette</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {brandColors.map((color) => (
                      <div key={color.name} className="text-center">
                        <div
                          className="h-16 rounded-md mb-2 border border-gray-200"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <p className="font-medium text-sm">{color.name}</p>
                        <p className="text-xs text-gray-500">{color.hex}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logo Misuse */}
                <div>
                  <h4 className="font-bold mb-3">Logo Misuse</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-100 p-3 rounded-lg text-center">
                      <div className="h-12 relative mb-2 opacity-50">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image
                            src={"/logo-dark.svg"}
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
                            src={"/logo-dark.svg"}
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
                            src={"/logo-light.svg"}
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
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
