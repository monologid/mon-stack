import BaseLayout from '@/layouts/base-layout';
import { baseGetServerSideProps } from '@/utils/page';
import FormSignUp from '@/components/form/sign-up';

export const getServerSideProps = baseGetServerSideProps;

export default function SignUp(props: any) {
  return (
    <BaseLayout title={'Sign Up'} {...props}>
      <FormSignUp />
    </BaseLayout>
  );
}
