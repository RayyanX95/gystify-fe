import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React from 'react';

export const FeatureSectionLoader = () => {
  return (
    <Card className="shadow-lg border-2 border-primary/20 bg-gradient-to-br from-primary/20 to-background/80 animate-pulse">
      <CardHeader className="pb-0 flex flex-col gap-2">
        <div>
          <div className="flex items-center justify-between">
            <div className="h-7 w-48 bg-muted/80 rounded mb-2" />
            <div className="flex items-center gap-2">
              <div className="h-4 w-24 bg-muted/80 rounded" />
              <div className="h-8 w-8 bg-muted/90 rounded-full" />
            </div>
          </div>
          <div className="h-4 w-64 bg-muted/80 rounded" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="h-5 w-32 bg-muted/90 rounded mb-2" />
            <div className="h-12 w-full bg-muted/90 rounded" />
          </div>
          <div>
            <div className="h-5 w-48 bg-muted/90 rounded mb-2" />
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-muted rounded" />
              <div className="h-4 w-2/3 bg-muted rounded" />
              <div className="h-4 w-1/2 bg-muted rounded" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <div className="h-10 w-32 bg-muted rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
