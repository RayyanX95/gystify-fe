'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare, HeadphonesIcon, Clock, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input, Textarea } from '@/components/ui';

// Form validation schema
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.email('Please enter a valid email address'),
  type: z.enum(['general', 'support', 'billing', 'feature', 'partnership', 'press']),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      type: 'general',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate the API call

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitted(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      // Handle error (you could show an error toast here)
      // For now, we'll just silently fail
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="section-layout">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <MessageSquare className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about Gystify? Need support? Want to share feedback? We&apos;d love to
              hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h2>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6"
                >
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    Thank you! We&apos;ll get back to you within 24 hours.
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    type="text"
                    id="name"
                    label="Name"
                    required
                    error={errors.name?.message}
                    {...register('name')}
                    placeholder="Your full name"
                  />

                  <Input
                    type="email"
                    id="email"
                    label="Email"
                    required
                    error={errors.email?.message}
                    {...register('email')}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Inquiry Type
                  </label>
                  <select
                    id="type"
                    {...register('type')}
                    className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
                      errors.type ? 'border-red-500 focus-visible:ring-red-500' : ''
                    }`}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="feature">Feature Request</option>
                    <option value="partnership">Partnership</option>
                    <option value="press">Press & Media</option>
                  </select>
                  {errors.type && (
                    <p className="text-sm text-red-600 flex items-center mt-1">
                      <HelpCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                      {errors.type.message}
                    </p>
                  )}
                </div>

                <Input
                  type="text"
                  id="subject"
                  label="Subject"
                  required
                  error={errors.subject?.message}
                  {...register('subject')}
                  placeholder="Brief description of your message"
                />

                <Textarea
                  id="message"
                  label="Message"
                  required
                  error={errors.message?.message}
                  {...register('message')}
                  rows={6}
                  placeholder="Tell us how we can help you..."
                  className="resize-vertical"
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Email Support</h4>
                      <p className="text-gray-600 mt-1">support@gystify.com</p>
                      <p className="text-sm text-gray-500 mt-1">
                        For technical support and general inquiries
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <HeadphonesIcon className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Business Inquiries</h4>
                      <p className="text-gray-600 mt-1">business@gystify.com</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Partnerships, enterprise sales, press
                      </p>
                    </div>
                  </div>

                  {/* <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Office</h4>
                      <p className="text-gray-600 mt-1">
                        123 Innovation Drive
                        <br />
                        San Francisco, CA 94105
                        <br />
                        United States
                      </p>
                    </div>
                  </div> */}

                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Response Time</h4>
                      <p className="text-gray-600 mt-1">Usually within 24 hours</p>
                      <p className="text-sm text-gray-500 mt-1">Monday - Friday, 9 AM - 6 PM PST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Help</h3>
                <div className="space-y-4">
                  <p className="text-gray-600 mb-4">
                    Before reaching out, you might find answers to common questions here:
                  </p>
                  <div className="space-y-3">
                    <a
                      href="/faq#getting-started"
                      className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900">Getting Started Guide</h4>
                      <p className="text-sm text-gray-600">
                        Learn how to connect Gmail and create your first snapshots
                      </p>
                    </a>
                    <a
                      href="/faq#billing"
                      className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900">Billing & Subscriptions</h4>
                      <p className="text-sm text-gray-600">
                        Manage your account, change plans, or handle billing issues
                      </p>
                    </a>
                    <a
                      href="/faq#privacy"
                      className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900">Privacy & Security</h4>
                      <p className="text-sm text-gray-600">
                        Understand how we protect your email data
                      </p>
                    </a>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <a
                      href="/faq"
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      View All FAQs
                      <HelpCircle className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Emergency Support */}
              {/* <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-900">Critical Issues</h4>
                    <p className="text-red-700 text-sm mt-1">
                      For urgent security concerns or data access issues affecting your business,
                      email us at <strong>urgent@gystify.com</strong> with &quot;URGENT&quot; in the
                      subject line.
                    </p>
                  </div>
                </div>
              </div> */}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
