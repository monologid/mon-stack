import { MouseEventHandler, PropsWithChildren } from "react";

export interface ModalProps extends PropsWithChildren {
  title: string
  isOpen: boolean
  footer?: any
  onClose?: MouseEventHandler<HTMLDivElement>
}