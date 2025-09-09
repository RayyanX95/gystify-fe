"use client";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  return (
    <nav className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
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
    </nav>
  );
}
