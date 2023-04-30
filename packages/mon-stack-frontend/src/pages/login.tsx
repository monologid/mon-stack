import BaseLayout from '@/layouts/base-layout';
import { baseGetServerSideProps } from '@/utils/page';
import FormLogin from '@/components/form/login';
import { NextPageContext } from 'next';
import { parseCookies } from 'nookies';

export const getServerSideProps = async (ctx: NextPageContext) => {
  const props: any = await baseGetServerSideProps(ctx);

  const cookies = parseCookies(ctx);
  if (cookies.profile) {
    const superadmin: any = process.env.SUPERADMIN ? process.env.SUPERADMIN.split(',') : [];
    const { email }: any = cookies.profile ? JSON.parse(cookies.profile) : {};
    return {
      redirect: {
        destination: !superadmin.includes(email) ? '/dashboard' : '/administrator',
      },
    };
  }

  return {
    props,
  };
};

export default function Login(props: any) {
  return (
    <BaseLayout title={'Log in'} {...props}>
      <FormLogin />
    </BaseLayout>
  );
}
