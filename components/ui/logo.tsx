"use client"

import { MessageSquare, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "light" | "dark" | "gradient" | "transparent"
  showText?: boolean
  className?: string
  iconClassName?: string
  textClassName?: string
  animated?: boolean
}

export function Logo({ 
  size = "md", 
  variant = "gradient",
  showText = true,
  className,
  iconClassName,
  textClassName,
  animated = true
}: LogoProps) {
  const sizeConfig = {
    sm: { container: "w-8 h-8", icon: "w-4 h-4", sparkle: "w-2 h-2", text: "text-lg", rounded: "rounded-lg" },
    md: { container: "w-10 h-10", icon: "w-6 h-6", sparkle: "w-3 h-3", text: "text-xl", rounded: "rounded-xl" },
    lg: { container: "w-16 h-16", icon: "w-10 h-10", sparkle: "w-5 h-5", text: "text-3xl", rounded: "rounded-2xl" },
    xl: { container: "w-24 h-24", icon: "w-14 h-14", sparkle: "w-7 h-7", text: "text-5xl", rounded: "rounded-3xl" },
  }

  const variantConfig = {
    light: {
      bg: "bg-gradient-to-br from-purple-600 to-indigo-600",
      icon: "text-white",
      sparkle: "text-yellow-400",
      text: "text-gray-900"
    },
    dark: {
      bg: "bg-white",
      icon: "text-purple-600",
      sparkle: "text-indigo-600",
      text: "text-white"
    },
    gradient: {
      bg: "bg-gradient-to-br from-purple-600 to-indigo-600",
      icon: "text-white",
      sparkle: "text-yellow-400",
      text: "text-gray-900"
    },
    transparent: {
      bg: "bg-transparent border-2 border-white/20",
      icon: "text-white",
      sparkle: "text-yellow-400",
      text: "text-white"
    }
  }

  const config = sizeConfig[size]
  const colors = variantConfig[variant]

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative group">
        {/* Glow effect */}
        {animated && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
        )}
        
        <div
          className={cn(
            "relative flex items-center justify-center transition-all duration-300",
            config.container,
            config.rounded,
            colors.bg,
            animated && "group-hover:scale-110 group-hover:rotate-3",
            iconClassName
          )}
        >
          <div className="relative">
            <MessageSquare className={cn(
              config.icon,
              colors.icon,
              "transition-all duration-300 drop-shadow-sm"
            )} />
            <Sparkles 
              className={cn(
                "absolute -bottom-1 -right-1 transition-all duration-300",
                config.sparkle,
                colors.sparkle,
                animated && "group-hover:scale-110 animate-sparkle-brief"
              )} 
            />
          </div>
        </div>
      </div>
      
      {showText && (
        <span
          className={cn(
            "font-bold tracking-tight transition-colors duration-300",
            config.text,
            colors.text,
            textClassName
          )}
        >
          Garrio
        </span>
      )}
    </div>
  )
}

// Static logo component for exporting
export function LogoStatic({ 
  size = "md", 
  variant = "gradient",
  showText = true,
}: Pick<LogoProps, "size" | "variant" | "showText">) {
  return <Logo size={size} variant={variant} showText={showText} animated={false} />
}