"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import api from "@/lib/axios" // Import your axios instance

interface UserInfo {
  _id: string
  name?: string
  planType?: string // e.g., "normal", "premium"
  role?: string
  createdAt?: string
  updatedAt?: string
  photo?: string
  email: string
  formLimit?: number // This will now represent the number of forms *remaining*
}

interface DecodedJWT {
  user: UserInfo
}

function decodeJWT(token: string): DecodedJWT | null {
  try {
    const payload = token.split(".")[1]
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    return JSON.parse(decoded)
  } catch {
    return null
  }
}

interface AuthContextType {
  user: DecodedJWT | null
  setUserFromToken: (token: string) => void
  logout: () => void
  loading: boolean
  refetchUser: () => Promise<void> // Added refetchUser function
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUserFromToken: () => {},
  logout: () => {},
  loading: true,
  refetchUser: async () => {}, // Default empty implementation
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DecodedJWT | null>(null)
  const [loading, setLoading] = useState(true)

  const setUserFromToken = (token: string) => {
    localStorage.setItem("access_token", token)
    const decoded = decodeJWT(token)
    setUser(decoded)
  }

  const logout = () => {
    localStorage.removeItem("access_token")
    setUser(null)
  }

  // Function to refetch user info from the backend
  const refetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token")
      if (token) {
        // Assuming your backend /auth/me endpoint returns the same structure as the decoded JWT payload
        const res = await api.get("/auth/me")
        if (res.data.success && res.data.data) {
          // Update the user state with the new data
          setUser({ user: res.data.data })
        }
      }
    } catch (error) {
      console.error("Failed to refetch user info:", error)
      // Optionally, handle token expiration or other errors by logging out
      // logout();
    }
  }, []) // No dependencies, as it only relies on localStorage and `api`

  // Effect to check token on mount and listen for storage changes
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("access_token")
      if (token) {
        const decoded = decodeJWT(token)
        setUser(decoded)
      } else {
        setUser(null)
      }
      setLoading(false)
    }

    checkToken() // Run on first mount

    window.addEventListener("storage", checkToken) // Listen for storage events

    return () => {
      window.removeEventListener("storage", checkToken)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUserFromToken, logout, loading, refetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
