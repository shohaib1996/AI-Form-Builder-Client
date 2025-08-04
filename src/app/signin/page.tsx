"use client"

import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { Chrome, ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "@/components/ModeToggle/ModeToggle"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import api from "@/lib/axios"
import { useAuth } from "@/auth/authContext"

const signinSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
})

type SigninForm = z.infer<typeof signinSchema>

export default function SignInPage() {
  const { setUserFromToken } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const form = useForm<SigninForm>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // // Handle token from URL parameters (for Google OAuth redirect)
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const token = urlParams.get("token");

  //   if (token) {
  //     // Store the token in localStorage
  //     localStorage.setItem("access_token", token);

  //     // Clean up the URL by removing the token parameter
  //     window.history.replaceState({}, document.title, window.location.pathname);

  //     // Show success message and redirect
  //     toast.success("Successfully signed in with Google! Welcome back.");
  //     router.push("/");
  //   }
  // }, [router]);

  const signinMutation = useMutation({
    mutationFn: (data: SigninForm) => api.post("/auth/signin", data).then((res) => res.data),
    onSuccess: (data) => {
      if (data?.data?.token) {
        setUserFromToken(data.data.token)
        toast.success("Signed in successfully! Welcome back.")
        router.push("/")
      } else {
        toast.error("Signin failed: No token received.")
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "An error occurred during signin. Please try again.")
    },
  })

  const onSubmit = (data: SigninForm) => {
    signinMutation.mutate(data)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  }

  const cardVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut" as const,
      },
    },
    tap: {
      scale: 0.98,
    },
  }

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`
  }

  const fillUserCredentials = () => {
    form.setValue("email", "john.doe@example.com")
    form.setValue("password", "SecurePassword123")
  }

  const fillAdminCredentials = () => {
    form.setValue("email", "admin@admin.com")
    form.setValue("password", "securePassword")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 dark:from-indigo-900 dark:via-purple-900 dark:to-black flex items-center justify-center p-4 relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <Button
          onClick={() => router.push("/")}
          variant="outline"
          size="icon"
          className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg hover:scale-110 transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md">
        <motion.div variants={cardVariants} whileHover="hover" whileTap="tap">
          <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 shadow-2xl border-0">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            type="email"
                            className="transition-all duration-200 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Enter your password"
                              type={showPassword ? "text" : "password"}
                              className="transition-all duration-200 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 pr-10"
                              {...field}
                            />
                            <button
                              type="button"
                              tabIndex={-1}
                              className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                              onClick={() => setShowPassword((v) => !v)}
                              aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 transform hover:scale-105"
                  >
                    Sign In
                  </Button>
                </form>
              </Form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 bg-transparent"
                  onClick={handleGoogleLogin}
                >
                  <Chrome className="mr-2 h-4 w-4" />
                  Continue with Google
                </Button>
                <div className="mt-4 space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 transform hover:scale-105 bg-transparent text-blue-600 dark:text-blue-400"
                    onClick={fillUserCredentials}
                  >
                    Quick User Login
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-red-300 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 transform hover:scale-105 bg-transparent text-red-600 dark:text-red-400"
                    onClick={fillAdminCredentials}
                  >
                    Quick Admin Login
                  </Button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
