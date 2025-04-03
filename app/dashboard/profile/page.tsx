"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useUser } from "@/contexts/user-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Upload, Check, Users, Loader2 } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export default function ProfilePage() {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [profileImage, setProfileImage] = useState(user?.profileImage || "")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    location: "",
    bio: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Add password validation state
  const [passwordError, setPasswordError] = useState("")

  if (!user) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setPasswordError("")

    // Check if user is trying to change password
    if (formData.newPassword || formData.confirmPassword) {
      // Validate current password (in a real app, this would be checked against the server)
      if (!formData.currentPassword) {
        setPasswordError("Current password is required to change password")
        setIsLoading(false)
        return
      }

      // Validate new password
      if (formData.newPassword.length < 8) {
        setPasswordError("New password must be at least 8 characters long")
        setIsLoading(false)
        return
      }

      // Validate password confirmation
      if (formData.newPassword !== formData.confirmPassword) {
        setPasswordError("New passwords do not match")
        setIsLoading(false)
        return
      }
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: formData.newPassword
          ? "Your profile and password have been updated successfully."
          : "Your profile has been updated successfully.",
      })

      // Reset password fields
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))

      setIsLoading(false)
    }, 1500)
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    // Simulate image upload
    const reader = new FileReader()
    reader.onload = (event) => {
      // Simulate a delay for the upload
      setTimeout(() => {
        setProfileImage(event.target?.result as string)
        setIsUploading(false)
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been updated successfully.",
        })
      }, 1500)
    }
    reader.readAsDataURL(file)
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM d, yyyy")
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="max-w-3xl mx-auto" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex items-center gap-2 mb-6">
        <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-orbitron text-3xl font-bold text-gradient">Your Profile</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div variants={item} className="md:col-span-1">
          <Card className="glassmorphism-card border border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-loc-blue/5 via-loc-purple/5 to-loc-cyan/5 opacity-30"></div>
            <CardContent className="p-6 flex flex-col items-center text-center relative z-10">
              <div className="relative group mb-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Avatar className="h-32 w-32 border-2 border-white/20">
                  {isUploading ? (
                    <div className="h-full w-full flex items-center justify-center bg-black/50">
                      <Loader2 className="h-8 w-8 animate-spin text-white" />
                    </div>
                  ) : (
                    <>
                      <AvatarImage src={profileImage} alt={`${user.firstName} ${user.lastName}`} />
                      <AvatarFallback className="text-3xl bg-gradient-to-r from-loc-blue to-loc-purple">
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={handleImageClick}
                >
                  <Upload className="h-6 w-6" />
                </div>
              </div>
              <h3 className="font-orbitron font-bold text-xl mb-1">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{user.email}</p>

              <div className="w-full space-y-3 mt-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-loc-blue" />
                  <span className="text-gray-300">Joined {formatDate(user.registrationDate)}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-loc-purple" />
                  <span className="text-gray-300">Participant ID: {user.participantId}</span>
                </div>

                {user.team && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-loc-cyan" />
                    <span className="text-gray-300">Team: {user.team.name}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="md:col-span-2">
          <Card className="glassmorphism-card border border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-loc-blue/5 via-loc-purple/5 to-loc-cyan/5 opacity-30"></div>
            <form onSubmit={handleSubmit}>
              <CardHeader className="relative z-10">
                <CardTitle className="font-orbitron">Edit Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-loc-blue" />
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="bg-white/5 border-white/10 focus:border-loc-blue/50 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-loc-blue" />
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="bg-white/5 border-white/10 focus:border-loc-blue/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-loc-purple" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 focus:border-loc-blue/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-loc-cyan" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="bg-white/5 border-white/10 focus:border-loc-blue/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-loc-blue" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                    className="bg-white/5 border-white/10 focus:border-loc-blue/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself"
                    className="bg-white/5 border-white/10 min-h-[100px] focus:border-loc-blue/50 transition-colors"
                  />
                </div>

                <div className="border-t border-white/10 pt-6 mt-6">
                  <h3 className="font-orbitron text-lg mb-4">Change Password</h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Enter your current password"
                        className="bg-white/5 border-white/10 focus:border-loc-blue/50 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter your new password"
                        className="bg-white/5 border-white/10 focus:border-loc-blue/50 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your new password"
                        className="bg-white/5 border-white/10 focus:border-loc-blue/50 transition-colors"
                      />
                    </div>

                    {passwordError && <div className="text-sm text-red-500">{passwordError}</div>}

                    <p className="text-xs text-gray-400">
                      Leave password fields empty if you don't want to change your password.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="relative z-10">
                <Button
                  type="submit"
                  className="ml-auto bg-gradient-to-r from-loc-blue to-loc-purple hover:opacity-90 transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

