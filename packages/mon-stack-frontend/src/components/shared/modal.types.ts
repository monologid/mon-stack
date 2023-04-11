import { MouseEventHandler, PropsWithChildren } from 'react';

export interface ModalProps extends PropsWithChildren {
  title: string;
  footer?: any;
  isLoading?: boolean;
  isOpen: boolean;
  onClose?: MouseEventHandler<HTMLDivElement>;
}
