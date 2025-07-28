"use client";

import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

interface HeaderProps {
  variant?: "transparent" | "solid";
}

export default function Header({ variant = "transparent" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    {
      name: "Features",
      href: "/features",
      dropdown: [
        { name: "24/7 Support Team", href: "/features#works-for-you" },
        { name: "Brand Intelligence", href: "/features#shopify-native" },
        { name: "Revenue Engine", href: "/features#revenue-engine" },
        { name: "Instant Answers", href: "/features#instant-answers" },
        { name: "Human Support", href: "/features#human-support" },
        { name: "Brand Voice", href: "/features#brand-voice" },
      ],
    },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const headerBg =
    variant === "solid" || isScrolled
      ? "bg-white/95 backdrop-blur-md shadow-lg"
      : "bg-transparent";

  const textColor =
    variant === "solid" || isScrolled ? "text-gray-700" : "text-white";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerBg}`}
      style={{ right: 0 }}
    >
      <div className="relative w-full max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="group">
            <Logo
              variant={
                variant === "solid" || isScrolled ? "gradient" : "transparent"
              }
              textClassName={
                variant === "solid" || isScrolled
                  ? "!text-gray-900"
                  : "!text-white"
              }
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 text-sm font-medium transition-all duration-300 relative group ${textColor}`}
                  >
                    {item.name}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? "rotate-180" : "group-hover:rotate-180"}`}
                    />
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-all duration-300 relative group ${textColor}`}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 group-hover:w-full" />
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="mt-2 w-56 rounded-xl bg-white shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                      <div className="py-2">
                        {item.dropdown.map((subItem, idx) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:text-purple-700 transition-all duration-200 relative group animate-in fade-in slide-in-from-left-2"
                            style={{
                              animationDelay: `${idx * 50}ms`,
                              animationFillMode: "both",
                            }}
                          >
                            <span className="relative z-10">
                              {subItem.name}
                            </span>
                            <div className="absolute inset-0 w-0 bg-purple-600 transition-all duration-300 group-hover:w-1" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <Button
              asChild
              className={`ml-4 px-4 py-2 text-sm font-medium min-w-[140px] relative group transition-all duration-1000 border ${
                variant === "solid" || isScrolled
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-purple-500/30 hover:shadow-2xl border-transparent"
                  : "bg-white/10 backdrop-blur-sm border-white/20 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-yellow-500/20 hover:border-yellow-400/40 text-white hover:shadow-yellow-400/20 hover:shadow-lg"
              }`}
            >
              <Link
                href="https://apps.shopify.com/garrio"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center"
              >
                <Sparkles className={`w-4 h-4 mr-2 transition-all duration-1000 ${
                  variant === "solid" || isScrolled
                    ? "group-hover:text-purple-200 group-hover:animate-twinkle"
                    : "group-hover:text-yellow-100 group-hover:animate-twinkle"
                }`} />
                <span className="relative">
                  Get Started Free
                </span>
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
              variant === "solid" || isScrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isMenuOpen ? "rotate-180 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
              >
                <Menu className="w-6 h-6" />
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-180 scale-0 opacity-0"}`}
              >
                <X className="w-6 h-6" />
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 w-full bg-white shadow-xl border-t border-gray-100 animate-in slide-in-from-top-4 duration-300 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="w-full max-w-[1440px] mx-auto">
            <nav className="flex flex-col gap-4 px-4 py-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <>
                      <Link
                        href={item.href}
                        className="block font-medium text-gray-900 px-4 py-2 hover:text-purple-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      <div className="pl-8">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-600"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-4 py-2 font-medium text-gray-700 hover:text-purple-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-100">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg"
                >
                  <Link
                    href="https://apps.shopify.com/garrio"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get Started Free
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

