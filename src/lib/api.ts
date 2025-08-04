
import api from "@/lib/axios"

export const resetPassword = async (userId: string, password: string) => {
  const response = await api.post(`/auth/reset-password/${userId}`, { password })
  return response.data
}

export const updateProfile = async (userId: string, profileData: object) => {
  const response = await api.patch(`/auth/update/${userId}`, profileData)
  return response.data
}

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append("image", file)

  const response = await fetch("https://chat-app-backend-jf2u.onrender.com/api/upload/image", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to upload image")
  }

  const data = await response.json()

  if (!data.success) {
    throw new Error(data.message || "Failed to upload image")
  }

  return data.data.url
}

export const fetchUserSubscriptions = async () => {
  const response = await api.get(`/payment/subscription`)
  return response.data.data
}

export const fetchUserInfo = async () => {
  const response = await api.get("/auth/me")
  return response.data.data
}

// Fetch admin dashboard statistics for KPI cards
export const fetchAdminStats = async () => {
  const response = await api.get("/dashboard/admin-stats")
  return response.data.data
}

// Fetch all users for User Management Table
export const fetchAllUsers = async (page: number, limit: number, searchTerm: string = "") => {
  const response = await api.get(`/auth/admin/users`, {
    params: { page, limit, searchTerm },
  })
  return response.data
}

// Update user plan
export const updateUserPlan = async (userId: string, data: { planType: "normal" | "premium" }) => {
  const response = await api.patch(`/auth/admin/update-plan/${userId}`, data);
  return response.data;
};

export const updateUserRole = async (userId: string, data: { role: "user" | "admin" }) => {
  const response = await api.patch(`/auth/admin/update-role/${userId}`, data);
  return response.data;
};

// Fetch all forms for Content Overview Table
export const fetchAllForms = async (page: number, limit: number, searchTerm: string = "") => {
  const response = await api.get(`/form/admin/all`, {
    params: { page, limit, searchTerm },
  })
  return response.data
}

// Fetch user growth data for Line Chart
export const fetchUserGrowth = async () => {
  const response = await api.get("/dashboard/admin/user-growth")
  return response.data.data
}

// Fetch plan distribution data for Pie Chart
export const fetchPlanDistribution = async () => {
  const response = await api.get("/dashboard/admin/plan-distribution")
  return response.data.data
}

// Fetch form creation trend data for Bar Chart
export const fetchFormCreationTrend = async () => {
  const response = await api.get("/dashboard/admin/form-creation-trend")
  return response.data.data
}

// Fetch response submission trend data for Line Chart
export const fetchResponseSubmissionTrend = async () => {
  const response = await api.get("/dashboard/admin/response-submission-trend")
  return response.data.data
}
