import { Card, CardContent, CardHeader, CardTitle } from '@/components';
import { BarChart3 } from 'lucide-react';
import React from 'react';
import { PriorityIndicator } from './PriorityIndicator';

interface Props {
  totalItems: number;
  deletedCount: number;
  retentionRate: number; // percentage
  priorityCounts: Record<string, number>;
}

export const StatsCard = ({ totalItems, priorityCounts }: Props) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Total Emails</span>
          <span className="font-semibold text-foreground">{totalItems}</span>
        </div>
        <div>
          <span className="text-sm text-muted-foreground mb-1">Priorities Distribution</span>
          <div className="flex items-center gap-2">
            {Object.entries(priorityCounts)
              .filter(([_, count]) => count > 0)
              .map(([priority, count]) => (
                <PriorityIndicator key={priority} priority={priority} count={count} />
              ))}
          </div>
        </div>
        {/* <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Retention Rate</span>
          <span className="font-semibold text-green-600">{retentionRate}%</span>
        </div> */}
      </CardContent>
    </Card>
  );
};
