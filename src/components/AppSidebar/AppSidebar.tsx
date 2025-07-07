"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import {
  Sparkles,
  FileText,
  LayoutDashboard,
  Receipt,
  UserCog,
} from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../ModeToggle/ModeToggle";
import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Forms",
    url: "/dashboard/forms",
    icon: FileText,
  },
  //   {
  //     title: "Payments",
  //     url: "/dashboard/payments",
  //     icon: CreditCard,
  //   },
  {
    title: "Subscriptions & Billing",
    url: "/dashboard/billing",
    icon: Receipt,
  },
  {
    title: "Profile & Settings",
    url: "/dashboard/profile",
    icon: UserCog,
  },
];

function AppSidebarContent() {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}

export function AppSidebar() {
  const router = useRouter();
  return (
    <>
      <div className="hidden md:block">
        <Sidebar>
          <SidebarHeader>
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <motion.div
                  className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-xl font-bold">FormAI</span>
              </div>
            </Link>
          </SidebarHeader>
          <AppSidebarContent />
          <SidebarFooter>
            <div className="flex items-center justify-between p-4">
              <span className="text-sm text-muted-foreground font-bold">
                FormAI
              </span>

              <ModeToggle />
              <Button
                size="sm"
                onClick={() => {
                  localStorage.removeItem("access_token");
                  router.push("/");
                }}
                className="cursor-pointer hover:bg-red-500 text-white bg-red-600"
              >
                Log out
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
      </div>
    </>
  );
}
