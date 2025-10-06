'use client';

import { motion } from 'framer-motion';
import { Plus, Minus, HelpCircle, Search, Mail, Shield, CreditCard, Zap } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'getting-started' | 'billing' | 'privacy' | 'technical' | 'general';
}

const faqData: FAQItem[] = [
  // Getting Started
  {
    id: 'gs-1',
    category: 'getting-started',
    question: 'How do I get started with Gystify?',
    answer:
      'Getting started is simple: 1) Sign up for a free account, 2) Connect your Gmail account using secure OAuth, 3) Create your first AI snapshot to see email summaries, 4) Explore categories and insights. No credit card required for the free trial.',
  },
  {
    id: 'gs-2',
    category: 'getting-started',
    question: 'What email providers does Gystify support?',
    answer:
      "Currently, Gystify supports Gmail accounts through Google's secure OAuth integration. We're working on adding support for Outlook and other email providers in future updates.",
  },
  {
    id: 'gs-3',
    category: 'getting-started',
    question: 'How long does it take to process my emails?',
    answer:
      'Initial email processing typically takes 1-3 minutes depending on your inbox size. Once set up, new emails are processed in real-time as they arrive, usually within seconds.',
  },
  {
    id: 'gs-4',
    category: 'getting-started',
    question: 'Can I try Gystify before subscribing?',
    answer:
      'Yes! We offer 15 free AI snapshots with no credit card required. This lets you experience the full value of Gystify before deciding on a paid plan.',
  },

  // Billing & Plans
  {
    id: 'b-1',
    category: 'billing',
    question: 'What are AI snapshots?',
    answer:
      'AI snapshots are comprehensive email summaries that include categorized emails, priority insights, key action items, and productivity analytics. Each snapshot covers a specific time period of your inbox activity.',
  },
  {
    id: 'b-2',
    category: 'billing',
    question: 'How does the pricing work?',
    answer:
      'We offer flexible plans: Free trial (15 snapshots), Starter ($9/month for 50 snapshots), Professional ($19/month for 150 snapshots), and Enterprise ($39/month for unlimited snapshots). All plans include the same AI features.',
  },
  {
    id: 'b-3',
    category: 'billing',
    question: 'Can I change or cancel my plan anytime?',
    answer:
      'Absolutely! You can upgrade, downgrade, or cancel your subscription at any time from your account settings. Changes take effect at the next billing cycle, and you retain access until the current period ends.',
  },
  {
    id: 'b-4',
    category: 'billing',
    question: 'Do you offer refunds?',
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact us within 30 days of your purchase for a full refund.",
  },
  {
    id: 'b-5',
    category: 'billing',
    question: 'Is there a discount for annual billing?',
    answer:
      'Yes! Annual subscribers save 20% compared to monthly billing. For example, the Professional plan costs $152/year instead of $228 when billed monthly.',
  },

  // Privacy & Security
  {
    id: 'p-1',
    category: 'privacy',
    question: 'How do you protect my email data?',
    answer:
      'We use enterprise-grade security: end-to-end encryption, secure OAuth (we never see your password), SOC 2 compliance, and we never permanently store your original email content. Only AI-generated summaries are retained.',
  },
  {
    id: 'p-2',
    category: 'privacy',
    question: 'Do you read my emails?',
    answer:
      'No humans at Gystify read your emails. Our AI processes email content to generate summaries, but all processing is automated and secure. We never share email content with third parties.',
  },
  {
    id: 'p-3',
    category: 'privacy',
    question: 'Where is my data stored?',
    answer:
      'Your data is stored in secure, encrypted cloud servers in the United States. We use industry-leading cloud providers with SOC 2 Type II compliance and regular security audits.',
  },
  {
    id: 'p-4',
    category: 'privacy',
    question: 'Can I delete my data?',
    answer:
      'Yes! You can delete individual snapshots or your entire account at any time. Upon account deletion, all your data is permanently removed within 30 days.',
  },
  {
    id: 'p-5',
    category: 'privacy',
    question: 'Do you share data with AI providers?',
    answer:
      'We send anonymized, encrypted email content to our AI partners (OpenAI/Anthropic) for processing. No personally identifiable information or raw email content is shared.',
  },

  // Technical
  {
    id: 't-1',
    category: 'technical',
    question: 'What languages does Gystify support?',
    answer:
      'Gystify supports email processing in multiple languages including English, Spanish, French, German, Italian, Portuguese, and more. The AI can understand context and sentiment across different languages.',
  },
  {
    id: 't-2',
    category: 'technical',
    question: 'Does Gystify work on mobile devices?',
    answer:
      'Yes! Gystify is fully responsive and works on all devices - desktop, tablet, and mobile. We also plan to release dedicated mobile apps in the future.',
  },
  {
    id: 't-3',
    category: 'technical',
    question: 'Can I integrate Gystify with other tools?',
    answer:
      "Currently, Gystify integrates with Gmail. We're developing API access and integrations with popular productivity tools like Slack, Notion, and project management platforms.",
  },
  {
    id: 't-4',
    category: 'technical',
    question: 'What if Gystify is down or unavailable?',
    answer:
      "We maintain 99.9% uptime with redundant systems and monitoring. If there's an outage, we provide real-time status updates and automatic service restoration. Your email access through Gmail remains unaffected.",
  },

  // General
  {
    id: 'g-1',
    category: 'general',
    question: 'How accurate are the AI summaries?',
    answer:
      'Our AI achieves 95%+ accuracy in email categorization and summarization. The system continuously learns from user feedback to improve accuracy over time.',
  },
  {
    id: 'g-2',
    category: 'general',
    question: 'Can I customize the categories and priorities?',
    answer:
      'Yes! You can create custom categories, adjust priority settings, and train the AI to recognize patterns specific to your work style and preferences.',
  },
  {
    id: 'g-3',
    category: 'general',
    question: 'Do you offer customer support?',
    answer:
      'We provide email support for all users with typical response times under 24 hours. Premium subscribers get priority support with faster response times.',
  },
  {
    id: 'g-4',
    category: 'general',
    question: 'Is Gystify suitable for teams?',
    answer:
      "Currently, Gystify is designed for individual professionals. We're developing team features and enterprise solutions - contact us if you're interested in early access.",
  },
];

