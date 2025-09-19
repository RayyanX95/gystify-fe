import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { ApiService } from '@/lib/api/ApiService';
import { IconWithBackground } from '@/components';
import { Mail } from 'lucide-react';

export interface EmailSummary {
  id: string;
  title: string;
  summaryDate: string; // ISO date string (YYYY-MM-DD)
  totalEmails: number;
  importantEmails: number;
  summary: string;
  keyInsights: string;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}

export const SummariesHistory = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['summaries-history'],
    queryFn: () => ApiService.send<EmailSummary[]>('GET', 'summaryAll'),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Summaries</CardTitle>
          <CardDescription>Your latest email summaries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex space-x-4 p-3 rounded-lg bg-muted/50 animate-pulse">
                <div className="flex-1 space-y-1">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                </div>
                <div className="h-3 bg-muted rounded w-10"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Summaries</CardTitle>
          <CardDescription>Your latest email summaries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            <IconWithBackground>
              <Mail className="w-6 h-6 text-primary" aria-hidden />
            </IconWithBackground>

            <p className="text-sm text-muted-foreground">No summaries available.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Summaries</CardTitle>
        <CardDescription>Your latest email summaries</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data?.map((item, index) => (
            <div key={item.id ?? index} className="flex space-x-4 p-3 rounded-lg bg-muted/50">
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium leading-none">
                    {item.title?.slice(0, 80)}
                    {item.title?.length > 80 ? '…' : ''}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    {new Date(
                      item.updatedAt ?? item.createdAt ?? item.summaryDate
                    ).toLocaleString()}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Emails: {item.totalEmails} • Important: {item.importantEmails}
                </p>
                <p className="text-sm text-muted-foreground">{item.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
