import { cva, VariantProps } from 'class-variance-authority';
import { InputHTMLAttributes } from 'react';
import {
	commonFontSizeClassNames,
	commonFormBaseClassName,
	commonFormClassNames,
	commonFormInputClassName,
} from '@/components/commons/index.types';

export interface InputProps
	extends InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof InputVariant> {}

export const InputVariant = cva(commonFormInputClassName, {
	variants: {
		variant: {
			...commonFormClassNames,
		},
		fontSize: {
			...commonFontSizeClassNames,
		},
	},
	defaultVariants: {
		variant: 'primary',
		fontSize: 'sm',
	},
});
