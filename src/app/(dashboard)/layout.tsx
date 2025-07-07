"use client"

import { AppSidebar } from "@/components/AppSidebar/AppSidebar"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import type React from "react"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const [key, setKey] = useState(0)

  // Force re-render on route change to fix sidebar layout issues
  useEffect(() => {
    setKey((prev) => prev + 1)

    // Force layout recalculation after a small delay
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"))
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <SidebarProvider key={key}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <main className="flex-1 p-4 w-full min-w-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
