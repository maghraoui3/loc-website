"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { ArrowLeft, Users, UserPlus, X } from "lucide-react"
import Link from "next/link"

export default function CreateTeam() {
  const router = useRouter()
  const { createTeam } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [teamMembers, setTeamMembers] = useState([""])
  const [formData, setFormData] = useState({
    teamName: "",
    teamDescription: "",
  })

  const handleAddMember = () => {
    if (teamMembers.length < 3) {
      setTeamMembers([...teamMembers, ""])
    }
  }

  const handleRemoveMember = (index: number) => {
    const newMembers = [...teamMembers]
    newMembers.splice(index, 1)
    setTeamMembers(newMembers)
  }

  const handleMemberChange = (index: number, value: string) => {
    const newMembers = [...teamMembers]
    newMembers[index] = value
    setTeamMembers(newMembers)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate form
      if (!formData.teamName.trim()) {
        toast({
          title: "Team name required",
          description: "Please enter a name for your team.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Filter out empty member IDs
      const validMembers = teamMembers.filter((member) => member.trim() !== "")

      // Create team
      const success = await createTeam({
        name: formData.teamName,
        description: formData.teamDescription,
        members: validMembers,
      })

      if (success) {
        router.push("/dashboard/team")
      }
    } catch (error) {
      console.error("Error creating team:", error)
      toast({
        title: "Error creating team",
        description: "There was a problem creating your team. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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
        <Link href="/dashboard/team" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-orbitron text-3xl font-bold text-gradient">Create Your Team</h1>
      </motion.div>

      <motion.p variants={item} className="text-gray-400 mb-8">
        Form a team of up to 4 members (including yourself) to participate in the League of Coders.
      </motion.p>

      <motion.div variants={item}>
        <Card className="glassmorphism-card border border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-loc-blue/5 via-loc-purple/5 to-loc-cyan/5 opacity-30"></div>
          <form onSubmit={handleSubmit}>
            <CardHeader className="relative z-10">
              <CardTitle className="font-orbitron flex items-center gap-2">
                <Users className="h-5 w-5 text-loc-blue" />
                Team Details
              </CardTitle>
              <CardDescription>Fill in your team information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  placeholder="Enter your team name"
                  required
                  className="bg-white/5 border-white/10 focus:border-loc-blue/50 transition-colors"
                  value={formData.teamName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teamDescription">Team Description</Label>
                <Textarea
                  id="teamDescription"
                  placeholder="Briefly describe your team and your skills"
                  className="bg-white/5 border-white/10 min-h-[100px] focus:border-loc-blue/50 transition-colors"
                  value={formData.teamDescription}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4 text-loc-purple" />
                    Team Members
                  </Label>
                  {teamMembers.length < 3 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddMember}
                      className="border-white/20 hover:bg-white/5 transition-colors"
                    >
                      Add Member
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Input
                        placeholder={`Team member ${index + 1} ID`}
                        value={member}
                        onChange={(e) => handleMemberChange(index, e.target.value)}
                        className="bg-white/5 border-white/10 focus:border-loc-blue/50 transition-colors"
                      />
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => handleRemoveMember(index)}
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-500 border border-red-500/30"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </motion.div>
                  ))}
                </div>

                <p className="text-xs text-gray-400">
                  Note: Team members must be registered participants with valid participant IDs.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between relative z-10">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="border-white/20 hover:bg-white/5 transition-colors"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-loc-blue to-loc-purple hover:opacity-90 transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Creating Team..." : "Create Team"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </motion.div>
  )
}

