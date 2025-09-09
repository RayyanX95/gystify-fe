"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GoogleOAuthService } from "@/lib/google-oauth";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/lib/auth-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

type AuthStatus = "loading" | "success" | "error";

export default function GoogleCallbackPage() {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [message, setMessage] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { login } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const error = searchParams.get("error");

        if (error) {
          setStatus("error");
          setMessage(`Authentication failed: ${error}`);
          toast({
            title: "Authentication Failed",
            description: "Google authentication was cancelled or failed.",
            variant: "destructive",
          });
          return;
        }

        if (!code) {
          setStatus("error");
          setMessage("No authorization code received from Google.");
          return;
        }

        setMessage("Exchanging authorization code...");

        const googleOAuth = new GoogleOAuthService();
        const result = await googleOAuth.exchangeCodeForTokens(
          code,
          state || undefined
        );

        if (result.success && result.user) {
          setStatus("success");
          setMessage("Google account connected successfully!");

          // Update auth store with user info
          login(result.token || "temp-token", result.user);

          toast({
            title: "Success!",
            description: "Your Google account has been connected successfully.",
          });

          // Redirect to dashboard after success
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        } else {
          setStatus("error");
          setMessage(result.message || "Failed to connect Google account.");
          toast({
            title: "Connection Failed",
            description:
              result.message || "Failed to connect your Google account.",
            variant: "destructive",
          });
        }
      } catch (error) {
        setStatus("error");
        setMessage("An unexpected error occurred.");
        console.error("Google OAuth callback error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred during authentication.",
          variant: "destructive",
        });
      }
    };

    handleCallback();
  }, [searchParams, router, toast, login]);

  const handleRedirect = () => {
    if (status === "success") {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {status === "loading" && (
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
            )}
            {status === "success" && (
              <CheckCircle className="h-12 w-12 text-success" />
            )}
            {status === "error" && (
              <XCircle className="h-12 w-12 text-destructive" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {status === "loading" && "Connecting your account..."}
            {status === "success" && "Account Connected!"}
            {status === "error" && "Connection Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">{message}</p>

          {status !== "loading" && (
            <button
              onClick={handleRedirect}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            >
              {status === "success" ? "Go to Dashboard" : "Back to Login"}
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
