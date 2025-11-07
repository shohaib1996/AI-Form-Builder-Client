"use client"

import { motion } from "framer-motion"
import { Zap, MessageCircle, Book, Video, ArrowRight, Users, Clock, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"


export default function SupportPage() {
  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      color: "blue",
      available: true,
    },
    {
      icon: Book,
      title: "Documentation",
      description: "Comprehensive guides and tutorials",
      action: "Browse Docs",
      color: "green",
      available: true,
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides with voice over",
      action: "Watch Videos",
      color: "purple",
      available: true,
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other users and experts",
      action: "Join Forum",
      color: "orange",
      available: true,
    },
  ]

  const faqItems = [
    {
      question: "How do I create my first form?",
      answer:
        "Getting started is easy! Simply click 'Create Form' in your dashboard and choose from our templates or start from scratch.",
    },
    {
      question: "Can I customize the design of my forms?",
      answer:
        "Our form builder offers extensive customization options including themes, colors, fonts, and layout options.",
    },
    {
      question: "Is there a limit to form responses?",
      answer:
        "Free accounts can collect up to 100 responses per month. Premium plans offer higher limits and unlimited responses.",
    },
    {
      question: "How do I integrate forms with other tools?",
      answer:
        "We support integrations with popular tools like Zapier, Google Sheets, Mailchimp, and many more through our API.",
    },
  ]

  const recentTopics = [
    { title: "Form validation best practices", replies: 23, time: "2 hours ago" },
    { title: "Custom CSS styling guide", replies: 15, time: "4 hours ago" },
    { title: "API integration examples", replies: 31, time: "6 hours ago" },
    { title: "Mobile optimization tips", replies: 18, time: "8 hours ago" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900">
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
            <Zap className="h-10 w-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            How can we{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              help
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-10"
          >
            Get in touch with our support team or visit our community forums for help and guidance.
          </motion.p>

       
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Support Channel
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Multiple ways to get the help you need, when you need it.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon
              const colorClasses = {
                blue: "from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
                green: "from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800",
                purple: "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
                orange: "from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700",
              }

              return (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="text-center pb-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-8 w-8 text-gray-600 dark:text-gray-300" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{option.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-600 dark:text-gray-300 mb-6">{option.description}</p>
                      <Button
                        className={`w-full bg-gradient-to-r ${colorClasses[option.color as keyof typeof colorClasses]} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                      >
                        {option.action}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800/50 dark:to-purple-900/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Quick answers to common questions about our platform.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + index * 0.1, duration: 0.6 }}
              >
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Forum Preview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Community Forum</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of users sharing knowledge and helping each other.
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Join Our Community
              <Users className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Recent Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTopics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{topic.title}</h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {topic.replies} replies
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {topic.time}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.4, duration: 0.6 }}
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Community Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">5,234</div>
                      <div className="text-gray-600 dark:text-gray-400">Active Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">1,892</div>
                      <div className="text-gray-600 dark:text-gray-400">Topics Discussed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">12,456</div>
                      <div className="text-gray-600 dark:text-gray-400">Solutions Shared</div>
                    </div>
                    <div className="flex justify-center">
                      <Badge className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-700 dark:text-green-300 border-0">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        95% Response Rate
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
