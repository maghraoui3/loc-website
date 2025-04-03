"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { useUser } from "@/contexts/user-context"

export default function Register() {
  const { register } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordMessage, setPasswordMessage] = useState("")
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Password strength calculation
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength(0)
      setPasswordMessage("")
      return
    }

    let strength = 0
    let message = ""

    // Length check
    if (formData.password.length >= 8) {
      strength += 25
    }

    // Contains uppercase
    if (/[A-Z]/.test(formData.password)) {
      strength += 25
    }

    // Contains number
    if (/[0-9]/.test(formData.password)) {
      strength += 25
    }

    // Contains special character
    if (/[^A-Za-z0-9]/.test(formData.password)) {
      strength += 25
    }

    // Set message based on strength
    if (strength <= 25) {
      message = "Weak password"
    } else if (strength <= 50) {
      message = "Fair password"
    } else if (strength <= 75) {
      message = "Good password"
    } else {
      message = "Strong password"
    }

    setPasswordStrength(strength)
    setPasswordMessage(message)
  }, [formData.password])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // Special check for confirm password
    if (name === "confirmPassword" && value !== formData.password) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }))
    } else if (name === "confirmPassword") {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }))
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
      isValid = false
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
      isValid = false
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required"
      isValid = false
    }

    // Validate password
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      isValid = false
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const { confirmPassword, ...userData } = formData
      await register(userData)
    } catch (error) {
      console.error("Registration error:", error)
      // Handle registration error
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500"
    if (passwordStrength <= 50) return "bg-yellow-500"
    if (passwordStrength <= 75) return "bg-blue-500"
    return "bg-green-500"
  }

  return (
    <div className="min-h-screen bg-loc-dark flex flex-col justify-center items-center p-4 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-loc-blue/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-loc-purple/20 rounded-full blur-3xl z-0"></div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/placeholder.svg?height=40&width=40" alt="LoC Logo" width={40} height={40} />
            <span className="font-orbitron font-bold text-xl">LoC</span>
          </Link>
        </div>

        <div className="glassmorphism-card p-8">
          <h1 className="font-orbitron font-bold text-2xl mb-6 text-center text-gradient">Register for LoC</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className={`bg-white/5 border-white/10 ${errors.firstName ? "border-red-500" : ""}`}
                />
                {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={`bg-white/5 border-white/10 ${errors.lastName ? "border-red-500" : ""}`}
                />
                {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className={`bg-white/5 border-white/10 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`bg-white/5 border-white/10 ${errors.password ? "border-red-500" : ""}`}
              />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}

              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">{passwordMessage}</span>
                    <span className="text-xs">{passwordStrength}%</span>
                  </div>
                  <Progress value={passwordStrength} className="h-1" indicatorClassName={getPasswordStrengthColor()} />

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center gap-1 text-xs">
                      {/[A-Z]/.test(formData.password) ? (
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                      ) : (
                        <XCircle className="h-3 w-3 text-red-500" />
                      )}
                      <span>Uppercase letter</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      {/[0-9]/.test(formData.password) ? (
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                      ) : (
                        <XCircle className="h-3 w-3 text-red-500" />
                      )}
                      <span>Number</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      {formData.password.length >= 8 ? (
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                      ) : (
                        <XCircle className="h-3 w-3 text-red-500" />
                      )}
                      <span>8+ characters</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      {/[^A-Za-z0-9]/.test(formData.password) ? (
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                      ) : (
                        <XCircle className="h-3 w-3 text-red-500" />
                      )}
                      <span>Special character</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`bg-white/5 border-white/10 ${errors.confirmPassword ? "border-red-500" : ""}`}
              />
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>

            <Button
              type="submit"
              className="w-full font-orbitron bg-gradient-to-r from-loc-blue to-loc-purple hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-loc-blue hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

