'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, Button } from '@/components';
import { Mail, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ApiService } from '@/lib/api/';
import { CategoriesTabs, EmailSummary, SnapshotOverview, StatsCard } from '../../_components';
import { useMemo, useState } from 'react';
import { PriorityLabel, SnapshotResponse } from '@/lib/types/snapshot';

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
      const priority = item.priorityLabel || 'medium';
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Define priority order
    const priorityOrder: (PriorityLabel | 'medium')[] = ['urgent', 'high', 'medium', 'low'];

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

  // Group emails by sender names for categories
  const emailSenders = snapshot.items.reduce((acc, item) => {
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

  const filteredItemsByPriority = snapshot.items.filter((item) => {
    if (selectedPriority === 'All') {
      return true;
    }
    const itemPriority = item.priorityLabel || 'medium';
    return itemPriority === selectedPriority;
  });

  const snapshotItems = selectedTab === 'sender' ? filteredItemsBySender : filteredItemsByPriority;

  const priorityCounts: Record<string, number> = snapshot.items.reduce((acc, item) => {
    const priority = item.priorityLabel || 'medium';
    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <motion.div
        className="max-w-6xl mx-auto p-3 md:p-6 space-y-6"
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
              emailCategories={emailSenders}
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
              priorityCounts={priorityCounts}
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
                  <EmailSummary item={item} summaryLines={summaryLines} />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
