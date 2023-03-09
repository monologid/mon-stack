import { FC } from 'react';
import { NextRouter, useRouter } from 'next/router';
import BaseHead from '@/layouts/base-head';
import { BaseHeadProps } from '@/layouts/base-head.types';
import { motion } from 'framer-motion';

const BaseLayout: FC<BaseHeadProps> = (props) => {
  const router: NextRouter = useRouter();
  const url: string = `${props.url}${router.asPath}`;

  return (
    <>
      <BaseHead {...props} url={url} />
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        {props.children}
      </motion.div>
    </>
  );
};

export default BaseLayout;
