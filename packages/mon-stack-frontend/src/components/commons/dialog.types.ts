import { PropsWithChildren } from 'react';

export interface DialogProps extends PropsWithChildren {
  title: string;
  show: boolean;
  onClose: Function;
}
