import { Card, CardContent, IconWithBackground } from '@/components';
import { formatDate, formatTime } from '@/lib/utils/';
import { Mail } from 'lucide-react';
import React from 'react';

interface Props {
  createdAt: string; // ISO date string (YYYY-MM-DD)
  totalItems: number;
  deletedCount: number;
  retentionRate: number; // percentage
}

export const SnapshotOverview = ({ createdAt, totalItems, deletedCount, retentionRate }: Props) => {
  return (
    <Card className="elevated-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-4">
            <IconWithBackground>
              <Mail className="h-10 w-10 text-primary" />
            </IconWithBackground>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{formatDate(createdAt)}</h1>
              <span className="text-muted-foreground text-xs font-semibold">
                Created {formatTime(createdAt)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">{totalItems}</div>
              <div className="text-sm text-muted-foreground">Emails</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
