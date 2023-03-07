import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';
import { commonFontSizeClassNames } from '@/components/commons/index.types';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariant> {}

export const ButtonVariant = cva('rounded px-4 py-2', {
  variants: {
    variant: {
      primary: 'bg-black hover:bg-gray-700 text-white',
      danger: 'bg-red-600 hover:bg-red-500 text-white',
      none: 'hover:bg-slate-100 text-black',
    },
    size: {
      ...commonFontSizeClassNames,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm',
  },
});
