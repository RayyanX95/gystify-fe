import { Skeleton } from '@/components';
import React from 'react';

export const SummaryDetailsLoader = () => (
  <div className="min-h-screen bg-background p-6">
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Skeleton className="h-10 w-2/3 mb-2" radius="rounded" />
      <Skeleton className="h-5 w-1/3 mb-4" radius="rounded" />

      {/* Summary Card */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <Skeleton className="h-6 w-1/4 mb-3" radius="rounded" />
        <Skeleton className="h-5 w-2/3" radius="rounded" />
      </div>

      {/* Highlights Card */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <Skeleton className="h-6 w-1/4 mb-3" radius="rounded" />
        <Skeleton className="h-4 w-full mb-2" radius="rounded" />
        <Skeleton className="h-4 w-5/6 mb-2" radius="rounded" />
        <Skeleton className="h-4 w-4/6" radius="rounded" />
      </div>

      {/* Action Items & Main Topics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <Skeleton className="h-6 w-1/3 mb-3" radius="rounded" />
          <Skeleton className="h-4 w-full mb-2" radius="rounded" />
          <Skeleton className="h-4 w-5/6 mb-2" radius="rounded" />
          <Skeleton className="h-4 w-4/6" radius="rounded" />
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <Skeleton className="h-6 w-1/3 mb-3" radius="rounded" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-32" radius="rounded-full" />
            <Skeleton className="h-6 w-40" radius="rounded-full" />
            <Skeleton className="h-6 w-36" radius="rounded-full" />
          </div>
        </div>
      </div>

      {/* Categories Card */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <Skeleton className="h-6 w-1/4 mb-3" radius="rounded" />
        <Skeleton className="h-4 w-1/2 mb-2" radius="rounded" />
        <Skeleton className="h-4 w-2/3 mb-2" radius="rounded" />
        <Skeleton className="h-4 w-1/3" radius="rounded" />
      </div>
    </div>
  </div>
);
