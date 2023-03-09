import { motion } from 'framer-motion';
import { FC } from 'react';
import { MotionDivProps } from './motion-div.types';

export const MotionDiv: FC<MotionDivProps> = ({ offscreen, onscreen, transition, children }) => {
  return (
    <motion.div initial='offscreen' whileInView='onscreen'>
      <motion.div
        variants={{
          offscreen,
          onscreen: onscreen ? { ...onscreen, transition } : { x: 0, y: 0, transition },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
