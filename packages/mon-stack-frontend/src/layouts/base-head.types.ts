import { PropsWithChildren } from 'react';

export interface BaseHeadProps extends PropsWithChildren<{}> {
	title: string;
	description?: string;
	url: string;
	opengraph?: MetaOpenGraphProps;
	twitter?: MetaTwitterProps;
}

interface BaseMetaSocialMediaProps {
	image?: string;
}

interface MetaTwitterProps extends BaseMetaSocialMediaProps {
	card: string;
	creator?: string;
}

interface MetaOpenGraphProps extends BaseMetaSocialMediaProps {
	type: string;
	siteName?: string;
}
