'use client';

import { motion } from 'framer-motion';
import { Mail, Target, Users, Zap, Shield, Heart } from 'lucide-react';

export default function AboutUsContent() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="section-layout">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <Mail className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Gystify</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re on a mission to transform how professionals manage their email, 
              turning information overload into actionable insights through the power of AI.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-12"
          >
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Email has become the backbone of modern business communication, but it&apos;s also become 
              a major source of stress and inefficiency. The average professional spends over 2.5 hours 
              daily managing email, often struggling to identify what&apos;s truly important among hundreds 
              of messages. We believe there&apos;s a better way.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              Gystify harnesses the power of artificial intelligence to automatically summarize, categorize, 
              and prioritize your emails, giving you back time to focus on what matters most in your work and life.
            </p>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <Shield className="h-8 w-8 text-primary mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy First</h3>
                  <p className="text-gray-700">
                    Your email data is sacred. We use industry-leading security measures, never store 
                    your original emails permanently, and give you complete control over your data.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Zap className="h-8 w-8 text-primary mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Effortless Efficiency</h3>
                  <p className="text-gray-700">
                    We believe powerful tools should be simple to use. Our AI works invisibly in the 
                    background, delivering insights without disrupting your workflow.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users className="h-8 w-8 text-primary mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Human-Centered AI</h3>
                  <p className="text-gray-700">
                    Technology should enhance human capability, not replace it. Our AI amplifies your 
                    decision-making while keeping you in control.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Heart className="h-8 w-8 text-primary mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Genuine Impact</h3>
                  <p className="text-gray-700">
                    We&apos;re not just building features—we&apos;re solving real problems that affect 
                    millions of professionals every day.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Gystify was born from a simple frustration: spending too much time managing email and 
                too little time actually getting work done. As a busy professional juggling multiple 
                projects and responsibilities, I experienced firsthand the productivity drain of email overload.
              </p>
              <p>
                After watching countless professionals struggle with the same challenges—missing important 
                messages buried in cluttered inboxes, spending hours categorizing emails manually, and 
                feeling overwhelmed by the constant stream of communication—I knew AI could provide a solution.
              </p>
              <p>
                Gystify is currently in development, designed to help professionals like you reclaim their 
                time and focus on what truly matters. We&apos;re building something that will make a real 
                difference in how people manage their digital communication.
              </p>
            </div>
          </motion.div>

          {/* Technology Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Technology</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Gystify leverages cutting-edge natural language processing and machine learning 
                technologies to understand the context, sentiment, and importance of your emails. 
                Our AI models are continuously trained on anonymized data to improve accuracy 
                while maintaining the highest privacy standards.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Advanced NLP</h3>
                  <p className="text-sm text-gray-600">
                    Our natural language processing understands context, intent, and urgency 
                    across multiple languages and communication styles.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Smart Learning</h3>
                  <p className="text-sm text-gray-600">
                    The system learns from your preferences and feedback, becoming more accurate 
                    and personalized over time.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Real-time Processing</h3>
                  <p className="text-sm text-gray-600">
                    Emails are processed instantly as they arrive, ensuring you always have 
                    up-to-date summaries and insights.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Enterprise Security</h3>
                  <p className="text-sm text-gray-600">
                    Bank-level encryption, SOC 2 compliance, and zero-trust architecture 
                    protect your sensitive information.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Future Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="bg-gradient-to-br from-primary/5 to-background/80 rounded-lg shadow-lg p-8 text-center"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Looking Forward</h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              I&apos;m building more than just an email tool—I&apos;m creating an intelligent 
              communication platform that will revolutionize how professionals interact with information. 
              Thank you for being part of this journey as we shape the future of workplace productivity.
            </p>
            <div className="mt-8">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
              >
                Share Your Feedback
                <Mail className="ml-2 h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}