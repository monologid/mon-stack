import BaseLayout from '@/layouts/base-layout';
import { baseGetServerSideProps } from '@/utils/page';

export const getServerSideProps = baseGetServerSideProps;

export default function UnauthorizedAccess(props: any) {
	return (
		<BaseLayout title={'MON Stack'} {...props}>
			<div className={'w-[420px] h-screen flex justify-center items-center'}>Unauthorized access.</div>
		</BaseLayout>
	);
}
