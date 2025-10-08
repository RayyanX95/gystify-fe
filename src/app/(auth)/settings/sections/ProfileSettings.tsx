'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components';
import { Input } from '@/components';
import { Avatar, AvatarFallback, AvatarImage } from '@/components';
import { useAuthStore } from '@/lib/stores/authStore';
import { useToast } from '@/lib/hooks/useToast';
// import { Camera, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { AlertTriangle, Trash2 } from 'lucide-react';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
  email: z.email('Invalid email address'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileSettings() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { user, updateUser } = useAuthStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profilePicture || '');
  // const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    },
  });

  const getUserInitials = (firstName?: string, lastName?: string): string => {
    if (!firstName && !lastName) return 'U';
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     if (file.size > 5 * 1024 * 1024) {
  //       toast({
  //         title: 'File too large',
  //         description: 'Profile image must be less than 5MB',
  //         variant: 'destructive',
  //       });
  //       return;
  //     }

  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setProfileImage(e.target?.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // Here you would make an API call to update the user profile
      // For now, we'll simulate it and update the store
      const updatedUser = {
        ...user!,
        firstName: data.firstName,
        lastName: data.lastName,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        profilePicture: profileImage,
      };

      updateUser(updatedUser);

      toast({
        title: 'Profile updated',
        description: 'Your profile information has been successfully updated.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Profile Picture Section */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profileImage} />
            <AvatarFallback className="bg-primary/10 text-primary text-xl">
              {getUserInitials(user?.firstName, user?.lastName)}
            </AvatarFallback>
          </Avatar>
          {/* <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 transition-colors shadow-md"
            type="button"
          >
            <Camera className="h-4 w-4" />
          </button> */}
          {/* <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          /> */}
        </div>
        {/* <div>
          <h3 className="text-lg font-medium">Profile Picture</h3>
          <p className="text-sm text-muted-foreground">
            Upload a photo to personalize your account
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Photo
          </Button>
        </div> */}
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="First Name"
              placeholder="Enter your first name"
              required
              error={errors.firstName?.message}
              {...register('firstName')}
            />
          </div>
          <div>
            <Input
              label="Last Name"
              placeholder="Enter your last name"
              required
              error={errors.lastName?.message}
              {...register('lastName')}
            />
          </div>
        </div>

        <div>
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            // required
            disabled
            error={errors.email?.message}
            {...register('email')}
          />
          {/* <p className="text-xs text-muted-foreground mt-1">
            Your email is used for login and important notifications
          </p> */}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>

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
