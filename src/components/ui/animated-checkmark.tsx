'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

export function AnimatedCheckmark({ className }: { className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const circleVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1 },
  };

  const checkVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1 },
  };

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn("h-4 w-4", className)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        strokeWidth="2"
        className="stroke-current"
        variants={circleVariants}
        transition={{ duration: 0.3 }}
      />
      <motion.path
        d="M9 12l2 2 4-4"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-current"
        variants={checkVariants}
        transition={{ duration: 0.2, delay: 0.3 }}
      />
    </motion.svg>
  );
}
