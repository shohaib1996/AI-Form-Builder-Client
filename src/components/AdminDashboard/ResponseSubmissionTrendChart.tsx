"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js"
import { fetchResponseSubmissionTrend } from "@/lib/api"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const ResponseSubmissionTrendChart = () => {
  const [data, setData] = useState<{ date: string; count: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchResponseSubmissionTrend()
        setData(result)
      } catch (error) {
        console.error("Failed to fetch response submission trend data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: "Responses",
        data: data.map(item => item.count),
        fill: true,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgb(153, 102, 255)",
        tension: 0.4,
        pointBackgroundColor: "rgb(153, 102, 255)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(153, 102, 255)",
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: "easeInOutQuad" as const,
    },
    scales: {
      x: {
        grid: { color: "rgba(211, 211, 211, 0.5)" },
      },
      y: {
        grid: { color: "rgba(211, 211, 211, 0.5)" },
      },
    },
    plugins: {
      legend: { position: "top" as const, labels: { color: "" } },
      title: { display: true, text: "Response Submission Trend" },
      tooltip: { backgroundColor: "rgba(0, 0, 0, 0.8)", titleColor: "#fff", bodyColor: "#fff" },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
    >
      <Card className="h-full bg-background">
        <CardHeader>
          <CardTitle>Response Submission Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-64 sm:h-72 md:h-80 p-2">
          {loading ? <p className="text-white">Loading...</p> : <Line data={chartData} options={chartOptions} />}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ResponseSubmissionTrendChart