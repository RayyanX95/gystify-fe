import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Zap, Clock, Shield } from "lucide-react";
import { MotionDiv, MotionMain, MotionSpan } from "@/lib/motion";

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <MotionMain
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white"
      >
        <div className="text-center">
          <MotionSpan
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
          >
            Summarize Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-500">
              Emails
            </span>{" "}
            Instantly
          </MotionSpan>
          <MotionSpan
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
          >
            Transform your email overload into clear, actionable insights with
            AI-powered summarization. Save time, stay organized, and never miss
            what matters.
          </MotionSpan>
          <MotionDiv
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, staggerChildren: 0.1 }}
          >
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
          </MotionDiv>
        </div>
      </MotionMain>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
        <MotionDiv
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Summa?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to streamline your email management and
            boost your productivity.
          </p>
        </MotionDiv>

        <MotionDiv
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.06 }}
        >
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
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
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
        </MotionDiv>
      </section>

      {/* CTA Section */}
      <section className="bg-white border-t">
        <MotionDiv
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Email Experience?
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who have already revolutionized
            their email workflow with Summa. Start your free trial today.
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Get Started for Free
          </Button>
        </MotionDiv>
      </section>
    </div>
  );
}
