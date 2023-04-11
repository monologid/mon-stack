import { FC } from 'react';
import { HeadingProps } from './heading.types';

export const Heading: FC<HeadingProps> = (props) => {
  switch (props.variant) {
    case 'h2':
      return <h2 className={`text-xl mb-4 ${props.className}`}>{props.children}</h2>;
    case 'h3':
      return <h3 className={`text-lg mb-3 ${props.className}`}>{props.children}</h3>;
    case 'h4':
      return <h4 className={`text-md mb-2 ${props.className}`}>{props.children}</h4>;
    default:
      return <h1 className={`text-2xl mb-5 ${props.className}`}>{props.children}</h1>;
  }
};
