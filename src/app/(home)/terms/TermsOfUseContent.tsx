'use client';

import { motion } from 'framer-motion';

export default function TermsOfUseContent() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="section-layout">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Use</h1>
            <p className="text-lg text-gray-600">
              Please read these terms carefully before using Gystify&apos;s AI email summarization
              service.
            </p>
            <p className="text-sm text-gray-500 mt-2">Last updated: October 3, 2025</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 space-y-8"
          >
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  By accessing or using Gystify (&quot;the Service&quot;), you agree to be bound by
                  these Terms of Use (&quot;Terms&quot;). If you disagree with any part of these
                  terms, you may not access the Service.
                </p>
                <p>
                  These Terms apply to all visitors, users, and others who access or use the
                  Service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
              <div className="space-y-4 text-gray-700">
                <p>Gystify is an AI-powered email intelligence platform that provides:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Automated email summarization and categorization</li>
                  <li>Email priority analysis and insights</li>
                  <li>Productivity analytics and reporting</li>
                  <li>Gmail integration through secure OAuth</li>
                  <li>Historical email data analysis</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. User Accounts and Registration
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>To use Gystify, you must:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Be at least 18 years old</li>
                  <li>Have a valid Gmail account</li>
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
                <p>
                  You are responsible for safeguarding your account and notifying us immediately of
                  any unauthorized access or security breach.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Acceptable Use Policy
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>You agree not to:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>
                    Use the Service for any unlawful purpose or in violation of any applicable laws
                  </li>
                  <li>Attempt to gain unauthorized access to our systems or user accounts</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Use automated scripts or bots to access the Service</li>
                  <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                  <li>Share your account credentials with third parties</li>
                  <li>Use the Service to process emails containing illegal content</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Email Data Processing
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>By using Gystify, you grant us permission to:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Access your Gmail account through Google OAuth</li>
                  <li>Read email content for summarization purposes</li>
                  <li>Process email metadata for categorization and analysis</li>
                  <li>Store email summaries and analytics data</li>
                  <li>Use anonymized data to improve our AI models</li>
                </ul>
                <p>
                  We will never access emails outside the scope of our service or share your email
                  content with third parties without your explicit consent.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Subscription and Billing
              </h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-medium text-gray-800">Free Trial</h3>
                <p>
                  We offer a free trial with limited AI snapshots. No credit card is required for
                  the trial period.
                </p>

                <h3 className="text-lg font-medium text-gray-800 mt-6">Paid Subscriptions</h3>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                  <li>All fees are non-refundable except as required by law</li>
                  <li>Prices may change with 30 days advance notice</li>
                  <li>You can cancel your subscription at any time</li>
                  <li>Service continues until the end of your current billing period</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Intellectual Property
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  The Service and its original content, features, and functionality are and will
                  remain the exclusive property of Gystify and its licensors. The Service is
                  protected by copyright, trademark, and other laws.
                </p>
                <p>
                  You retain ownership of your email content. By using the Service, you grant us a
                  limited license to process your emails solely for providing our services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Privacy and Data Protection
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use,
                  and protect your information when you use our Service. By using the Service, you
                  agree to the collection and use of information in accordance with our Privacy
                  Policy.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Service Availability</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We strive to maintain high service availability but cannot guarantee uninterrupted
                  access. The Service may be temporarily unavailable due to:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Scheduled maintenance</li>
                  <li>Emergency repairs</li>
                  <li>Third-party service dependencies (Gmail API)</li>
                  <li>Force majeure events</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Limitation of Liability
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  To the maximum extent permitted by applicable law, Gystify shall not be liable for
                  any indirect, incidental, special, consequential, or punitive damages, or any loss
                  of profits or revenues, whether incurred directly or indirectly.
                </p>
                <p>
                  Our total liability to you for all damages shall not exceed the amount you paid us
                  in the 12 months preceding the claim.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Termination</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We may terminate or suspend your account immediately, without prior notice, for
                  any reason, including but not limited to breach of these Terms.
                </p>
                <p>
                  Upon termination, your right to use the Service will cease immediately. You may
                  delete your account at any time through your account settings.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Governing Law</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  These Terms shall be interpreted and governed by the laws of the State of
                  California, United States, without regard to its conflict of law provisions.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to Terms</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We reserve the right to modify or replace these Terms at any time. If a revision
                  is material, we will try to provide at least 30 days notice prior to any new terms
                  taking effect.
                </p>
                <p>
                  Your continued use of the Service after changes become effective constitutes
                  acceptance of the revised Terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>If you have questions about these Terms, please contact us:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>
                    <strong>Email:</strong> legal@gystify.com
                  </p>
                  <p>
                    <strong>Address:</strong> Gystify Legal Team
                  </p>
                  {/* <p className="ml-16">123 Innovation Drive</p>
                  <p className="ml-16">San Francisco, CA 94105</p>
                  <p className="ml-16">United States</p> */}
                </div>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
