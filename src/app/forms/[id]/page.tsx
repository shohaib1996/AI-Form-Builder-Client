"use client"

import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import DynamicForm from "@/components/DynamicForm/DynamicForm"
import { notFound } from "next/navigation"
import api from "@/lib/axios"
import { motion } from "framer-motion"
import { FileX, Lock, AlertCircle } from "lucide-react"

export default function FormPage() {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  const { data, isLoading, error } = useQuery({
    queryKey: ["form", id],
    queryFn: async () => {
      const res = await api.get(`/form/${id}`)
      return res.data
    },
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <motion.div
          className="p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg max-w-2xl w-full mx-4 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-12 h-12 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <p className="text-gray-600 dark:text-gray-300 text-lg">Loading form...</p>
        </motion.div>
      </div>
    )
  }

  if (error || !data?.success || !data.data) {
    notFound()
  }

  const formData = data.data

  // Check if form is published
  if (!formData.isPublished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <motion.div
          className="max-w-md w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
              <Lock className="w-12 h-12 text-white" />
            </div>
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <AlertCircle className="w-5 h-5 text-white" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Form Not Available</h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
              This form is currently unpublished and not accepting responses. Please contact the form owner for more
              information.
            </p>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex items-center justify-center space-x-3 text-gray-500 dark:text-gray-400">
              <FileX className="w-5 h-5" />
              <span className="text-sm font-medium">Form Status: Unpublished</span>
            </div>
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
            >
              Go Back
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  // const handleFormSubmit = (formValues: Record<string, any>) => {
  //   console.log("Form submission data:", formValues)
  //   // You can send the submission to your backend here
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div
        className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-xl max-w-5xl w-full border border-gray-200 dark:border-gray-700 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">{formData.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{formData.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <DynamicForm fields={formData.fields.fields} formId={formData._id} />
        </motion.div>
      </motion.div>
    </div>
  )
}
