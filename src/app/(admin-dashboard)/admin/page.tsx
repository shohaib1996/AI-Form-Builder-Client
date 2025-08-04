"use client";

import { useEffect, useState } from "react";
import { easeOut, motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Star, FileText, MessageSquare } from "lucide-react";
import { fetchAdminStats } from "@/lib/api";
import UserGrowthChart from "@/components/AdminDashboard/UserGrowthChart";
import PlanDistributionChart from "@/components/AdminDashboard/PlanDistributionChart";
import FormCreationTrendChart from "@/components/AdminDashboard/FormCreationTrendChart";
import ResponseSubmissionTrendChart from "@/components/AdminDashboard/ResponseSubmissionTrendChart";

interface AdminStats {
  totalUsers: number;
  premiumUsers: number;
  totalForms: number;
  totalResponses: number;
}

const AdminDashboardPage = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchAdminStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.2, duration: 0.5, ease: easeOut },
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
  };

  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      description: "All registered users",
    },
    {
      title: "Premium Users",
      value: stats?.premiumUsers ?? 0,
      icon: Star,
      description: "Users on premium plan",
    },
    {
      title: "Total Forms",
      value: stats?.totalForms ?? 0,
      icon: FileText,
      description: "Forms created on platform",
    },
    {
      title: "Total Responses",
      value: stats?.totalResponses ?? 0,
      icon: MessageSquare,
      description: "Responses submitted",
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 w-full min-w-0 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            custom={index}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardVariants}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <card.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {loading ? "Loading..." : card.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="space-y-6 w-full min-w-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserGrowthChart />
          <PlanDistributionChart />
          <FormCreationTrendChart />
          <ResponseSubmissionTrendChart />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
