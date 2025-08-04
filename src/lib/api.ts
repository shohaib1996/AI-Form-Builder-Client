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

// New API call to fetch user info
export const fetchUserInfo = async () => {
  const response = await api.get("/auth/me")
  return response.data.data
}
