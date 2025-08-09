/* Filename: src/app/components/FadeIn.tsx 
    @implementing scroll-reveal animations 
*/
'use client';

import { motion, Variants } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

// Define the animation variants
const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  // Use the 'custom' prop to dynamically set delay and duration for staggering
  visible: (custom: { delay: number; duration: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom.delay,
      duration: custom.duration,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  }),
};

const FadeIn = ({ children, delay = 0, duration = 0.5, className = "" }: FadeInProps) => {
  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Trigger animation only once when 30% visible
      custom={{ delay, duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;