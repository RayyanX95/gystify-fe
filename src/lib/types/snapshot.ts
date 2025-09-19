export type PriorityLabel = 'urgent' | 'high' | 'medium' | 'low';

export interface SnapshotItem {
  id: string;
  messageId: string;
  subject: string;
  summary: string;
  finishReason: 'content_filter' | 'stop' | 'length';
  snippet: string;
  date: string;
  openUrl: string;
  isIgnoredFromSnapshots: boolean;
  isRemovedFromInbox: boolean;
  attachmentsMeta: unknown[];
  categoryTags: string | null;
  priorityScore: number | null;
  priorityLabel: PriorityLabel | null;
  sender: {
    id: string;
    name: string;
    emailAddress: string;
    domain: string;
  };
  createdAt: string;
}

export interface SnapshotResponse {
  id: string;
  snapshotDate: string;
  totalItems: number;
  retentionExpiresAt: string;
  createdAt: string;
  items: SnapshotItem[];
}
