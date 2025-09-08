import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Zap, Clock, Shield } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Mail className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">
                EmailSummarizer
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-indigo-600"
              >
                Sign In
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Summarize Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-500">
              Emails
            </span>{" "}
            Instantly
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Transform your email overload into clear, actionable insights with
            AI-powered summarization. Save time, stay organized, and never miss
            what matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose EmailSummarizer?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to streamline your email management and
            boost your productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Zap className="h-8 w-8 text-indigo-600" />,
              title: "AI-Powered",
              description:
                "Advanced AI technology provides accurate and contextual email summaries in seconds.",
            },
            {
              icon: <Clock className="h-8 w-8 text-indigo-600" />,
              title: "Save Time",
              description:
                "Reduce email processing time by up to 80% with intelligent summarization.",
            },
            {
              icon: <Shield className="h-8 w-8 text-indigo-600" />,
              title: "Secure & Private",
              description:
                "Enterprise-grade security ensures your email data remains private and protected.",
            },
            {
              icon: <Mail className="h-8 w-8 text-indigo-600" />,
              title: "Easy Integration",
              description:
                "Seamlessly connects with all major email providers including Gmail, Outlook, and more.",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-indigo-50 rounded-full w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Email Experience?
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who have already revolutionized
            their email workflow with EmailSummarizer. Start your free trial
            today.
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Get Started for Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Mail className="h-6 w-6 text-indigo-600" />
              <span className="font-semibold text-gray-900">
                EmailSummarizer
              </span>
            </div>
            <div className="text-sm text-gray-600">
              © 2025 EmailSummarizer. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
