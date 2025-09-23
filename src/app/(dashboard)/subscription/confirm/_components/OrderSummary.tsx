'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Check } from 'lucide-react';
import { formatPrice } from '@/lib/types/subscription';

interface PricingPlan {
  name: string;
  isPopular?: boolean;
  features: string[];
}

interface OrderSummaryProps {
  plan: PricingPlan;
  price: number;
  isYearly: boolean;
  savings: number;
}

export default function OrderSummary({ plan, price, isYearly, savings }: OrderSummaryProps) {
  return (
    <Card className="lg:col-span-1 ">
      <CardHeader>
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Plan Details */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium">{plan.name}</span>
            {plan.isPopular && (
              <Badge variant="secondary" className="ml-2">
                Most Popular
              </Badge>
            )}
          </div>
          <div className="text-right">
            <div className="font-bold">{formatPrice(price)}</div>
            <div className="text-sm text-muted-foreground">/{isYearly ? 'year' : 'month'}</div>
          </div>
        </div>

        {isYearly && savings > 0 && (
          <Badge variant="outline" className="w-fit">
            Save {savings}% annually
          </Badge>
        )}

        <Separator />

        {/* What's Included */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">What&apos;s included:</h4>
          <ul className="space-y-2">
            {plan.features.slice(0, 4).map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* Billing Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal</span>
            <span>{formatPrice(price)}</span>
          </div>
          <div className="flex justify-between font-semibold text-base">
            <span>Total due today</span>
            <span>{formatPrice(price)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
