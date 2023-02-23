import Head from 'next/head';
import { FC } from 'react';
import { BaseHeadProps } from '@/layouts/base-head.types';

const BaseHead: FC<BaseHeadProps> = ({ title, description, url, opengraph, twitter }) => {
	return (
		<Head>
			<title>{title}</title>
			{description ? <meta name={'description'} content={description} /> : null}

			<meta
				name={'viewport'}
				content={'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover'}
			/>
			<meta name={'mobile-web-app-capable'} content={'yes'} />
			<meta name={'apple-mobile-web-app-status-bar-style'} content={'default'} />
			<meta name={'format-detection'} content={'telephone=no'} />
			<meta name={'mobile-web-app-capable'} content={'yes'} />

			{opengraph ? (
				<>
					<meta property='og:type' content={opengraph.type || 'website'} />
					<meta property='og:title' content={title} />
					<meta property='og:description' content={description || title} />
					<meta property='og:site_name' content={opengraph.siteName ? opengraph.siteName : title} />
					<meta property='og:url' content={url} />
				</>
			) : null}

			{twitter ? (
				<>
					<meta name='twitter:card' content={twitter.card || 'summary'} />
					<meta name='twitter:url' content={url} />
					<meta name='twitter:title' content={title} />
					<meta name='twitter:description' content={description || title} />
					{twitter.image ? <meta name='twitter:image' content={twitter.image} /> : null}
					{twitter.creator ? <meta name='twitter:creator' content={twitter.creator} /> : null}
				</>
			) : null}

			{/* PWA related configs */}
			<link rel='manifest' href={'/manifest.json'} />
			<meta name={'theme-color'} content={'#FFFFFF'} />
		</Head>
	);
};

export default BaseHead;
