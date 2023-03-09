import { Reorder, useMotionValue } from 'framer-motion';
import { FC } from 'react';
import { MotionReorderItemProps, MotionReorderProps } from './motion-reorder.types';

export const MotionReorder: FC<MotionReorderProps> = ({ axis, items, setItems, className, children }) => {
  return (
    <Reorder.Group axis={axis} onReorder={setItems} values={items} className={className ? className : ''}>
      {children}
    </Reorder.Group>
  );
};

export const MotionReorderItem: FC<MotionReorderItemProps> = ({ axis, data, children }: any) => {
  const i = useMotionValue(0);
  return (
    <Reorder.Item id={data.id} value={data} style={{ [axis]: i }}>
      {children}
    </Reorder.Item>
  );
};
