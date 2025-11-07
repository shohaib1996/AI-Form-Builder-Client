"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useMutation } from "@tanstack/react-query"
import { Check, Crown, Zap, Palette, BarChart3, Shield, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import api from "@/lib/axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAuth } from "@/auth/authContext"


interface CheckoutResponse {
  success: boolean
  url: string
}

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const router = useRouter()
  const {user} = useAuth()

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post<CheckoutResponse>("/payment/checkout", {
         items: [
            {
                name: "AI FORM BUILDER PREMIUM",
                amount: 5,
                currency: "usd",
                quantity: 1
            }
        ]
      })
      return response.data
    },
    onSuccess: (data) => {
      if (data.success && data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url
      } else {
        toast.error("Failed to create checkout session")
      }
    },
    onError: (error) => {
      console.error("Checkout error:", error)
      toast.error("Something went wrong. Please try again.")
    },
  })

  const handlePayNow = (planType: string) => {
    setSelectedPlan(planType)
    checkoutMutation.mutate()
  }

  const handleGetStarted = () => {
 
    if (!user) {
      router.push("/signin")
    } else {
      router.push("/dashboard")
    }
  }

  const plans = [
    {
      id: "normal",
      name: "Normal",
      price: "Free",
      description: "Perfect for getting started with form building",
      features: [
        "Up to 20 forms per month",
        "Basic form templates",
        "Standard support",
        "Form analytics",
        "Email notifications",
        "Basic customization",
      ],
      limitations: ["Limited to 20 forms/month", "Basic templates only", "Standard support"],
      buttonText: "Get Started",
      popular: false,
      color: "blue",
      icon: Zap,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$5",
      priceSubtext: "/month",
      description: "Advanced features for power users and teams",
      features: [
        "Up to 500 forms per month",
        "Custom template builder",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
        "API access",
        "Team collaboration",
        "Advanced integrations",
        "Custom domains",
        "White-label solution",
      ],
      buttonText: "Upgrade to Premium",
      popular: true,
      color: "purple",
      icon: Crown,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 py-16 px-4">

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6"
          >
            <BarChart3 className="h-8 w-8 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            Choose Your Plan
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Start building amazing forms today. Upgrade anytime as your needs grow.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon
            const isLoading = checkoutMutation.isPending && selectedPlan === plan.id

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="relative"
              >
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                  >
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 text-sm font-medium">
                      Most Popular
                    </Badge>
                  </motion.div>
                )}

                <Card
                  className={`relative h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                    plan.popular
                      ? "border-purple-200 dark:border-purple-800 shadow-xl ring-2 ring-purple-100 dark:ring-purple-900/50"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800"
                  } bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm`}
                >
                  <CardHeader className="text-center pb-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 mx-auto ${
                        plan.color === "purple"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600"
                          : "bg-gradient-to-r from-blue-600 to-cyan-600"
                      }`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </motion.div>

                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">{plan.name}</CardTitle>

                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">{plan.price}</span>
                      {plan.priceSubtext && (
                        <span className="text-gray-600 dark:text-gray-400">{plan.priceSubtext}</span>
                      )}
                    </div>

                    <CardDescription className="text-gray-600 dark:text-gray-400">{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + featureIndex * 0.05, duration: 0.3 }}
                          className="flex items-center gap-3"
                        >
                          <div
                            className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                              plan.color === "purple"
                                ? "bg-purple-100 dark:bg-purple-900/30"
                                : "bg-blue-100 dark:bg-blue-900/30"
                            }`}
                          >
                            <Check
                              className={`h-3 w-3 ${
                                plan.color === "purple"
                                  ? "text-purple-600 dark:text-purple-400"
                                  : "text-blue-600 dark:text-blue-400"
                              }`}
                            />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {plan.id === "premium" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.4 }}
                        className="pt-4 border-t border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 font-medium">
                          <Palette className="h-4 w-4" />
                          <span>Custom Template Builder</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 font-medium mt-2">
                          <Shield className="h-4 w-4" />
                          <span>Priority Support</span>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>

                  <CardFooter className="pt-6">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                      <Button
                        onClick={() => (plan.id === "premium" ? handlePayNow(plan.id) : handleGetStarted())}
                        disabled={plan.id === "premium" ? isLoading || checkoutMutation.isPending : false}
                        className={`w-full py-3 text-base font-medium transition-all duration-200 cursor-pointer ${
                          plan.id === "premium"
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl"
                            : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl"
                        }`}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Processing...
                          </div>
                        ) : (
                          plan.buttonText
                        )}
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">Why Choose Premium?</h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Palette,
                title: "Custom Templates",
                description: "Build and customize your own form templates with our advanced builder",
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Get detailed insights into form performance and user behavior",
              },
              {
                icon: Shield,
                title: "Priority Support",
                description: "Get help when you need it with our dedicated premium support team",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                className="p-6 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
              >
                <feature.icon className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
