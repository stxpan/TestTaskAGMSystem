import * as React from 'react';

export interface CaseProps {
  children?: React.ReactNode;
  condition: boolean | string | number | null | undefined;
}

/**
 * If the `<Case />` is the first one to have its condition evaluates to true
 * inside the parent `<Switch />` it will be the only rendered.
 */
export const Case = (props: CaseProps) => {
  const { children, condition } = props;

  return condition ? children : null;
};

export interface DefaultProps {
  children?: React.ReactNode;
}

/**
 * If no `<Case />` have its condition evaluates to true inside the parent `<Switch />`,
 * the first `<Default />` will be the only one rendered.
 */
export const Default = (props: DefaultProps) => {
  const { children } = props;

  return children;
};

interface SwitchProps {
  children?: React.ReactNode;
}

/**
 * It will render the first matching `<Case />`, or the first encountered `<Default />` (or `null`).
 *
 * This component can contain any number of `<Case />` and one `<Default />` blocks
 */
export const Switch = (props: SwitchProps) => {
  const { children } = props;

  // We use React.Children.forEach instead of React.Children.toArray().find()
  // here because toArray adds keys to all child elements and we do not want
  // to trigger an unmount/remount for two children <Case>s or <Default>s
  let matchingCase: React.ReactNode | undefined = undefined;
  let defaultCase: React.ReactNode | undefined = undefined;

  React.Children.forEach(children, (child) => {
    // not a valid react child, don't add it
    /* istanbul ignore next - This is only a safe fail for people writing bad code */
    if (!React.isValidElement(child)) {
      return;
    }

    if (!matchingCase && child.type === Case) {
      const { condition } = child.props;

      const conditionResult = Boolean(condition);

      if (conditionResult) {
        matchingCase = child;
      } // else not matching condition, don't add it
    } else if (!defaultCase && child.type === Default) {
      defaultCase = child;
    } // else unknown type, don't add it
  });

  return matchingCase ?? defaultCase ?? null;
};
