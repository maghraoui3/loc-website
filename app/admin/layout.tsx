"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, UserSquare, FileText, Award, LogOut, Menu, X, Settings, BarChart } from "lucide-react"
import { useState, useEffect } from "react"
import { useUser } from "@/contexts/user-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout, isLoading } = useUser()

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Teams", href: "/admin/teams", icon: UserSquare },
    { name: "Resources", href: "/admin/resources", icon: FileText },
    { name: "Certificates", href: "/admin/certificates", icon: Award },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  // Check if user is admin, if not redirect to dashboard
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login")
      } else if (user.role !== "admin") {
        router.push("/dashboard")
      }
    }
  }, [user, isLoading, router])

  // If still loading or no user, show loading state
  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-loc-dark flex flex-col items-center justify-center">
        <Skeleton className="h-12 w-12 rounded-full bg-white/10" />
        <Skeleton className="h-4 w-48 mt-4 bg-white/10" />
      </div>
    )
  }

  // If user is not admin, don't render admin layout
  if (user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-loc-dark flex flex-col md:flex-row">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-loc-dark/50 backdrop-blur-md border-white/10"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full glassmorphism-dark flex flex-col">
          <div className="flex items-center gap-2 p-6 border-b border-white/10">
            <Image src="/placeholder.svg?height=32&width=32" alt="LoC Logo" width={32} height={32} />
            <span className="font-orbitron font-bold text-lg">LoC Admin</span>
          </div>

          {/* Admin profile in sidebar */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} />
                <AvatarFallback>
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  pathname === item.href
                    ? "bg-loc-blue/20 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-white/5 hover:text-white"
              onClick={logout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}

