"use client"

import { useState } from "react"
import { useUser } from "@/contexts/user-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PaymentStatus } from "@/components/payment-status"
import { CheckCircle, ArrowLeft, Phone, Users } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PaymentPage() {
  const { user, makePayment } = useUser()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [verificationError, setVerificationError] = useState("")

  const handleVerifyCode = async () => {
    setIsProcessing(true)
    setVerificationError("")

    // Simulate verification - in a real app, this would call an API
    setTimeout(() => {
      // For demo purposes, let's say "LOC2025" is a valid code
      if (verificationCode === "LOC2025") {
        makePayment().then(() => {
          setPaymentSuccess(true)
        })
      } else {
        setVerificationError("Invalid verification code. Please check and try again.")
        setIsProcessing(false)
      }
    }, 1500)
  }

  if (!user) return null

  // If payment is already completed
  if (user.payment?.status === "paid") {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-orbitron text-3xl font-bold text-gradient">Payment</h1>
        </div>

        <PaymentStatus />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <Card className="glassmorphism-card border border-white/10">
            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h2 className="font-orbitron text-2xl font-bold mb-2">Payment Complete</h2>
              <p className="text-gray-300 mb-6 max-w-md">
                Your payment has been processed successfully. You are now fully registered for the League of Coders
                event.
              </p>
              <Button
                onClick={() => router.push("/dashboard")}
                className="bg-gradient-to-r from-loc-blue to-loc-purple hover:opacity-90"
              >
                Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  // If payment is successful (just completed)
  if (paymentSuccess) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-orbitron text-3xl font-bold text-gradient">Payment</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="glassmorphism-card border border-white/10">
            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h2 className="font-orbitron text-2xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-gray-300 mb-6 max-w-md">
                Your payment has been marked as complete. You are now fully registered for the League of Coders event.
              </p>
              <Button
                onClick={() => router.push("/dashboard")}
                className="bg-gradient-to-r from-loc-blue to-loc-purple hover:opacity-90"
              >
                Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  // Payment instructions
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-orbitron text-3xl font-bold text-gradient">Payment</h1>
      </div>

      <PaymentStatus />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8"
      >
        <Card className="glassmorphism-card border border-white/10">
          <CardHeader>
            <CardTitle className="font-orbitron">Payment Instructions</CardTitle>
            <CardDescription>Complete your payment using one of these methods</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4 p-4 glassmorphism rounded-lg">
              <div className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 text-loc-blue" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Contact LOC Agents</h3>
                <p className="text-sm text-gray-300">
                  Find any LOC agent or ambassador on campus to complete your payment in person.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 glassmorphism rounded-lg">
              <div className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-loc-purple" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Pay via D17</h3>
                <p className="text-sm text-gray-300">Send 20 DT to the following phone number via D17:</p>
                <p className="text-lg font-medium mt-2 font-mono">94565203</p>
                <p className="text-xs text-gray-400 mt-1">
                  After sending payment, enter the verification code you received.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter your verification code"
                className="bg-white/5 border-white/10"
              />
              {verificationError && <p className="text-sm text-red-500 mt-1">{verificationError}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleVerifyCode}
              className="w-full bg-gradient-to-r from-loc-blue to-loc-purple hover:opacity-90"
              disabled={isProcessing || !verificationCode.trim()}
            >
              {isProcessing ? "Verifying..." : "Verify Payment"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

