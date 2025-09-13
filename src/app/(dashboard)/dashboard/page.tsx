'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Settings, BarChart3, Clock, Zap } from 'lucide-react';
import { RefreshCcw } from 'lucide-react';
import { FeatureSectionLoader } from '../_components';
import { scrollFadeInUp, scrollStaggerContainer, scrollStaggerChild } from '@/lib/motion';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ApiService } from '@/lib/api/ApiService';
import Link from 'next/link';

export interface EmailSummary {
  id: string;
  summaryDate: string; // ISO date string (YYYY-MM-DD)
  totalEmails: number;
  importantEmails: number;
  summary: string;
  keyInsights: string;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}

export default function DashboardPage() {
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['summary-stats'],
    queryFn: () => ApiService.send<EmailSummary>('POST', 'summaryGenerate'),
  });

  const getHoursAgo = (dateString: string) => {
    const now = new Date();
    const updated = new Date(dateString);
    const diffMs = now.getTime() - updated.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHrs < 1) {
      const diffMin = Math.floor(diffMs / (1000 * 60));
      return `${diffMin} min ago`;
    }
    return `${diffHrs} hr${diffHrs > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          {...scrollStaggerContainer}
        >
          {[
            {
              title: 'Emails Summarized',
              value: '1,234',
              description: '+20.1% from last month',
              icon: <Mail className="h-4 w-4 text-muted-foreground" />,
              color: 'text-primary',
            },
            {
              title: 'Time Saved',
              value: '45.2h',
              description: '+15.3% from last month',
              icon: <Clock className="h-4 w-4 text-muted-foreground" />,
              color: 'text-primary',
            },
            {
              title: 'Processing Speed',
              value: '2.4s',
              description: 'Average processing time',
              icon: <Zap className="h-4 w-4 text-muted-foreground" />,
              color: 'text-primary',
            },
          ].map((stat, idx) => (
            <motion.div key={stat.title} {...scrollStaggerChild}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.section className="mb-8" {...scrollFadeInUp}>
          {isLoading || isFetching ? (
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <FeatureSectionLoader />
            </motion.div>
          ) : (
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="shadow-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background/80">
                <CardHeader className="pb-0 flex flex-col gap-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-bold text-primary">
                        Daily Email Summary
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          Last updated: {data?.updatedAt ? getHoursAgo(data.updatedAt) : '--'}
                        </span>
                        <Button
                          className="inline-flex items-center justify-center rounded-md p-2 hover:bg-primary/10 transition"
                          title="Refresh summary"
                          variant="ghost"
                          onClick={() => refetch()}
                        >
                          <RefreshCcw className="h-5 w-5 text-primary" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription className="text-base text-muted-foreground">
                      View and update your summary for today. Only one summary is kept per day.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <span className="block text-lg font-semibold text-foreground mb-1">
                        Today&apos;s Overview
                      </span>
                      <p className="text-base text-muted-foreground bg-muted/30 rounded-md p-3 shadow-sm">
                        {data?.summary}
                      </p>
                    </div>
                    <div>
                      <span className="block text-lg font-semibold text-foreground mb-1">
                        Key Insights & Highlights
                      </span>
                      <ul className="list-disc list-inside text-base text-muted-foreground pl-4">
                        {data?.keyInsights
                          ?.split(/\d+\.\s?/)
                          .filter((insight: string) => insight.trim() !== '')
                          .map((insight: string, index: number) => (
                            <li key={index} className="mb-2 leading-relaxed">
                              {insight.trim()}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <Link
                        href={data?.id ? `/dashboard/emails/${data.id}` : '#'}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium shadow hover:bg-primary/90 transition text-sm"
                      >
                        <Mail className="h-4 w-4" />
                        View Mail Details
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.section>

        {/* Recent Activity */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" {...scrollFadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Recent Summaries</CardTitle>
              <CardDescription>Your latest email summaries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    from: 'john@company.com',
                    subject: 'Q4 Budget Review Meeting',
                    summary:
                      'Meeting scheduled for Thursday at 2 PM to discuss budget allocations...',
                    time: '2 hours ago',
                  },
                  {
                    from: 'sarah@client.com',
                    subject: 'Project Update Required',
                    summary: 'Client requesting status update on current project milestones...',
                    time: '4 hours ago',
                  },
                  {
                    from: 'marketing@company.com',
                    subject: 'New Campaign Launch',
                    summary: 'Marketing team announcing launch of new social media campaign...',
                    time: '6 hours ago',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex space-x-4 p-3 rounded-lg bg-muted/50">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{item.subject}</p>
                      <p className="text-xs text-muted-foreground">From: {item.from}</p>
                      <p className="text-sm text-muted-foreground">{item.summary}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{item.time}</div>
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
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <Settings className="mr-2 h-4 w-4" />
                  Customize Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
