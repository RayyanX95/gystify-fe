import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/components';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
  emailCategories: Record<string, number>;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const CategoriesTabs = ({
  emailCategories,
  selectedCategory,
  setSelectedCategory,
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

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center justify-between pr-2">
          Categories
          <Badge variant="outline" className="ml-2 text-xs">
            {sortedCategories.length - 1}
          </Badge>
        </CardTitle>
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
