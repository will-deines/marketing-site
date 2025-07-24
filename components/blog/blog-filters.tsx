"use client"

import { ChevronDown, ChevronUp, Filter, Clock, Tag } from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

interface BlogFiltersProps {
  vertical: string[]
  funnel: string | undefined
  minReadingTime: number
  maxReadingTime: number
  applyFilters: (vertical: string[], funnel: string | undefined, minReadingTime: number, maxReadingTime: number) => void
  allVerticals: string[]
  verticalLabels: Record<string, string>
  funnelLabels: Record<string, string>
}

export default function BlogFilters({
  vertical,
  funnel,
  minReadingTime,
  maxReadingTime,
  applyFilters,
  allVerticals,
  verticalLabels,
  funnelLabels,
}: BlogFiltersProps) {
  // Local state for filters
  const [localVertical, setLocalVertical] = useState<string[]>(vertical)
  const [localFunnel, setLocalFunnel] = useState<string | undefined>(funnel)
  const [localReadingTime, setLocalReadingTime] = useState<[number, number]>([minReadingTime, maxReadingTime])
  const [isOpen, setIsOpen] = useState(false)

  // Update local state when props change
  useEffect(() => {
    setLocalVertical(vertical)
    setLocalFunnel(funnel)
    setLocalReadingTime([minReadingTime, maxReadingTime])
  }, [vertical, funnel, minReadingTime, maxReadingTime])

  // Toggle vertical filter
  const toggleVertical = (v: string) => {
    if (localVertical.includes(v)) {
      setLocalVertical(localVertical.filter((item) => item !== v))
    } else {
      setLocalVertical([...localVertical, v])
    }
  }

  // Apply filters
  const handleApplyFilters = () => {
    applyFilters(localVertical, localFunnel, localReadingTime[0], localReadingTime[1])

    // Close mobile filters
    setIsOpen(false)
  }

  // Reset filters
  const handleResetFilters = () => {
    setLocalVertical([])
    setLocalFunnel(undefined)
    setLocalReadingTime([0, 100])

    applyFilters([], undefined, 0, 100)
  }

  return (
    <div className="overflow-hidden">
      {/* Mobile Toggle */}
      <div className="xl:hidden mb-6 flex items-center justify-between p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-purple-600" />
          <h2 className="font-semibold text-gray-900">Filters</h2>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500 hover:text-purple-600 transition-colors p-1 rounded-lg hover:bg-purple-50"
          aria-expanded={isOpen}
          aria-controls="filters-panel"
        >
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Filters Panel */}
      <div id="filters-panel" className={`xl:block ${isOpen ? "block" : "hidden"}`} aria-live="polite">
        <div className="space-y-6">
          {/* Vertical Filters */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Industry</h3>
            </div>
            <div className="space-y-3">
              {allVerticals.map((v) => (
                <div key={v} className="flex items-center group">
                  <Checkbox
                    id={`vertical-${v}`}
                    checked={localVertical.includes(v)}
                    onCheckedChange={() => toggleVertical(v)}
                    className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <Label 
                    htmlFor={`vertical-${v}`} 
                    className="ml-3 text-sm font-medium text-gray-700 cursor-pointer group-hover:text-purple-600 transition-colors"
                  >
                    {verticalLabels[v] || v}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Funnel Stage */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Journey Stage</h3>
            </div>
            <RadioGroup value={localFunnel} onValueChange={setLocalFunnel}>
              <div className="space-y-3">
                <div className="flex items-center group">
                  <RadioGroupItem id="funnel-all" value="" className="border-purple-300 text-purple-600" />
                  <Label htmlFor="funnel-all" className="ml-3 text-sm font-medium text-gray-700 cursor-pointer group-hover:text-purple-600 transition-colors">
                    All Stages
                  </Label>
                </div>

                {Object.entries(funnelLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center group">
                    <RadioGroupItem id={`funnel-${key}`} value={key} className="border-purple-300 text-purple-600" />
                    <Label htmlFor={`funnel-${key}`} className="ml-3 text-sm font-medium text-gray-700 cursor-pointer group-hover:text-purple-600 transition-colors">
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Reading Time */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Reading Time</h3>
            </div>
            <div className="px-1">
              <Slider
                value={localReadingTime}
                min={0}
                max={20}
                step={1}
                onValueChange={(value) => setLocalReadingTime(value as [number, number])}
                className="w-full"
              />
              <div className="flex justify-between mt-3 text-sm text-gray-600">
                <span className="font-medium">{localReadingTime[0]} min</span>
                <span className="font-medium">{localReadingTime[1] >= 20 ? "20+" : localReadingTime[1]} min</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <Button 
              onClick={handleApplyFilters} 
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Apply Filters
            </Button>
            <Button 
              variant="outline" 
              onClick={handleResetFilters} 
              className="w-full border-2 border-purple-200 text-purple-700 hover:bg-purple-50 rounded-2xl py-3 font-semibold transition-all duration-200"
            >
              Reset All
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
