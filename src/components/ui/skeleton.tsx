import * as React from 'react';
import { cn } from '@/lib/utils';
import * as Primitive from '@radix-ui/react-slot';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  radius?: string;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, radius = 'rounded', ...props }, ref) => (
    <Primitive.Slot>
      <div ref={ref} className={cn('bg-muted/80 animate-pulse', radius, className)} {...props} />
    </Primitive.Slot>
  )
);
Skeleton.displayName = 'Skeleton';

export { Skeleton };
