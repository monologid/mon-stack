import { motion } from 'framer-motion';
import { FC } from 'react';
import { MotionAnimateProps } from './motion-animate.types';

export const MotionAnimate: FC<MotionAnimateProps> = ({ animate, transition, children }) => {
  return (
    <motion.div animate={animate} transition={transition}>
      {children}
    </motion.div>
  );
};
