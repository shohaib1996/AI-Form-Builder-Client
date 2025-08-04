"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/auth/authContext"
import { AppSidebar } from "@/components/AppSidebar/AppSidebar"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user || user.user.role !== "admin") {
        toast.error("Access Denied: You must be an administrator to view this page.")
        router.push("/dashboard") // Redirect to the regular dashboard or sign-in
      }
    }
  }, [user, loading, router])

  if (loading || !user || user.user.role !== "admin") {
    // Optionally render a loading spinner or a simple message while checking auth
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading or redirecting...</p>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <main className="flex-1 p-1 lg:p-4 w-full min-w-0">{children}</main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  )
}

export default AdminDashboardLayout
