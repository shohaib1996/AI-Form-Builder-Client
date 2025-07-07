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
      month: "long",
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
      <Badge className={statusColors[status as keyof typeof statusColors] || statusColors.inactive}>
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
      <Badge className={planColors[planType as keyof typeof planColors] || planColors.basic}>
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
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Subscriptions & Billing</h1>
          <p className="text-muted-foreground">Manage your subscription and view your billing history</p>
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
          <AlertDescription>
            Failed to load user data: {userError.message}
            <Button variant="outline" size="sm" className="ml-2 bg-transparent" onClick={() => refetchUser()}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      ) : user?.data ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Current Status
            </CardTitle>
            <CardDescription>Your account information and current plan details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.data.photo || "/placeholder.svg"} alt={user.data.name} />
                <AvatarFallback className="text-lg">
                  {user.data.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Name</p>
                    <p className="font-medium">{user.data.name}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="font-medium">{user.data.email}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Current Plan</p>
                    <div>{getPlanBadge(user.data.planType)}</div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Role</p>
                    <p className="font-medium capitalize">{user.data.role}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{formatDate(user.data.createdAt)}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                    <p className="font-medium">{formatDate(user.data.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>No user data available</AlertDescription>
        </Alert>
      )}

      {/* Subscription History */}
      {subscriptionsLoading ? (
        <SubscriptionTableSkeleton />
      ) : subscriptionsError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load subscription data: {subscriptionsError.message}
            <Button variant="outline" size="sm" className="ml-2 bg-transparent" onClick={() => refetchSubscriptions()}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Subscription History
            </CardTitle>
            <CardDescription>View all your past and current subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            {!subscriptions || subscriptions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No subscriptions found</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Started At</TableHead>
                      <TableHead>Ends At</TableHead>
                      <TableHead>Stripe ID</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptions.map((subscription: Subscription) => (
                      <TableRow key={subscription._id}>
                        <TableCell>
                          <div className="font-medium capitalize">{subscription.planName}</div>
                        </TableCell>
                        <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                        <TableCell>{formatDate(subscription.startedAt)}</TableCell>
                        <TableCell>
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
                        <TableCell>{formatDate(subscription.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Billing
