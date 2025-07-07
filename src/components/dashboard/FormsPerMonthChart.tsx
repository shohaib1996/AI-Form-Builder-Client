"use client"

import { useQuery } from "@tanstack/react-query"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart3, Loader2, AlertCircle } from "lucide-react"
import { dashboardApi } from "@/lib/dashboard-api"

const FormsPerMonthChart = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["forms-per-month"],
    queryFn: dashboardApi.getFormsPerMonth,
  })

  if (isLoading) {
    return (
      <Card className="h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Forms per Month
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Forms per Month
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
          <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Forms per Month
        </CardTitle>
        <CardDescription>Number of forms created each month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            count: {
              label: "Forms",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="count"
                fill="var(--color-count)"
                radius={[4, 4, 0, 0]}
                className="fill-blue-600 dark:fill-blue-400"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default FormsPerMonthChart
