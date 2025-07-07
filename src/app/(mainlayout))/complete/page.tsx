"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import {
  CheckCircle,
  Download,
  Calendar,
  CreditCard,
  User,
  Crown,
  ArrowRight,
  Loader2,
  AlertCircle,
  Receipt,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import api from "@/lib/axios"
import { toast } from "sonner"

interface PaymentCompleteResponse {
  success: boolean
  message: string
  subscription: {
    planName: string
    status: string
    startedAt: string
    endsAt: string
    stripeSubscriptionId: string
  }
}

function CompletePageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const receiptRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const sessionId = searchParams.get("session_id")

  const { data, isLoading, error } = useQuery({
    queryKey: ["payment-complete", sessionId],
    queryFn: async () => {
      if (!sessionId) throw new Error("No session ID provided")
      const response = await api.get<PaymentCompleteResponse>(`/payment/complete?session_id=${sessionId}`)
      return response.data
    },
    enabled: !!sessionId,
    retry: false,
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPlanDisplayName = (planName: string) => {
    return planName.charAt(0).toUpperCase() + planName.slice(1)
  }

  const getPlanPrice = (planName: string) => {
    return planName.toLowerCase() === "premium" ? "5.00" : "Free"
  }

  const downloadReceipt = async () => {
    if (!receiptRef.current || !data) return

    setIsDownloading(true)

    try {
      const printWindow = window.open("", "_blank")
      if (!printWindow) {
        throw new Error("Popup blocked")
      }

      const subscription = data.subscription

      const receiptHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Payment Receipt - ${subscription.stripeSubscriptionId.slice(-8).toUpperCase()}</title>
            <style>
              @media print {
                body { margin: 0; }
                .no-print { display: none; }
              }
              
              body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                max-width: 800px; 
                margin: 0 auto; 
                padding: 20px;
                line-height: 1.6;
                color: #333;
              }
              
              .header { 
                background: linear-gradient(135deg, #3b82f6, #8b5cf6); 
                color: white; 
                padding: 30px; 
                text-align: center;
                margin-bottom: 30px;
                border-radius: 10px;
              }
              
              .header h1 {
                margin: 0 0 10px 0;
                font-size: 28px;
                font-weight: bold;
              }
              
              .header p {
                margin: 0;
                font-size: 16px;
                opacity: 0.9;
              }
              
              .receipt-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 30px;
                margin-bottom: 30px;
              }
              
              @media (max-width: 600px) {
                .receipt-grid {
                  grid-template-columns: 1fr;
                }
              }
              
              .section { 
                background: #f8fafc;
                padding: 20px;
                border-radius: 10px;
                border: 1px solid #e2e8f0;
              }
              
              .section h3 { 
                margin: 0 0 15px 0; 
                color: #1e293b;
                font-size: 18px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 8px;
              }
              
              .detail-row { 
                display: flex; 
                justify-content: space-between; 
                margin-bottom: 12px;
                padding-bottom: 8px;
                border-bottom: 1px solid #e2e8f0;
              }
              
              .detail-row:last-child {
                border-bottom: none;
                margin-bottom: 0;
              }
              
              .detail-label { 
                color: #64748b;
                font-weight: 500;
              }
              
              .detail-value { 
                font-weight: 600;
                color: #1e293b;
              }
              
              .amount { 
                font-size: 24px; 
                color: #059669;
                font-weight: bold;
              }
              
              .status-badge {
                background: #dcfce7;
                color: #166534;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
              }
              
              .features { 
                list-style: none; 
                padding: 0;
                margin: 0;
              }
              
              .features li { 
                padding: 8px 0; 
                border-bottom: 1px solid #e2e8f0;
                display: flex;
                align-items: center;
                gap: 8px;
              }
              
              .features li:last-child {
                border-bottom: none;
              }
              
              .check-icon {
                color: #10b981;
                font-weight: bold;
                font-size: 14px;
              }
              
              .billing-period {
                background: #f1f5f9;
                padding: 20px;
                border-radius: 8px;
                margin: 15px 0;
              }
              
              .footer { 
                text-align: center; 
                color: #64748b; 
                font-size: 14px; 
                margin-top: 40px;
                padding-top: 20px;
                border-top: 2px solid #e2e8f0;
              }
              
              .footer p {
                margin: 5px 0;
              }
              
              .company-info {
                text-align: center;
                margin-bottom: 20px;
                color: #64748b;
              }
              
              .print-button {
                background: #3b82f6;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 16px;
                margin: 20px auto;
                display: block;
              }
              
              .print-button:hover {
                background: #2563eb;
              }
            </style>
          </head>
          <body>
            <div class="company-info">
              <h2 style="margin: 0; color: #1e293b;">FormBuilder Pro</h2>
              <p style="margin: 5px 0;">Professional Form Building Platform</p>
            </div>

            <div class="header">
              <h1>🧾 Payment Receipt</h1>
              <p>Receipt #${subscription.stripeSubscriptionId.slice(-8).toUpperCase()}</p>
            </div>

            <div class="receipt-grid">
              <div class="section">
                <h3>👤 Subscription Details</h3>
                <div class="detail-row">
                  <span class="detail-label">Plan:</span>
                  <span class="detail-value">${getPlanDisplayName(subscription.planName)}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Status:</span>
                  <span class="status-badge">${subscription.status}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Amount:</span>
                  <span class="detail-value amount">${getPlanPrice(subscription.planName)}</span>
                </div>
              </div>

              <div class="section">
                <h3>💳 Payment Information</h3>
                <div class="detail-row">
                  <span class="detail-label">Payment Method:</span>
                  <span class="detail-value">Stripe</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Transaction ID:</span>
                  <span class="detail-value" style="font-family: monospace; font-size: 12px;">${subscription.stripeSubscriptionId.slice(-12)}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Payment Date:</span>
                  <span class="detail-value">${formatDate(subscription.startedAt)}</span>
                </div>
              </div>
            </div>

            <div class="section">
              <h3>📅 Billing Period</h3>
              <div class="billing-period">
                <div class="detail-row">
                  <span class="detail-label">Started:</span>
                  <span class="detail-value">${formatDate(subscription.startedAt)}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Ends:</span>
                  <span class="detail-value">${formatDate(subscription.endsAt)}</span>
                </div>
              </div>
              <p style="text-align: center; color: #64748b; font-size: 14px; margin: 10px 0 0 0;">
                Your subscription will auto-renew on <strong>${new Date(subscription.endsAt).toLocaleDateString()}</strong>
              </p>
            </div>

            <div class="section">
              <h3>✨ Plan Features</h3>
              <ul class="features">
                ${
                  subscription.planName.toLowerCase() === "premium"
                    ? `
                    <li><span class="check-icon">✓</span> Up to 500 forms per month</li>
                    <li><span class="check-icon">✓</span> Custom template builder</li>
                    <li><span class="check-icon">✓</span> Priority support</li>
                    <li><span class="check-icon">✓</span> Advanced analytics</li>
                    <li><span class="check-icon">✓</span> Custom branding</li>
                    <li><span class="check-icon">✓</span> API access</li>
                    <li><span class="check-icon">✓</span> Team collaboration</li>
                    <li><span class="check-icon">✓</span> White-label solution</li>
                  `
                    : `
                    <li><span class="check-icon">✓</span> Up to 20 forms per month</li>
                    <li><span class="check-icon">✓</span> Basic templates</li>
                    <li><span class="check-icon">✓</span> Standard support</li>
                    <li><span class="check-icon">✓</span> Form analytics</li>
                    <li><span class="check-icon">✓</span> Email notifications</li>
                  `
                }
              </ul>
            </div>

            <button class="print-button no-print" onclick="window.print()">
              🖨️ Print / Save as PDF
            </button>

            <div class="footer">
              <p><strong>Thank you for your business!</strong></p>
              <p>Generated on ${formatDate(new Date().toISOString())}</p>
              <p>If you have any questions, please contact our support team at support@formbuilder.com</p>
              <p style="margin-top: 15px; font-size: 12px;">
                FormBuilder Pro | Professional Form Building Platform<br>
                This is an automatically generated receipt for your records.
              </p>
            </div>

            <script>
              setTimeout(() => {
                window.print();
              }, 500);
              
              window.addEventListener('afterprint', () => {
                setTimeout(() => {
                  window.close();
                }, 1000);
              });
            </script>
          </body>
        </html>
      `

      printWindow.document.write(receiptHTML)
      printWindow.document.close()

      toast.success("Receipt opened in new window. Use Print to save as PDF!")
    } catch (error) {
      console.error("Error generating receipt:", error)
      toast.error("Failed to generate receipt. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }

  useEffect(() => {
    if (!sessionId) {
      router.push("/pricing")
    }
  }, [sessionId, router])

  if (!sessionId) {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-green-900/10 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center p-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="inline-block mb-4"
          >
            <Loader2 className="h-12 w-12 text-green-600 dark:text-green-400" />
          </motion.div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Processing Payment</h2>
          <p className="text-gray-600 dark:text-gray-400">Please wait while we confirm your payment...</p>
        </motion.div>
      </div>
    )
  }

  if (error || !data?.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-red-900/10 dark:to-gray-900 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full text-center"
        >
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-red-200 dark:border-red-800">
            <CardContent className="p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-6"
              >
                <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </motion.div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Payment Verification Failed</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We couldn&apos;t verify your payment. Please contact support if you believe this is an error.
              </p>
              <Button onClick={() => router.push("/pricing")} variant="outline" className="w-full">
                Back to Pricing
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const subscription = data.subscription

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-green-900/10 dark:to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring", bounce: 0.6 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg"
          >
            <CheckCircle className="h-10 w-10 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3"
          >
            Payment Successful!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-xl text-gray-600 dark:text-gray-400 mb-2"
          >
            {data.message}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 text-sm">
              <Crown className="h-4 w-4 mr-1" />
              {getPlanDisplayName(subscription.planName)} Plan Active
            </Badge>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-8"
        >
          <Card ref={receiptRef} className="bg-white dark:bg-gray-800 shadow-xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Receipt className="h-6 w-6" />
                  <CardTitle className="text-2xl font-bold">Payment Receipt</CardTitle>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-sm">Receipt #</p>
                  <p className="font-mono text-sm">{subscription.stripeSubscriptionId.slice(-8).toUpperCase()}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                      <User className="h-5 w-5" />
                     

System: Subscription Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Plan:</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {getPlanDisplayName(subscription.planName)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Status:</span>
                        <Badge
                          variant="outline"
                          className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                        >
                          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                        <span className="font-bold text-xl text-gray-900 dark:text-gray-100">
                          {getPlanPrice(subscription.planName)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                        <span className="text-gray-900 dark:text-gray-100">Stripe</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Transaction ID:</span>
                        <span className="font-mono text-sm text-gray-900 dark:text-gray-100">
                          {subscription.stripeSubscriptionId.slice(-12)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Billing Period
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Started:</span>
                        <span className="text-gray-900 dark:text-gray-100">{formatDate(subscription.startedAt)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Ends:</span>
                        <span className="text-gray-900 dark:text-gray-100">{formatDate(subscription.endsAt)}</span>
                      </div>
                      <Separator />
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Your subscription will auto-renew on{" "}
                          <span className="font-semibold text-gray-900 dark:text-gray-100">
                            {new Date(subscription.endsAt).toLocaleDateString()}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">What&apos;s Included</h3>
                    <div className="space-y-2">
                      {subscription.planName.toLowerCase() === "premium" ? (
                        <>
                          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Up to 500 forms per month
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Custom template builder
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Priority support
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Advanced analytics
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Up to 20 forms per month
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Basic templates
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Standard support
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="my-8" />
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                <p>Thank you for your business! If you have any questions, please contact our support team.</p>
                <p className="mt-1">Generated on {formatDate(new Date().toISOString())}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={downloadReceipt}
            disabled={isDownloading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
          >
            {isDownloading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Opening Receipt...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download PDF Receipt
              </div>
            )}
          </Button>
          <Button
            onClick={() => router.push("/dashboard")}
            variant="outline"
            size="lg"
            className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Go to Dashboard
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 dark:text-gray-400">
            🎉 Welcome to {getPlanDisplayName(subscription.planName)}! Start building amazing forms today.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function CompletePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-green-900/10 dark:to-gray-900">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center p-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="inline-block mb-4"
            >
              <Loader2 className="h-12 w-12 text-green-600 dark:text-green-400" />
            </motion.div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Loading...</h2>
            <p className="text-gray-600 dark:text-gray-400">Please wait while we load your payment details...</p>
          </motion.div>
        </div>
      }
    >
      <CompletePageContent />
    </Suspense>
  )
}

export const dynamic = "force-dynamic"