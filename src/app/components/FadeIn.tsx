/* Filename: src/app/components/FadeIn.tsx */

/**
 * FadeIn — Refined
 *
 * Changes:
 * 1. Reduced default y offset from 20 to 12 for subtler entrance
 * 2. Adjusted spring physics for smoother deceleration
 * 3. Viewport amount reduced to 0.2 for earlier trigger
 */

'use client';

import { motion, Variants } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (custom: { delay: number; duration: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom.delay,
      duration: custom.duration,
      type: "spring",
      stiffness: 80,
      damping: 18,
    },
  }),
};

const FadeIn = ({ children, delay = 0, duration = 0.5, className = "" }: FadeInProps) => {
  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={{ delay, duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;