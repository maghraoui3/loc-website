"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Download, Clock, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { useUser } from "@/contexts/user-context"
import { motion } from "framer-motion"

export default function Certificates() {
  const { user } = useUser()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [currentCertificate, setCurrentCertificate] = useState<"participation" | "achievement">("participation")

  // For demo purposes, we'll simulate that certificates are available
  // In a real app, this would be determined by the event date and user participation
  const eventCompleted = true

  if (!eventCompleted) {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="font-orbitron text-3xl font-bold mb-2 text-gradient">Certificates</h1>
        <p className="text-gray-400 mb-8">Your certificates will be available here after the event.</p>

        <Card className="glassmorphism-card">
          <CardContent className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full glassmorphism flex items-center justify-center mb-6">
              <Clock className="h-10 w-10 text-loc-blue" />
            </div>
            <h2 className="font-orbitron text-2xl font-bold mb-2">Certificates Not Available Yet</h2>
            <p className="text-gray-300 mb-6 max-w-md">
              Certificates will be available for claiming after the League of Coders event concludes on April 20, 2025.
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="h-5 w-5" />
              <span>Available after April 20, 2025</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const CertificatePreview = ({ type }: { type: "participation" | "achievement" }) => {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70"
            onClick={() => setPreviewOpen(false)}
          >
            <Eye className="h-5 w-5" />
          </Button>

          <div className="relative">
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 hover:bg-black/70"
                onClick={() =>
                  setCurrentCertificate(currentCertificate === "participation" ? "achievement" : "participation")
                }
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>

            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 hover:bg-black/70"
                onClick={() =>
                  setCurrentCertificate(currentCertificate === "participation" ? "achievement" : "participation")
                }
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="bg-gradient-to-r from-loc-blue/20 via-loc-purple/20 to-loc-cyan/20 p-1 rounded-xl">
              <div className="bg-white rounded-lg p-8 text-black">
                <div className="border-8 border-double border-loc-blue/30 p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <Award className="h-16 w-16 text-loc-blue" />
                  </div>

                  <h2 className="font-orbitron text-3xl font-bold mb-2 text-loc-blue">
                    {type === "participation" ? "Certificate of Participation" : "Certificate of Achievement"}
                  </h2>

                  <p className="text-gray-600 mb-8">This certifies that</p>

                  <p className="text-2xl font-bold mb-8 font-orbitron">
                    {user?.firstName} {user?.lastName}
                  </p>

                  <p className="text-gray-600 mb-8">
                    {type === "participation"
                      ? "has successfully participated in the League of Coders 2025 event held on April 19-20, 2025 at ISIMS, Sfax, Tunisia."
                      : "and their team has achieved excellence in the League of Coders 2025 event held on April 19-20, 2025 at ISIMS, Sfax, Tunisia."}
                  </p>

                  <div className="flex justify-between items-center mt-12">
                    <div className="text-left">
                      <p className="font-bold">Participant ID</p>
                      <p>{user?.participantId}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">Date Issued</p>
                      <p>April 21, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <Button className="bg-gradient-to-r from-loc-blue to-loc-purple hover:opacity-90">
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-orbitron text-3xl font-bold mb-2 text-gradient">Certificates</h1>
      <p className="text-gray-400 mb-8">
        Claim and download your certificates for participating in the League of Coders.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="glassmorphism-card">
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center gap-2">
                <Award className="h-5 w-5 text-loc-blue" />
                Participation Certificate
              </CardTitle>
              <CardDescription>Certificate of participation in LoC 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300 mb-4">
                This certificate confirms your participation in the League of Coders 2025 event.
              </p>
              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-loc-blue to-loc-purple hover:opacity-90" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 hover:bg-white/10"
                  onClick={() => {
                    setCurrentCertificate("participation")
                    setPreviewOpen(true)
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="glassmorphism-card">
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center gap-2">
                <Award className="h-5 w-5 text-loc-purple" />
                Team Achievement
              </CardTitle>
              <CardDescription>Certificate for team achievement</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300 mb-4">
                This certificate recognizes your team's achievement in the League of Coders 2025 event.
              </p>
              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-loc-blue to-loc-purple hover:opacity-90" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 hover:bg-white/10"
                  onClick={() => {
                    setCurrentCertificate("achievement")
                    setPreviewOpen(true)
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {previewOpen && <CertificatePreview type={currentCertificate} />}
    </div>
  )
}

