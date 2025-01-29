import * as React from 'react';
import { cva } from 'class-variance-authority';

import { twx } from '@/shared/lib/cn';

interface PaperProps {
  children?: React.ReactNode;
  variant?: 'grid' | 'small-grid' | 'dot';
  className?: string;
}

const paperContainerStyles = cva('relative', {
  variants: {
    variant: {
      grid: 'dark:bg-dot-white/[0.1] bg-grid-black/[0.1]',
      'small-grid': 'dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]',
      dot: 'dark:bg-dot-white/[0.2] bg-dot-black/[0.2]',
    },
  },
  defaultVariants: {
    variant: 'grid',
  },
});

const PaperContainer = twx.div<PaperProps>(({ variant }) => paperContainerStyles({ variant }));
const PaperFade = twx.div`pointer-events-none absolute inset-0 z-0 h-full flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black`;
const PaperContent = twx.div`z-20 flex flex-col flex-1 w-full`;

export const Paper = (props: PaperProps) => {
  const { children, className, variant } = props;

  return (
    <PaperContainer className={className} variant={variant}>
      <PaperFade />

      <PaperContent>{children}</PaperContent>
    </PaperContainer>
  );
};
