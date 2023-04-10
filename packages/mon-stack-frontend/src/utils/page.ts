import { NextPageContext } from 'next';
import { parseCookies } from 'nookies';

const baseProps: any = {
  url: process.env.BASE_URL,
};

export const baseGetServerSideProps = async (ctx: NextPageContext) => {
  return {
    props: {
      ...baseProps,
    },
  };
};

export const privateGetServerSideProps = async (ctx: NextPageContext) => {
  const { props, redirect }: any = await baseGetServerSideProps(ctx);
  if (redirect) return { redirect };

  const cookies = parseCookies(ctx);
  if (!cookies.profile)
    return {
      redirect: {
        destination: '/login',
      },
    };

  return { props };
};

export const adminGetServerSideProps = async (ctx: NextPageContext) => {
  const { props, redirect }: any = await privateGetServerSideProps(ctx);
  if (redirect) return { redirect };

  const cookies = parseCookies(ctx);
  if (!cookies.profile)
    return {
      redirect: {
        destination: '/login',
      },
    };

  const superadmin: any = process.env.SUPERADMIN ? process.env.SUPERADMIN.split(',') : [];
  const { email }: any = cookies.profile ? JSON.parse(cookies.profile) : {};
  if (!superadmin.includes(email))
    return {
      redirect: {
        destination: '/dashboard',
      },
    };

  return { props };
};
