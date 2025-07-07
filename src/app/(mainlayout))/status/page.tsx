"use client"

import { motion } from "framer-motion"
import {
  Trees,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Activity,
  Server,
  Database,
  Globe,
  Shield,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function StatusPage() {
  const overallStatus = "operational" // operational, degraded, outage

  const services = [
    {
      name: "API Gateway",
      status: "operational",
      uptime: 99.9,
      responseTime: "45ms",
      icon: Server,
    },
    {
      name: "Database",
      status: "operational",
      uptime: 99.8,
      responseTime: "12ms",
      icon: Database,
    },
    {
      name: "CDN",
      status: "operational",
      uptime: 100,
      responseTime: "23ms",
      icon: Globe,
    },
    {
      name: "Authentication",
      status: "operational",
      uptime: 99.9,
      responseTime: "67ms",
      icon: Shield,
    },
    {
      name: "Form Builder",
      status: "operational",
      uptime: 99.7,
      responseTime: "89ms",
      icon: Activity,
    },
    {
      name: "Email Service",
      status: "degraded",
      uptime: 98.5,
      responseTime: "234ms",
      icon: Clock,
    },
  ]

  const incidents = [
    {
      title: "Email delivery delays",
      status: "investigating",
      time: "2 hours ago",
      description: "We are investigating reports of delayed email notifications.",
      severity: "minor",
    },
    {
      title: "API rate limiting issues",
      status: "resolved",
      time: "1 day ago",
      description: "Resolved issues with API rate limiting affecting form submissions.",
      severity: "major",
    },
    {
      title: "Scheduled maintenance",
      status: "completed",
      time: "3 days ago",
      description: "Completed scheduled database maintenance with minimal downtime.",
      severity: "maintenance",
    },
  ]

  const metrics = [
    { label: "Overall Uptime", value: "99.8%", trend: "+0.1%" },
    { label: "Avg Response Time", value: "78ms", trend: "-5ms" },
    { label: "Active Users", value: "12,456", trend: "+234" },
    { label: "Forms Created Today", value: "1,892", trend: "+156" },
  ]


  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-pink-600 dark:text-pink-400" />
      case "outage":
        return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
      default:
        return <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      operational:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      degraded: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800",
      outage: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
      investigating:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      resolved: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800",
      completed:
        "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800",
    }

    return (
      <Badge className={`${variants[status as keyof typeof variants]} border`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-green-900/10 dark:to-gray-900">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            {getStatusIcon(overallStatus)}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            System{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Status</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8"
          >
            Check the current status of our services and APIs in real-time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {getStatusBadge(overallStatus)}
          </motion.div>
        </div>
      </section>

      {/* Metrics Overview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Performance Metrics</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Real-time performance data for our platform.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              >
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{metric.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{metric.label}</div>
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">{metric.trend}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Status */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800/50 dark:to-purple-900/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Service Status</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Current operational status of all our services.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <IconComponent className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                          </div>
                          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                            {service.name}
                          </CardTitle>
                        </div>
                        {getStatusIcon(service.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600 dark:text-gray-400">Uptime</span>
                            <span className="font-medium text-gray-900 dark:text-white">{service.uptime}%</span>
                          </div>
                          <Progress value={service.uptime} className="h-2" />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Response Time</span>
                          <span className="font-medium text-gray-900 dark:text-white">{service.responseTime}</span>
                        </div>
                        <div className="pt-2">{getStatusBadge(service.status)}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recent Incidents */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Recent Incidents</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Latest updates on system incidents and maintenance.
            </p>
          </motion.div>

          <div className="space-y-6">
            {incidents.map((incident, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 + index * 0.1, duration: 0.6 }}
              >
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{incident.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">{incident.description}</p>
                        <div className="flex items-center gap-4">
                          {getStatusBadge(incident.status)}
                          <span className="text-sm text-gray-500 dark:text-gray-400">{incident.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
