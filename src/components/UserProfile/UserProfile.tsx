"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useUser } from "@/hooks/use-user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { resetPassword, updateProfile, uploadImage } from "@/lib/api"
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
  Loader2,
} from "lucide-react"
import { useState, useRef } from "react"
import { toast } from "sonner"

const UserProfile = () => {
  const { data: user, isLoading, isError } = useUser()
  const [isHovering, setIsHovering] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
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

  // Upload Photo Mutation
  const uploadPhotoMutation = useMutation({
    mutationFn: async (file: File) => {
      const imageUrl = await uploadImage(file)
      return imageUrl
    },
    onSuccess: async (imageUrl) => {
      // Update profile with new photo URL
      if (user?.data?._id) {
        updateProfileMutation.mutate({
          userId: user.data._id,
          data: { photo: imageUrl },
        })
      }
    },
    onError: (error) => {
      toast.error("Failed to upload photo")
      console.error("Upload photo error:", error)
      setIsUploadingPhoto(false)
    },
  })

  const handlePhotoUpload = () => {
    if (isUploadingPhoto) return
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && user?.data?._id) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file")
        return
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB")
        return
      }

      setIsUploadingPhoto(true)
      toast.loading("Uploading photo...")
      uploadPhotoMutation.mutate(file)
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

  const getPlanBadgeVariant = (planType: string) => {
    switch (planType.toLowerCase()) {
      case "premium":
        return "default"
      case "pro":
        return "secondary"
      default:
        return "outline"
    }
  }

  // Update isUploadingPhoto state when mutations complete
  React.useEffect(() => {
    if (uploadPhotoMutation.isSuccess || uploadPhotoMutation.isError) {
      setIsUploadingPhoto(false)
      toast.dismiss()
    }
  }, [uploadPhotoMutation.isSuccess, uploadPhotoMutation.isError])

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <Skeleton className="h-6 sm:h-8 w-32 sm:w-48 mb-2" />
          <Skeleton className="h-4 w-64 sm:w-96" />
        </div>
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <Skeleton className="h-20 w-20 sm:h-24 sm:w-24 rounded-full mx-auto sm:mx-0" />
              <div className="flex-1 space-y-3 text-center sm:text-left w-full">
                <Skeleton className="h-5 sm:h-6 w-32 sm:w-48 mx-auto sm:mx-0" />
                <Skeleton className="h-4 w-48 sm:w-64 mx-auto sm:mx-0" />
                <Skeleton className="h-4 w-24 sm:w-32 mx-auto sm:mx-0" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-red-500 text-lg sm:text-xl font-semibold mb-2">Error fetching user data</div>
            <p className="text-muted-foreground text-sm sm:text-base">Please try refreshing the page</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Manage your account settings and preferences</p>
      </div>

      {/* Main Profile Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
              {/* Profile Picture */}
              <div className="relative flex-shrink-0">
                <div
                  className={`relative cursor-pointer transition-all duration-200 ${
                    isUploadingPhoto ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
                  }`}
                  onMouseEnter={() => !isUploadingPhoto && setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  onClick={handlePhotoUpload}
                >
                  <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-border">
                    <AvatarImage
                      src={user.data.photo || "/placeholder.svg?height=96&width=96"}
                      alt={user.data.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-lg sm:text-xl font-semibold">
                      {user.data.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  {/* Upload Overlay */}
                  {(isHovering || isUploadingPhoto) && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center transition-all duration-200">
                      {isUploadingPhoto ? (
                        <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 text-white animate-spin" />
                      ) : (
                        <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      )}
                    </div>
                  )}
                </div>

                {/* Upload Indicator */}
                <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1.5">
                  {isUploadingPhoto ? (
                    <Loader2 className="h-3 w-3 text-primary-foreground animate-spin" />
                  ) : (
                    <Upload className="h-3 w-3 text-primary-foreground" />
                  )}
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 mb-2">
                  <h2 className="text-xl sm:text-2xl font-bold truncate max-w-full">{user.data.name}</h2>
                  <Badge
                    variant={getPlanBadgeVariant(user.data.planType)}
                    className="flex items-center gap-1 flex-shrink-0"
                  >
                    <Crown className="h-3 w-3" />
                    <span className="text-xs sm:text-sm">{user.data.planType.toUpperCase()}</span>
                  </Badge>
                </div>
                <div className="flex items-center justify-center sm:justify-start text-muted-foreground mb-2">
                  <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate text-sm sm:text-base">{user.data.email}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start text-muted-foreground text-xs sm:text-sm">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>Member since {formatDate(user.data.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto justify-center sm:justify-start">
              {!isEditing && !isResettingPassword ? (
                <>
                  <Button
                    onClick={handleEditToggle}
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none bg-transparent"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    <span className="hidden xs:inline">Edit Profile</span>
                    <span className="xs:hidden">Edit</span>
                  </Button>
                  <Button
                    onClick={handlePasswordResetToggle}
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none bg-transparent"
                  >
                    <Key className="h-4 w-4 mr-2" />
                    <span className="hidden xs:inline">Change Password</span>
                    <span className="xs:hidden">Password</span>
                  </Button>
                </>
              ) : (
                <div className="flex gap-2 w-full sm:w-auto">
                  {isEditing && (
                    <>
                      <Button
                        onClick={handleSaveProfile}
                        disabled={updateProfileMutation.isPending}
                        size="sm"
                        className="flex-1 sm:flex-none"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {updateProfileMutation.isPending ? "Saving..." : "Save"}
                      </Button>
                      <Button
                        onClick={handleEditToggle}
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-none bg-transparent"
                      >
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
                        size="sm"
                        className="flex-1 sm:flex-none"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {resetPasswordMutation.isPending ? "Updating..." : "Update"}
                      </Button>
                      <Button
                        onClick={handlePasswordResetToggle}
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-none bg-transparent"
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
        </CardHeader>

        <CardContent className="space-y-6">
          <Separator />

          {/* Edit Profile Form */}
          {isEditing && (
            <div className="space-y-4">
              <CardTitle className="text-lg">Edit Profile Information</CardTitle>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Password Reset Form */}
          {isResettingPassword && (
            <div className="space-y-4">
              <CardTitle className="text-lg">Change Password</CardTitle>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="pr-10"
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
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="pr-10"
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
            </div>
          )}

          {/* Account Information */}
          {!isEditing && !isResettingPassword && (
            <div className="space-y-4">
              <CardTitle className="text-lg">Account Information</CardTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">Role</p>
                      <p className="font-medium truncate">{user.data.role.toUpperCase()}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">Days Active</p>
                      <p className="font-medium">
                        {Math.floor(
                          (new Date().getTime() - new Date(user.data.createdAt).getTime()) / (1000 * 60 * 60 * 24),
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center space-x-3">
                    <Crown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">Plan Type</p>
                      <p className="font-medium truncate">{user.data.planType.toUpperCase()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success Messages */}
          {(resetPasswordMutation.isSuccess || updateProfileMutation.isSuccess) && (
            <div className="flex items-center text-green-600 font-medium text-sm sm:text-base">
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              Action completed successfully!
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={isUploadingPhoto}
      />
    </div>
  )
}

export default UserProfile
