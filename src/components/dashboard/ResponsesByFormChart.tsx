"use client"

import { useQuery } from "@tanstack/react-query"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChartIcon, Loader2, AlertCircle } from "lucide-react"
import { dashboardApi } from "@/lib/dashboard-api"

const COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // purple
  "#06b6d4", // cyan
  "#f97316", // orange
  "#84cc16", // lime
]

const ResponsesByFormChart = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["responses-by-form"],
    queryFn: dashboardApi.getResponsesByForm,
  })

  const chartData = data?.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }))

  if (isLoading) {
    return (
      <Card className="h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5" />
            Responses by Form
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600 dark:text-purple-400" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5" />
            Responses by Form
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Failed to load data</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          Responses by Form
        </CardTitle>
        <CardDescription>Distribution of responses across forms</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            count: {
              label: "Responses",
            },
            formName: {
              label: "Form Name",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" outerRadius={80} dataKey="count" nameKey="formName">
                {chartData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Legend */}
        <div className="mt-4 space-y-2 pb-5">
          {chartData?.map((item) => (
            <div key={item.formName} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="text-gray-700 dark:text-gray-300 truncate">
                {item.formName}: {item.count} responses
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ResponsesByFormChart
