import React from 'react';
import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import { VariantProps } from 'class-variance-authority';
import { useUnit } from 'effector-react';
import { RiArrowLeftSLine } from 'react-icons/ri';

import { $previousPath } from '@/shared/lib/effector/router/model';

import { Button, buttonVariants } from './button';

export interface BackButtonProps
  extends VariantProps<typeof buttonVariants>,
    React.LinkHTMLAttributes<HTMLAnchorElement> {
  defaultHref?: Url;
  title: string;
}

export const BackButton = (props: BackButtonProps) => {
  const { title, defaultHref, variant = 'link', size = 'link', ...other } = props;

  const prevRoute = useUnit($previousPath);

  const href = prevRoute ?? defaultHref ?? '/';

  return (
    <Button size={size} variant={variant} asChild>
      <Link href={href} {...other}>
        <RiArrowLeftSLine className="mr-2 h-4 w-4" />
        {title}
      </Link>
    </Button>
  );
};
