import { Button, Form } from '@/components/shared';
import Link from 'next/link';
import { useState } from 'react';
import { fetchApi } from '@/utils/fetch-api';
import { setCookie } from 'nookies';

export default function FormLogin() {
  const fields: any = [
    {
      kind: 'text',
      name: 'username',
      label: 'Username',
      className: 'w-full',
    },
    {
      kind: 'password',
      name: 'password',
      label: 'Password',
    },
  ];

  const [data, setData] = useState<any>({});

  const onClickLogin = async () => {
    try {
      const url: string = '/api/v1/backend';
      const body: any = {
        method: 'POST',
        api: '/api/auth/local',
        payload: {
          identifier: data.username || '',
          password: data.password || '',
        },
      };

      const result = await fetchApi({ url, method: 'POST', data: body });
      if (result.error) {
        const { errors }: any = result.error.details;
        let errorMsg: string = '';
        let tempMsg: string = '';
        if (Array.isArray(errors)) {
          errors.forEach((err: any) => (tempMsg += `- ${err.message}\n`));
          errorMsg += `Errors:\n${tempMsg}`;
        } else {
          errorMsg = result.error.message;
        }
        alert(errorMsg);
        return;
      }

      const { jwt, user }: any = result.data;
      setCookie(null, 'token', jwt, { maxAge: 24 * 60 * 60, path: '/' });
      setCookie(null, 'profile', JSON.stringify(user), { maxAge: 24 * 60 * 60, path: '/' });
      window.location.href = '/auth';
    } catch (e) {
      alert('Something went wrong. Please contact support.');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className={'w-full md:max-w-[360px]'}>
        <div className={'mb-8 space-y-2'}>
          <h1 className={'font-bold text-2xl text-center'}>Log in to your account</h1>
          <div className={'text-center text-xs text-slate-500'}>
            Welcome back! Please enter your credentials.
          </div>
        </div>
        <div className={'space-y-5'}>
          <Form fields={fields} data={data} setData={setData} className={{ field: 'w-full' }} />
          <Button
            type={'submit'}
            variant={'primary'}
            className={'w-full font-semibold'}
            onClick={onClickLogin}
          >
            Log In
          </Button>
          <div className={'text-center text-sm space-x-1'}>
            <span>Don&apos;t have an account?</span>
            <Link href={'/sign-up'} className={'font-semibold'}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
