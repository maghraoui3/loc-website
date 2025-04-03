"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function MouseScroll() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!visible) return null

  return (
    <motion.div
      className="mouse-scroll"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    />
  )
}

