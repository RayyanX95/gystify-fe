import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/components';
import React from 'react';

interface Props {
  emailCategories: Record<string, number>;
}

export const CategoriesTabs = ({ emailCategories }: Props) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {Object.entries(emailCategories).map(([domain, count]) => (
          <div
            key={domain}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
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
