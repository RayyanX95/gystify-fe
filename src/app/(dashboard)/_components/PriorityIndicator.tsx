import { Badge, BadgeType } from '@/components/ui/badge';
import { AlertTriangle, ArrowUp, Minus, ArrowDown } from 'lucide-react';
import { ElementType } from 'react';

// Priority display component
export const PriorityIndicator = ({ priority, count }: { priority: string; count: number }) => {
  const getPriorityConfig = (
    priority: string
  ): { icon: ElementType; variant: BadgeType; label: string } => {
    switch (priority) {
      case 'urgent':
        return {
          icon: AlertTriangle,
          variant: 'destructive',
          label: 'Urgent',
        };
      case 'high':
        return {
          icon: ArrowUp,
          variant: 'warning',
          label: 'High',
        };
      case 'medium':
        return {
          icon: Minus,
          variant: 'info',
          label: 'Medium',
        };
      case 'low':
        return {
          icon: ArrowDown,
          variant: 'success',
          label: 'Low',
        };
      default:
        return {
          icon: Minus,
          variant: 'secondary' as const,
          label: priority,
        };
    }
  };

  const config = getPriorityConfig(priority);
  const Icon = config.icon;

  return (
    <Badge
      variant={config.variant}
      className="gap-1"
      title={`${config.label} Priority: ${count} email${count !== 1 ? 's' : ''}`}
    >
      <Icon className="h-3 w-3" />
      {count}
    </Badge>
  );
};
