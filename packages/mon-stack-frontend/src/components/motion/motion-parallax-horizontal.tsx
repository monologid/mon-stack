import { FC, useRef } from 'react';
import { MotionParallaxHorizontalProps } from './motion-parallax-horizontal.types';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion';
import { wrap } from '@motionone/utils';

export const MotionParallaxHorizontal: FC<MotionParallaxHorizontalProps> = ({
  baseVelocity = 100,
  children,
}) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      style={{
        overflow: 'hidden',
        margin: 0,
        whiteSpace: 'nowrap',
        display: 'flex',
        flexWrap: 'nowrap',
      }}
    >
      <motion.div
        className='flex space-x-20'
        style={{ x, display: 'flex', whiteSpace: 'nowrap', flexWrap: 'nowrap' }}
      >
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
};
