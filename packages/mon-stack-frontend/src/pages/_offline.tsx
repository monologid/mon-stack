import BaseLayout from '@/layouts/base-layout';
import { baseGetServerSideProps } from '@/utils/page';

export const getServerSideProps = baseGetServerSideProps;

export default function Offline(props: any) {
	return (
		<BaseLayout title={'MON Stack'} {...props}>
			<div className={'w-[420px] h-screen flex justify-center items-center'}>
				We&apos;re sorry, but it looks like you are currently not connected to the internet. In order to use
				this app, an active internet connection is required. Please check your device&apos;s settings and try
				again.
			</div>
		</BaseLayout>
	);
}
