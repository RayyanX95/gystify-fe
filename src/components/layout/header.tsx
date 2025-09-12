"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { useAuthStore } from "@/lib/auth-store";
import { LogOut, Mail, Settings } from "lucide-react";

import { useRouter } from "next/navigation";

export function Header() {
  const { user, logout, isAuthenticated, hasHydrated } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    router.push("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Mail className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Summa</span>
          </div>
          {hasHydrated ? (
            isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <motion.span
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  Welcome, {user?.name}
                </motion.span>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-indigo-600"
                  onClick={() => router.push("/login")}
                >
                  Sign In
                </Button>
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={() => router.push("/register")}
                >
                  Get Started
                </Button>
              </div>
            )
          ) : (
            // Rehydrating: render neutral placeholders to avoid flash
            <div className="flex items-center space-x-4">
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              <div className="h-8 w-20 bg-muted rounded animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

{
  /* <nav className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      <Link href="/" className="flex items-center space-x-2">
        <Mail className="h-8 w-8 text-indigo-600" />
        <span className="text-xl font-bold text-gray-900">Summa</span>
      </Link>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          className="text-gray-700 hover:text-indigo-600"
          onClick={() => router.push("/login")}
        >
          Sign In
        </Button>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={() => router.push("/register")}
        >
          Get Started
        </Button>
      </div>
    </div>
  </div>
</nav>; */
}
