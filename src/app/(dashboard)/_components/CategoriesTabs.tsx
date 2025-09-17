import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/components';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  emailCategories: Record<string, number>;
}

export const CategoriesTabs = ({ emailCategories }: Props) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');

  const allCount = Object.values(emailCategories).reduce((sum, count) => sum + count, 0);

  // ensure a precise tuple type so index 1 is known to be a number
  const categoriesArray: [string, number][] = [
    ['All', allCount],
    ...(Object.entries(emailCategories) as [string, number][]),
  ];

  // Sort categories by count in descending order
  const sortedCategories = categoriesArray.sort((a, b) => b[1] - a[1]);

  // Limit to top 5 categories
  const topCategories = sortedCategories.slice(0, 5);

  // Function to map over categories
  const map = (fn: (item: [string, number]) => React.ReactNode) => topCategories.map(fn);

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {map(([domain, count]) => (
          <div
            key={domain}
            className={cn(
              'flex items-center justify-between px-2 py-1 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer',
              { 'bg-primary/10': selectedCategory === domain }
            )}
            onClick={() => setSelectedCategory(domain)}
          >
            <span className="text-sm font-medium text-foreground capitalize">
              {domain.replace('.com', '').replace('.', ' ')}
            </span>
            <Badge variant="secondary" className="text-xs">
              {count}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
