"use client"

import { motion } from "framer-motion"
import { Book, Shield, Users, AlertTriangle, CheckCircle, Scale } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import SchemaMarkup from "./SchemaMarkup";

export const metadata: Metadata = {
  title: "Terms of Service | AI Form Builder",
  description: "Our terms and conditions for using our services. Please read carefully to understand your rights and responsibilities.",
};

export default function TermsPage() {
  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: CheckCircle,
      content: `By accessing and using our form building platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`,
    },
    {
      id: "description",
      title: "2. Service Description",
      icon: Users,
      content: `Our platform provides form building tools and services that allow users to create, customize, and deploy forms for data collection. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.`,
    },
    {
      id: "accounts",
      title: "3. User Accounts",
      icon: Shield,
      content: `You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password. You must notify us immediately of any unauthorized use of your account.`,
    },
    {
      id: "usage",
      title: "4. Acceptable Use",
      icon: Scale,
      content: `You agree not to use the service for any unlawful purpose or in any way that could damage, disable, overburden, or impair our servers or networks. You may not attempt to gain unauthorized access to any part of the service.`,
    },
    {
      id: "privacy",
      title: "5. Privacy Policy",
      icon: Shield,
      content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service. By using our service, you agree to the collection and use of information in accordance with our Privacy Policy.`,
    },
    {
      id: "intellectual",
      title: "6. Intellectual Property",
      icon: Book,
      content: `The service and its original content, features, and functionality are and will remain the exclusive property of our company and its licensors. The service is protected by copyright, trademark, and other laws.`,
    },
    {
      id: "termination",
      title: "7. Termination",
      icon: AlertTriangle,
      content: `We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.`,
    },
    {
      id: "limitation",
      title: "8. Limitation of Liability",
      icon: Shield,
      content: `In no event shall our company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.`,
    },
    {
      id: "governing",
      title: "9. Governing Law",
      icon: Scale,
      content: `These Terms shall be interpreted and governed by the laws of the jurisdiction in which our company is incorporated, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.`,
    },
    {
      id: "changes",
      title: "10. Changes to Terms",
      icon: Book,
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.`,
    },
  ]

  const highlights = [
    {
      title: "Fair Use Policy",
      description: "We believe in fair and reasonable use of our platform for all users.",
      icon: Users,
    },
    {
      title: "Data Protection",
      description: "Your data is protected with industry-standard security measures.",
      icon: Shield,
    },
    {
      title: "Transparent Pricing",
      description: "No hidden fees or surprise charges in our pricing structure.",
      icon: CheckCircle,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-indigo-900/10 dark:to-gray-900">
      <SchemaMarkup />
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
            <Book className="h-10 w-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Terms of{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Service</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8"
          >
            Our terms and conditions for using our services. Please read carefully to understand your rights and
            responsibilities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            Last updated: January 1, 2024
          </motion.div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Key Highlights</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The most important aspects of our terms at a glance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon
              return (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl mb-6">
                        <IconComponent className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{highlight.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{highlight.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800/50 dark:to-purple-900/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Full Terms and Conditions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Complete legal terms governing your use of our platform.
            </p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, index) => {
              const IconComponent = section.icon
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
                >
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-white">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                          <IconComponent className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{section.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.6 }}
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl mb-6">
                  <AlertTriangle className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Questions About Our Terms?</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  If you have any questions about these Terms of Service, please don&apos;t hesitate to contact us. We&apos;re
                  here to help clarify any concerns you may have.
                </p>
                <div className="text-purple-600 dark:text-purple-400 font-medium">
                  Email us at: legal@formbuilder.com
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
