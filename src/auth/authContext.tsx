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
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUserFromToken: () => {},
  loading: true
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DecodedJWT | null>(null)
  const [loading, setLoading] = useState(true)

const setUserFromToken = (token: string) => {
  localStorage.setItem("access_token", token)
  const decoded = decodeJWT(token)
  setUser(decoded)
}


  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (token) {
      const decoded = decodeJWT(token)
      setUser(decoded)
    }
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUserFromToken, loading }}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => useContext(AuthContext)
