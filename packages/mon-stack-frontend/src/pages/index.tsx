import BaseLayout from '@/layouts/base-layout';
import { baseGetServerSideProps } from '@/utils/page';
import { Input } from '@/components/commons';
import { TypeAnimation } from 'react-type-animation';
import { useState } from 'react';

export const getServerSideProps = baseGetServerSideProps;

export default function Home(props: any) {
  const [state, setState] = useState<any>({
    isTyping: false
  })

  const [message, setMessage] = useState<string>('Hi there, welcome! My name is MON, I\'ll be assisting you today, so what can I help you with?')

  const onInputKeyDown = (e: any) => {
    if (e.key !== 'Enter') {
      setState({ ...state, isTyping: true })
      return
    }

    setState({ ...state, isTyping: false })
    setMessage(e.target.value)
    e.target.value = ''
  }

  return (
    <BaseLayout title={'MON Stack'} {...props}>
      <div className={'w-full absolute bottom-0 mb-5'}>
        <div className={'w-[400px] mx-auto space-y-2'}>
          <div key={message} className={'w-full bg-input-dark-primary rounded p-3 overflow-y-auto'} style={{ maxHeight: 150 }}>
            <TypeAnimation key={message} cursor={false} sequence={[message]} speed={70} />
          </div>
          <Input className={'w-full bg-input-dark-primary border-input-dark-primary focus:ring-0 focus:outline-none'} onKeyDown={onInputKeyDown} />
        </div>
      </div>
    </BaseLayout>
  );
}

Home.theme = 'dark';
