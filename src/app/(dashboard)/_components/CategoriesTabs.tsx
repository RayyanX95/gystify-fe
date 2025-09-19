import { Badge, Card, CardContent } from '@/components';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components';

interface Props {
  setSelectedTab: (tab: 'sender' | 'priority') => void;
  selectedTab: 'sender' | 'priority';
  priorityCategories: Record<string, number>;
  selectedPriority: string;
  setSelectedPriority: (priority: string) => void;
  emailCategories: Record<string, number>;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const CategoriesTabs = ({
  emailCategories,
  selectedCategory,
  setSelectedCategory,
  priorityCategories,
  selectedPriority,
  setSelectedPriority,
  setSelectedTab,
}: Props) => {
  const allCount = Object.values(emailCategories).reduce((sum, count) => sum + count, 0);

  // ensure a precise tuple type so index 1 is known to be a number
  const categoriesArray: [string, number][] = [
    ['All', allCount],
    ...(Object.entries(emailCategories) as [string, number][]),
  ];

  // Sort categories by count in descending order
  const sortedCategories = categoriesArray.sort((a, b) => b[1] - a[1]);

  // Limit to top 5 categories
  // const topCategories = sortedCategories.slice(0, 5);

  // Function to map over categories
  const map = (fn: (item: [string, number]) => ReactNode) => sortedCategories.map(fn);

  const tabs = [
    { label: 'By Priority', value: 'priority' },
    { label: 'By Sender', value: 'sender' },
  ];

  return (
    <Card className="shadow-sm">
      <CardContent className="space-y-2 p-4">
        <Tabs defaultValue="priority">
          <TabsList className="grid w-full grid-cols-2">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                onClick={() => setSelectedTab(tab.value as 'sender' | 'priority')}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="priority" className="space-y-1">
            {[
              ['All', allCount] as [string, number],
              ...(Object.entries(priorityCategories) as [string, number][]),
            ].map(([priority, count]) => (
              <div
                key={priority}
                className={cn(
                  'flex items-center justify-between px-2 py-1 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer',
                  { 'bg-primary/10': selectedPriority === priority }
                )}
                onClick={() => setSelectedPriority(priority)}
              >
                <span className="text-sm font-medium text-foreground capitalize">{priority}</span>
                <Badge variant="secondary" className="text-xs">
                  {count}
                </Badge>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="sender" className="space-y-1">
            {map(([name, count]) => (
              <div
                key={name}
                className={cn(
                  'flex items-center justify-between px-2 py-1 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer',
                  { 'bg-primary/10': selectedCategory === name }
                )}
                onClick={() => setSelectedCategory(name)}
              >
                <span
                  title={name}
                  className="text-sm font-medium text-foreground capitalize truncate "
                >
                  {name}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {count}
                </Badge>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
