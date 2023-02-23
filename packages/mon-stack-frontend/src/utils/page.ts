import { NextPageContext } from 'next';

const baseProps: any = {
	url: process.env.BASE_URL
}

export const baseGetServerSideProps = async (ctx: NextPageContext) => {
	return {
		props: {
			...baseProps
		}
	}
}