"use client"

import type React from "react"

interface HandwrittenAnnotationProps {
  text: string
  className?: string
  lineDirection?: "right" | "left" | "down"
  lineLength?: number
  lineOffset?: { x: number; y: number }
}

export default function HandwrittenAnnotation({
  text,
  className = "",
  lineDirection = "right",
  lineLength = 20,
  lineOffset = { x: 40, y: 6 }
}: HandwrittenAnnotationProps) {
  const getLinePath = () => {
    switch (lineDirection) {
      case "right":
        return `M8 8 Q${lineLength / 2} ${lineOffset.y * 2} ${lineLength + 8} ${lineOffset.y}`
      case "left":
        return `M${lineLength + 8} 8 Q${lineLength / 2} ${lineOffset.y * 2} 8 ${lineOffset.y}`
      case "down":
        return `M8 8 Q${lineOffset.x / 2} ${lineLength / 2} ${lineOffset.x} ${lineLength}`
      default:
        return `M8 8 Q${lineLength / 2} ${lineOffset.y * 2} ${lineLength + 8} ${lineOffset.y}`
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div 
        className="text-gray-500 text-base italic transform -rotate-6 px-2 py-1"
        style={{ fontFamily: 'Dancing Script, cursive' }}
      >
        {text}
      </div>
      {/* Curved connecting line */}
      <svg 
        className="absolute w-20 h-12" 
        viewBox={`0 0 ${lineLength + 16} 48`} 
        fill="none"
        style={{
          top: `${lineOffset.y}px`,
          left: `${lineOffset.x}px`
        }}
      >
        <path 
          d={getLinePath()}
          stroke="#9CA3AF" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeDasharray="3,3"
          opacity="0.6"
        />
      </svg>
    </div>
  )
}