const categoryConfig = {
  'getting-started': { label: 'Getting Started', icon: Zap, color: 'text-green-600' },
  billing: { label: 'Billing & Plans', icon: CreditCard, color: 'text-blue-600' },
  privacy: { label: 'Privacy & Security', icon: Shield, color: 'text-red-600' },
  technical: { label: 'Technical', icon: Mail, color: 'text-purple-600' },
  general: { label: 'General', icon: HelpCircle, color: 'text-gray-600' },
};

export default function FAQContent() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedFAQs = Object.entries(categoryConfig)
    .map(([key, config]) => ({
      category: key,
      ...config,
      faqs: filteredFAQs.filter((faq) => faq.category === key),
    }))
    .filter((group) => group.faqs.length > 0);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="section-layout">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <HelpCircle className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about Gystify. Can&apos;t find what you&apos;re
              looking for? Feel free to{' '}
              <a href="/contact" className="text-primary hover:underline">
                contact us
              </a>
              .
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {Object.entries(categoryConfig).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.label}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* FAQ Categories */}
          {selectedCategory === 'all' ? (
            <div className="space-y-8">
              {groupedFAQs.map((group, groupIndex) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * groupIndex }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="bg-gray-50 px-6 py-4 border-b">
                    <div className="flex items-center">
                      <group.icon className={`h-6 w-6 ${group.color} mr-3`} />
                      <h2 id={`#${group.category}`} className="text-xl font-semibold text-gray-900">
                        {group.label}
                      </h2>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {group.faqs.map((faq) => (
                      <div key={faq.id} className="p-6">
                        <button
                          onClick={() => toggleItem(faq.id)}
                          className="w-full flex items-center justify-between text-left"
                        >
                          <h3 className="text-lg font-medium text-gray-900 pr-4">{faq.question}</h3>
                          {openItems.includes(faq.id) ? (
                            <Minus className="h-5 w-5 text-primary flex-shrink-0" />
                          ) : (
                            <Plus className="h-5 w-5 text-primary flex-shrink-0" />
                          )}
                        </button>
                        {openItems.includes(faq.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 text-gray-700 leading-relaxed"
                          >
                            {faq.answer}
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="divide-y divide-gray-200">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="p-6">
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <h3 className="text-lg font-medium text-gray-900 pr-4">{faq.question}</h3>
                      {openItems.includes(faq.id) ? (
                        <Minus className="h-5 w-5 text-primary flex-shrink-0" />
                      ) : (
                        <Plus className="h-5 w-5 text-primary flex-shrink-0" />
                      )}
                    </button>
                    {openItems.includes(faq.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 text-gray-700 leading-relaxed"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg shadow-lg p-12 text-center"
            >
              <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No FAQs found</h3>
              <p className="text-gray-600 mb-6">
                We couldn&apos;t find any questions matching your search. Try different keywords or
                browse all categories.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-primary/5 to-background/80 rounded-lg shadow-lg p-8 text-center mt-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Still have questions?</h2>
            <p className="text-gray-700 text-lg mb-6">
              Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
            >
              Contact Support
              <Mail className="ml-2 h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
