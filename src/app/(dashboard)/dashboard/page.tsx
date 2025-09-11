"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Settings, BarChart3, Clock, Zap } from "lucide-react";
import { MotionDiv } from "@/lib/motion";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <MotionDiv
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}
        >
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
        </MotionDiv>

        {/* Recent Activity */}
        <MotionDiv
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
        >
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
        </MotionDiv>
      </main>
    </div>
  );
}
