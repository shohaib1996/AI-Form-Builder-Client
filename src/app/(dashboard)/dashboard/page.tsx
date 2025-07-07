"use client"

import { useUser } from "@/auth/authProvider"
import FormsPerMonthChart from "@/components/dashboard/FormsPerMonthChart"
import FormStatusChart from "@/components/dashboard/FormStatusChart"
import ResponsesByFormChart from "@/components/dashboard/ResponsesByFormChart"
import ResponsesOverTimeChart from "@/components/dashboard/ResponsesOverTimeChart"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Dashboard = () => {
  const { user, loading } = useUser()
  const router = useRouter() // Move this to the top, before any conditional returns
  
  useEffect(() => {
    if (!user && !loading) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  // Handle loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="space-y-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Handle unauthenticated state
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Redirecting to sign in...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Overview of your forms and responses</p>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Forms per Month */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="lg:col-span-1"
        >
          <FormsPerMonthChart />
        </motion.div>

        {/* Responses Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-1"
        >
          <ResponsesOverTimeChart />
        </motion.div>

        {/* Responses by Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="lg:col-span-1"
        >
          <ResponsesByFormChart />
        </motion.div>

        {/* Form Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-1"
        >
          <FormStatusChart />
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard