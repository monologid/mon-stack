import { forwardRef } from 'react';
import { StyleUtils } from '@/styles/utils';
import { InputProps, InputVariant } from '@/components/commons/input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, fontSize, className, ...props }, ref) => {
    if (props.type == 'checkbox' || props.type == 'radio') {
      className = className ? `${className} form-${props.type} p-2` : `form-${props.type} p-2`;
    }

    return (
      <input
        className={StyleUtils.merge(InputVariant({ variant, fontSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
