'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How does the free trial work?',
    answer:
      'You get 7 days of free access with up to 3 snapshots per day and 25 emails per snapshot. No credit card required to start your trial. After 7 days, you can choose to upgrade to a paid plan or your account will be downgraded to the free tier.',
  },
  {
    question: 'What happens to my data if I cancel?',
    answer:
      'Your email snapshots are retained for 3 days across all plans. If you cancel, you&apos;ll have access to your existing data during this retention period. We recommend exporting any important summaries before canceling.',
  },
  {
    question: 'Can I change plans anytime?',
    answer:
      'Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades take effect at the end of your current billing cycle. You&apos;ll be prorated for any plan changes.',
  },
  {
    question: 'How secure is my email data?',
    answer:
      'We take security seriously. All data is encrypted in transit and at rest. We only access the minimum required permissions to read and analyze your emails. We never store your full email content - only the generated summaries.',
  },
  {
    question: 'What email providers do you support?',
    answer:
      'Currently, we support Gmail with full integration. Outlook support is available for Pro plan users. We&apos;re working on adding support for other email providers like Yahoo Mail and Apple Mail.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'Yes, we offer a 30-day money-back guarantee for all paid plans. If you&apos;re not satisfied with Gystify, contact our support team within 30 days of your purchase for a full refund.',
  },
  {
    question: 'How does the snapshot limit work?',
    answer:
      'A snapshot is created each time you request an email summary. For unlimited plans, you can create as many snapshots as needed, but we only process new emails since your last snapshot to keep summaries relevant and avoid duplicates.',
  },
  {
    question: 'Can I export my summaries?',
    answer:
      'Pro plan users can export summaries to popular productivity tools like Notion, Slack, and Microsoft Teams. All users can copy summaries to their clipboard for use in other applications.',
  },
];

interface FAQItemProps {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, index, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card className="cursor-pointer hover:shadow-md transition-all duration-200">
        <CardContent className="p-0">
          <button
            onClick={onToggle}
            className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg pr-8">{faq.question}</h3>
              <div className="flex-shrink-0">
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-primary" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
          </button>

          <motion.div
            initial={false}
            animate={{ height: isOpen ? 'auto' : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="py-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Got questions? We&apos;ve got answers. If you can&apos;t find what you&apos;re looking
          for, feel free to reach out to our support team.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            index={index}
            isOpen={openIndex === index}
            onToggle={() => toggleFAQ(index)}
          />
        ))}
      </div>
    </motion.section>
  );
}
