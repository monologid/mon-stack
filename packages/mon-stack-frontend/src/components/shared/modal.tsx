import { FC } from "react";
import { ModalProps } from "./modal.types";
import { Heading } from "./heading";

export const Modal: FC<ModalProps> = ({ title, isOpen, footer, onClose, children }) => {
  const backgroundClasses = isOpen
    ? "fixed z-10 inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
    : "hidden";

  const modalClasses = isOpen
    ? "fixed z-20 inset-0 overflow-y-auto"
    : "hidden";

  return (
    <>
      <div className={backgroundClasses} onClick={onClose}></div>

      <div className={modalClasses}>
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-white opacity-75"></div>
          </div>

          <div
            className="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all my-8 w-full max-w-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <Heading variant={'h4'} className={'uppercase font-bold text-slate-500 border-b border-slate-200 p-4 tracking-wider text-sm'}>{title}</Heading>
            <div className={'p-4'}>
              {children}
            </div>

            <div className="bg-gray-50 border-t border-slate-200 p-4 py-3 flex flex-row-reverse">
              {footer ? <>{footer}</> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
