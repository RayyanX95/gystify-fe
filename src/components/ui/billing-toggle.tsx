'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface BillingToggleProps {
  value: 'monthly' | 'yearly';
  onValueChange: (value: 'monthly' | 'yearly') => void;
  className?: string;
}

export function BillingToggle({ value, onValueChange, className }: BillingToggleProps) {
  return (
    <div
      className={cn('relative inline-flex items-center bg-muted rounded-full p-1 h-10', className)}
    >
      {/* Background slider */}
      <div
        className={cn(
          'absolute top-1 bottom-1 bg-primary rounded-full shadow-sm transition-all duration-200 ease-out',
          value === 'monthly' ? 'left-1 right-[50%]' : 'left-[50%] right-1'
        )}
      />

      {/* Monthly button */}
      <button
        onClick={() => onValueChange('monthly')}
        className={cn(
          'relative z-10 flex-1 px-4 py-1.5 text-sm font-medium transition-colors duration-200',
          'rounded-full focus:outline-none',
          value === 'monthly'
            ? 'text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        Monthly
      </button>

      {/* Yearly button */}
      <button
        onClick={() => onValueChange('yearly')}
        className={cn(
          'relative z-10 flex-1 px-4 py-1.5 text-sm font-medium transition-colors duration-200',
          'rounded-full focus:outline-none',
          value === 'yearly'
            ? 'text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        Yearly
      </button>
    </div>
  );
}
