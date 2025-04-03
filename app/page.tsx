import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Trophy, Users, Zap, BookOpen, Award, Mail, Phone, MapPinned } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { Toaster } from "@/components/ui/toaster"
import { CountdownTimer } from "@/components/countdown-timer"
import { MouseScroll } from "@/components/mouse-scroll"

export default function Home() {
  return (
    <div className="min-h-screen bg-loc-dark overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-loc-blue/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-loc-purple/20 rounded-full blur-3xl z-0"></div>

      {/* Header - Now fixed */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-loc-dark/70 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="LoC Logo"
              width={40}
              height={40}
              className="animate-glow"
            />
            <span className="font-orbitron font-bold text-xl">LoC</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="#overview" className="font-orbitron text-sm hover:text-loc-blue transition">
              Overview
            </Link>
            <Link href="#why-participate" className="font-orbitron text-sm hover:text-loc-blue transition">
              Why Participate
            </Link>
            <Link href="#register" className="font-orbitron text-sm hover:text-loc-blue transition">
              Register
            </Link>
            <Link href="#contact" className="font-orbitron text-sm hover:text-loc-blue transition">
              Contact
            </Link>
          </nav>
          <div className="flex gap-4">
            <Button asChild variant="outline" className="font-orbitron text-sm">
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="font-orbitron text-sm bg-gradient-to-r from-loc-blue to-loc-purple hover:opacity-90"
            >
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Countdown Timer - Added below navbar */}
      <div className="pt-20 pb-4 relative z-10 bg-gradient-to-r from-loc-dark via-loc-dark/90 to-loc-dark">
        <div className="container mx-auto px-4">
          <CountdownTimer />
        </div>
      </div>

      {/* Hero Section - Adjusted padding to account for fixed navbar and countdown */}
      <section className="relative z-10 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="glassmorphism max-w-5xl mx-auto p-8 md:p-12 rounded-2xl">
            <div className="text-center mb-8">
              <h1 className="font-orbitron font-bold text-4xl md:text-6xl lg:text-7xl mb-6 text-gradient">
                League of Coders
              </h1>
              <p className="font-orbitron font-bold text-xl md:text-2xl mb-8">Compete, Code, Conquer!</p>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-loc-blue" />
                  <span>April 19-20, 2025</span>
                </div>
                <div className="hidden md:block h-4 w-px bg-white/20"></div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-loc-purple" />
                  <span>ISIMS, Sfax</span>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="font-orbitron text-base bg-gradient-to-r from-loc-blue to-loc-purple hover:opacity-90 animate-pulse"
              >
                <Link href="/register">Register Now</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Mouse scroll indicator */}
        <MouseScroll />
      </section>

      {/* Event Overview */}
      <section id="overview" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-center mb-12 text-gradient">
            Event Overview
          </h2>
          <div className="glassmorphism-card max-w-4xl mx-auto p-8">
            <p className="text-lg mb-8 leading-relaxed">
              League of Coders (LoC) is an exciting coding competition bringing together talented developers, designers,
              and innovators for an unforgettable 48-hour hackathon experience. Join us at ISIMS for a weekend of
              coding, collaboration, and creativity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full glassmorphism flex items-center justify-center mb-4">
                  <Trophy className="h-8 w-8 text-loc-blue" />
                </div>
                <h3 className="font-orbitron font-bold text-lg mb-2">Competition Tracks</h3>
                <p className="text-sm text-gray-300">Web/Mobile Apps, AI/ML, Game Development</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full glassmorphism flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-loc-purple" />
                </div>
                <h3 className="font-orbitron font-bold text-lg mb-2">Team Formation</h3>
                <p className="text-sm text-gray-300">Participate solo or in teams of up to 4 members</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full glassmorphism flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-loc-cyan" />
                </div>
                <h3 className="font-orbitron font-bold text-lg mb-2">Prizes</h3>
                <p className="text-sm text-gray-300">Cash prizes, internship opportunities, tech gadgets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Participate */}
      <section id="why-participate" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-center mb-12 text-gradient">
            Why Participate?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="glassmorphism-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg glassmorphism flex items-center justify-center shrink-0">
                  <Users className="h-6 w-6 text-loc-blue" />
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-xl mb-2">Networking</h3>
                  <p className="text-gray-300">
                    Connect with industry professionals, mentors, and fellow coders. Build relationships that extend
                    beyond the event.
                  </p>
                </div>
              </div>
            </div>
            <div className="glassmorphism-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg glassmorphism flex items-center justify-center shrink-0">
                  <Trophy className="h-6 w-6 text-loc-purple" />
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-xl mb-2">Prizes</h3>
                  <p className="text-gray-300">
                    Win exciting prizes including cash rewards, tech gadgets, and potential internship opportunities
                    with our sponsors.
                  </p>
                </div>
              </div>
            </div>
            <div className="glassmorphism-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg glassmorphism flex items-center justify-center shrink-0">
                  <Zap className="h-6 w-6 text-loc-cyan" />
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-xl mb-2">Industry Exposure</h3>
                  <p className="text-gray-300">
                    Showcase your skills to industry leaders and potential employers. Get feedback from experienced
                    professionals.
                  </p>
                </div>
              </div>
            </div>
            <div className="glassmorphism-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg glassmorphism flex items-center justify-center shrink-0">
                  <BookOpen className="h-6 w-6 text-loc-blue" />
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-xl mb-2">Hands-on Learning</h3>
                  <p className="text-gray-300">
                    Gain practical experience working on real-world problems. Learn new technologies and improve your
                    coding skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="glassmorphism max-w-4xl mx-auto p-8 md:p-12 rounded-2xl text-center">
            <h2 className="font-orbitron font-bold text-3xl md:text-4xl mb-6 text-gradient">
              Ready to Join the League?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Register now to secure your spot in the League of Coders. Create your account and get instant access to
              event resources, team formation, and more through your personalized dashboard.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="font-orbitron text-base bg-gradient-to-r from-loc-blue to-loc-purple hover:opacity-90"
              >
                <Link href="/register">Register Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-orbitron text-base">
                <Link href="/login">Already Registered? Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-center mb-12 text-gradient">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="glassmorphism-card p-8">
              <h3 className="font-orbitron font-bold text-2xl mb-6">Get in Touch</h3>
              <ContactForm />
            </div>
            <div className="glassmorphism-card p-8">
              <h3 className="font-orbitron font-bold text-2xl mb-6">Event Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg glassmorphism flex items-center justify-center shrink-0">
                    <Calendar className="h-5 w-5 text-loc-blue" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold text-lg mb-1">Date & Time</h4>
                    <p className="text-gray-300">April 19-20, 2025</p>
                    <p className="text-gray-300">9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg glassmorphism flex items-center justify-center shrink-0">
                    <MapPinned className="h-5 w-5 text-loc-purple" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold text-lg mb-1">Location</h4>
                    <p className="text-gray-300">ISIMS (Institut Supérieur d'Informatique et de Multimédia de Sfax)</p>
                    <p className="text-gray-300">Sfax, Tunisia</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg glassmorphism flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-loc-cyan" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold text-lg mb-1">Email</h4>
                    <p className="text-gray-300">info@leagueofcoders.com</p>
                    <p className="text-gray-300">support@leagueofcoders.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg glassmorphism flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-loc-blue" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold text-lg mb-1">Phone</h4>
                    <p className="text-gray-300">+216 XX XXX XXX</p>
                    <p className="text-gray-300">+216 XX XXX XXX</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Image src="/placeholder.svg?height=32&width=32" alt="LoC Logo" width={32} height={32} />
              <span className="font-orbitron font-bold">League of Coders</span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
              <Link href="#" className="text-sm hover:text-loc-blue transition">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm hover:text-loc-blue transition">
                Terms of Service
              </Link>
              <Link href="#contact" className="text-sm hover:text-loc-blue transition">
                Contact Us
              </Link>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-gray-400">© 2025 League of Coders. All rights reserved.</div>
          </div>
        </div>
      </footer>

      {/* Toast notifications */}
      <Toaster />
    </div>
  )
}

