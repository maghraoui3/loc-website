"use client"

import { useUser, type PaymentStatus } from "@/contexts/user-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { format } from "date-fns"
import Link from "next/link"

export function PaymentStatus() {
  const { user, makePayment } = useUser()
  const [isProcessing, setIsProcessing] = useState(false)

  if (!user || !user.payment) return null

  const { status, amount, currency, dueDate, paidDate } = user.payment

  const handlePayment = async () => {
    setIsProcessing(true)
    await makePayment()
    setIsProcessing(false)
  }

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
            <CheckCircle className="h-3.5 w-3.5 mr-1" /> Paid
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
            <Clock className="h-3.5 w-3.5 mr-1" /> Pending
          </Badge>
        )
      case "unpaid":
        return (
          <Badge className="bg-red-500/20 text-red-500 border-red-500/30">
            <AlertCircle className="h-3.5 w-3.5 mr-1" /> Unpaid
          </Badge>
        )
    }
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM d, yyyy")
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="glassmorphism-card overflow-hidden border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-loc-blue/5 via-loc-purple/5 to-loc-cyan/5 opacity-50"></div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="font-orbitron flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-loc-blue" />
              Payment Status
            </CardTitle>
            {getStatusBadge(status)}
          </div>
          <CardDescription>Registration fee for League of Coders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Amount:</span>
              <span className="font-bold text-xl">20 DT</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Due Date:</span>
              <span>{formatDate(dueDate)}</span>
            </div>

            {paidDate && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Paid Date:</span>
                <span>{formatDate(paidDate)}</span>
              </div>
            )}

            {status === "paid" && user.payment.transactionId && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Transaction ID:</span>
                <span className="font-mono text-sm">{user.payment.transactionId}</span>
              </div>
            )}

            {status !== "paid" && (
              <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                <h4 className="font-medium mb-2 text-loc-blue">How to Pay:</h4>
                <ul className="text-sm space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-loc-blue mt-1">•</span>
                    <span>Contact LOC agents or ambassadors to complete payment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-loc-blue mt-1">•</span>
                    <span>
                      Or send payment through D17 using the phone number:{" "}
                      <span className="font-medium text-white">94565203</span>
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          {status === "unpaid" && (
            <Button
              asChild
              className="w-full bg-gradient-to-r from-loc-blue to-loc-purple hover:opacity-90 transition-all"
            >
              <Link href="/dashboard/payment">Complete Payment</Link>
            </Button>
          )}

          {status === "pending" && (
            <div className="w-full text-center text-sm text-gray-400">
              Your payment is being verified. This may take up to 24 hours.
            </div>
          )}

          {status === "paid" && (
            <Button variant="outline" className="w-full border-green-500/30 text-green-500 hover:bg-green-500/10">
              <CheckCircle className="h-4 w-4 mr-2" /> Payment Complete
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

