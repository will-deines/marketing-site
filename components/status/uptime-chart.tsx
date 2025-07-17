"use client"

import { useEffect, useRef } from "react"

type UptimeChartProps = {
  data: { date: string; uptime: number }[]
}

export default function UptimeChart({ data }: UptimeChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current || !data.length) return

    // In a real implementation, we would use a charting library like Chart.js or Recharts
    // For this example, we'll create a simple SVG chart

    const width = chartRef.current.clientWidth
    const height = 200
    const padding = { top: 20, right: 20, bottom: 30, left: 40 }

    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Clear previous chart
    chartRef.current.innerHTML = ""

    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("width", width.toString())
    svg.setAttribute("height", height.toString())
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`)

    // Create group for chart content
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g")
    g.setAttribute("transform", `translate(${padding.left}, ${padding.top})`)

    // X scale
    const xScale = (i: number) => (i / (data.length - 1)) * chartWidth

    // Y scale
    const yScale = (value: number) => chartHeight - ((value - 90) / 10) * chartHeight

    // Create path for area
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")

    let pathD = `M 0 ${yScale(data[0].uptime)}`

    // Add line segments
    data.forEach((point, i) => {
      pathD += ` L ${xScale(i)} ${yScale(point.uptime)}`
    })

    // Complete the area path
    pathD += ` L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`

    path.setAttribute("d", pathD)
    path.setAttribute("fill", "url(#uptimeGradient)")
    path.setAttribute("stroke", "hsl(var(--brand-primary))")
    path.setAttribute("stroke-width", "1.5")

    // Create gradient
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")
    const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient")
    gradient.setAttribute("id", "uptimeGradient")
    gradient.setAttribute("x1", "0%")
    gradient.setAttribute("y1", "0%")
    gradient.setAttribute("x2", "0%")
    gradient.setAttribute("y2", "100%")

    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
    stop1.setAttribute("offset", "0%")
    stop1.setAttribute("stop-color", "hsl(var(--brand-primary))")
    stop1.setAttribute("stop-opacity", "0.5")

    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
    stop2.setAttribute("offset", "100%")
    stop2.setAttribute("stop-color", "hsl(var(--brand-primary))")
    stop2.setAttribute("stop-opacity", "0.1")

    gradient.appendChild(stop1)
    gradient.appendChild(stop2)
    defs.appendChild(gradient)

    // Add X axis
    const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line")
    xAxis.setAttribute("x1", "0")
    xAxis.setAttribute("y1", chartHeight.toString())
    xAxis.setAttribute("x2", chartWidth.toString())
    xAxis.setAttribute("y2", chartHeight.toString())
    xAxis.setAttribute("stroke", "#e5e7eb")

    // Add Y axis
    const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line")
    yAxis.setAttribute("x1", "0")
    yAxis.setAttribute("y1", "0")
    yAxis.setAttribute("x2", "0")
    yAxis.setAttribute("y2", chartHeight.toString())
    yAxis.setAttribute("stroke", "#e5e7eb")

    // Add Y axis labels
    const yLabels = [90, 95, 100]
    yLabels.forEach((label) => {
      const y = yScale(label)

      const labelText = document.createElementNS("http://www.w3.org/2000/svg", "text")
      labelText.setAttribute("x", "-5")
      labelText.setAttribute("y", y.toString())
      labelText.setAttribute("text-anchor", "end")
      labelText.setAttribute("dominant-baseline", "middle")
      labelText.setAttribute("font-size", "10")
      labelText.setAttribute("fill", "#6b7280")
      labelText.textContent = `${label}%`

      const gridLine = document.createElementNS("http://www.w3.org/2000/svg", "line")
      gridLine.setAttribute("x1", "0")
      gridLine.setAttribute("y1", y.toString())
      gridLine.setAttribute("x2", chartWidth.toString())
      gridLine.setAttribute("y2", y.toString())
      gridLine.setAttribute("stroke", "#e5e7eb")
      gridLine.setAttribute("stroke-dasharray", "2,2")

      g.appendChild(gridLine)
      g.appendChild(labelText)
    })

    // Add X axis labels (first, middle, last)
    const xLabels = [0, Math.floor(data.length / 2), data.length - 1]
    xLabels.forEach((i) => {
      const x = xScale(i)

      const labelText = document.createElementNS("http://www.w3.org/2000/svg", "text")
      labelText.setAttribute("x", x.toString())
      labelText.setAttribute("y", (chartHeight + 15).toString())
      labelText.setAttribute("text-anchor", "middle")
      labelText.setAttribute("font-size", "10")
      labelText.setAttribute("fill", "#6b7280")

      const date = new Date(data[i].date)
      labelText.textContent = date.toLocaleDateString("en-US", { month: "short", day: "numeric" })

      g.appendChild(labelText)
    })

    // Add data points with tooltips
    data.forEach((point, i) => {
      const x = xScale(i)
      const y = yScale(point.uptime)

      const dataPoint = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      dataPoint.setAttribute("cx", x.toString())
      dataPoint.setAttribute("cy", y.toString())
      dataPoint.setAttribute("r", "3")
      dataPoint.setAttribute("fill", "hsl(var(--brand-primary))")

      // Add tooltip on hover
      dataPoint.addEventListener("mouseenter", (e) => {
        const tooltip = document.createElement("div")
        tooltip.className = "absolute bg-white p-2 rounded shadow-md text-xs z-10"
        tooltip.style.left = `${e.clientX}px`
        tooltip.style.top = `${e.clientY - 40}px`
        tooltip.innerHTML = `
          <div class="font-medium">${new Date(point.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</div>
          <div>Uptime: ${point.uptime.toFixed(2)}%</div>
        `
        tooltip.id = "chart-tooltip"
        document.body.appendChild(tooltip)
      })

      dataPoint.addEventListener("mouseleave", () => {
        const tooltip = document.getElementById("chart-tooltip")
        if (tooltip) tooltip.remove()
      })

      g.appendChild(dataPoint)
    })

    // Assemble the chart
    svg.appendChild(defs)
    svg.appendChild(g)
    g.appendChild(xAxis)
    g.appendChild(yAxis)
    g.appendChild(path)

    // Add the chart to the DOM
    chartRef.current.appendChild(svg)

    // Add hidden table for screen readers
    const table = document.createElement("table")
    table.className = "sr-only"
    table.innerHTML = `
      <caption>90-Day Uptime Chart</caption>
      <thead>
        <tr>
          <th>Date</th>
          <th>Uptime Percentage</th>
        </tr>
      </thead>
      <tbody>
        ${data
          .map(
            (point) => `
          <tr>
            <td>${new Date(point.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</td>
            <td>${point.uptime.toFixed(2)}%</td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    `

    chartRef.current.appendChild(table)
  }, [data])

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">90-Day Uptime</h2>
      <div ref={chartRef} className="w-full h-[250px]" aria-label="90-day uptime chart"></div>
    </div>
  )
}
