"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function CountdownTimer() {
  const [countdown, setCountdown] = useState({
    days: 30,
    hours: 12,
    minutes: 45,
    seconds: 20,
  })

  // Set the target date to April 19, 2025
  useEffect(() => {
    const targetDate = new Date("2025-04-19T09:00:00").getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      // If the countdown is over
      if (distance < 0) {
        clearInterval(interval)
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

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glassmorphism rounded-xl p-4 border border-white/10">
      <h2 className="text-center font-orbitron text-lg mb-3 text-gradient">Event Starts In</h2>
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        <motion.div
          className="glassmorphism p-2 md:p-3 rounded-lg border border-white/10 hover:border-loc-blue/30 transition-colors text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="font-orbitron text-xl md:text-3xl font-bold text-loc-blue">{countdown.days}</div>
          <div className="text-xs text-gray-400">Days</div>
        </motion.div>
        <motion.div
          className="glassmorphism p-2 md:p-3 rounded-lg border border-white/10 hover:border-loc-purple/30 transition-colors text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="font-orbitron text-xl md:text-3xl font-bold text-loc-purple">{countdown.hours}</div>
          <div className="text-xs text-gray-400">Hours</div>
        </motion.div>
        <motion.div
          className="glassmorphism p-2 md:p-3 rounded-lg border border-white/10 hover:border-loc-cyan/30 transition-colors text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="font-orbitron text-xl md:text-3xl font-bold text-loc-cyan">{countdown.minutes}</div>
          <div className="text-xs text-gray-400">Minutes</div>
        </motion.div>
        <motion.div
          className="glassmorphism p-2 md:p-3 rounded-lg border border-white/10 hover:border-loc-blue/30 transition-colors text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="font-orbitron text-xl md:text-3xl font-bold text-loc-blue">{countdown.seconds}</div>
          <div className="text-xs text-gray-400">Seconds</div>
        </motion.div>
      </div>
    </div>
  )
}

