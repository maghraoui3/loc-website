"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { sendWelcomeEmail } from "@/actions/email-actions"

// Payment status types
export type PaymentStatus = "unpaid" | "pending" | "paid"

// Add TeamMember and Team interfaces
interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  isLeader?: boolean
}

interface Team {
  id: string
  name: string
  description: string
  members: TeamMember[]
  createdAt: string
}

// Add payment information
interface PaymentInfo {
  status: PaymentStatus
  amount: number
  currency: string
  dueDate: string
  paidDate?: string
  transactionId?: string
  invoiceUrl?: string
}

interface UserData {
  firstName: string
  lastName: string
  email: string
  profileImage?: string
  role: "participant" | "admin"
  team?: Team | null
  payment?: PaymentInfo
  registrationDate: string
  participantId: string
}

// Update UserContextType to include payment management functions
interface UserContextType {
  user: UserData | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (
    userData: Omit<UserData, "role" | "profileImage" | "team" | "payment" | "registrationDate" | "participantId"> & {
      password: string
    },
  ) => Promise<boolean>
  logout: () => void
  createTeam: (teamData: { name: string; description: string; members: string[] }) => Promise<boolean>
  hasTeam: () => boolean
  makePayment: () => Promise<boolean>
  getPaymentStatus: () => PaymentStatus
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Load user data from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("locUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Handle redirects based on authentication state
  useEffect(() => {
    if (isLoading) return

    const publicPaths = ["/", "/login", "/register"]
    const isPublicPath = publicPaths.includes(pathname)

    if (!user && !isPublicPath) {
      // Redirect to login if not authenticated and trying to access protected route
      router.push("/login")
    } else if (user && (pathname === "/login" || pathname === "/register")) {
      // Redirect to dashboard if already authenticated and trying to access login/register
      router.push("/dashboard")
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a random participant ID
        const participantId = `LOC-${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")}`

        // For demo purposes, any login attempt succeeds
        // In a real app, you would validate credentials against a backend
        const mockUser: UserData = {
          firstName: "John",
          lastName: "Doe",
          email: email,
          profileImage: "/placeholder.svg?height=200&width=200",
          role: "participant",
          team: null,
          payment: {
            status: "unpaid",
            amount: 50,
            currency: "USD",
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
          },
          registrationDate: new Date().toISOString(),
          participantId,
        }

        setUser(mockUser)
        localStorage.setItem("locUser", JSON.stringify(mockUser))
        setIsLoading(false)

        toast({
          title: "Login successful",
          description: "Welcome back to League of Coders!",
        })

        resolve(true)
      }, 1500)
    })
  }

  const register = async (
    userData: Omit<UserData, "role" | "profileImage" | "team" | "payment" | "registrationDate" | "participantId"> & {
      password: string
    },
  ): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    return new Promise(async (resolve) => {
      try {
        // Generate a random participant ID
        const participantId = `LOC-${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")}`

        // Create new user object
        const newUser: UserData = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          profileImage: "/placeholder.svg?height=200&width=200",
          role: "participant",
          team: null,
          payment: {
            status: "unpaid",
            amount: 50,
            currency: "USD",
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
          },
          registrationDate: new Date().toISOString(),
          participantId,
        }

        // Send welcome email
        const emailResult = await sendWelcomeEmail({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        })

        if (!emailResult.success) {
          console.error("Failed to send welcome email:", emailResult.error)
          // Continue with registration even if email fails
        }

        setUser(newUser)
        localStorage.setItem("locUser", JSON.stringify(newUser))

        toast({
          title: "Registration successful",
          description: "Welcome to League of Coders! Check your email for confirmation.",
        })

        resolve(true)
      } catch (error) {
        console.error("Registration error:", error)
        toast({
          title: "Registration failed",
          description: "There was an error during registration. Please try again.",
          variant: "destructive",
        })
        resolve(false)
      } finally {
        setIsLoading(false)
      }
    })
  }

  // Add createTeam function
  const createTeam = async (teamData: { name: string; description: string; members: string[] }): Promise<boolean> => {
    setIsLoading(true)

    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          if (!user) {
            throw new Error("User not authenticated")
          }

          // Create team with current user as leader and other members
          const newTeam: Team = {
            id: `team-${Date.now()}`,
            name: teamData.name,
            description: teamData.description,
            createdAt: new Date().toISOString(),
            members: [
              {
                id: `member-${Date.now()}`,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                role: "Web Developer",
                isLeader: true,
              },
              // Add other members
              ...teamData.members.map((member, index) => ({
                id: `member-${Date.now() + index + 1}`,
                name: `Team Member ${index + 1}`,
                email: `member${index + 1}@example.com`,
                role: ["UI/UX Designer", "Backend Developer", "Mobile Developer"][index % 3],
                isLeader: false,
              })),
            ],
          }

          // Update user with team
          const updatedUser = {
            ...user,
            team: newTeam,
          }

          setUser(updatedUser)
          localStorage.setItem("locUser", JSON.stringify(updatedUser))

          toast({
            title: "Team created successfully",
            description: `Your team "${teamData.name}" has been created.`,
          })

          resolve(true)
        } catch (error) {
          console.error("Team creation error:", error)
          toast({
            title: "Team creation failed",
            description: "There was an error creating your team. Please try again.",
            variant: "destructive",
          })
          resolve(false)
        } finally {
          setIsLoading(false)
        }
      }, 1500)
    })
  }

  // Add hasTeam function
  const hasTeam = (): boolean => {
    return !!user?.team
  }

  // Add makePayment function
  const makePayment = async (): Promise<boolean> => {
    setIsLoading(true)

    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          if (!user) {
            throw new Error("User not authenticated")
          }

          // Update user payment status
          const updatedUser = {
            ...user,
            payment: {
              ...user.payment,
              status: "paid" as PaymentStatus,
              paidDate: new Date().toISOString(),
              transactionId: `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
            },
          }

          setUser(updatedUser)
          localStorage.setItem("locUser", JSON.stringify(updatedUser))

          toast({
            title: "Payment successful",
            description: "Your payment has been processed successfully.",
          })

          resolve(true)
        } catch (error) {
          console.error("Payment error:", error)
          toast({
            title: "Payment failed",
            description: "There was an error processing your payment. Please try again.",
            variant: "destructive",
          })
          resolve(false)
        } finally {
          setIsLoading(false)
        }
      }, 1500)
    })
  }

  // Add getPaymentStatus function
  const getPaymentStatus = (): PaymentStatus => {
    return user?.payment?.status || "unpaid"
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("locUser")
    router.push("/login")

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        createTeam,
        hasTeam,
        makePayment,
        getPaymentStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

