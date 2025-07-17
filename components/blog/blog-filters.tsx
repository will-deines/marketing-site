"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Mobile Toggle */}
      <div className="md:hidden p-4 flex justify-between items-center border-b border-gray-200">
        <h2 className="font-medium">Filters</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500"
          aria-expanded={isOpen}
          aria-controls="filters-panel"
        >
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Filters Panel */}
      <div id="filters-panel" className={`md:block ${isOpen ? "block" : "hidden"}`} aria-live="polite">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium mb-3">Vertical</h3>
          <div className="space-y-2">
            {allVerticals.map((v) => (
              <div key={v} className="flex items-center">
                <Checkbox
                  id={`vertical-${v}`}
                  checked={localVertical.includes(v)}
                  onCheckedChange={() => toggleVertical(v)}
                />
                <Label htmlFor={`vertical-${v}`} className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
                  {verticalLabels[v] || v}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium mb-3">Funnel Stage</h3>
          <RadioGroup value={localFunnel} onValueChange={setLocalFunnel}>
            <div className="space-y-2">
              <div className="flex items-center">
                <RadioGroupItem id="funnel-all" value="" />
                <Label htmlFor="funnel-all" className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
                  All Stages
                </Label>
              </div>

              {Object.entries(funnelLabels).map(([key, label]) => (
                <div key={key} className="flex items-center">
                  <RadioGroupItem id={`funnel-${key}`} value={key} />
                  <Label htmlFor={`funnel-${key}`} className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium mb-3">Reading Time</h3>
          <div className="px-2">
            <Slider
              value={localReadingTime}
              min={0}
              max={20}
              step={1}
              onValueChange={(value) => setLocalReadingTime(value as [number, number])}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>{localReadingTime[0]} min</span>
              <span>{localReadingTime[1] >= 20 ? "20+" : localReadingTime[1]} min</span>
            </div>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-2">
          <Button onClick={handleApplyFilters} className="w-full">
            Apply Filters
          </Button>
          <Button variant="outline" onClick={handleResetFilters} className="w-full">
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
