import { cva, VariantProps } from 'class-variance-authority';
import {
	commonFontSizeClassNames,
	commonFormBaseClassName,
	commonFormClassNames,
	commonFormInputClassName,
} from '@/components/commons/index.types';
import { SelectHTMLAttributes } from 'react';

export interface SelectProps
	extends SelectHTMLAttributes<HTMLSelectElement>,
		VariantProps<typeof SelectVariant> {}

export const SelectVariant = cva(`form-select ${commonFormBaseClassName}`, {
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
