"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useMutation } from "@tanstack/react-query"
import api from "@/lib/axios"
import { HeroContent } from "./HeorContent"
import { TitleDialog } from "./TitleDialog"
import { FormDialog } from "./FormDialog"
import { useAuth } from "@/auth/authContext" // Import useAuth

type GeneratedFormType = {
  _id: string
  title: string
  description?: string
  fields: {
    fields: Array<any>
  }
}

const templateNames = [
  "Job Application Form",
  "Customer Feedback Survey",
  "Event Registration Form",
  "Newsletter Signup",
  "Order / Checkout Form",
  "Appointment Booking Form",
  "Coupon Redemption Form",
  "Contact Us Form",
  "Product Review Form",
  "Lead Generation Form",
]

const templateStyles: Record<number, string> = {
  1: "bg-blue-100",
  2: "bg-green-100",
  3: "bg-yellow-100",
  4: "bg-red-100",
  5: "bg-purple-100",
  6: "bg-pink-100",
  7: "bg-indigo-100",
  8: "bg-teal-100",
  9: "bg-orange-100",
  10: "bg-gray-100",
}

export function HeroSection() {
  const { refetchUser } = useAuth() // Get refetchUser from useAuth
  const [prompt, setPrompt] = useState("")
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("")
  const [isTitleDialogOpen, setIsTitleDialogOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [generatedForm, setGeneratedForm] = useState<GeneratedFormType | null>(null)
  // const [selectedTemplate, setSelectedTemplate] = useState(1);

  const fullPlaceholder = "Describe your form... e.g., 'Create a job application form!'"

  useEffect(() => {
    let currentIndex = 0
    let timeout: NodeJS.Timeout

    const type = () => {
      if (currentIndex <= fullPlaceholder.length) {
        setAnimatedPlaceholder(fullPlaceholder.slice(0, currentIndex))
        currentIndex++
        timeout = setTimeout(type, 50)
      } else {
        setTimeout(() => {
          currentIndex = 0
          type()
        }, 2000)
      }
    }

    type()

    return () => clearTimeout(timeout)
  }, [])

  const generateFormMutation = useMutation({
    mutationFn: async ({
      prompt,
      title,
      description,
    }: {
      prompt: string
      title: string
      description: string
    }) => {
      const response = await api.post("/form/ai", {
        prompt,
        title,
        description,
      })
      return response.data
    },
    onSuccess: (data) => {
      setGeneratedForm(data.data)
      setPrompt("")
      setTitle("")
      setDescription("")
      refetchUser() // Call refetchUser after successful form creation
    },
    onError: (error) => {
      console.error("Form generation failed:", error)
    },
  })

  const getFormUrl = (id: string) =>
    typeof window !== "undefined" ? `${window.location.origin}/forms/${id}` : `/forms/${id}`

  const handleFormSubmit = (formValues: Record<string, any>) => {
    console.log("Form submission data:", formValues)
  }

  const handleTitleSubmit = () => {
    if (title) {
      setIsTitleDialogOpen(false)
      setIsFormDialogOpen(true)
      setGeneratedForm(null)
      generateFormMutation.mutate({ prompt, title, description })
    }
  }

  return (
    <section className="py-2 px-4 relative overflow-visible">
      {/* Corner Blinking Effects */}
      <motion.div
        className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-80"
        animate={{
          backgroundColor: [
            "rgba(221, 22, 128, 0.8)",
            "rgba(255, 105, 180, 0.8)",
            "rgba(147, 112, 219, 0.8)",
            "rgba(255, 165, 0, 0.8)",
            "rgba(0, 191, 255, 0.8)",
          ],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-44 h-44 rounded-full blur-3xl opacity-80"
        animate={{
          backgroundColor: [
            "rgba(221, 22, 128, 0.8)",
            "rgba(255, 105, 180, 0.8)",
            "rgba(147, 112, 219, 0.8)",
            "rgba(255, 165, 0, 0.8)",
            "rgba(0, 191, 255, 0.8)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* Floating SVG Elements */}
      <motion.div
        className="absolute top-20 left-10 text-purple-300 opacity-30"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-32 right-20 text-pink-300 opacity-30"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-40 left-1/4 text-blue-300 opacity-30"
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <polygon points="12,2 22,20 2,20" />
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 22,20 2,20" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-60 right-1/4 text-green-300 opacity-30"
        animate={{ x: [0, 15, 0] }}
        transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-20 text-indigo-300 opacity-30"
        animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-16 text-yellow-300 opacity-30"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 10l-5 4.87 1.18 6.88L12 18.5l-6.18 3.25L7 15.87 2 11l7.91-1.74L12 2Z" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-8 text-rose-300 opacity-30"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute evidenright-8 text-teal-300 opacity-30"
        animate={{ x: [0, 15, 0] }}
        transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-1/3 text-purple-300 opacity-30"
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-16 right-1/3 text-orange-300 opacity-30"
        animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 10l-5 4.87 1.18 6.88L12 18.5l-6.18 3.25L7 15.87 2 11l7.91-1.74L12 2Z" />
        </svg>
      </motion.div>

      <div className="container mx-auto relative z-10">
        <HeroContent
          prompt={prompt}
          setPrompt={setPrompt}
          animatedPlaceholder={animatedPlaceholder}
          setIsTitleDialogOpen={setIsTitleDialogOpen}
        />
      </div>

      <TitleDialog
        isOpen={isTitleDialogOpen}
        setIsOpen={setIsTitleDialogOpen}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        onSubmit={handleTitleSubmit}
      />

      <FormDialog
        isOpen={isFormDialogOpen}
        setIsOpen={setIsFormDialogOpen}
        generatedForm={generatedForm}
        // selectedTemplate={selectedTemplate}
        // setSelectedTemplate={setSelectedTemplate}
        templateNames={templateNames}
        templateStyles={templateStyles}
        getFormUrl={getFormUrl}
        handleFormSubmit={handleFormSubmit}
        mutationStatus={generateFormMutation.status}
        mutationError={generateFormMutation.error as Error | null}
      />
    </section>
  )
}
