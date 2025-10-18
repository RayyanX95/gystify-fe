import * as React from 'react';
import { AlertCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const errorMessageVariants = cva(
  'flex items-start gap-3 rounded-lg border p-4 text-sm transition-all',
  {
    variants: {
      variant: {
        error:
          'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-100 dark:border-red-800',
        warning:
          'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-100 dark:border-orange-800',
        info: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-100 dark:border-blue-800',
        destructive:
          'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-100 dark:border-red-800',
      },
      size: {
        sm: 'p-3 text-xs',
        default: 'p-4 text-sm',
        lg: 'p-5 text-base',
      },
    },
    defaultVariants: {
      variant: 'error',
      size: 'default',
    },
  }
);

interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof errorMessageVariants> {
  message?: string;
  title?: string;
  icon?: React.ComponentType<{ className?: string }>;
  showIcon?: boolean;
  onDismiss?: () => void;
}

const ErrorMessage = React.forwardRef<HTMLDivElement, ErrorMessageProps>(
  (
    {
      className,
      variant = 'error',
      size = 'default',
      message,
      title,
      icon: CustomIcon,
      showIcon = true,
      onDismiss,
      children,
      ...props
    },
    ref
  ) => {
    // Determine the icon based on variant
    const getDefaultIcon = () => {
      switch (variant) {
        case 'error':
        case 'destructive':
          return XCircle;
        case 'warning':
          return AlertTriangle;
        case 'info':
          return Info;
        default:
          return AlertCircle;
      }
    };

    const Icon = CustomIcon || getDefaultIcon();

    const iconSizeClass = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5';

    // Don't render if there's no content
    if (!message && !title && !children) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(errorMessageVariants({ variant, size }), className)}
        role="alert"
        {...props}
      >
        {showIcon && <Icon className={cn(iconSizeClass, 'flex-shrink-0 mt-0.5')} />}

        <div className="flex-1 space-y-1">
          {title && <div className="font-semibold">{title}</div>}
          {message && <div className={title ? 'text-sm opacity-90' : ''}>{message}</div>}
          {children && <div>{children}</div>}
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current rounded"
            aria-label="Dismiss"
          >
            <XCircle className={iconSizeClass} />
          </button>
        )}
      </div>
    );
  }
);

ErrorMessage.displayName = 'ErrorMessage';

export { ErrorMessage, errorMessageVariants };
export type { ErrorMessageProps };
