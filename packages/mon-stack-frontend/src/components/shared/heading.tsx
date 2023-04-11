import { FC } from 'react';
import { HeadingProps } from './heading.types';

export const Heading: FC<HeadingProps> = (props) => {
  switch (props.variant) {
    case 'h2':
      return <h2 className={`text-xl ${props.className}`}>{props.children}</h2>;
    case 'h3':
      return <h3 className={`text-lg ${props.className}`}>{props.children}</h3>;
    case 'h4':
      return <h4 className={`text-md ${props.className}`}>{props.children}</h4>;
    default:
      return <h1 className={`text-2xl ${props.className}`}>{props.children}</h1>;
  }
};
