'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/lib/hooks/useToast';
import { motion } from 'framer-motion';
import { Key, Globe, Trash2, AlertTriangle } from 'lucide-react';

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const timezones = [
  { value: 'America/New_York', label: 'Eastern Time (UTC-5)' },
  { value: 'America/Chicago', label: 'Central Time (UTC-6)' },
  { value: 'America/Denver', label: 'Mountain Time (UTC-7)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (UTC-8)' },
  { value: 'Europe/London', label: 'Greenwich Mean Time (UTC+0)' },
  { value: 'Europe/Paris', label: 'Central European Time (UTC+1)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (UTC+9)' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (UTC+10)' },
];

export function AccountSettings() {
  const { toast } = useToast();
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState('America/New_York');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const handlePasswordChange = async (data: PasswordFormData) => {
    setIsPasswordLoading(true);
    try {
      // Here you would make an API call to change the password
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call

      toast({
        title: 'Password updated',
        description: 'Your password has been successfully changed.',
      });
      resetPassword();
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update password. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const handleTimezoneChange = async (timezone: string) => {
    try {
      setSelectedTimezone(timezone);
      // Here you would make an API call to update the timezone preference
      toast({
        title: 'Timezone updated',
        description: 'Your timezone preference has been saved.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update timezone. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Here you would make an API call to delete the account
      toast({
        title: 'Account deletion initiated',
        description: "We've sent you an email with further instructions.",
      });
      setIsDeleteModalOpen(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to initiate account deletion. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Password Change Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Key className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Change Password</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Update your password to keep your account secure.
        </p>

        <form onSubmit={handlePasswordSubmit(handlePasswordChange)} className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            placeholder="Enter your current password"
            required
            error={passwordErrors.currentPassword?.message}
            {...registerPassword('currentPassword')}
          />

          <Input
            label="New Password"
            type="password"
            placeholder="Enter your new password"
            required
            error={passwordErrors.newPassword?.message}
            {...registerPassword('newPassword')}
          />

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Confirm your new password"
            required
            error={passwordErrors.confirmPassword?.message}
            {...registerPassword('confirmPassword')}
          />

          <Button type="submit" disabled={isPasswordLoading}>
            {isPasswordLoading ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </div>

      <Separator />

      {/* Timezone Settings */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Timezone</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Set your timezone to receive notifications and summaries at the right time.
        </p>

        <div className="max-w-md">
          <select
            value={selectedTimezone}
            onChange={(e) => handleTimezoneChange(e.target.value)}
            className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          >
            {timezones.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Separator />

      {/* Email Preferences */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Email Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              defaultChecked
              className="rounded border-input text-primary focus:ring-primary"
            />
            <div>
              <div className="text-sm font-medium">Marketing emails</div>
              <div className="text-xs text-muted-foreground">
                Receive updates about new features and tips
              </div>
            </div>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              defaultChecked
              className="rounded border-input text-primary focus:ring-primary"
            />
            <div>
              <div className="text-sm font-medium">Product updates</div>
              <div className="text-xs text-muted-foreground">
                Get notified about important changes and improvements
              </div>
            </div>
          </label>
        </div>
      </div>

      <Separator />

      {/* Danger Zone */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          <h3 className="text-lg font-medium">Danger Zone</h3>
        </div>

        <div className="border border-destructive/20 rounded-lg p-4 bg-destructive/5">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-destructive">Delete Account</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Permanently delete your account and all associated data. This action cannot be
                undone.
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsDeleteModalOpen(true)}
              className="ml-4"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center space-x-2 text-destructive mb-4">
              <AlertTriangle className="h-6 w-6" />
              <h3 className="text-lg font-semibold">Confirm Account Deletion</h3>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to delete your account? This will permanently remove all your
              data, including email summaries, preferences, and subscription information. This
              action cannot be undone.
            </p>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteAccount} className="flex-1">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
