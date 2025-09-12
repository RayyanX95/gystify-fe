"use client";

import { motion } from "framer-motion";

// Export motion elements with relaxed typing to avoid type conflicts
// between framer-motion's types and this project's React version.
export const MotionDiv = motion.div as unknown as React.ComponentType<any>;

export const MotionMain = motion.main as unknown as React.ComponentType<any>;

// Scroll-triggered animation variants
export const scrollFadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const scrollStaggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  viewport: { once: true, margin: "-50px" },
};

export const scrollStaggerChild = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};
