'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/lib/hooks/useToast';
import { motion } from 'framer-motion';
import { Bell, Mail, Smartphone, Clock, AlertCircle } from 'lucide-react';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  email: boolean;
  browser: boolean;
  mobile: boolean;
}

export function NotificationSettings() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'email_summaries',
      label: 'Email Summaries',
      description: 'Get notified when new email summaries are ready',
      email: true,
      browser: true,
      mobile: true,
    },
    {
      id: 'priority_alerts',
      label: 'Priority Alerts',
      description: 'Instant notifications for high-priority emails',
      email: true,
      browser: true,
      mobile: false,
    },
    {
      id: 'daily_digest',
      label: 'Daily Digest',
      description: 'Daily summary of your email activity and insights',
      email: true,
      browser: false,
      mobile: false,
    },
    {
      id: 'weekly_report',
      label: 'Weekly Report',
      description: 'Weekly productivity report and email statistics',
      email: true,
      browser: false,
      mobile: false,
    },
    {
      id: 'account_updates',
      label: 'Account Updates',
      description: 'Security alerts and account-related notifications',
      email: true,
      browser: true,
      mobile: true,
    },
    {
      id: 'feature_announcements',
      label: 'Feature Announcements',
      description: 'Updates about new features and improvements',
      email: false,
      browser: false,
      mobile: false,
    },
  ]);

  const [deliverySettings, setDeliverySettings] = useState({
    digestTime: '09:00',
    weeklyReportDay: 'monday',
    priorityThreshold: 'medium',
  });

  const updateNotification = (
    id: string,
    channel: 'email' | 'browser' | 'mobile',
    value: boolean
  ) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, [channel]: value } : notif))
    );
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Here you would make an API call to save the notification settings
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call

      toast({
        title: 'Settings saved',
        description: 'Your notification preferences have been updated.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const toggleAllNotifications = (enabled: boolean) => {
    setNotifications((prev) =>
      prev.map((notif) => ({
        ...notif,
        email: enabled,
        browser:
          enabled &&
          (notif.id === 'email_summaries' ||
            notif.id === 'priority_alerts' ||
            notif.id === 'account_updates'),
        mobile: enabled && (notif.id === 'email_summaries' || notif.id === 'account_updates'),
      }))
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Notification Overview */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Notification Preferences</h3>
          <p className="text-sm text-muted-foreground">
            Choose how you want to be notified about your email intelligence.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => toggleAllNotifications(false)}>
            Disable All
          </Button>
          <Button variant="outline" size="sm" onClick={() => toggleAllNotifications(true)}>
            Enable All
          </Button>
        </div>
      </div>

      {/* Notification Types */}
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4 pb-2 border-b text-sm font-medium text-muted-foreground">
          <div>Notification Type</div>
          <div className="text-center">
            <Mail className="h-4 w-4 mx-auto mb-1" />
            Email
          </div>
          <div className="text-center">
            <Bell className="h-4 w-4 mx-auto mb-1" />
            Browser
          </div>
          <div className="text-center">
            <Smartphone className="h-4 w-4 mx-auto mb-1" />
            Mobile
          </div>
        </div>

        {notifications.map((notification) => (
          <div key={notification.id} className="grid grid-cols-4 gap-4 items-center py-3">
            <div>
              <div className="font-medium">{notification.label}</div>
              <div className="text-sm text-muted-foreground">{notification.description}</div>
            </div>
            <div className="text-center">
              <input
                type="checkbox"
                checked={notification.email}
                onChange={(e) => updateNotification(notification.id, 'email', e.target.checked)}
                className="rounded border-input text-primary focus:ring-primary"
              />
            </div>
            <div className="text-center">
              <input
                type="checkbox"
                checked={notification.browser}
                onChange={(e) => updateNotification(notification.id, 'browser', e.target.checked)}
                className="rounded border-input text-primary focus:ring-primary"
              />
            </div>
            <div className="text-center">
              <input
                type="checkbox"
                checked={notification.mobile}
                onChange={(e) => updateNotification(notification.id, 'mobile', e.target.checked)}
                className="rounded border-input text-primary focus:ring-primary"
              />
            </div>
          </div>
        ))}
      </div>

      <Separator />

      {/* Delivery Settings */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Delivery Settings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Daily Digest Time</label>
            <select
              value={deliverySettings.digestTime}
              onChange={(e) =>
                setDeliverySettings((prev) => ({ ...prev, digestTime: e.target.value }))
              }
              className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value="06:00">6:00 AM</option>
              <option value="07:00">7:00 AM</option>
              <option value="08:00">8:00 AM</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="18:00">6:00 PM</option>
              <option value="19:00">7:00 PM</option>
              <option value="20:00">8:00 PM</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Weekly Report Day</label>
            <select
              value={deliverySettings.weeklyReportDay}
              onChange={(e) =>
                setDeliverySettings((prev) => ({ ...prev, weeklyReportDay: e.target.value }))
              }
              className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Priority Alert Threshold</label>
          <div className="flex items-center space-x-4">
            {['low', 'medium', 'high'].map((level) => (
              <label key={level} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="priorityThreshold"
                  value={level}
                  checked={deliverySettings.priorityThreshold === level}
                  onChange={(e) =>
                    setDeliverySettings((prev) => ({ ...prev, priorityThreshold: e.target.value }))
                  }
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm capitalize">{level}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Only emails above this priority level will trigger instant alerts
          </p>
        </div>
      </div>

      <Separator />

      {/* Do Not Disturb */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Do Not Disturb</h3>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium">Quiet Hours</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Pause non-urgent notifications during specified hours
              </p>
              <div className="flex items-center space-x-4 mt-3">
                <div>
                  <label className="block text-xs font-medium mb-1">From</label>
                  <input
                    type="time"
                    defaultValue="22:00"
                    className="px-2 py-1 border border-input rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">To</label>
                  <input
                    type="time"
                    defaultValue="07:00"
                    className="px-2 py-1 border border-input rounded text-sm"
                  />
                </div>
              </div>
            </div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-input text-primary focus:ring-primary"
              />
              <span className="text-sm">Enable</span>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button onClick={handleSaveSettings} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Preferences'}
        </Button>
      </div>
    </motion.div>
  );
}
