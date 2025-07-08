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
      <Card className="h-auto min-h-[300px] sm:min-h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Form Status
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px] sm:h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-orange-600 dark:text-orange-400" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="h-auto min-h-[300px] sm:min-h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Form Status
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
          <Activity className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          Form Status
        </CardTitle>
        <CardDescription>Published vs unpublished forms</CardDescription>
      </CardHeader>
      <CardContent className="">
        <ChartContainer
          config={{
            count: {
              label: "Forms",
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
                  nameKey="name"
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

        {/* Legend */}
        <div className="mt-2 sm:mt-4 space-y-1 sm:space-y-2 pb-2 sm:pb-5">
          {chartData?.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-xs sm:text-sm">
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.fill }}
              />
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
