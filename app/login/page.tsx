"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@/contexts/user-context"
import { Loader2 } from "lucide-react"

export default function Login() {
  const { login } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await login(formData.email, formData.password)
      if (!success) {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred during login")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
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
          <h1 className="font-orbitron font-bold text-2xl mb-6 text-center text-gradient">Login to Your Account</h1>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-md mb-4 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
                className="bg-white/5 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-loc-blue hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="bg-white/5 border-white/10"
              />
            </div>

            <Button
              type="submit"
              className="w-full font-orbitron bg-gradient-to-r from-loc-blue to-loc-purple hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-loc-blue hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

