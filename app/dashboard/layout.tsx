"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, UserPlus, FileText, Award, LogOut, Menu, X, CreditCard, Bell } from "lucide-react"
import { useState, useEffect } from "react"
import { useUser } from "@/contexts/user-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout, isLoading } = useUser()
  const [mounted, setMounted] = useState(false)

  // Set mounted to true on client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Modify the navigation array to hide "Create Team" when user already has a team
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Team", href: "/dashboard/team", icon: Users },
    // Only show Create Team if user doesn't have a team
    ...(!user?.team ? [{ name: "Create Team", href: "/dashboard/create-team", icon: UserPlus }] : []),
    {
      name: "Payment",
      href: "/dashboard/payment",
      icon: CreditCard,
      badge: user?.payment?.status === "unpaid" ? "Required" : undefined,
      badgeVariant: "destructive",
    },
    { name: "Resources", href: "/dashboard/resources", icon: FileText },
    { name: "Certificates", href: "/dashboard/certificates", icon: Award },
  ]

  // If still loading or no user, show loading state
  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-loc-dark flex flex-col items-center justify-center">
        <Skeleton className="h-12 w-12 rounded-full bg-white/10" />
        <Skeleton className="h-4 w-48 mt-4 bg-white/10" />
      </div>
    )
  }

  // Animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="min-h-screen bg-loc-dark flex flex-col md:flex-row relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-loc-blue/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-loc-purple/10 rounded-full blur-3xl z-0"></div>

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
      <AnimatePresence>
        <motion.div
          className="fixed inset-y-0 left-0 z-40 w-64 md:relative"
          initial={false}
          animate={sidebarOpen || (typeof window !== "undefined" && window.innerWidth >= 768) ? "open" : "closed"}
          variants={sidebarVariants}
        >
          <div className="h-full glassmorphism-dark flex flex-col">
            <div className="flex items-center gap-2 p-6 border-b border-white/10">
              <Image src="/placeholder.svg?height=32&width=32" alt="LoC Logo" width={32} height={32} />
              <span className="font-orbitron font-bold text-lg">LoC Dashboard</span>
            </div>

            {/* User profile in sidebar */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Avatar className="border border-white/20">
                  <AvatarImage src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback className="bg-gradient-to-r from-loc-blue to-loc-purple">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-md transition-all duration-200 group hover:bg-white/5 ${
                    pathname === item.href ? "bg-loc-blue/20 text-white" : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`h-5 w-5 ${pathname === item.href ? "text-loc-blue" : ""}`} />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <Badge
                      variant={item.badgeVariant as any}
                      className={
                        item.badgeVariant === "destructive" ? "bg-red-500/20 text-red-500 border-red-500/30" : ""
                      }
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-white/10 sticky bottom-0 bg-loc-dark/90 backdrop-blur-md">
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
        </motion.div>
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar with user info for mobile */}
        <div className="md:hidden p-4 flex justify-end items-center border-b border-white/10 backdrop-blur-sm bg-loc-dark/30">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm">{user.firstName}</span>
              <Avatar className="h-8 w-8 border border-white/20">
                <AvatarImage src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} />
                <AvatarFallback className="bg-gradient-to-r from-loc-blue to-loc-purple">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {mounted && (
          <motion.main className="flex-1 p-4 md:p-8 relative z-10" initial="hidden" animate="visible" variants={fadeIn}>
            {children}
          </motion.main>
        )}
      </div>
    </div>
  )
}

