"use client"

import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@/hooks/use-user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { resetPassword, updateProfile } from "@/lib/api"
import {
  Upload,
  Camera,
  Key,
  Calendar,
  Mail,
  User,
  Crown,
  Edit3,
  Save,
  X,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react"
import { useState, useRef } from "react"
import { toast } from "sonner"

const UserProfile = () => {
  const { data: user, isLoading, isError } = useUser()
  const [isHovering, setIsHovering] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const [editedName, setEditedName] = useState("")
  const [editedEmail, setEditedEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  // Reset Password Mutation
  const resetPasswordMutation = useMutation({
    mutationFn: ({ userId, password }: { userId: string; password: string }) => resetPassword(userId, password),
    onSuccess: () => {
      toast.success("Password updated successfully!")
      setIsResettingPassword(false)
      setNewPassword("")
      setConfirmPassword("")
    },
    onError: (error) => {
      toast.error("Failed to update password")
      console.error("Reset password error:", error)
    },
  })

  // Update Profile Mutation
  const updateProfileMutation = useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: object }) => updateProfile(userId, data),
    onSuccess: () => {
      toast.success("Profile updated successfully!")
      setIsEditing(false)
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
    onError: (error) => {
      toast.error("Failed to update profile")
      console.error("Update profile error:", error)
    },
  })

  const handlePhotoUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && user?.data?._id) {
      // Convert file to base64 or handle as needed
      const reader = new FileReader()
      reader.onload = (e) => {
        const photoData = {
          photo: e.target?.result as string, // base64 string
          fileName: file.name,
          fileType: file.type,
        }

        updateProfileMutation.mutate({
          userId: user.data._id,
          data: photoData,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePasswordReset = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long")
      return
    }
    if (user?.data?._id) {
      resetPasswordMutation.mutate({
        userId: user.data._id,
        password: newPassword,
      })
    }
  }

  const handleEditToggle = () => {
    if (isEditing) {
      setIsEditing(false)
      setEditedName("")
      setEditedEmail("")
    } else {
      setIsEditing(true)
      setEditedName(user?.data?.name || "")
      setEditedEmail(user?.data?.email || "")
    }
  }

  const handlePasswordResetToggle = () => {
    setIsResettingPassword(!isResettingPassword)
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleSaveProfile = () => {
    if (user?.data?._id) {
      const profileData = {
        name: editedName,
        email: editedEmail,
      }

      updateProfileMutation.mutate({
        userId: user.data._id,
        data: profileData,
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getPlanBadgeColor = (planType: string) => {
    switch (planType.toLowerCase()) {
      case "premium":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      case "pro":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
    }
  }

  if (isLoading) {
    return (
      <div className="w-full h-full p-8">
        <div className="container mx-auto">
          <div className="mb-8">
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 h-32 rounded-t-2xl"></div>
            <div className="flex items-start space-x-8 -mt-16 relative z-10 px-8">
              <Skeleton className="h-32 w-32 rounded-full" />
              <div className="flex-1 space-y-4 pt-16">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-5 w-80" />
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full h-full p-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-red-500 text-xl font-semibold mb-2">Error fetching user data</div>
          <p className="text-gray-500">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Profile Settings</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your account settings and preferences</p>
        </div>

        {/* Profile Section */}
        <div className="space-y-0">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 h-32 rounded-t-2xl relative">
            <div className="absolute inset-0 bg-black/10 rounded-t-2xl"></div>
          </div>

          {/* Profile Content */}
          <div className="bg-white dark:bg-gray-800 rounded-b-2xl border-2 px-8 pb-8">
            <div className="flex items-start justify-between -mt-16 relative z-10">
              {/* Left Section - Avatar and Badge */}
              <div className="flex items-end space-x-6">
                <div className="relative">
                  <div
                    className="relative cursor-pointer transition-all duration-300 hover:scale-105"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onClick={handlePhotoUpload}
                  >
                    <Avatar className="h-32 w-32 ring-4 ring-white shadow-2xl">
                      <AvatarImage
                        src={user.data.photo || "/placeholder.svg?height=128&width=128"}
                        alt={user.data.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {user.data.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    {/* Upload Overlay */}
                    {isHovering && (
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center transition-all duration-300">
                        <Camera className="h-10 w-10 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Upload Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-3 shadow-lg">
                    <Upload className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Plan Badge */}
                <div className="pb-4">
                  <Badge className={`px-4 py-2 text-sm font-semibold ${getPlanBadgeColor(user.data.planType)}`}>
                    <Crown className="h-4 w-4 mr-1" />
                    {user.data.planType.toUpperCase()} PLAN
                  </Badge>
                </div>
              </div>

              {/* Right Section - Edit Button */}
              <div className="pt-16">
                {!isEditing && !isResettingPassword ? (
                  <Button
                    onClick={handleEditToggle}
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white bg-transparent mt-3"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    {isEditing && (
                      <>
                        <Button
                          onClick={handleSaveProfile}
                          disabled={updateProfileMutation.isPending}
                          className="bg-green-500 hover:bg-green-600 text-white mt-3"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {updateProfileMutation.isPending ? "Saving..." : "Save"}
                        </Button>
                        <Button onClick={handleEditToggle} variant="outline" className="border-gray-300 bg-transparent mt-3">
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    )}
                    {isResettingPassword && (
                      <>
                        <Button
                          onClick={handlePasswordReset}
                          disabled={resetPasswordMutation.isPending}
                          className="bg-green-500 hover:bg-green-600 text-white mt-3"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {resetPasswordMutation.isPending ? "Updating..." : "Update Password"}
                        </Button>
                        <Button
                          onClick={handlePasswordResetToggle}
                          variant="outline"
                          className="border-gray-300 bg-transparent mt-3"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* User Info Section */}
            <div className="mt-6 space-y-6">
              {/* Name and Email */}
              <div className="max-w-2xl">
                {!isEditing ? (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 break-words">
                      {user.data.name}
                    </h2>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                      <Mail className="h-5 w-5 flex-shrink-0" />
                      <span className="text-lg break-all">{user.data.email}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="mt-1 max-w-md"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                        className="mt-1 max-w-md"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Password Reset Section */}
              {isResettingPassword && (
                <div className="max-w-md space-y-4 border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Reset Password</h3>
                  <div>
                    <Label htmlFor="newPassword" className="text-sm font-medium">
                      New Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Info Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 border-t">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-semibold text-gray-800 dark:text-white">{user.data.role.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-semibold text-gray-800 dark:text-white">{formatDate(user.data.createdAt)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {Math.floor(
                      (new Date().getTime() - new Date(user.data.createdAt).getTime()) / (1000 * 60 * 60 * 24),
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Days Active</div>
                </div>

                {/* Reset Password Button */}
                {!isEditing && !isResettingPassword && (
                  <div className="flex items-center">
                    <Button
                      onClick={handlePasswordResetToggle}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Key className="h-4 w-4 mr-2" />
                      Reset Password
                    </Button>
                  </div>
                )}
              </div>

              {/* Success Messages */}
              {(resetPasswordMutation.isSuccess || updateProfileMutation.isSuccess) && (
                <div className="flex items-center text-green-600 font-medium pt-4">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Action completed successfully!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hidden File Input */}
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>
    </div>
  )
}

export default UserProfile