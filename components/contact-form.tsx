"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(
        "https://prod-03.northeurope.logic.azure.com:443/workflows/9f5e7c302eaf46f796d199a196ae0607/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ErimU_C1pFNYydz2O4_Tmq3F1Hhml-kDJZzJcmbYixY",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      )

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you as soon as possible.",
          variant: "default",
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      })
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          className="bg-white/5 border-white/10"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          required
          className="bg-white/5 border-white/10"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your phone number"
          required
          className="bg-white/5 border-white/10"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message or question"
          className="bg-white/5 border-white/10 min-h-[100px]"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full font-orbitron bg-gradient-to-r from-loc-blue to-loc-purple hover:opacity-90"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  )
}

