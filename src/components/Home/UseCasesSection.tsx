"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const useCases = [
  {
    title: "Contact Forms",
    description: "Professional contact forms with smart field validation",
  },
  {
    title: "Survey Forms",
    description: "Comprehensive surveys with conditional logic",
  },
  {
    title: "Registration Forms",
    description: "Event and user registration with custom fields",
  },
  {
    title: "Feedback Forms",
    description: "Customer feedback collection with rating systems",
  },
]

export function UseCasesSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Create Any Form with a Prompt</h2>
          <p className="text-xl text-muted-foreground">From simple contact forms to complex multi-step surveys</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border"
            >
              <motion.div whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.3 }}>
                <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
              <p className="text-muted-foreground">{useCase.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
