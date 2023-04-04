import { Button, Form } from '@/components/shared';
import Link from 'next/link';

interface FormSignUpProps {
  apiUrl: string;
}

export default function FormSignUp({ apiUrl }: FormSignUpProps) {
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
      label: 'Username',
      className: 'w-full',
    },
    {
      kind: 'password',
      name: 'password',
      label: 'Password',
    },
  ];

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className={'w-full md:max-w-[360px]'}>
        <div className={'mb-8 space-y-2'}>
          <h1 className={'font-bold text-2xl text-center'}>Create new account</h1>
          <div className={'text-center text-xs text-slate-500'}>Please enter your details.</div>
        </div>
        <div className={'space-y-5'}>
          <Form fields={fields} data={null} setData={() => null} className={{ field: 'w-full' }} />
          <Button type={'submit'} variant={'primary'} className={'w-full font-semibold'}>
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
