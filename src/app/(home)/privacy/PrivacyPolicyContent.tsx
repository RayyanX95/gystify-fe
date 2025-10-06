'use client';

import { motion } from 'framer-motion';

export default function PrivacyPolicyContent() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">
              Your privacy is important to us. This policy explains how we collect, use, and protect
              your information.
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Information We Collect
              </h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-medium text-gray-800">Email Content</h3>
                <p>
                  When you connect your Gmail account to Gystify, we access your email content
                  solely for the purpose of generating AI-powered summaries. We process:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Email subject lines and content</li>
                  <li>Sender information and timestamps</li>
                  <li>Email metadata for categorization and prioritization</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mt-6">Account Information</h3>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Google OAuth credentials (we never store your password)</li>
                  <li>Email address and basic profile information from Google</li>
                  <li>Usage analytics and preferences</li>
                  <li>Subscription and billing information</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. How We Use Your Information
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>We use your information exclusively for:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Generating AI-powered email summaries and insights</li>
                  <li>Categorizing and prioritizing your emails</li>
                  <li>Providing personalized productivity analytics</li>
                  <li>Improving our AI models and service quality</li>
                  <li>Processing payments and managing subscriptions</li>
                  <li>Communicating service updates and support</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Data Security & Protection
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>We implement industry-standard security measures to protect your data:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>End-to-end encryption for all data transmission</li>
                  <li>Secure cloud storage with encryption at rest</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Limited access controls and employee training</li>
                  <li>Compliance with Google&apos;s API security requirements</li>
                  <li>SOC 2 Type II compliant infrastructure</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Data Retention & Deletion
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>We maintain your data only as long as necessary to provide our services:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Email summaries are stored for up to 72 hours for historical access</li>
                  <li>
                    Original email content is processed in real-time and not permanently stored
                  </li>
                  <li>Account data is retained while your account is active</li>
                  <li>You can delete your account and all associated data at any time</li>
                  <li>Upon account deletion, all data is permanently removed within 30 days</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Services</h2>
              <div className="space-y-4 text-gray-700">
                <p>We integrate with the following third-party services:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>
                    <strong>Google Gmail API:</strong> For accessing your email content
                  </li>
                  <li>
                    <strong>OpenAI/Anthropic:</strong> For AI-powered summarization (data is
                    anonymized)
                  </li>
                  <li>
                    <strong>Stripe:</strong> For secure payment processing
                  </li>
                  <li>
                    <strong>Analytics Services:</strong> For improving user experience (anonymized)
                  </li>
                </ul>
                <p className="mt-4">
                  We ensure all third-party services meet our strict privacy and security standards.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Your Rights & Controls
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>You have complete control over your data:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Access and download all your data at any time</li>
                  <li>Modify or correct your account information</li>
                  <li>Revoke Gmail access permissions</li>
                  <li>Delete specific summaries or your entire account</li>
                  <li>Opt out of analytics and marketing communications</li>
                  <li>Request data portability in standard formats</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. International Data Transfers
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Gystify operates globally, and your data may be processed in countries outside
                  your residence. We ensure adequate protection for international transfers through:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Standard contractual clauses (SCCs)</li>
                  <li>Adequacy decisions where applicable</li>
                  <li>Privacy framework certifications</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Children&apos;s Privacy
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Gystify is not intended for users under 18 years of age. We do not knowingly
                  collect personal information from minors. If we discover we have collected
                  information from someone under 18, we will delete it immediately.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Changes to This Policy
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We may update this privacy policy periodically. We will notify you of any material
                  changes via email or through our service. Your continued use of Gystify after
                  changes take effect constitutes acceptance of the revised policy.
                </p>
              </div>
            </section>

            {/* <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  If you have questions about this privacy policy or how we handle your data, please
                  contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>
                    <strong>Email:</strong> privacy@gystify.com
                  </p>
                  <p>
                    <strong>Address:</strong> Gystify Privacy Team
                  </p>
                  <p className="ml-16">123 Innovation Drive</p>
                  <p className="ml-16">San Francisco, CA 94105</p>
                  <p className="ml-16">United States</p>
                </div>
              </div>
            </section> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
