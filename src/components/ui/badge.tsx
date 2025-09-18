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
        destructive: 'border-transparent bg-destructive text-destructive-foreground ',
        outline: 'text-foreground',
        success:
          'border-transparent bg-green-100 text-green-800 0 dark:bg-green-900 dark:text-green-100',
        error: 'border-transparent bg-red-100 text-red-800 0 dark:bg-red-900 dark:text-red-100',
        warning:
          'border-transparent bg-orange-200 text-orange-800 0 dark:bg-orange-900 dark:text-orange-200',
        info: 'border-transparent bg-blue-100 text-blue-800 0 dark:bg-blue-900 dark:text-blue-100',
        ghost: 'bg-transparent text-foreground/90',
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
