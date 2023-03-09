import { NextPageContext } from 'next';
import { baseGetServerSideProps } from '@/utils/page';
import BaseLayout from '@/layouts/base-layout';
import { Button, Form } from '@/components/commons';
import { useState } from 'react';
import { FetchApi } from '@/utils/fetch-api';
import useDataState from '@/hooks/use-data-state';

export const getServerSideProps = async (ctx: NextPageContext) => {
  let { props }: any = await baseGetServerSideProps(ctx);

  try {
    // const { id_token: token }: any = ctx.query;
    // const { email }: any = jwt.decode(token)
    //
    // const query: string = querystring.encode({ email })
    // const url: string = `${process.env.BASE_API_URL}/api/users?${query}`
    //
    // const result: any = await axios.get(url)
    // if (result.data.length == 0) props.register = true
    props.email = 'madebyais@gmail.com';
    props.register = true;
  } catch (e: any) {
    // TODO: change the destination path
    console.dir(e.response.data);
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return { props };
};

export default function AuthProviderCallback(props: any) {
  const [state, setState] = useDataState({ isLoading: false });
  const [data, setData] = useState<any>({ email: props.email });

  const onClickRegister = async () => {
    setState({ isLoading: true });

    setTimeout(async () => {
      try {
        const { data: user, error }: any = await FetchApi({
          method: 'POST',
          url: '/api/v1/register',
          data: { ...data, username: props.email, email: props.email },
        });
        if (error) {
          setState({ isLoading: false });
          return alert(error.message);
        }
      } catch (e: any) {
        alert(e.toString());
      }
    }, 3000);
  };

  if (state.isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <BaseLayout title={props.register ? 'Create new account' : ''} {...props}>
      <div className={'w-full h-screen flex justify-center items-center'}>
        <div className={'w-[400px] space-y-5'}>
          <div className={'text-xl font-bold'}>Create new account</div>
          <div className={'text-gray-500'}>
            Register now to get started. Your privacy is important to us, so we won't share your information
            with others.
          </div>

          <Form
            fields={[
              {
                kind: 'text',
                name: 'fullname',
                label: 'Fullname',
              },
              {
                kind: 'password',
                name: 'password',
                label: 'Password',
              },
            ]}
            data={data}
            setData={setData}
            className={{ field: 'w-full' }}
          />

          <div className={'flex justify-end space-x-3'}>
            <Button variant={'none'} onClick={() => (window.location.href = '/')}>
              Cancel
            </Button>
            <Button onClick={onClickRegister}>Register</Button>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
