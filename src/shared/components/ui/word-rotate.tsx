'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';

import { cn } from '@/shared/lib/cn';

interface WordRotateProps {
  words: string[];
  duration?: number;
  framerProps?: HTMLMotionProps<'span'>;
  className?: string;
}

export const WordRotate = (props: WordRotateProps) => {
  const {
    words,
    duration = 2500,
    framerProps = {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 },
      transition: { duration: 0.25, ease: 'easeOut' },
    },
    className,
  } = props;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className="inline-block overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span key={words[index]} className={cn('inline-block', className)} {...framerProps}>
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
