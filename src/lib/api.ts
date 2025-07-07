import api from "@/lib/axios"

export const resetPassword = async (userId: string, password: string) => {
  const response = await api.post(`/auth/reset-password/${userId}`, {password})
  return response.data
}

export const updateProfile = async (userId: string, profileData: object) => {
  const response = await api.patch(`/auth/update/${userId}`, profileData)
  return response.data
}



export const fetchUserSubscriptions = async () => {
  const response = await api.get(`/payment/subscription`)
  return response.data.data
}