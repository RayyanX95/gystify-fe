"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Zap, Clock, Shield } from "lucide-react";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useToast } from "@/lib/hooks/use-toast";

export default function HomePage() {
  const { toast } = useToast();
  useEffect(() => {
    toast({
      title: "Welcome to Summa!",
      description: "Your AI-powered email summarization assistant.",
      duration: 4000,
      variant: "destructive",
    });
  }, []);
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6"
          >
            Summarize Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500">
              Emails
            </span>{" "}
            Instantly
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10"
          >
            Transform your email overload into clear, actionable insights with
            AI-powered summarization. Save time, stay organized, and never miss
            what matters.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, staggerChildren: 0.1 }}
          >
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-primary hover:bg-indigo-700 text-white"
              onClick={() =>
                toast({
                  title: "Get Started",
                  description: "Sign up for a free trial to start using Summa.",
                  duration: 4000,
                  variant: "destructive",
                })
              }
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-white"
            >
              Watch Demo
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose Summa?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to streamline your email management and
            boost your productivity.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          // {...scrollStaggerContainer}
        >
          {[
            {
              icon: <Zap className="h-8 w-8 text-primary" />,
              title: "AI-Powered",
              description:
                "Advanced AI technology provides accurate and contextual email summaries in seconds.",
            },
            {
              icon: <Clock className="h-8 w-8 text-primary" />,
              title: "Save Time",
              description:
                "Reduce email processing time by up to 80% with intelligent summarization.",
            },
            {
              icon: <Shield className="h-8 w-8 text-primary" />,
              title: "Secure & Private",
              description:
                "Enterprise-grade security ensures your email data remains private and protected.",
            },
            {
              icon: <Mail className="h-8 w-8 text-primary" />,
              title: "Easy Integration",
              description:
                "Seamlessly connects with all major email providers including Gmail, Outlook, and more.",
            },
          ].map((feature, index) => (
            <motion.div key={index} /*{...scrollStaggerChild} */>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white h-full">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-white border-t">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
          // {...scrollFadeInUp}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Email Experience?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who have already revolutionized
            their email workflow with Summa. Start your free trial today.
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-primary hover:bg-indigo-700 text-white"
          >
            Get Started for Free
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
