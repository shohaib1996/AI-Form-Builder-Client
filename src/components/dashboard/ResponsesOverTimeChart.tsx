"use client"

import { useQuery } from "@tanstack/react-query"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, Loader2, AlertCircle } from "lucide-react"
import { dashboardApi } from "@/lib/dashboard-api"

const ResponsesOverTimeChart = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["responses-over-time"],
    queryFn: dashboardApi.getResponsesOverTime,
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const chartData = data?.map((item) => ({
    ...item,
    formattedDate: formatDate(item.date),
  }))

  if (isLoading) {
    return (
      <Card className="h-[300px] sm:h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Responses Over Time
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px] sm:h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-green-600 dark:text-green-400" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="h-[300px] sm:h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Responses Over Time
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
    <Card className="h-[300px] sm:h-[400px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
          Responses Over Time
        </CardTitle>
        <CardDescription>Form responses received over time</CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-6 pb-4 sm:pb-8">
        <ChartContainer
          config={{
            count: {
              label: "Responses",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[200px] sm:h-[300px] w-full"
        >
          <div className="w-full overflow-hidden">
            <ResponsiveContainer width="100%" height="100%" minHeight={200}>
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
                <XAxis dataKey="formattedDate" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="var(--color-count)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-count)", strokeWidth: 2, r: 4 }}
                  className="stroke-green-600 dark:stroke-green-400"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default ResponsesOverTimeChart
