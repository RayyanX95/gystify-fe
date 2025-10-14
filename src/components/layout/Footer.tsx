'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="border-t bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and Brand */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center  text-foreground text-3xl">
              <motion.span whileHover={{ x: 4 }}>
                <Image src="/logo.svg" alt="Logo" width={24} height={24} className="mr-1" />
              </motion.span>
              <span className="text-2xl  text-primary font-bold">Gystify</span>
            </Link>
            <p className="text-sm text-gray-600 text-center md:text-left">
              AI-powered email intelligence
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/faq" className="text-gray-600 hover:text-primary transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-primary transition-colors">
              Terms
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-600 text-center md:text-right">© 2025 Gystify</div>
        </div>
      </div>
    </motion.div>
  );
};
