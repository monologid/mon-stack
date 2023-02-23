import BaseLayout from '@/layouts/base-layout';
import { baseGetServerSideProps } from '@/utils/page';

export const getServerSideProps = baseGetServerSideProps;

export default function Home(props: any) {
	return (
		<BaseLayout title={'MON Stack'} {...props}>
			<div className={'w-full h-screen flex justify-center items-center'}>MON Stack</div>
		</BaseLayout>
	);
}