import React from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

import { cn } from '@/shared/lib/cn';

import { Button } from './button';
import { Input, InputProps } from './input';

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <Input type={showPassword ? 'text' : 'password'} className={cn('pr-8', className)} ref={ref} {...props} />

      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        className="absolute right-1 top-1/2 -translate-y-1/2"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={props.disabled}
      >
        {showPassword ? (
          <RiEyeLine className="h-4 w-4" aria-hidden="true" />
        ) : (
          <RiEyeOffLine className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
      </Button>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';
