"use client";

import { motion } from "framer-motion";

// Export motion elements with relaxed typing to avoid type conflicts
// between framer-motion's types and this project's React version.
export const MotionDiv = motion.div as unknown as React.ComponentType<any>;
export const MotionSpan = motion.span as unknown as React.ComponentType<any>;
export const MotionMain = motion.main as unknown as React.ComponentType<any>;
export const MotionSection =
  motion.section as unknown as React.ComponentType<any>;
export const MotionHeader =
  motion.header as unknown as React.ComponentType<any>;
export const MotionFooter =
  motion.footer as unknown as React.ComponentType<any>;

// Common animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const scaleOnTap = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
};

// Scroll-triggered animation variants
export const scrollFadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const scrollFadeInLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const scrollFadeInRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
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
