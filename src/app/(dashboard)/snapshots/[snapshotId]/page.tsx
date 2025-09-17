'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components';
import { Mail, Trash2, ExternalLink, Archive, Clock, BarChart3, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { ApiService } from '@/lib/api/ApiService';

interface SnapshotItem {
  id: string;
  messageId: string;
  subject: string;
  summary: string;
  snippet: string;
  date: string;
  openUrl: string;
  isIgnoredFromSnapshots: boolean;
  isRemovedFromInbox: boolean;
  attachmentsMeta: unknown[];
  categoryTags: string | null;
  priorityScore: number | null;
  priorityLabel: string | null;
  sender: {
    id: string;
    name: string;
    emailAddress: string;
    domain: string;
  };
  createdAt: string;
}

interface SnapshotResponse {
  id: string;
  snapshotDate: string;
  totalItems: number;
  retentionExpiresAt: string;
  createdAt: string;
  items: SnapshotItem[];
}

export default function SummaryDetailPage() {
  const params = useParams();
  const snapshotId = params.snapshotId as string;

  const { data: snapshot, isLoading } = useQuery({
    queryKey: ['snapshot', snapshotId],
    queryFn: () =>
      ApiService.send<SnapshotResponse>('GET', 'snapshotById', { pathParams: { id: snapshotId } }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'EEEE, MMMM d');
    } catch {
      return 'Unknown date';
    }
  };

  const formatTime = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'h:mm a');
    } catch {
      return 'Unknown time';
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-muted rounded w-1/3"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-32 bg-muted rounded"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show error state
  if (!snapshot) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <Card className="shadow-lg border-destructive">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-destructive">
                <Mail className="h-5 w-5" />
                <span>Failed to load snapshot details</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Group emails by sender domain for categories
  const emailCategories = snapshot.items.reduce((acc, item) => {
    const domain = item.sender.domain;
    acc[domain] = (acc[domain] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const deletedCount = snapshot.items.filter((item) => item.isRemovedFromInbox).length;
  const retentionRate =
    snapshot.totalItems > 0
      ? Math.round(((snapshot.totalItems - deletedCount) / snapshot.totalItems) * 100)
      : 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <motion.div
        className="max-w-6xl mx-auto p-6 space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header with Back Button */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </motion.div>

        {/* Email Client Header */}
        <motion.div variants={itemVariants}>
          <Card className="shadow-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background/80">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">
                      {formatDate(snapshot.snapshotDate)}
                    </h1>
                    <p className="text-muted-foreground">Email Snapshot Analysis</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {snapshot.totalItems - deletedCount}
                    </div>
                    <div className="text-sm text-muted-foreground">Inbox</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{snapshot.totalItems}</div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </div>
                  <div className="text-center">
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2"
                    >
                      Overview
                    </Button>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${100 - retentionRate}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground text-right">
                {Math.round((deletedCount / snapshot.totalItems) * 100 || 0)}% deleted
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Email Categories Sidebar */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-foreground">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(emailCategories).map(([domain, count]) => (
                  <div
                    key={domain}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-medium text-foreground capitalize">
                      {domain.replace('.com', '').replace('.', ' ')}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Emails</span>
                  <span className="font-semibold text-foreground">{snapshot.totalItems}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Deleted</span>
                  <span className="font-semibold text-destructive">{deletedCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Retention Rate</span>
                  <span className="font-semibold text-green-600">{retentionRate}%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Email Content */}
          <div className="lg:col-span-3 space-y-4">
            {snapshot.items.map((item, index) => {
              const isDeleted = item.isRemovedFromInbox;
              const summaryLines = item.summary.split('\n').filter((line) => line.trim() !== '');

              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className={`transition-all duration-200 ${isDeleted ? 'opacity-60' : ''}`}
                >
                  <Card className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-primary/20 hover:border-l-primary">
                    <CardContent className="p-6">
                      {/* Email Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground truncate">
                                {item.sender.name}
                              </h3>
                              <Badge variant="secondary" className="text-xs">
                                {item.sender.domain.replace('.com', '').replace('.', ' ')}
                              </Badge>
                            </div>
                            <h4 className="text-sm font-medium text-foreground mb-2 leading-tight">
                              {item.subject}
                            </h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {item.snippet}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 hover:bg-primary/10 hover:border-primary/30"
                            onClick={() => window.open(item.openUrl, '_blank')}
                            title="Open in Email Client"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Open
                          </Button>
                          <Button
                            variant={isDeleted ? 'default' : 'outline'}
                            size="sm"
                            className={`gap-2 ${
                              isDeleted
                                ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground'
                                : 'hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive'
                            }`}
                          >
                            {isDeleted ? (
                              <Archive className="h-4 w-4" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                            {isDeleted ? 'Deleted' : 'Delete'}
                          </Button>
                        </div>
                      </div>

                      {/* Email Content Preview */}
                      <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                        {summaryLines.slice(0, 3).map((line, lineIndex) => (
                          <div key={lineIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary/80 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm  leading-relaxed">{line.replace(/^\*\s*/, '')}</p>
                          </div>
                        ))}
                        {summaryLines.length > 3 && (
                          <div className="flex items-center gap-2 pt-2">
                            <div className="w-1.5 h-1.5 bg-primary/80 rounded-full flex-shrink-0" />
                            <p className="text-xs text-muted-foreground italic">
                              +{summaryLines.length - 3} more points
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Timestamp */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatTime(item.date)}</span>
                        </div>
                        {isDeleted && (
                          <Badge variant="destructive" className="text-xs">
                            Scheduled for deletion
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
