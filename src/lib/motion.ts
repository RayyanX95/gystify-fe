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

export default motion;
