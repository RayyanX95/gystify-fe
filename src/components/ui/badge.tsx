import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground ',
        secondary: 'border-transparent bg-secondary text-secondary-foreground ',
        outline: 'text-foreground',
        error: 'border-transparent bg-red-100 text-red-800 0 dark:bg-red-900 dark:text-red-100',
        ghost: 'bg-transparent text-foreground/90',
        // Elegant priority variants
        destructive: 'bg-red-50 text-red-500 border-red-200',
        warning: 'bg-orange-50 text-orange-500 border-orange-200',
        info: 'bg-blue-50 text-blue-500 border-blue-200',
        success: 'bg-green-50 text-green-500 border-green-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

type BadgeType = VariantProps<typeof badgeVariants>['variant'];

export { Badge, badgeVariants };
export type { BadgeType };
