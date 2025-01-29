import * as React from 'react';

export interface WhenProps {
  condition?: boolean | string | number | null | undefined;

  children?: React.ReactNode;
}

export const When = (props: WhenProps) => {
  const { condition, children } = props;

  if (condition) {
    return children;
  }

  return null;
};
