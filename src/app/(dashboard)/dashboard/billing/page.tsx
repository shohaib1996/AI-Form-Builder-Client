"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarDays, CreditCard, User, AlertCircle, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {useUserSubscriptions } from "@/hooks/use-billing-data"
import { UserStatusSkeleton, SubscriptionTableSkeleton } from "@/components/Skeleton/LoadingSkeleton"
import { useUser } from "@/hooks/use-user"
import { useState } from "react"
import { toast } from "sonner"


interface Subscription {
  _id: string
  userId: string
  planName: string
  status: string
  stripeSubscriptionId: string
  startedAt: string
  endsAt: string | null
  createdAt: string
  updatedAt: string
  __v: number
}
const Billing = () => {
  const { data: user, isLoading: userLoading, error: userError, refetch: refetchUser } = useUser()
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const {
    data: subscriptions,
    isLoading: subscriptionsLoading,
    error: subscriptionsError,
    refetch: refetchSubscriptions,
  } = useUserSubscriptions()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: "bg-green-100 text-green-800 hover:bg-green-100",
      inactive: "bg-red-100 text-red-800 hover:bg-red-100",
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      cancelled: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    }

    return (
      <Badge className={`${statusColors[status as keyof typeof statusColors] || statusColors.inactive} text-xs`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getPlanBadge = (planType: string) => {
    const planColors = {
      premium: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      normal: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      basic: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    }

    return (
      <Badge className={`${planColors[planType as keyof typeof planColors] || planColors.basic} text-xs`}>
        {planType.charAt(0).toUpperCase() + planType.slice(1)}
      </Badge>
    )
  }

//   const handleRefresh = () => {
//     refetchUser()
//     refetchSubscriptions()
//   }

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000) // Reset after 2 seconds
      toast.success("StripeId copied to clipboard")
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="container mx-auto p-3 sm:p-6 space-y-6 sm:space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Subscriptions & Billing</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your subscription and view your billing history</p>
        </div>
        {/* <Button variant="outline" size="sm" onClick={handleRefresh} disabled={userLoading || subscriptionsLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${userLoading || subscriptionsLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button> */}
      </div>

      {/* Current User Status */}
      {userLoading ? (
        <UserStatusSkeleton />
      ) : userError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            Failed to load user data: {userError.message}
            <Button variant="outline" size="sm" className="ml-2 bg-transparent text-xs" onClick={() => refetchUser()}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      ) : user?.data ? (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
              Current Status
            </CardTitle>
            <CardDescription className="text-sm">Your account information and current plan details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <Avatar className="h-12 w-12 sm:h-16 sm:w-16 mx-auto sm:mx-0">
                <AvatarImage src={user.data.photo || "/placeholder.svg"} alt={user.data.name} />
                <AvatarFallback className="text-sm sm:text-lg">
                  {user.data.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Name</p>
                    <p className="text-sm sm:text-base font-medium truncate">{user.data.name}</p>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Email</p>
                    <p className="text-sm sm:text-base font-medium truncate">{user.data.email}</p>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Current Plan</p>
                    <div>{getPlanBadge(user.data.planType)}</div>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Role</p>
                    <p className="text-sm sm:text-base font-medium capitalize">{user.data.role}</p>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Member Since</p>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                      <p className="text-sm sm:text-base font-medium">{formatDate(user.data.createdAt)}</p>
                    </div>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Last Updated</p>
                    <p className="text-sm sm:text-base font-medium">{formatDate(user.data.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">No user data available</AlertDescription>
        </Alert>
      )}

      {/* Subscription History */}
      {subscriptionsLoading ? (
        <SubscriptionTableSkeleton />
      ) : subscriptionsError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            Failed to load subscription data: {subscriptionsError.message}
            <Button variant="outline" size="sm" className="ml-2 bg-transparent text-xs" onClick={() => refetchSubscriptions()}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      ) : (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
              Subscription History
            </CardTitle>
            <CardDescription className="text-sm">View all your past and current subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            {!subscriptions || subscriptions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">No subscriptions found</p>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                {/* Mobile Card View */}
                <div className="block sm:hidden">
                  <div className="space-y-3">
                    {subscriptions.map((subscription: Subscription) => (
                      <div key={subscription._id} className="border-b last:border-b-0 pb-3 last:pb-0">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div className="font-medium capitalize text-sm">{subscription.planName}</div>
                            {getStatusBadge(subscription.status)}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Started:</span>
                              <div className="font-medium">{formatDate(subscription.startedAt)}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Ends:</span>
                              <div className="font-medium">
                                {subscription.endsAt ? formatDate(subscription.endsAt) : "Ongoing"}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-xs">
                            <span className="text-muted-foreground">Stripe ID:</span>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="text-xs bg-muted px-2 py-1 rounded flex-1 truncate">
                                {subscription.stripeSubscriptionId.slice(0, 15)}...
                              </code>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 cursor-pointer flex-shrink-0"
                                onClick={() => copyToClipboard(subscription.stripeSubscriptionId, subscription._id)}
                                title="Copy full Stripe ID"
                              >
                                {copiedId === subscription._id ? (
                                  <Check className="h-3 w-3 text-green-600" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          </div>
                          
                          <div className="text-xs">
                            <span className="text-muted-foreground">Created:</span>
                            <div className="font-medium">{formatDate(subscription.createdAt)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden sm:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">Plan Name</TableHead>
                        <TableHead className="text-xs sm:text-sm">Status</TableHead>
                        <TableHead className="text-xs sm:text-sm">Started At</TableHead>
                        <TableHead className="text-xs sm:text-sm">Ends At</TableHead>
                        <TableHead className="text-xs sm:text-sm">Stripe ID</TableHead>
                        <TableHead className="text-xs sm:text-sm">Created</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscriptions.map((subscription: Subscription) => (
                        <TableRow key={subscription._id}>
                          <TableCell>
                            <div className="font-medium capitalize text-sm">{subscription.planName}</div>
                          </TableCell>
                          <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                          <TableCell className="text-sm">{formatDate(subscription.startedAt)}</TableCell>
                          <TableCell className="text-sm">
                            {subscription.endsAt ? (
                              formatDate(subscription.endsAt)
                            ) : (
                              <span className="text-muted-foreground">Ongoing</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <code className="text-xs bg-muted px-2 py-1 rounded">
                                {subscription.stripeSubscriptionId.slice(0, 20)}...
                              </code>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 cursor-pointer"
                                onClick={() => copyToClipboard(subscription.stripeSubscriptionId, subscription._id)}
                                title="Copy full Stripe ID"
                              >
                                {copiedId === subscription._id ? (
                                  <Check className="h-3 w-3 text-green-600" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{formatDate(subscription.createdAt)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Billing