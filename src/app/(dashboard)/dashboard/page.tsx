'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Settings, BarChart3 } from 'lucide-react';
import { RefreshCcw } from 'lucide-react';
import { FeatureSectionLoader, MetricsCards, SummariesHistory } from '../_components';
import { scrollFadeInUp, scrollStaggerContainer } from '@/lib/motion';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ApiService } from '@/lib/api/ApiService';
import Link from 'next/link';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';

export interface EmailSummary {
  id: string;
  title: string;
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

    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const getHoursAgo = (dateString: string) => {
    if (!dateString) {
      return '--';
    }
    try {
      return formatDistanceToNowStrict(parseISO(dateString), { addSuffix: true });
    } catch {
      return '--';
    }
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
          <MetricsCards />
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
        <motion.div className="grid grid-cols-1 **lg:grid-cols-2 gap-6" {...scrollFadeInUp}>
          <SummariesHistory />

          {/* <Card>
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
          </Card> */}
        </motion.div>
      </main>
    </div>
  );
}
