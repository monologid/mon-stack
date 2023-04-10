import { NextPageContext } from 'next';
import { parseCookies } from 'nookies';

export async function getServerSideProps(ctx: NextPageContext) {
  const cookies = parseCookies(ctx);
  if (!cookies.profile)
    return {
      redirect: {
        destination: '/login',
      },
    };

  const superadmin: any = process.env.SUPERADMIN ? process.env.SUPERADMIN.split(',') : [];
  if (superadmin.length == 0)
    return {
      redirect: {
        destination: '/dashboard',
      },
    };

  const { email }: any = cookies.profile ? JSON.parse(cookies.profile) : {};
  if (superadmin.includes(email))
    return {
      redirect: {
        destination: '/administrator',
      },
    };

  return {
    redirect: {
      destination: '/dashboard',
    },
  };
}

export default function Auth() {
  return <div></div>;
}
