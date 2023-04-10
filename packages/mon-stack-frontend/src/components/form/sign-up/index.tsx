import { Button, Form } from '@/components/shared';
import Link from 'next/link';
import { fetchApi } from '@/utils/fetch-api';
import { setCookie } from 'nookies';
import { useState } from 'react';

export default function FormSignUp() {
  const fields: any = [
    {
      kind: 'text',
      name: 'fullname',
      label: 'Fullname',
      className: 'w-full',
    },
    {
      kind: 'text',
      name: 'username',
      label: 'E-mail/Username',
      className: 'w-full',
    },
    {
      kind: 'password',
      name: 'password',
      label: 'Password',
    },
  ];

  const [data, setData] = useState<any>({});

  const onClickSignUp = async () => {
    try {
      const url: string = '/api/v1/backend';
      const body: any = {
        method: 'POST',
        api: '/api/auth/local/register',
        payload: {
          username: data.fullname || '',
          email: data.username || '',
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

      window.location.href = '/login';
    } catch (e) {
      alert('Something went wrong. Please contact support.');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className={'w-full md:max-w-[360px]'}>
        <div className={'mb-8 space-y-2'}>
          <h1 className={'font-bold text-2xl text-center'}>Create new account</h1>
          <div className={'text-center text-xs text-slate-500'}>Please enter your details.</div>
        </div>
        <div className={'space-y-5'}>
          <Form fields={fields} data={data} setData={setData} className={{ field: 'w-full' }} />
          <Button
            type={'submit'}
            variant={'primary'}
            className={'w-full font-semibold'}
            onClick={onClickSignUp}
          >
            Sign Up
          </Button>
          <div className={'text-center text-sm space-x-1'}>
            <span>Already have an account?</span>
            <Link href={'/login'} className={'font-semibold'}>
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
