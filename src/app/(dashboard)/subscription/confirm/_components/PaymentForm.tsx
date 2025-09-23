'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Shield, Lock } from 'lucide-react';
import { formatPrice, SubscriptionTier } from '@/lib/types/subscription';

interface Props {
  tier: SubscriptionTier;
  planName: string;
  price: number;
  isYearly: boolean;
  isLoading: boolean;
  paymentStep: 'details' | 'processing' | 'success';
  onConfirmPayment: () => void;
  onCancel: () => void;
}

export default function PaymentForm({
  tier,
  planName,
  price,
  isYearly,
  isLoading,
  paymentStep,
  onConfirmPayment,
  onCancel,
}: Props) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Details
        </CardTitle>
        <p className="text-muted-foreground">Secure checkout powered by Stripe</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Email Address */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value="john@example.com"
            readOnly
            className="bg-muted/50"
          />
        </div>

        {/* Card Information */}
        <div className="space-y-3">
          <Label htmlFor="card-element" className="text-sm font-medium">
            Card Information
          </Label>
          <div
            id="card-element"
            className="p-3 border rounded-md bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all"
          >
            <div className="space-y-2">
              <Input
                placeholder="1234 5678 9012 3456"
                className="border-0 p-0 h-auto text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                value="4242 4242 4242 4242"
                readOnly
              />
              <div className="flex gap-2">
                <Input
                  placeholder="MM/YY"
                  className="border-0 p-0 h-auto text-base flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value="12/27"
                  readOnly
                />
                <Input
                  placeholder="CVC"
                  className="border-0 p-0 h-auto text-base flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value="123"
                  readOnly
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Lock className="w-3 h-3" />
            Your payment information is encrypted and secure
          </p>
        </div>

        <Separator />

        {/* Security Notice */}
        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Powered by Stripe</p>
            <p className="text-xs text-muted-foreground">
              Your payment is secured with bank-level encryption. We never store your card details.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onConfirmPayment}
            disabled={isLoading || paymentStep === 'processing'}
            className="w-full"
            size="lg"
          >
            {paymentStep === 'processing' ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Securing Payment...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Subscribe {formatPrice(price)}/{isYearly ? 'year' : 'month'}
              </div>
            )}
          </Button>

          <Button
            onClick={onCancel}
            variant="outline"
            disabled={paymentStep === 'processing'}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
