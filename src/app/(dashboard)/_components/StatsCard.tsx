import { Card, CardContent, CardHeader, CardTitle } from '@/components';
import { BarChart3 } from 'lucide-react';
import React from 'react';

interface Props {
  totalItems: number;
  deletedCount: number;
  retentionRate: number; // percentage
}

export const StatsCard = ({ totalItems, deletedCount, retentionRate }: Props) => {
  return (
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
          <span className="font-semibold text-foreground">{totalItems}</span>
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
  );
};
