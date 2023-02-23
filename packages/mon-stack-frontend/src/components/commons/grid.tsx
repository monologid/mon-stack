import { FC } from 'react';
import { GridProps } from '@/components/commons/grid.types';

export const Grid: FC<GridProps> = ({ column, gap, className, children }) => {
	return (
		<div className={`grid grid-cols-${column} gap-${gap} ${className ? className : null}`}>{children}</div>
	);
};
