"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Zap, Shield, BarChart3 } from "lucide-react"

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

const features = [
  {
    icon: Brain,
    title: "AI-Powered Generation",
    description: "Create complex forms instantly with natural language prompts",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate professional forms in seconds, not hours",
  },
  {
    icon: Shield,
    title: "Smart Validation",
    description: "Automatic field validation and error handling built-in",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Get insights on form performance and user behavior",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-blue-950/30 dark:to-purple-950/30">
      <div className="container mx-auto ">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Unlock the Full Power of AI</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI doesn&apos;t just create forms—it understands your needs and builds intelligent, responsive forms that
            work perfectly for your use case.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                <CardContent className="p-6">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
