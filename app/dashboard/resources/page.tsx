import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, ExternalLink, Video, Code } from "lucide-react"

export default function Resources() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="font-orbitron text-3xl font-bold mb-2 text-gradient">Resources</h1>
      <p className="text-gray-400 mb-8">
        Access all the materials and resources you need for the League of Coders event.
      </p>

      <Tabs defaultValue="guidelines" className="mb-8">
        <TabsList className="glassmorphism mb-6">
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          <TabsTrigger value="tools">Tools & APIs</TabsTrigger>
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
        </TabsList>

        <TabsContent value="guidelines">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glassmorphism-card">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center gap-2">
                  <FileText className="h-5 w-5 text-loc-blue" />
                  Event Rules
                </CardTitle>
                <CardDescription>Official rules and guidelines for the competition</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">
                  Comprehensive guide to the rules, judging criteria, and code of conduct for the League of Coders
                  event.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center gap-2">
                  <FileText className="h-5 w-5 text-loc-purple" />
                  Submission Guidelines
                </CardTitle>
                <CardDescription>How to submit your project for evaluation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">
                  Step-by-step guide on how to prepare and submit your project for evaluation by the judges.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center gap-2">
                  <FileText className="h-5 w-5 text-loc-cyan" />
                  Judging Criteria
                </CardTitle>
                <CardDescription>How your project will be evaluated</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">
                  Detailed breakdown of the judging criteria and scoring system used to evaluate submissions.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center gap-2">
                  <FileText className="h-5 w-5 text-loc-blue" />
                  Schedule & Timeline
                </CardTitle>
                <CardDescription>Detailed event schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">
                  Complete schedule of the event including opening ceremony, workshops, mentoring sessions, and
                  deadlines.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tools">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glassmorphism-card">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center gap-2">
                  <Code className="h-5 w-5 text-loc-blue" />
                  API Documentation
                </CardTitle>
                <CardDescription>Access to partner APIs for the hackathon</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">
                  Documentation and access keys for APIs provided by our sponsors for use during the hackathon.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Access Documentation
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center gap-2">
                  <Code className="h-5 w-5 text-loc-purple" />
                  Development Tools
                </CardTitle>
                <CardDescription>Recommended tools and environments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">
                  List of recommended development tools, IDEs, and environments for the hackathon.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View Tools List
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center gap-2">
                  <Code className="h-5 w-5 text-loc-cyan" />
                  Starter Templates
                </CardTitle>
                <CardDescription>Boilerplate code to get you started</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">
                  Starter templates for various technologies to help you get your project up and running quickly.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Templates
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center gap-2">
                  <Code className="h-5 w-5 text-loc-blue" />
                  Cloud Resources
                </CardTitle>
                <CardDescription>Free cloud resources for the event</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">
                  Access to free cloud resources and hosting provided by our sponsors for the duration of the hackathon.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Access Cloud Resources
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="datasets">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glassmorphism-card">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center gap-2">
                  <FileText className="h-5 w-5 text-loc-blue" />
                  Public Datasets
                </CardTitle>
                <CardDescription>Curated datasets for your projects</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">
                  Collection of public datasets that you can use in your projects, covering various domains.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Browse Datasets
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center gap-2">
                  <FileText className="h-5 w-5 text-loc-purple" />
                  Sponsor Datasets
                </CardTitle>
                <CardDescription>Exclusive datasets from our sponsors</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">
                  Exclusive datasets provided by our sponsors for use during the hackathon.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    Access Datasets
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tutorials">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glassmorphism-card">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center gap-2">
                  <Video className="h-5 w-5 text-loc-blue" />
                  Web Development
                </CardTitle>
                <CardDescription>Tutorials for web development</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">
                  Video tutorials and guides for web development using modern frameworks and technologies.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Watch Tutorials
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center gap-2">
                  <Video className="h-5 w-5 text-loc-purple" />
                  Mobile Development
                </CardTitle>
                <CardDescription>Tutorials for mobile app development</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">
                  Video tutorials and guides for mobile app development using React Native, Flutter, and native
                  platforms.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Watch Tutorials
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center gap-2">
                  <Video className="h-5 w-5 text-loc-cyan" />
                  AI/ML Development
                </CardTitle>
                <CardDescription>Tutorials for AI and machine learning</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">
                  Video tutorials and guides for AI and machine learning development using popular frameworks.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Watch Tutorials
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center gap-2">
                  <Video className="h-5 w-5 text-loc-blue" />
                  Game Development
                </CardTitle>
                <CardDescription>Tutorials for game development</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">
                  Video tutorials and guides for game development using Unity, Unreal Engine, and web-based game
                  frameworks.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" className="flex items-center justify-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Watch Tutorials
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

