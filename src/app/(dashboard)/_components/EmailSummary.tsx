import { Badge, BadgeType, Button, Card, CardContent, IconWithBackground } from '@/components';
import { PriorityLabel, SnapshotItem } from '@/lib/types/snapshot';
import { formatTime } from '@/lib/utils/dateFormat';
import { Clock, ExternalLink, InfoIcon, Mail } from 'lucide-react';
import React from 'react';

interface Props {
  item: SnapshotItem;
  summaryLines: string[];
}

export const EmailSummary = ({ item, summaryLines }: Props) => {
  const priorityVariant = (label: PriorityLabel | null): BadgeType => {
    switch (label) {
      case 'urgent':
        return 'destructive';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-primary/20 hover:border-l-primary">
      <CardContent className="p-4 md:p-6">
        {/* Email Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-start gap-2 md:gap-4 flex-1">
            <IconWithBackground size="lg">
              <Mail className="h-5 w-5 text-primary" />
            </IconWithBackground>
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2 mb-1">
                <h3 className="font-semibold text-foreground truncate text-wrap text-base md:text-xl">
                  {item.sender.name}
                </h3>
                {item.priorityLabel && (
                  <Badge variant={priorityVariant(item.priorityLabel)} className="text-xs">
                    {item.priorityLabel}
                  </Badge>
                )}
              </div>
              <h4 className="text-sm font-medium text-foreground mb-2 leading-tight">
                {item.subject}
              </h4>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 ml-4 md:flex">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-primary/10 hover:border-primary/30"
              onClick={() => window.open(item.openUrl, '_blank')}
              title="Open in Email Client"
            >
              <ExternalLink className="h-4 w-4" />
              Open
            </Button>
            {/* <Button
                variant={isDeleted ? 'default' : 'outline'}
                size="sm"
                className={`gap-2 ${
                  isDeleted
                    ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground'
                    : 'hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive'
                }`}
              >
                {isDeleted ? (
                  <Archive className="h-4 w-4" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                {isDeleted ? 'Deleted' : 'Delete'}
              </Button> */}
          </div>
        </div>

        {/* Email Content Preview */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-2">
          {summaryLines.map((line, lineIndex) => {
            if (item.finishReason === 'content_filter') {
              return (
                <div key={lineIndex} className="flex items-start gap-2">
                  <IconWithBackground size="sm">
                    <InfoIcon className="h-4 w-4 text-primary" />
                  </IconWithBackground>
                  <p className="text-sm leading-relaxed italic text-muted-foreground">
                    {line.replace(/^\*\s*/, '')}
                  </p>
                </div>
              );
            }
            return (
              <div key={lineIndex} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary/80 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm  leading-relaxed">{line.replace(/^\*\s*/, '')}</p>
              </div>
            );
          })}
        </div>

        {/* Timestamp */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Received at {formatTime(item.date)}</span>
          </div>

          {/* {isDeleted && (
            <Badge variant="destructive" className="text-xs">
              Scheduled for deletion
            </Badge>
          )} */}
        </div>
      </CardContent>
    </Card>
  );
};
