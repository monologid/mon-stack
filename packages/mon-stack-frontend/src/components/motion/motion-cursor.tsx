import { motion } from 'framer-motion';
import { FC, RefObject, useEffect, useRef, useState } from 'react';
import { MotionCursorProps } from './motion-cursor.types';

export const MotionCursor: FC<MotionCursorProps> = (props) => {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);
  const [state, setState] = useState<any>({ ...props });

  useEffect(() => {
    if (!props.className && !props.style) {
      setState({
        ...state,
        style: {
          backgroundColor: '#000000',
          width: 15,
          height: 15,
          borderRadius: '50%',
        },
      });
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      animate={{
        x: x + 15,
        y: y - 15,
      }}
      transition={{
        type: 'spring',
        restDelta: 0.001,
      }}
      {...state}
    />
  );
};

const useFollowPointer = (ref: RefObject<HTMLElement>) => {
  const [point, setPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current!;

      const x = clientX - element.offsetLeft - element.offsetWidth / 2;
      const y = clientY - element.offsetTop - element.offsetHeight / 2;
      setPoint({ x, y });
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return point;
};
