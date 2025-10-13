'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, LucideIcon } from 'lucide-react';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: 'default' | 'destructive';
  icon?: LucideIcon;
  isLoading?: boolean;
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
  icon: Icon = AlertTriangle,
  isLoading = false,
}: ConfirmationDialogProps) {
  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-2 mb-2">
            <Icon
              className={`h-6 w-6 ${
                variant === 'destructive' ? 'text-destructive' : 'text-primary'
              }`}
            />
            <DialogTitle
              className={variant === 'destructive' ? 'text-destructive' : 'text-foreground'}
            >
              {title}
            </DialogTitle>
          </div>
          <DialogDescription className="text-left">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleCancel} className="flex-1 sm:flex-none">
            {cancelText}
          </Button>
          <Button
            variant={variant === 'destructive' ? 'destructive' : 'default'}
            onClick={handleConfirm}
            className="flex-1 sm:flex-none"
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
