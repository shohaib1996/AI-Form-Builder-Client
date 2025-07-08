"use client"

import { motion } from "framer-motion"
import FormsPerMonthChart from "@/components/dashboard/FormsPerMonthChart"
import ResponsesOverTimeChart from "@/components/dashboard/ResponsesOverTimeChart"
import ResponsesByFormChart from "@/components/dashboard/ResponsesByFormChart"
import FormStatusChart from "@/components/dashboard/FormStatusChart"

const Dashboard = () => {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 w-full min-w-0 overflow-hidden">
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
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Forms per Month */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="w-full min-w-0"
        >
          <FormsPerMonthChart />
        </motion.div>

        {/* Responses Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full min-w-0"
        >
          <ResponsesOverTimeChart />
        </motion.div>

        {/* Responses by Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full min-w-0"
        >
          <ResponsesByFormChart />
        </motion.div>

        {/* Form Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full min-w-0"
        >
          <FormStatusChart />
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
