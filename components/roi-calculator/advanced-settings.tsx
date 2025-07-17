"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { InfoIcon as InfoCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AdvancedSettingsProps {
  agentHourlyWage: number
  setAgentHourlyWage: (value: number) => void
  ticketsPerHour: number
  setTicketsPerHour: (value: number) => void
  automationRates: Record<string, number>
  setAutomationRates: (value: Record<string, number>) => void
  showUpsellRevenue: boolean
  setShowUpsellRevenue: (value: boolean) => void
  averageOrderValue: number
  setAverageOrderValue: (value: number) => void
  conversionRate: number
  setConversionRate: (value: number) => void
  apps: Array<{ slug: string; name: string; automationRate: number }>
}

export default function AdvancedSettings({
  agentHourlyWage,
  setAgentHourlyWage,
  ticketsPerHour,
  setTicketsPerHour,
  automationRates,
  setAutomationRates,
  showUpsellRevenue,
  setShowUpsellRevenue,
  averageOrderValue,
  setAverageOrderValue,
  conversionRate,
  setConversionRate,
  apps,
}: AdvancedSettingsProps) {
  // Track which field is being edited for analytics
  const trackFieldEdit = (field: string, oldValue: number, newValue: number) => {
    // Fire analytics event
    if (typeof window !== "undefined") {
      console.log("Analytics event: roi_settings_edit", {
        field,
        old_val: oldValue,
        new_val: newValue,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Agent Hourly Wage */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="agent-wage" className="flex items-center">
              Agent Hourly Wage
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircle className="h-4 w-4 text-gray-400 ml-2" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs p-2">
                    <p className="text-sm">W-2, fully-loaded cost. Based on Glassdoor US median.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="font-medium">${agentHourlyWage}/hr</div>
          </div>
          <Slider
            id="agent-wage"
            defaultValue={[agentHourlyWage]}
            min={10}
            max={30}
            step={1}
            onValueChange={(value) => {
              const oldValue = agentHourlyWage
              setAgentHourlyWage(value[0])
              trackFieldEdit("agent_hourly_wage", oldValue, value[0])
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$10</span>
            <span>$20</span>
            <span>$30</span>
          </div>
        </div>

        {/* Tickets Per Hour */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="tickets-per-hour" className="flex items-center">
              Tickets Per Hour
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircle className="h-4 w-4 text-gray-400 ml-2" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs p-2">
                    <p className="text-sm">≈3 min per ticket + context-switch time.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="font-medium">{ticketsPerHour}</div>
          </div>
          <Slider
            id="tickets-per-hour"
            defaultValue={[ticketsPerHour]}
            min={10}
            max={30}
            step={1}
            onValueChange={(value) => {
              const oldValue = ticketsPerHour
              setTicketsPerHour(value[0])
              trackFieldEdit("tickets_per_hour", oldValue, value[0])
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>10</span>
            <span>20</span>
            <span>30</span>
          </div>
        </div>
      </div>

      {/* Automation Rates */}
      <div>
        <h3 className="text-lg font-medium mb-4">Automation Rates</h3>
        <div className="space-y-4">
          {apps.map((app) => (
            <div key={app.slug}>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor={`automation-${app.slug}`} className="flex items-center">
                  {app.name}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoCircle className="h-4 w-4 text-gray-400 ml-2" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs p-2">
                        <p className="text-sm">
                          % of tickets solved without a human. Source: public case studies + user data.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="font-medium">{Math.round(automationRates[app.slug] * 100)}%</div>
              </div>
              <Slider
                id={`automation-${app.slug}`}
                defaultValue={[automationRates[app.slug] * 100]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => {
                  const oldValue = automationRates[app.slug]
                  setAutomationRates({
                    ...automationRates,
                    [app.slug]: value[0] / 100,
                  })
                  trackFieldEdit(`automation_${app.slug}`, oldValue * 100, value[0])
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upsell Revenue */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <Label htmlFor="show-upsell" className="flex items-center cursor-pointer">
            <span className="mr-2">Show Upsell Revenue (Garrio only)</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs p-2">
                  <p className="text-sm">
                    Garrio's AI suggests relevant products during support conversations, increasing average order value.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Switch
            id="show-upsell"
            checked={showUpsellRevenue}
            onCheckedChange={(checked) => {
              setShowUpsellRevenue(checked)
              trackFieldEdit("show_upsell", showUpsellRevenue ? 1 : 0, checked ? 1 : 0)
            }}
          />
        </div>

        {showUpsellRevenue && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <Label htmlFor="average-order-value" className="block mb-2">
                Average Order Value
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="average-order-value"
                  type="number"
                  min={1}
                  value={averageOrderValue}
                  onChange={(e) => {
                    const oldValue = averageOrderValue
                    const newValue = Number.parseInt(e.target.value) || 1
                    setAverageOrderValue(newValue)
                    trackFieldEdit("average_order_value", oldValue, newValue)
                  }}
                  className="pl-8"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="conversion-rate" className="block mb-2">
                Chat-to-Purchase Rate
              </Label>
              <div className="relative">
                <Input
                  id="conversion-rate"
                  type="number"
                  min={0.01}
                  max={1}
                  step={0.01}
                  value={conversionRate}
                  onChange={(e) => {
                    const oldValue = conversionRate
                    const newValue = Number.parseFloat(e.target.value) || 0.01
                    setConversionRate(Math.min(1, newValue))
                    trackFieldEdit("conversion_rate", oldValue, newValue)
                  }}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Percentage of chat conversations that result in a purchase.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
