import BaseLayout from '@/layouts/base-layout';
import { baseGetServerSideProps } from '@/utils/page';
import { Input } from '@/components/commons';
import { TypeAnimation } from 'react-type-animation';
import useDataState from '@/hooks/use-data-state';
import SpeechToText from '@/components/speech';

export const getServerSideProps = baseGetServerSideProps;

export default function Home(props: any) {
  const [state, setState] = useDataState({
    isTyping: false,
    user: 'MON',
    message: "Hi there, welcome! My name is MON, I'll be assisting you today. What can I help you? :)",
  });

  const onInputKeyDown = async (e: any) => {
    if (e.key !== 'Enter') {
      setState({ ...state, isTyping: true });
      return;
    }

    const prompt: string = e.target.value;
    setState({ isTyping: false, message: 'Processing your prompt ...' });
    e.target.value = '';

    setTimeout(() => {
      setState({ isTyping: false, message: prompt });
    }, 3000);
  };

  const onSpeechFinish = (prompt: string) => {
    setState({ isTyping: false, user: 'MON', message: 'Processing your prompt ...' });

    setTimeout(() => {
      setState({ isTyping: false, user: 'MON', message: `Your message: ${prompt}` });
    }, 3000);
  };

  return (
    <BaseLayout title={'MON Stack'} {...props}>
      <div className={'w-full absolute bottom-0 mb-5'}>
        <div className={'w-[400px] mx-auto space-y-2'}>
          <div
            key={state.message}
            className={'w-full bg-input-dark-primary rounded p-3 overflow-y-auto space-y-3'}
            style={{ maxHeight: 150 }}
          >
            <div className={'font-bold text-xs tracking-wider'}>{state.user}</div>
            <TypeAnimation
              key={state.message}
              cursor={true}
              sequence={[state.message]}
              speed={65}
              className={'custom-cursor'}
            />
          </div>
          <div className={'flex items-center space-x-3 bg-input-dark-primary rounded'}>
            <Input
              className={
                'w-full bg-input-dark-primary border-input-dark-primary border-none !outline-none focus:ring-0'
              }
              onKeyDown={onInputKeyDown}
              placeholder={'Enter prompt ...'}
            />
            <div className={'pr-2'}>
              <SpeechToText setState={setState} onSpeechFinish={onSpeechFinish} />
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

Home.theme = 'dark';
