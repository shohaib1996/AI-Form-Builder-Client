"use client"

import { useQuery } from "@tanstack/react-query"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChartIcon, Loader2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import { dashboardApi } from "@/lib/dashboard-api"
import { useState } from "react"


interface FormResponseData {
  formName: string
  count: number
}

interface ProcessedFormData extends FormResponseData {
  fill: string
  isOthers?: boolean
  otherForms?: FormResponseData[]
}

const COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // purple
  "#06b6d4", // cyan
  "#f97316", // orange
  "#84cc16", // lime
  "#ec4899", // pink
  "#6366f1", // indigo
]

const MAX_VISIBLE_FORMS = 4 // Show only top 4 forms
const MAX_LEGEND_ITEMS = 4 // Show only 4 items in legend

const ResponsesByFormChart = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ["responses-by-form"],
    queryFn: dashboardApi.getResponsesByForm,
  })

  // Process data to show only top 4 forms and group others
  const processedData = (): ProcessedFormData[] => {
    if (!data || data.length === 0) return []

    // Sort by count descending
    const sortedData = [...data].sort((a, b) => b.count - a.count)

    if (sortedData.length <= MAX_VISIBLE_FORMS) {
      // If we have 4 or fewer forms, show all
      return sortedData.map((item, index) => ({
        ...item,
        fill: COLORS[index % COLORS.length],
      }))
    }

    // Take top 3 forms and group the rest as "Others"
    const topForms = sortedData.slice(0, MAX_VISIBLE_FORMS - 1)
    const otherForms = sortedData.slice(MAX_VISIBLE_FORMS - 1)
    const othersCount = otherForms.reduce((sum, form) => sum + form.count, 0)

    const result: ProcessedFormData[] = [
      ...topForms.map((item, index) => ({
        ...item,
        fill: COLORS[index % COLORS.length],
      })),
      {
        formName: `Others (${otherForms.length} forms)`,
        count: othersCount,
        fill: "#9ca3af", // gray color for others
        isOthers: true,
        otherForms: otherForms,
      },
    ]

    return result
  }

  const chartData = processedData()
  const hasOthers = chartData.some((item) => item.isOthers)

  if (isLoading) {
    return (
      <Card className="h-auto min-h-[300px] sm:min-h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5" />
            Responses by Form
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px] sm:h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600 dark:text-purple-400" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="h-auto min-h-[300px] sm:min-h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5" />
            Responses by Form
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px] sm:h-[300px]">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Failed to load data</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-auto min-h-[300px] sm:min-h-[400px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          Responses by Form
        </CardTitle>
        <CardDescription>
          Distribution of responses across forms (top 4)
          {data && data.length > MAX_VISIBLE_FORMS && (
            <span className="text-xs text-gray-500 ml-2">(Showing top {MAX_VISIBLE_FORMS - 1} forms + others)</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            count: {
              label: "Responses",
            },
          }}
          className="h-[200px] sm:h-[250px] w-full"
        >
          <div className="w-full overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius="30%"
                  outerRadius="80%"
                  dataKey="count"
                  nameKey="formName"
                >
                  {chartData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        {/* Compact Legend - Always show only 4 items max */}
        <div className="mt-2 sm:mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs sm:text-sm">
            {chartData?.slice(0, MAX_LEGEND_ITEMS).map((item) => (
              <div key={item.formName} className="flex items-center gap-2 p-1">
                <div
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-gray-700 dark:text-gray-300 truncate flex-1">
                  {item.formName.length > 20 ? `${item.formName.substring(0, 20)}...` : item.formName}
                </span>
                <span className="text-gray-500 dark:text-gray-400 font-medium">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ResponsesByFormChart
