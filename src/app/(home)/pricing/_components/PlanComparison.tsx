'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { PRICING_PLANS, SUBSCRIPTION_PLANS, SubscriptionTier } from '@/lib/types/subscription';

const comparisonFeatures = [
  {
    category: 'Core Features',
    features: [
      { name: 'Snapshots per day', key: 'maxSnapshotsPerDay' },
      { name: 'Emails per snapshot', key: 'maxEmailsPerSnapshot' },
      { name: 'Snapshot history', key: 'snapshotRetentionDays' },
      { name: 'Gmail integration', value: true },
      { name: 'AI summaries', value: true },
    ],
  },
  {
    category: 'Advanced Features',
    features: [
      { name: 'Email categorization', key: 'canUseAdvancedCategorization' },
      { name: 'Priority scoring', key: 'canUsePriorityScoring' },
      { name: 'Outlook integration', key: 'canUseOutlookIntegration' },
      { name: 'Export to productivity tools', key: 'canExportToProductivityTools' },
      { name: 'Custom AI profiles', key: 'canUseCustomAIProfiles' },
    ],
  },
  {
    category: 'Support & Access',
    features: [
      { name: 'API access', key: 'hasApiAccess' },
      { name: 'Priority support', key: 'hasPrioritySupport' },
      { name: 'Team collaboration', key: 'hasTeamCollaboration' },
    ],
  },
];

const formatFeatureValue = (value: unknown, key: string): string => {
  if (key === 'maxSnapshotsPerDay') {
    return value === 999 ? 'Unlimited' : value === 0 ? 'None' : String(value);
  }
  if (key === 'snapshotRetentionDays') {
    return `${value} days`;
  }
  return String(value);
};

export default function PlanComparison() {
  const visiblePlans = PRICING_PLANS.filter((plan) => plan.tier !== SubscriptionTier.FREE);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="py-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Compare Plans</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          See exactly what&apos;s included in each plan to find the perfect fit for your needs
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Mobile-friendly stacked cards for smaller screens */}
          <div className="md:hidden space-y-6">
            {visiblePlans.map((plan) => (
              <Card key={plan.tier} className="relative">
                {plan.isPopular && (
                  <Badge className="absolute -top-2 left-4 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {comparisonFeatures.map((category) => (
                    <div key={category.category}>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                        {category.category}
                      </h4>
                      <div className="space-y-2">
                        {category.features.map((feature) => {
                          const planLimits = SUBSCRIPTION_PLANS[plan.tier as SubscriptionTier];
                          const hasFeature =
                            feature.value !== undefined
                              ? feature.value
                              : feature.key
                              ? planLimits[feature.key as keyof typeof planLimits]
                              : false;

                          return (
                            <div key={feature.name} className="flex items-center justify-between">
                              <span className="text-sm">{feature.name}</span>
                              <div className="flex items-center">
                                {typeof hasFeature === 'boolean' ? (
                                  hasFeature ? (
                                    <Check className="h-4 w-4 text-primary" />
                                  ) : (
                                    <X className="h-4 w-4 text-muted-foreground" />
                                  )
                                ) : (
                                  <span className="text-sm font-medium">
                                    {formatFeatureValue(hasFeature, feature.key || '')}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop table view */}
          <div className="hidden md:block">
            <div className="bg-card rounded-lg border overflow-hidden">
              <div className="grid grid-cols-4 gap-0">
                {/* Header row */}
                <div className="p-6 bg-muted/50 border-r">
                  <h3 className="font-semibold">Features</h3>
                </div>
                {visiblePlans.map((plan) => (
                  <div
                    key={plan.tier}
                    className={`p-6 text-center relative ${
                      plan.isPopular ? 'bg-primary/5 border-primary/20' : 'bg-muted/50'
                    } ${plan !== visiblePlans[visiblePlans.length - 1] ? 'border-r' : ''}`}
                  >
                    {plan.isPopular && (
                      <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    )}
                    <h3 className="font-semibold text-lg">{plan.name}</h3>
                  </div>
                ))}

                {/* Feature rows */}
                {comparisonFeatures.map((category) => (
                  <React.Fragment key={category.category}>
                    {/* Category header */}
                    <div className="col-span-4 bg-muted/30 p-4 border-t">
                      <h4 className="font-semibold text-sm text-muted-foreground">
                        {category.category}
                      </h4>
                    </div>

                    {category.features.map((feature) => (
                      <React.Fragment key={feature.name}>
                        <div className="p-4 border-r border-t bg-background">
                          <span className="text-sm font-medium">{feature.name}</span>
                        </div>
                        {visiblePlans.map((plan) => {
                          const planLimits = SUBSCRIPTION_PLANS[plan.tier as SubscriptionTier];
                          const hasFeature =
                            feature.value !== undefined
                              ? feature.value
                              : feature.key
                              ? planLimits[feature.key as keyof typeof planLimits]
                              : false;

                          return (
                            <div
                              key={`${plan.tier}-${feature.name}`}
                              className={`p-4 border-t text-center ${
                                plan.isPopular ? 'bg-primary/2' : 'bg-background'
                              } ${
                                plan !== visiblePlans[visiblePlans.length - 1] ? 'border-r' : ''
                              }`}
                            >
                              {typeof hasFeature === 'boolean' ? (
                                hasFeature ? (
                                  <Check className="h-5 w-5 text-primary mx-auto" />
                                ) : (
                                  <X className="h-5 w-5 text-muted-foreground mx-auto" />
                                )
                              ) : (
                                <span className="text-sm font-medium">
                                  {formatFeatureValue(hasFeature, feature.key || '')}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// Add React import for Fragment
import React from 'react';
