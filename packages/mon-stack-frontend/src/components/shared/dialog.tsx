import { FC } from 'react';
import { DialogProps } from '@/components/shared/dialog.types';
import { X } from 'lucide-react';

export const Dialog: FC<DialogProps> = ({ title, show, onClose, children }) => {
  const onClickClose = onClose;
  if (!show) return null;

  return (
    <div
      className={
        'w-full h-screen fixed top-0 left-0 bottom-0 backdrop-blur-md bg-black/30 flex justify-center items-center'
      }
    >
      <div
        className={`bg-white w-[460px] rounded shadow p-4 relative animate-in fade-in ease-in duration-300`}
      >
        <div className={'font-semibold text-lg mb-5'}>{title}</div>
        {children}
        <div className={'absolute top-0 right-0 p-4 pr-3 cursor-pointer'} onClick={() => onClickClose()}>
          <div className={'bg-gray-200 rounded-full p-1'}>
            <X size={15} className={'text-gray-500'} />
          </div>
        </div>
      </div>
    </div>
  );
};
