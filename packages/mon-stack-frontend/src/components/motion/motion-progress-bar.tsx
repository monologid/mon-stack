import { motion, useScroll, useSpring } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { MotionProgressBarProps } from './motion-progress-bar.types';

export const MotionProgressBar: FC<MotionProgressBarProps> = (props) => {
  const [style, setStyle] = useState<any>({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: props.height ? props.height : 7,
    transformOrigin: '0%',
    backgroundColor: '#000000',
  });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    let tempStyle: any = { ...style, scaleX };
    if (props.backgroundColor) {
      tempStyle = { ...tempStyle, ...props };
    }

    setStyle(tempStyle);
  }, [scaleX]);

  return <motion.div {...props} style={style} />;
};
