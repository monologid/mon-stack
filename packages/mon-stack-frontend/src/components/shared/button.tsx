import { forwardRef } from 'react';
import { ButtonProps, ButtonVariant } from '@/components/shared/button.types';
import { StyleUtils } from '@/styles/utils';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, ...props }, ref) => {
    return (
      <button
        className={StyleUtils.merge(ButtonVariant({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
