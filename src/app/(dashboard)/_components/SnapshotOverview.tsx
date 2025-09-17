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
    <Card className="shadow-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background/80">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <IconWithBackground>
              <Mail className="h-10 w-10 text-primary" />
            </IconWithBackground>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{formatDate(createdAt)}</h1>
              <p className="text-muted-foreground">Email Snapshot Analysis</p>
              <span className="text-muted-foreground text-xs font-semibold">
                Created {formatTime(createdAt)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {/* <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{totalItems - deletedCount}</div>
              <div className="text-sm text-muted-foreground">Deleted</div>
            </div> */}
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">{totalItems}</div>
              <div className="text-sm text-muted-foreground">Emails</div>
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
        {/* <p className="text-xs text-muted-foreground text-right">
          {Math.round((deletedCount / totalItems) * 100 || 0)}% deleted
        </p> */}
      </CardContent>
    </Card>
  );
};
