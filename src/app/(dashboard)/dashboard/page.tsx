'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Settings, RefreshCcw, Zap } from 'lucide-react';
import { scrollFadeInUp } from '@/lib/motion';
import { motion } from 'framer-motion';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiService } from '@/lib/api/ApiService';
import { useRouter } from 'next/navigation';
import { formatSnapshotDate } from '@/lib/utils/dateFormat';
import { cn } from '@/lib/utils';
import { useToast } from '@/lib/hooks/useToast';
import { PriorityIndicator } from '../_components';
import { CreateSnapshotResponseDto, Snapshot } from '@/lib/types/snapshot';
import { useSubscriptionStatus } from '@/lib/hooks/useSubscriptionStatus';
import { LimitReachedPrompt } from '@/components';

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();

  // Use the subscription hook instead of direct API query
  const { status, canCreateSnapshot, needsUpgrade, subscriptionTier, hasActiveAccess } =
    useSubscriptionStatus();

  const {
    data: snapshots,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['snapshots'],
    queryFn: () => ApiService.send<Snapshot[]>('GET', 'snapshots'),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['GenerateNewSnapshot'],
    mutationFn: () => ApiService.send<CreateSnapshotResponseDto>('POST', 'snapshots'),
    onSuccess: (data) => {
      if (!data.success) {
        toast({
          title: 'Info',
          description: data.message || 'No snapshot created.',
          variant: 'info',
        });

        return;
      }
      refetch(); // Refetch snapshots after creating a new one
    },
    onError: (res) => {
      toast({
        title: res.name,
        description: res.message || 'Failed to create a new snapshot.',
        variant: 'destructive',
      });
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <motion.div className="mb-8" {...scrollFadeInUp}>
          <h1 className="text-3xl font-bold text-foreground mb-6">Dashboard</h1>

          {subscriptionTier === 'free' ? (
            // Ultra-simplified single-focus experience for free users
            <div className="max-w-xl mx-auto py-12">
              {/* Hero Section */}
              <div className="text-center space-y-6 mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-foreground mb-4">Welcome to Gystify!</h2>
                  <p className="text-xl text-muted-foreground">
                    Get AI-powered email insights and organized snapshots
                  </p>
                </div>
              </div>

              {/* Single CTA Card */}
              <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-950/20">
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        Ready to Transform Your Inbox?
                      </h3>
                      <p className="text-muted-foreground">
                        14 days free • No credit card required • Cancel anytime
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={() => router.push('/pricing')}
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90 text-white py-4 text-lg font-semibold"
                      >
                        <Zap className="mr-2 h-5 w-5" />
                        Choose Your Plan
                      </Button>

                      <p className="text-xs text-muted-foreground">
                        Start with our free trial or select a paid plan
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Regular dashboard for subscribed users
            <>
              {/* Subscription Status Card */}
              <Card className="elevated-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {status?.usage?.maxEmailsAllowed || 0}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {subscriptionTier === 'trial' ? 'Trial Emails Left' : 'Emails Available'}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {status?.usage?.emailsSummarizedToday || 0}/
                          {status?.usage?.maxEmailsAllowed || 0} used today
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 max-w-sm ml-8">
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg shadow-md"
                        onClick={() => mutate()}
                        disabled={isPending || !canCreateSnapshot}
                      >
                        {isPending ? (
                          <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Mail className="mr-2 h-4 w-4" />
                        )}
                        Create New Snapshot
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upgrade prompts for subscribed users with limits */}
              {(needsUpgrade || !hasActiveAccess) && (
                <div className="mt-4">
                  <LimitReachedPrompt feature="email processing and snapshots" />
                </div>
              )}

              {/* Manage subscription for active users */}
              {hasActiveAccess && !needsUpgrade && (
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    className="text-muted-foreground hover:text-foreground border-muted-foreground/30 hover:border-foreground/50"
                    onClick={() => router.push('/pricing')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Manage Subscription
                  </Button>
                </div>
              )}
            </>
          )}
        </motion.div>

        {/* Recent Snapshots Section - Only for subscribed users */}
        {subscriptionTier !== 'free' && (
          <motion.section className="mb-8" {...scrollFadeInUp}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Recent Snapshots</h2>
              <p className="text-sm text-muted-foreground">
                Snapshots are automatically deleted after 72 hours.
              </p>
            </div>

            <div className="space-y-3">
              {isLoading ? (
                // Loading skeleton for subscribed users
                <div className="space-y-3">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="h-5 bg-muted animate-pulse rounded w-32 mb-2"></div>
                          <div className="h-4 bg-muted animate-pulse rounded w-24"></div>
                        </div>
                        <div className="text-right">
                          <div className="h-8 bg-muted animate-pulse rounded w-12 mb-1"></div>
                          <div className="h-4 bg-muted animate-pulse rounded w-20"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : snapshots && snapshots.length > 0 ? (
                // Actual snapshots for subscribed users
                snapshots.map((snapshot, index) => {
                  const { day, time } = formatSnapshotDate(snapshot.createdAt);

                  return (
                    <Card
                      key={snapshot.id}
                      onClick={() => router.push('/snapshots/' + snapshot.id)}
                      className={cn(
                        'hover:shadow-md hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer',
                        index === 0 ? 'border-2 border-primary/30' : 'border border-transparent'
                      )}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-foreground">{day}</h3>
                              <p className="text-xs text-muted-foreground font-medium">
                                Created at {time}
                              </p>
                            </div>
                            <div className="text-center flex flex-col items-center">
                              <strong className="text-2xl font-bold text-foreground">
                                {snapshot.totalItems}
                              </strong>
                              <span className="text-sm text-muted-foreground">Emails</span>
                            </div>
                          </div>
                          {snapshot.priorityCounts && (
                            <div className="pt-2 border-t border-border/50">
                              <div className="flex items-center justify-between">
                                <p className="text-xs text-muted-foreground font-medium">
                                  Priority Distribution
                                </p>
                                <div className="flex items-center gap-2">
                                  {Object.entries(snapshot.priorityCounts)
                                    .filter(([_, count]) => count > 0)
                                    .map(([priority, count]) => (
                                      <PriorityIndicator
                                        key={priority}
                                        priority={priority}
                                        count={count}
                                      />
                                    ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                // Empty state for subscribed users
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="text-center text-muted-foreground">
                      <p>No snapshots available</p>
                      <p className="text-sm mt-1">Create your first snapshot to get started</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
}
