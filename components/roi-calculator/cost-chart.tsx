"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface CostChartProps {
  costs: Record<string, { total: number; agentCost: number; softwareCost: number }>
  apps: Array<{ slug: string; name: string }>
  formatCurrency: (value: number) => string
  timePeriod: "monthly" | "annual"
}

export default function CostChart({ costs, apps, formatCurrency, timePeriod }: CostChartProps) {
  const [activeBar, setActiveBar] = useState<string | null>(null)

  // Prepare data for chart
  const chartData = apps
    .map((app) => ({
      name: app.name,
      slug: app.slug,
      total: costs[app.slug]?.total || 0,
      agentCost: costs[app.slug]?.agentCost || 0,
      softwareCost: costs[app.slug]?.softwareCost || 0,
    }))
    .sort((a, b) => a.total - b.total)

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-md rounded-md">
          <p className="font-bold mb-2">{data.name}</p>
          <div className="space-y-1">
            <p className="text-sm flex justify-between">
              <span className="text-gray-600 mr-4">Agent Cost:</span>
              <span className="font-medium">{formatCurrency(data.agentCost)}</span>
            </p>
            <p className="text-sm flex justify-between">
              <span className="text-gray-600 mr-4">Software Cost:</span>
              <span className="font-medium">{formatCurrency(data.softwareCost)}</span>
            </p>
            <div className="border-t border-gray-200 my-1 pt-1">
              <p className="text-sm flex justify-between font-bold">
                <span>Total:</span>
                <span>{formatCurrency(data.total)}</span>
              </p>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          barGap={10}
          barSize={60}
          onMouseMove={(data) => {
            if (data.activeTooltipIndex !== undefined) {
              setActiveBar(chartData[data.activeTooltipIndex]?.slug || null)
            }
          }}
          onMouseLeave={() => setActiveBar(null)}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#E5E7EB" }}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tickFormatter={(value) => formatCurrency(value)}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#E5E7EB" }}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="total" name="Total Cost">
            {chartData.map((entry) => (
              <Cell
                key={entry.slug}
                fill={entry.slug === "garrio" ? "#9333EA" : activeBar === entry.slug ? "#9CA3AF" : "#D1D5DB"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
