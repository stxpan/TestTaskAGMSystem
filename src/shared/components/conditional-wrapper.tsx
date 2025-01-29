import * as React from 'react';

export interface ConditionalWrapperProps {
  /**
   * The content.
   */
  children: React.ReactNode;

  /**
   * The component that conditionally wrap children.
   */
  wrapper: React.ReactElement;

  /**
   * If condition is met, component will be wrapped in a wrapper.
   */
  condition?: boolean;
}

/**
 * The `ConditionalWrapper` component is used to conditionally wrap component in another component.
 */
export const ConditionalWrapper = (props: ConditionalWrapperProps) => {
  const { children, wrapper: Wrapper, condition } = props;

  if (condition) {
    return React.cloneElement(Wrapper, { children });
  }

  return <>{children}</>;
};
