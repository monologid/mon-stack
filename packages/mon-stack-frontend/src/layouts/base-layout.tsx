import { FC } from 'react';
import { NextRouter, useRouter } from 'next/router';
import BaseHead from '@/layouts/base-head';
import { BaseHeadProps } from '@/layouts/base-head.types';

const BaseLayout: FC<BaseHeadProps> = (props) => {
	const router: NextRouter = useRouter();
	const url: string = `${props.url}${router.asPath}`;

	return (
		<>
			<BaseHead {...props} url={url} />
			{props.children}
		</>
	);
};

export default BaseLayout;
