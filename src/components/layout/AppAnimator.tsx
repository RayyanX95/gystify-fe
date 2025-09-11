"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { MotionMain } from "@/lib/motion";

export function AppAnimator({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <MotionMain
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex-1"
      >
        {children}
      </MotionMain>
    </AnimatePresence>
  );
}
