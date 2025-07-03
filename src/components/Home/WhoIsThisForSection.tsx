"use client"

import { motion, easeInOut } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  Mail,
  Users,
  GraduationCap,
  Lightbulb,
  Laptop,
  ClipboardList,
  Star,
  Target,
  Sparkles,
  Zap,
  Rocket,
} from "lucide-react"
import Image from "next/image"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const floatingAnimation = {
  animate: {
    y: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      ease: easeInOut,
    },
  },
}

const userTypes = [
  {
    title: "Marketers",
    description: "Launch lead generation forms without help from developers",
    icon: Mail,
    bgColor: "from-purple-500 via-pink-500 to-rose-500",
    darkBgColor: "dark:from-purple-600 dark:via-pink-600 dark:to-rose-600",
    illustration: Laptop,
    image: "https://cronuts.digital/wp-content/uploads/2023/08/digital-marketer.jpg",
    accent: "purple",
  },
  {
    title: "HR Teams",
    description: "Create job applications, onboarding, and feedback forms",
    icon: Users,
    bgColor: "from-blue-500 via-cyan-500 to-teal-500",
    darkBgColor: "dark:from-blue-600 dark:via-cyan-600 dark:to-teal-600",
    illustration: Users,
    image:
      "https://i0.wp.com/cezannehr.com/wp-content/uploads/2024/01/6-reasons-why-people-love-working-in-HR.png?fit=5200%2C2925&ssl=1",
    accent: "blue",
  },
  {
    title: "Educators",
    description: "Build quizzes, assessments, and surveys in minutes",
    icon: GraduationCap,
    bgColor: "from-green-500 via-emerald-500 to-teal-500",
    darkBgColor: "dark:from-green-600 dark:via-emerald-600 dark:to-teal-600",
    illustration: ClipboardList,
    image:
      "https://conecta.tec.mx/sites/default/files/styles/header_full/public/2024-11/materiales-didacticos-inteligencia-artificial.webp?itok=bh56Ja8S",
    accent: "green",
  },
  {
    title: "Founders",
    description: "Validate ideas fast with no code prototypes. Test concepts with real users.",
    icon: Lightbulb,
    bgColor: "from-orange-500 via-red-500 to-pink-500",
    darkBgColor: "dark:from-orange-600 dark:via-red-600 dark:to-pink-600",
    illustration: Star,
    image: "https://www.chicagoinstituteofbusiness.com/blog/sales.jpg",
    accent: "orange",
  },
]

const floatingElements = [
  { icon: Sparkles, delay: 0, x: "10%", y: "20%" },
  { icon: Zap, delay: 2, x: "80%", y: "30%" },
  { icon: Rocket, delay: 4, x: "15%", y: "70%" },
  { icon: Star, delay: 1, x: "85%", y: "80%" },
]

export function WhoIsThisForSection() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-blue-950/30 dark:to-purple-950/30">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 dark:from-purple-400/10 dark:via-transparent dark:to-blue-400/10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating background elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute opacity-5 dark:opacity-10 animate-spin"
          style={{ left: element.x, top: element.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ delay: element.delay, duration: 2 }}
          variants={floatingAnimation}
        >
          <element.icon className="w-12 h-12 text-purple-500" />
        </motion.div>
      ))}

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              <Sparkles className="w-8 h-8 mx-auto mb-2" />
            </div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-slate-100 dark:via-purple-100 dark:to-slate-100 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Who is this for?
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Our AI form builder is designed for teams and individuals who want to create professional forms quickly and
            effortlessly
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {userTypes.map((userType, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/20 transition-all duration-500 group overflow-hidden border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-0">
                <CardContent className="p-0 relative">
                  {/* Card gradient border effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${userType.bgColor} ${userType.darkBgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}
                    style={{ padding: "2px" }}
                  >
                    <div className="w-full h-full bg-white dark:bg-slate-900 rounded-lg" />
                  </div>

                  <div className="relative z-10 p-6">
                    {/* Image with overlay effect */}
                    <div className="relative overflow-hidden rounded-xl mb-6">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-t ${userType.bgColor} ${userType.darkBgColor} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10`}
                        whileHover={{ opacity: 0.3 }}
                      />
                      <Image
                        src={userType.image || "/placeholder.svg"}
                        alt={userType.title}
                        className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                        width={500}
                        height={300}
                      />

                      {/* Floating icon overlay */}
                      <motion.div
                        className="absolute top-4 right-4 z-20"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${userType.bgColor} ${userType.darkBgColor} rounded-full flex items-center justify-center shadow-lg`}
                        >
                          <userType.icon className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                    </div>

                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <motion.div
                          className={`w-16 h-16 bg-gradient-to-br ${userType.bgColor} ${userType.darkBgColor} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                          whileHover={{
                            scale: 1.15,
                            rotate: 10,
                            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <userType.icon className="w-8 h-8 text-white" />
                        </motion.div>
                      </div>

                      <div className="flex-1">
                        <motion.h3
                          className={`text-2xl font-bold mb-3 group-hover:bg-gradient-to-r group-hover:${userType.bgColor} group-hover:${userType.darkBgColor} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}
                          whileHover={{ x: 5 }}
                        >
                          {userType.title}
                        </motion.h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">{userType.description}</p>
                      </div>

                      <motion.div
                        className="flex-shrink-0 opacity-20 group-hover:opacity-60 transition-all duration-300"
                        whileHover={{ scale: 1.2, rotate: 15 }}
                      >
                        <userType.illustration className="w-12 h-12 text-muted-foreground" />
                      </motion.div>
                    </div>

                    {/* Animated decorative elements */}
                    <div className="absolute top-4 left-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                      <motion.div
                        className={`w-20 h-20 bg-gradient-to-br ${userType.bgColor} ${userType.darkBgColor} rounded-full blur-xl`}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: index * 0.5,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced bottom section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-white/50 to-purple-50/50 dark:from-slate-800/50 dark:to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-200/20 dark:border-purple-800/20">
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-80">
              {[
                { icon: Target, text: "No coding required", color: "purple" },
                { icon: Zap, text: "Ready in seconds", color: "blue" },
                { icon: Sparkles, text: "Professional results", color: "green" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={`w-10 h-10 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 dark:from-${item.color}-400 dark:to-${item.color}-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-300">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
