import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, UserSquare, Award, FileText, BarChart } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-orbitron text-3xl font-bold mb-2 text-gradient">Admin Dashboard</h1>
        <p className="text-gray-400">
          Manage users, teams, resources, and certificates for the League of Coders event.
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glassmorphism-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Users</p>
                <p className="text-3xl font-bold mt-1">248</p>
              </div>
              <div className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center">
                <Users className="h-6 w-6 text-loc-blue" />
              </div>
            </div>
            <div className="mt-4 text-xs text-green-400 flex items-center">
              <span>↑ 12% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Teams</p>
                <p className="text-3xl font-bold mt-1">42</p>
              </div>
              <div className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center">
                <UserSquare className="h-6 w-6 text-loc-purple" />
              </div>
            </div>
            <div className="mt-4 text-xs text-green-400 flex items-center">
              <span>↑ 8% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Resources</p>
                <p className="text-3xl font-bold mt-1">18</p>
              </div>
              <div className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center">
                <FileText className="h-6 w-6 text-loc-cyan" />
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-400 flex items-center">
              <span>Last updated 2 days ago</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Certificates</p>
                <p className="text-3xl font-bold mt-1">0</p>
              </div>
              <div className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center">
                <Award className="h-6 w-6 text-loc-blue" />
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-400 flex items-center">
              <span>Available after event</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <Card className="glassmorphism-card">
        <CardHeader>
          <CardTitle className="font-orbitron">Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button asChild variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
            <Link href="/admin/users">
              <Users className="h-6 w-6 mb-1" />
              <span>Manage Users</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
            <Link href="/admin/teams">
              <UserSquare className="h-6 w-6 mb-1" />
              <span>Manage Teams</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
            <Link href="/admin/resources">
              <FileText className="h-6 w-6 mb-1" />
              <span>Upload Resources</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
            <Link href="/admin/analytics">
              <BarChart className="h-6 w-6 mb-1" />
              <span>View Analytics</span>
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Recent activity */}
      <Card className="glassmorphism-card">
        <CardHeader>
          <CardTitle className="font-orbitron">Recent Activity</CardTitle>
          <CardDescription>Latest actions and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 glassmorphism rounded-lg">
              <div className="w-8 h-8 rounded-full glassmorphism flex items-center justify-center shrink-0">
                <Users className="h-4 w-4 text-loc-blue" />
              </div>
              <div>
                <p className="font-medium">New User Registration</p>
                <p className="text-xs text-gray-400">John Doe registered as a participant</p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 glassmorphism rounded-lg">
              <div className="w-8 h-8 rounded-full glassmorphism flex items-center justify-center shrink-0">
                <UserSquare className="h-4 w-4 text-loc-purple" />
              </div>
              <div>
                <p className="font-medium">New Team Created</p>
                <p className="text-xs text-gray-400">Team "CodeMasters" was created by Alice Smith</p>
                <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 glassmorphism rounded-lg">
              <div className="w-8 h-8 rounded-full glassmorphism flex items-center justify-center shrink-0">
                <FileText className="h-4 w-4 text-loc-cyan" />
              </div>
              <div>
                <p className="font-medium">Resource Added</p>
                <p className="text-xs text-gray-400">New API documentation was added to resources</p>
                <p className="text-xs text-gray-500 mt-1">1 day ago</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 glassmorphism rounded-lg">
              <div className="w-8 h-8 rounded-full glassmorphism flex items-center justify-center shrink-0">
                <Users className="h-4 w-4 text-loc-blue" />
              </div>
              <div>
                <p className="font-medium">User Role Updated</p>
                <p className="text-xs text-gray-400">Bob Johnson was assigned as a mentor</p>
                <p className="text-xs text-gray-500 mt-1">2 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

