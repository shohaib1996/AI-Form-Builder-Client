"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { fetchFormCreationTrend } from "@/lib/api"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const FormCreationTrendChart = () => {
  const [data, setData] = useState<{ month: string; count: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchFormCreationTrend()
        setData(result)
      } catch (error) {
        console.error("Failed to fetch form creation trend data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: "New Forms",
        data: data.map(item => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 2,
        barThickness: 50,
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
      title: { display: true, text: "Form Creation Trend", color: "" },
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
          <CardTitle>Form Creation Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-64 sm:h-72 md:h-80 p-2">
          {loading ? <p className="text-white">Loading...</p> : <Bar data={chartData} options={chartOptions} />}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default FormCreationTrendChart