"use client"

import { useQuery } from "@tanstack/react-query"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Activity, Loader2, AlertCircle } from "lucide-react"
import { dashboardApi } from "@/lib/dashboard-api"

const FormStatusChart = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["form-status"],
    queryFn: dashboardApi.getFormStatus,
  })

  const chartData = data?.map((item) => ({
    name: item.status ? "Published" : "Unpublished",
    count: item.count,
    fill: item.status ? "#10b981" : "#ef4444", // green for published, red for unpublished
  }))

  if (isLoading) {
    return (
      <Card className="h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Form Status
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-orange-600 dark:text-orange-400" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Form Status
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
          <Activity className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          Form Status
        </CardTitle>
        <CardDescription>Published vs unpublished forms</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            count: {
              label: "Forms",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="count" nameKey="name">
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
            <div key={item.name} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="text-gray-700 dark:text-gray-300">
                {item.name}: {item.count} forms
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default FormStatusChart
