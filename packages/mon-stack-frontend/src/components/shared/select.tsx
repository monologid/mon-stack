import { forwardRef } from 'react';
import { SelectProps, SelectVariant } from '@/components/shared/select.types';
import { StyleUtils } from '@/styles/utils';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ variant, fontSize, className, ...props }, ref) => {
    return (
      <select
        className={StyleUtils.merge(SelectVariant({ variant, fontSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Select.displayName = 'Select';
