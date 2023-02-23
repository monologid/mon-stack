import { PropsWithChildren } from 'react';

export interface GridProps extends PropsWithChildren {
	column: number;
	gap: number;
	className?: string;
}
