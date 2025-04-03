"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Users, Trophy, MessageSquare, Plus, UserPlus, Settings } from "lucide-react"
import { useUser } from "@/contexts/user-context"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Team() {
  const { user, hasTeam } = useUser()
  const [showInviteModal, setShowInviteModal] = useState(false)

  // Check if user has a team
  const userHasTeam = hasTeam()

  if (!userHasTeam) {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="font-orbitron text-3xl font-bold mb-2 text-gradient">My Team</h1>
        <p className="text-gray-400 mb-8">You are not part of any team yet. Create a team or join an existing one.</p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="glassmorphism-card border border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-loc-blue/5 via-loc-purple/5 to-loc-cyan/5 opacity-50"></div>
            <CardContent className="p-12 flex flex-col items-center justify-center text-center relative z-10">
              <div className="w-20 h-20 rounded-full glassmorphism flex items-center justify-center mb-6 border border-white/20">
                <Users className="h-10 w-10 text-loc-blue" />
              </div>
              <h2 className="font-orbitron text-2xl font-bold mb-2">No Team Found</h2>
              <p className="text-gray-300 mb-6 max-w-md">
                You haven't created or joined a team yet. Create your own team or ask a team leader to add you using
                your participant ID.
              </p>
              <Button asChild className="bg-gradient-to-r from-loc-blue to-loc-purple hover:opacity-90 transition-all">
                <Link href="/dashboard/create-team">Create a Team</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  // If we reach here, user has a team
  const team = user?.team

  if (!team) return null

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
      <motion.div variants={item} className="flex justify-between items-start mb-8">
        <div>
          <h1 className="font-orbitron text-3xl font-bold mb-2 text-gradient">{team.name}</h1>
          <p className="text-gray-400">Manage your team and collaborate with your teammates.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border-white/10 hover:bg-white/5"
            onClick={() => setShowInviteModal(true)}
          >
            <UserPlus className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="border-white/10 hover:bg-white/5">
            <Settings className="h-4 w-4 mr-2" />
            Edit Team
          </Button>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glassmorphism-card border border-white/10 hover:border-loc-blue/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-loc-blue/5 to-transparent opacity-30 rounded-xl"></div>
          <CardContent className="p-6 flex flex-col items-center text-center relative z-10">
            <div className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center mb-4 border border-white/20">
              <Users className="h-6 w-6 text-loc-blue" />
            </div>
            <h3 className="font-orbitron font-bold text-lg mb-2">Team Size</h3>
            <p className="text-2xl font-bold">{team.members.length}/4</p>
            <p className="text-xs text-gray-400">Members</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism-card border border-white/10 hover:border-loc-purple/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-loc-purple/5 to-transparent opacity-30 rounded-xl"></div>
          <CardContent className="p-6 flex flex-col items-center text-center relative z-10">
            <div className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center mb-4 border border-white/20">
              <Trophy className="h-6 w-6 text-loc-purple" />
            </div>
            <h3 className="font-orbitron font-bold text-lg mb-2">Competition</h3>
            <p className="text-sm font-medium">Web/Mobile Track</p>
            <Badge className="mt-2 bg-loc-purple/20 text-loc-purple border-loc-purple/30">Registered</Badge>
          </CardContent>
        </Card>

        <Card className="glassmorphism-card border border-white/10 hover:border-loc-cyan/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-loc-cyan/5 to-transparent opacity-30 rounded-xl"></div>
          <CardContent className="p-6 flex flex-col items-center text-center relative z-10">
            <div className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center mb-4 border border-white/20">
              <MessageSquare className="h-6 w-6 text-loc-cyan" />
            </div>
            <h3 className="font-orbitron font-bold text-lg mb-2">Team Chat</h3>
            <p className="text-sm text-gray-300 mb-2">Communicate with your team</p>
            <Button size="sm" variant="outline" className="border-white/20 hover:bg-white/5">
              Open Chat
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="glassmorphism-card mb-8 border border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-loc-blue/5 via-loc-purple/5 to-loc-cyan/5 opacity-30"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="font-orbitron">Team Members</CardTitle>
            <CardDescription>Your team consists of {team.members.length} members</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-4">
              {team.members.map((member, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-3 glassmorphism rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="border border-white/20">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt={member.name} />
                      <AvatarFallback className="bg-gradient-to-r from-loc-blue to-loc-purple">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {member.name} {member.isLeader ? "(You)" : ""}
                      </p>
                      <p className="text-xs text-gray-400">
                        {member.isLeader ? "Team Leader • " : ""}
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={`${member.isLeader ? "bg-loc-blue/20 text-loc-blue border-loc-blue/30" : "bg-gray-500/20 text-gray-300 border-gray-500/30"}`}
                  >
                    {member.isLeader ? "Leader" : "Member"}
                  </Badge>
                </motion.div>
              ))}

              {team.members.length < 4 && (
                <motion.div
                  className="flex items-center justify-center p-3 glassmorphism rounded-lg border border-dashed border-white/10 hover:border-loc-blue/30 transition-all duration-300 cursor-pointer"
                  onClick={() => setShowInviteModal(true)}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: team.members.length * 0.1 }}
                >
                  <div className="flex items-center gap-2 text-gray-400 hover:text-white">
                    <Plus className="h-5 w-5" />
                    <span>Invite Team Member</span>
                  </div>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="glassmorphism-card border border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-loc-blue/5 via-loc-purple/5 to-loc-cyan/5 opacity-30"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="font-orbitron">Team Description</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-gray-300">
              {team.description ||
                "We are a diverse team of developers and designers passionate about creating innovative web and mobile solutions. Our team brings together expertise in frontend, backend, UI/UX design, and mobile development to build comprehensive applications that solve real-world problems."}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

