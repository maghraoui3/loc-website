"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Award, FileText, CreditCard } from "lucide-react"
import Link from "next/link"
import { useUser } from "@/contexts/user-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PaymentStatus } from "@/components/payment-status"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const { user } = useUser()
  const [countdown, setCountdown] = useState({
    days: 30,
    hours: 12,
    minutes: 45,
    seconds: 20,
  })

  // Simulate countdown timer
  useEffect(() => {
    const targetDate = new Date("2025-04-19T09:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      // If the countdown is over
      if (distance < 0) {
        clearInterval(timer)
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      // Calculate time units
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!user) return null

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
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="font-orbitron text-3xl font-bold mb-2 text-gradient">Welcome, {user.firstName}!</h1>
        <p className="text-gray-400">
          Your League of Coders dashboard gives you access to everything you need for the event.
        </p>
      </motion.div>

      {/* User Profile and Payment Status in a single row for desktop */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Profile Card */}
        <Card className="glassmorphism-card overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-loc-blue/10 via-loc-purple/10 to-loc-cyan/10 opacity-50"></div>
          <CardHeader>
            <CardTitle className="font-orbitron">Your Profile</CardTitle>
            <CardDescription>Your participant information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-2 border-white/20">
                <AvatarImage src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} />
                <AvatarFallback className="text-xl bg-gradient-to-r from-loc-blue to-loc-purple">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-xl font-bold">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-gray-400">{user.email}</p>
                <p className="text-sm text-gray-500">Participant ID: {user.participantId}</p>
                <Button variant="outline" size="sm" className="mt-2 border-white/20 hover:bg-white/10">
                  <Link href="/dashboard/profile">Edit Profile</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Status */}
        <PaymentStatus />
      </motion.div>

      {/* Event countdown */}
      <motion.div variants={item}>
        <Card className="glassmorphism-card border border-white/10">
          <CardHeader>
            <CardTitle className="font-orbitron">Event Countdown</CardTitle>
            <CardDescription>League of Coders starts in:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="glassmorphism p-4 rounded-lg border border-white/10 hover:border-loc-blue/30 transition-colors">
                <div className="font-orbitron text-3xl font-bold text-loc-blue">{countdown.days}</div>
                <div className="text-xs text-gray-400">Days</div>
              </div>
              <div className="glassmorphism p-4 rounded-lg border border-white/10 hover:border-loc-purple/30 transition-colors">
                <div className="font-orbitron text-3xl font-bold text-loc-purple">{countdown.hours}</div>
                <div className="text-xs text-gray-400">Hours</div>
              </div>
              <div className="glassmorphism p-4 rounded-lg border border-white/10 hover:border-loc-cyan/30 transition-colors">
                <div className="font-orbitron text-3xl font-bold text-loc-cyan">{countdown.minutes}</div>
                <div className="text-xs text-gray-400">Minutes</div>
              </div>
              <div className="glassmorphism p-4 rounded-lg border border-white/10 hover:border-loc-blue/30 transition-colors">
                <div className="font-orbitron text-3xl font-bold text-loc-blue">{countdown.seconds}</div>
                <div className="text-xs text-gray-400">Seconds</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick actions */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glassmorphism-card border border-white/10 hover:border-loc-blue/30 transition-all hover:translate-y-[-5px]">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center mb-4 border border-white/10">
              <Users className="h-6 w-6 text-loc-blue" />
            </div>
            <h3 className="font-orbitron font-bold text-lg mb-2">Team Status</h3>
            {user.team ? (
              <>
                <p className="text-sm text-gray-300 mb-4">Member of team: {user.team.name}</p>
                <Button asChild variant="outline" size="sm" className="mt-auto border-white/20 hover:bg-white/10">
                  <Link href="/dashboard/team">View Team</Link>
                </Button>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-300 mb-4">You are not part of any team yet</p>
                <Button asChild variant="outline" size="sm" className="mt-auto border-white/20 hover:bg-white/10">
                  <Link href="/dashboard/create-team">Create Team</Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="glassmorphism-card border border-white/10 hover:border-loc-purple/30 transition-all hover:translate-y-[-5px]">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center mb-4 border border-white/10">
              <CreditCard className="h-6 w-6 text-loc-purple" />
            </div>
            <h3 className="font-orbitron font-bold text-lg mb-2">Payment</h3>
            <p className="text-sm text-gray-300 mb-4">
              {user.payment?.status === "paid" ? "Your payment is complete" : "Complete your registration payment"}
            </p>
            <Button asChild variant="outline" size="sm" className="mt-auto border-white/20 hover:bg-white/10">
              <Link href="/dashboard/payment">{user.payment?.status === "paid" ? "View Receipt" : "Make Payment"}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="glassmorphism-card border border-white/10 hover:border-loc-cyan/30 transition-all hover:translate-y-[-5px]">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center mb-4 border border-white/10">
              <FileText className="h-6 w-6 text-loc-cyan" />
            </div>
            <h3 className="font-orbitron font-bold text-lg mb-2">Resources</h3>
            <p className="text-sm text-gray-300 mb-4">Access event materials and guides</p>
            <Button asChild variant="outline" size="sm" className="mt-auto border-white/20 hover:bg-white/10">
              <Link href="/dashboard/resources">View Resources</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="glassmorphism-card border border-white/10 hover:border-loc-blue/30 transition-all hover:translate-y-[-5px]">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center mb-4 border border-white/10">
              <Award className="h-6 w-6 text-loc-blue" />
            </div>
            <h3 className="font-orbitron font-bold text-lg mb-2">Certificates</h3>
            <p className="text-sm text-gray-300 mb-4">View and download your certificates</p>
            <Button asChild variant="outline" size="sm" className="mt-auto border-white/20 hover:bg-white/10">
              <Link href="/dashboard/certificates">View Certificates</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Event information */}
      <motion.div variants={item}>
        <Card className="glassmorphism-card border border-white/10">
          <CardHeader>
            <CardTitle className="font-orbitron">Event Information</CardTitle>
            <CardDescription>Important details about League of Coders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-loc-blue mt-0.5" />
              <div>
                <h4 className="font-medium">Date & Time</h4>
                <p className="text-sm text-gray-300">April 19-20, 2025 | 9:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-loc-purple mt-0.5" />
              <div>
                <h4 className="font-medium">Team Formation</h4>
                <p className="text-sm text-gray-300">
                  Teams of 1-4 members. You can create or join a team until April 15, 2025.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Award className="h-5 w-5 text-loc-cyan mt-0.5" />
              <div>
                <h4 className="font-medium">Prizes</h4>
                <p className="text-sm text-gray-300">
                  1st Place: $1,000 + Internship Opportunities
                  <br />
                  2nd Place: $500 + Tech Gadgets
                  <br />
                  3rd Place: $250 + Tech Gadgets
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

