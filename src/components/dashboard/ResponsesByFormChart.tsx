"use client"

import { useQuery } from "@tanstack/react-query"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChartIcon, Loader2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import { dashboardApi } from "@/lib/dashboard-api"
import { useState } from "react"
import { Button } from "@/components/ui/button"

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

const MAX_VISIBLE_FORMS = 8 // Show top 8 forms, group rest as "Others"

const ResponsesByFormChart = () => {
  const [showAllLegend, setShowAllLegend] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ["responses-by-form"],
    queryFn: dashboardApi.getResponsesByForm,
  })

  // Process data to show top forms and group others
  const processedData = (): ProcessedFormData[] => {
    if (!data || data.length === 0) return []

    // Sort by count descending
    const sortedData = [...data].sort((a, b) => b.count - a.count)

    if (sortedData.length <= MAX_VISIBLE_FORMS) {
      // If we have few forms, show all
      return sortedData.map((item, index) => ({
        ...item,
        fill: COLORS[index % COLORS.length],
      }))
    }

    // Take top forms and group the rest
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
          Distribution of responses across forms(top 4)
          {data && data.length > MAX_VISIBLE_FORMS && (
            <span className="text-xs text-gray-500 ml-2">(Showing top {MAX_VISIBLE_FORMS - 1} forms)</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="">
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

        {/* Compact Legend */}
        <div className="mt-2 sm:mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs sm:text-sm">
            {chartData?.slice(0, showAllLegend ? undefined : 6).map((item) => (
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

          {/* Show More/Less Button */}
          {chartData && chartData.length > 6 && (
            <div className="mt-3 text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllLegend(!showAllLegend)}
                className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
              >
                {showAllLegend ? (
                  <>
                    <ChevronUp className="h-3 w-3 mr-1" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" />
                    Show All ({chartData.length} items)
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Others Breakdown */}
          {hasOthers && showAllLegend && (
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Other Forms Breakdown:</h4>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {chartData
                  .find((item) => item.isOthers)
                  ?.otherForms?.map((form: FormResponseData, index: number) => (
                    <div key={index} className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span className="truncate flex-1 mr-2">
                        {form.formName.length > 25 ? `${form.formName.substring(0, 25)}...` : form.formName}
                      </span>
                      <span>{form.count}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ResponsesByFormChart
