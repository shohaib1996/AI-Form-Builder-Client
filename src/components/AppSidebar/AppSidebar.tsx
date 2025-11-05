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
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../ModeToggle/ModeToggle";
import Link from "next/link";
import { useAuth } from "@/auth/authContext";
import { Progress } from "@/components/ui/progress";

// Define navigation items for user
const userItems = [
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

// Define navigation items for admin
const adminItems = [
  {
    title: "Admin Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Form Management",
    url: "/admin/forms",
    icon: FileText,
  },
];

// Define maximum form limits based on plan type
const MAX_FORMS_NORMAL = 20;
const MAX_FORMS_PREMIUM = 500;

function AppSidebarContent({ isAdmin }: { isAdmin: boolean }) {
  const items = isAdmin ? adminItems : userItems;

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
  const { logout, user } = useAuth();
  const router = useRouter();
  const isAdmin = user?.user?.role === "admin";
  const userPlanType = user?.user?.planType;
  const maxForms =
    userPlanType === "premium" ? MAX_FORMS_PREMIUM : MAX_FORMS_NORMAL;
  const formsRemaining = user?.user?.formLimit;
  const showProgressBar = !isAdmin && typeof formsRemaining === "number";

  let totalFormsCreated = 0;
  let progressValue = 0;
  let formsLeftDisplay = null;

  if (showProgressBar) {
    totalFormsCreated = maxForms - formsRemaining!;
    totalFormsCreated = Math.max(0, totalFormsCreated);

    formsLeftDisplay = formsRemaining!;
    progressValue = (totalFormsCreated / maxForms) * 100;
    progressValue = Math.min(100, Math.max(0, progressValue));
  }

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
                <div className="flex flex-col items-center mt-2">
                  <span className="text-lg font-bold leading-2">AIForm</span>
                  <span className="text-lg font-bold">Generator</span>
                </div>
              </div>
            </Link>
          </SidebarHeader>
          <AppSidebarContent isAdmin={isAdmin} />
          <SidebarFooter>
            <div className="flex flex-col gap-2 p-4">
              {showProgressBar && (
                <div className="text-sm text-muted-foreground">
                  <div className="flex justify-between items-center mb-1">
                    <span>
                      Forms Created: {totalFormsCreated} / {maxForms}
                    </span>
                    {formsLeftDisplay !== null && (
                      <span className="font-medium">
                        {formsLeftDisplay} left
                      </span>
                    )}
                  </div>
                  <Progress value={progressValue} className="h-2" />
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center mt-2">
                  <span className="text-sm font-bold leading-2">AIForm</span>
                  <span className="text-sm font-bold">Generator</span>
                </div>
                <ModeToggle />
                <Button
                  size="sm"
                  onClick={() => {
                    logout();
                    router.push("/signin");
                  }}
                  className="cursor-pointer hover:bg-red-500 text-white bg-red-600"
                >
                  Log out
                </Button>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
      </div>
    </>
  );
}
