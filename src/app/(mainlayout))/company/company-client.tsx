"use client"

import { motion } from "framer-motion"
import { Trees, Users, Target, Award, ArrowRight, Sparkles } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


export default function CompanyPage() {
  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible in form building technology.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a supportive ecosystem where creators can thrive and collaborate.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Delivering exceptional quality in every feature and interaction we create.",
    },
    {
      icon: Sparkles,
      title: "Simplicity",
      description: "Making complex form building simple and accessible for everyone.",
    },
  ]

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50K+", label: "Forms Created" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-emerald-900/10 dark:to-gray-900">

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 dark:from-purple-400/5 dark:to-pink-400/5" />

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl mb-8 shadow-xl"
          >
            <Trees className="h-10 w-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Mission</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            To innovate and empower the world by making form building accessible, intuitive, and powerful for creators
            everywhere.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10"
          >
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Learn More About Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our company culture.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-emerald-200 dark:group-hover:border-emerald-800">
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{value.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800/50 dark:to-purple-900/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">Our Story</h2>
            <div className="prose prose-lg prose-emerald dark:prose-invert mx-auto">
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Founded with a vision to democratize form building, we started as a small team of passionate developers
                who believed that creating powerful forms shouldn&apos;t require extensive technical knowledge.
              </p>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Today, we&apos;re proud to serve thousands of users worldwide, from individual creators to enterprise teams,
                helping them collect data, engage audiences, and build meaningful connections through beautifully
                designed forms.
              </p>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Our journey is just beginning, and we&apos;re excited to continue innovating and empowering creators
                everywhere to bring their ideas to life.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
