'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GoogleOAuthButton } from '@/components';
import { Eye, EyeOff, User } from 'lucide-react';
import { useToast } from '@/lib/hooks/useToast';
import { auth } from '@/lib/api';
import { useAuthStore } from '@/lib/authStore';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: 'Password mismatch',
        description: 'Passwords do not match. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await auth.register({ name, email, password });

      if (response.data) {
        const { token, user } = response.data;

        // Set token in zustand store
        login(token, user);

        // Set token in localStorage for API calls
        localStorage.setItem('auth_token', token);

        // Set token in cookie for middleware
        document.cookie = `auth_token=${token}; Path=/; SameSite=Lax; Secure=${
          window.location.protocol === 'https:'
        };`;

        toast({
          title: 'Welcome to Gystify!',
          description: 'Your account has been created successfully.',
        });
        router.push('/dashboard');
      }
    } catch {
      toast({
        title: 'Registration failed',
        description: 'Unable to create account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <User className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>Join Gystify and start organizing your emails</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Divider */}
          {/* <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div> */}

          {/* Google OAuth Button */}
          <GoogleOAuthButton>Sign up with Gmail</GoogleOAuthButton>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
