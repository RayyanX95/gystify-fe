"use client";

import { useAuthStore } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Settings, LogOut, BarChart3, Clock, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Mail className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Summa</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.name}
              </span>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Emails Summarized
              </CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45.2h</div>
              <p className="text-xs text-muted-foreground">
                +15.3% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Processing Speed
              </CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4s</div>
              <p className="text-xs text-muted-foreground">
                Average processing time
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Summaries</CardTitle>
              <CardDescription>Your latest email summaries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    from: "john@company.com",
                    subject: "Q4 Budget Review Meeting",
                    summary:
                      "Meeting scheduled for Thursday at 2 PM to discuss budget allocations...",
                    time: "2 hours ago",
                  },
                  {
                    from: "sarah@client.com",
                    subject: "Project Update Required",
                    summary:
                      "Client requesting status update on current project milestones...",
                    time: "4 hours ago",
                  },
                  {
                    from: "marketing@company.com",
                    subject: "New Campaign Launch",
                    summary:
                      "Marketing team announcing launch of new social media campaign...",
                    time: "6 hours ago",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex space-x-4 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {item.subject}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        From: {item.from}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.summary}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your email summarization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full justify-start" size="lg">
                  <Mail className="mr-2 h-4 w-4" />
                  Connect Email Account
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="lg"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="lg"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Customize Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
