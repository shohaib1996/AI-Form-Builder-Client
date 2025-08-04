"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { fetchPlanDistribution } from "@/lib/api"

ChartJS.register(ArcElement, Tooltip, Legend)

const PlanDistributionChart = () => {
  const [data, setData] = useState<{ plan: string; count: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchPlanDistribution()
        setData(result)
      } catch (error) {
        console.error("Failed to fetch plan distribution data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const chartData = {
    labels: data.map(item => item.plan),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
        borderWidth: 2,
        borderColor: "#fff",
        hoverOffset: 20,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
      easing: "easeInOutQuad" as const,
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      legend: { position: "top" as const, labels: { color: "" } },
      title: { display: true, text: "Plan Distribution", color: "" },
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
          <CardTitle>Plan Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-64 sm:h-72 md:h-80 p-2">
          {loading ? <p className="text-white">Loading...</p> : <Pie data={chartData} options={chartOptions} />}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default PlanDistributionChart