'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, Badge, Button, BadgeType, IconWithBackground } from '@/components';
import { Mail, Trash2, ExternalLink, Archive, Clock, ArrowLeft, InfoIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ApiService } from '@/lib/api/';
import { CategoriesTabs, SnapshotOverview, StatsCard } from '../../_components';
import { formatTime } from '@/lib/utils/dateFormat';
import { useMemo, useState } from 'react';

type PriorityLabel = 'urgent' | 'high' | 'medium' | 'low';

interface SnapshotItem {
  id: string;
  messageId: string;
  subject: string;
  summary: string;
  finishReason: 'content_filter' | 'stop' | 'length';
  snippet: string;
  date: string;
  openUrl: string;
  isIgnoredFromSnapshots: boolean;
  isRemovedFromInbox: boolean;
  attachmentsMeta: unknown[];
  categoryTags: string | null;
  priorityScore: number | null;
  priorityLabel: PriorityLabel | null;
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

export default function SnapshotPage() {
  const params = useParams();
  const snapshotId = params.snapshotId as string;

  const [selectedTab, setSelectedTab] = useState<'sender' | 'priority'>('priority');
  const [selectedSender, setSelectedCategory] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');

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

  const priorityCategories = useMemo(() => {
    if (!snapshot) {
      return {};
    }

    // Count items by priority
    const counts = snapshot.items.reduce((acc, item) => {
      const priority = item.priorityLabel || 'unassigned';
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Define priority order
    const priorityOrder: (PriorityLabel | 'unassigned')[] = [
      'urgent',
      'high',
      'medium',
      'low',
      'unassigned',
    ];

    // Return ordered object respecting priority hierarchy
    return priorityOrder.reduce((orderedAcc, priority) => {
      if (counts[priority]) {
        orderedAcc[priority] = counts[priority];
      }
      return orderedAcc;
    }, {} as Record<string, number>);
  }, [snapshot]);

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

  // Filter emails based on selected category
  const filteredItemsBySender =
    selectedSender === 'All'
      ? snapshot.items
      : snapshot.items.filter((item) => item.sender.domain === selectedSender);

  const priorityVariant = (label: PriorityLabel | null): BadgeType => {
    switch (label) {
      case 'urgent':
        return 'destructive';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const filteredItemsByPriority = snapshot.items.filter((item) => {
    if (selectedPriority === 'All') {
      return true;
    }
    const itemPriority = item.priorityLabel || 'unassigned';
    return itemPriority === selectedPriority;
  });

  const snapshotItems = selectedTab === 'sender' ? filteredItemsBySender : filteredItemsByPriority;

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
          <SnapshotOverview
            createdAt={snapshot.createdAt}
            totalItems={snapshot.totalItems}
            deletedCount={deletedCount}
            retentionRate={retentionRate}
          />
        </motion.div>

        {/* Email Categories Sidebar */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <CategoriesTabs
              emailCategories={emailCategories}
              selectedCategory={selectedSender}
              setSelectedCategory={setSelectedCategory}
              priorityCategories={priorityCategories}
              selectedPriority={selectedPriority}
              setSelectedPriority={setSelectedPriority}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />

            {/* Stats Card */}
            <StatsCard
              totalItems={snapshot.totalItems}
              deletedCount={deletedCount}
              retentionRate={retentionRate}
            />
          </div>

          {/* Main Email Content */}
          <div className="lg:col-span-3 space-y-4">
            {snapshotItems.map((item) => {
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
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground truncate">
                                {item.sender.name}
                              </h3>
                              {item.priorityLabel && (
                                <Badge
                                  variant={priorityVariant(item.priorityLabel)}
                                  className="text-xs"
                                >
                                  {item.priorityLabel}
                                </Badge>
                              )}
                            </div>
                            <h4 className="text-sm font-medium text-foreground mb-2 leading-tight">
                              {item.subject}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-2">
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
                        {summaryLines.map((line, lineIndex) => {
                          if (item.finishReason === 'content_filter') {
                            return (
                              <div key={lineIndex} className="flex items-start gap-2">
                                <IconWithBackground size="sm">
                                  <InfoIcon className="h-4 w-4 text-primary" />
                                </IconWithBackground>
                                <p className="text-sm leading-relaxed italic text-muted-foreground">
                                  {line.replace(/^\*\s*/, '')}
                                </p>
                              </div>
                            );
                          }
                          return (
                            <div key={lineIndex} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-primary/80 rounded-full mt-2 flex-shrink-0" />
                              <p className="text-sm  leading-relaxed">
                                {line.replace(/^\*\s*/, '')}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      {/* Timestamp */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Received at {formatTime(item.date)}</span>
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
