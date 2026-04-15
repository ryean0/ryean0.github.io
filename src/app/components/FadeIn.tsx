/* Filename: src/app/components/FadeIn.tsx */

"use client";

import { motion, Variants } from "framer-motion";
import Box from "@mui/material/Box";

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

const MotionBox = motion.create(Box);

const FadeIn = ({ children, delay = 0, duration = 0.5, className = "" }: FadeInProps) => {
  return (
    <MotionBox
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={{ delay, duration }}
      className={className}
    >
      {children}
    </MotionBox>
  );
};

export default FadeIn;