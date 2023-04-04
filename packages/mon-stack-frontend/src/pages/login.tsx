import BaseLayout from '@/layouts/base-layout';
import { baseGetServerSideProps } from '@/utils/page';
import FormLogin from '@/components/form/login';

export const getServerSideProps = baseGetServerSideProps;

export default function Login(props: any) {
  return (
    <BaseLayout title={'Log in'} {...props}>
      <FormLogin />
    </BaseLayout>
  );
}
