import { PropsWithChildren } from 'react';

export interface HeadingProps extends PropsWithChildren {
  variant?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}
