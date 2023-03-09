import { PropsWithChildren } from 'react';

type axis = 'x' | 'y';

export interface MotionReorderProps extends PropsWithChildren {
  axis: axis;
  items: any;
  setItems: any;
  className?: string;
}

export interface MotionReorderItemProps extends PropsWithChildren {
  axis: axis;
  data: any;
}
