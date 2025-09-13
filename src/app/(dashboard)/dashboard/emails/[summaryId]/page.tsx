'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  AlertCircle,
  Calendar,
  CheckSquare,
  MessageSquare,
  Tag,
  TrendingUp,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SummaryDetail {
  rawSummary: string;
  highlights: string;
  actionItems: string[];
  suggestedReplies: string[];
  deadlines: string[];
  mainTopics: string[];
  risks: string[];
  categories: Record<string, string[]>;
  notes: string;
}

const fetchSummaryDetail = async (summaryId: string): Promise<SummaryDetail> => {
  const response = await fetch(`/api/summaries/${summaryId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch summary detail');
  }
  return response.json();
};

export default function SummaryDetailPage() {
  const params = useParams();
  const summaryId = params.summaryId as string;

  const {
    data: summary,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['summary', summaryId],
    queryFn: () => fetchSummaryDetail(summaryId),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="border-destructive">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <span>Failed to load summary details</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <motion.div
        className="max-w-4xl mx-auto space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-foreground mb-2">Email Summary Details</h1>
          <p className="text-muted-foreground">Comprehensive analysis and insights</p>
        </motion.div>

        {/* Raw Summary */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{summary.rawSummary}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Highlights */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Key Highlights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed whitespace-pre-line">
                {summary.highlights}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Action Items */}
          {summary.actionItems.length > 0 && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckSquare className="h-5 w-5 text-primary" />
                    <span>Action Items</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {summary.actionItems.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Main Topics */}
          {summary.mainTopics.length > 0 && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Tag className="h-5 w-5 text-primary" />
                    <span>Main Topics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {summary.mainTopics.map((topic, index) => (
                      <Badge key={index} variant="secondary">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Deadlines */}
        {summary.deadlines.length > 0 && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-destructive" />
                  <span>Deadlines</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {summary.deadlines.map((deadline, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                      <span className="text-foreground">{deadline}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Risks */}
        {summary.risks.length > 0 && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <span>Risks</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {summary.risks.map((risk, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{risk}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Categories */}
        {Object.keys(summary.categories).length > 0 && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Tag className="h-5 w-5 text-primary" />
                  <span>Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(summary.categories).map(([category, items], index) => (
                    <div key={index}>
                      <h4 className="font-medium text-foreground mb-2">{category}</h4>
                      <ul className="ml-4 space-y-1">
                        {items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start space-x-2">
                            <div className="h-1.5 w-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                      {index < Object.entries(summary.categories).length - 1 && (
                        <Separator className="mt-3" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Suggested Replies */}
        {summary.suggestedReplies.length > 0 && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span>Suggested Replies</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {summary.suggestedReplies.map((reply, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <p className="text-foreground">{reply}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Notes */}
        {summary.notes && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Additional Notes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">{summary.notes}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
