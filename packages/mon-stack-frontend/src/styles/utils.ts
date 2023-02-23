import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const StyleUtils = {
	merge: (...inputs: ClassValue[]) => {
		return twMerge(clsx(inputs));
	},
};
