"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface UserInfo {
  _id: string;
  name?: string;
  planType?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  photo?: string;
  email: string;
}

interface DecodedJWT {
  user: UserInfo;
}

function decodeJWT(token: string): DecodedJWT | null {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

interface AuthContextType {
  user: DecodedJWT | null;
  setUserFromToken: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUserFromToken: () => {},
  logout: () => {},
  loading: true,
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

  // Always watch token changes (also works for "back" nav)
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

    // Run on first mount
    checkToken()

    // Also listen for storage events (if multiple tabs)
    window.addEventListener("storage", checkToken)

    return () => {
      window.removeEventListener("storage", checkToken)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUserFromToken, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
