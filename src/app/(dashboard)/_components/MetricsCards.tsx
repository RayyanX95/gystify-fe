import { Clock, Mail, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { scrollStaggerChild } from '@/lib/motion';
import { motion } from 'framer-motion';
import { IconWithBackground } from '@/components';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ApiService } from '@/lib/api/ApiService';

interface MetricsStats {
  emailsSummarized: number;
  avgProcessingSec: number;
  estimatedTimeSavedHours: number;
  lastUpdated: string; // ISO datetime string
}

export const MetricsCards = () => {
  const { data } = useQuery({
    queryKey: ['metrics-stats'],
    queryFn: () => ApiService.send<MetricsStats>('GET', 'metricsStats'),

    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {[
        {
          title: 'Emails Summarized',
          value: data?.emailsSummarized.toLocaleString() || '0',
          description: '+20.1% from last month',
          icon: <Mail className="h-8 w-8 text-primary" />,
          color: 'text-primary',
        },
        {
          title: 'Time Saved',
          value: data?.estimatedTimeSavedHours.toLocaleString() || '0' + ' hrs',
          description: '+15.3% from last month',
          icon: <Clock className="h-8 w-8 text-primary" />,
          color: 'text-primary',
        },
        {
          title: 'Processing Speed',
          value: data?.avgProcessingSec.toFixed(2) + 's' || '0s',
          description: 'Average processing time',
          icon: <Zap className="h-8 w-8 text-primary" />,
          color: 'text-primary',
        },
      ].map((stat, idx) => (
        <motion.div key={stat.title} {...scrollStaggerChild}>
          <Card>
            <CardHeader className="text-center pb-4">
              <IconWithBackground>{stat.icon}</IconWithBackground>
              <CardTitle className="text-xl">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>

              <CardDescription className="text-base leading-relaxed text-muted-foreground">
                {stat.description}
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </>
  );
};
