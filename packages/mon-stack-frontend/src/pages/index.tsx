import BaseLayout from '@/layouts/base-layout';
import { baseGetServerSideProps } from '@/utils/page';
import { Input } from '@/components/commons';
import { TypeAnimation } from 'react-type-animation';
import useDataState from '@/hooks/use-data-state';
import SpeechToText from '@/components/speech';
import { RenderMarkdown } from '@/components/render';
import { fetchApi } from '@/utils/fetch-api';

export const getServerSideProps = baseGetServerSideProps;

export default function Home(props: any) {
  const [state, setState] = useDataState({
    isTyping: false,
    user: 'MON',
    message: "Hi there, welcome! My name is MON, I'll be assisting you today. What can I help you? :)",
    messages: [],
  });

  const onInputKeyDown = async (e: any) => {
    if (e.key !== 'Enter') {
      setState({ ...state, isTyping: true });
      return;
    }

    const prompt: string = e.target.value;
    setState({ isTyping: false, message: 'Processing ...', messages: [] });
    e.target.value = '';

    setTimeout(async () => {
      const url: string = '/api/v1/backend';
      const headers: any = {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc5NTgwNzYxLCJleHAiOjE2ODIxNzI3NjF9.rgg5WTTFQBPe2v0ad2HeyZTku25kCjphckX2vZxWNOg',
      };
      const response = await fetchApi({
        url,
        method: 'POST',
        data: { method: 'POST', api: '/api/v1/cortex/talk', payload: { prompt } },
        headers,
      });
      const { data } = response;
      if (!data) return setState({ isTyping: false, message: 'Something went wrong. :(', messages: [] });

      console.dir(data);

      let newState: any = { isTyping: false };
      switch (data.kind) {
        case 'input':
          newState = { ...newState, message: data.message, messages: [] };
          break;
        case 'error':
          newState = { ...newState, message: data.message, messages: [] };
          break;
        default:
          newState = { ...newState, messages: data.result };
      }

      setState(newState);
    }, 1000);
  };

  const onSpeechFinish = (prompt: string) => {
    setState({ isTyping: false, user: 'MON', message: 'Processing ...', messages: [] });

    setTimeout(async () => {
      const url: string = '/api/v1/backend';
      const headers: any = {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc5NTgwNzYxLCJleHAiOjE2ODIxNzI3NjF9.rgg5WTTFQBPe2v0ad2HeyZTku25kCjphckX2vZxWNOg',
      };
      const response = await fetchApi({
        url,
        method: 'POST',
        data: { method: 'POST', api: '/api/v1/cortex/talk', payload: { prompt } },
        headers,
      });
      const { data } = response;
      if (data.kind == 'input') return setState({ isTyping: false, message: data.message, messages: [] });
      setState({ isTyping: false, messages: data.result });
    }, 1000);
  };

  return (
    <BaseLayout title={'MON Stack'} {...props}>
      <div className={'w-full absolute bottom-0 mb-5'}>
        <div className={'w-[400px] mx-auto space-y-2'}>
          <div
            key={state.message}
            className={'w-full bg-input-dark-primary rounded p-3 overflow-y-auto space-y-3'}
          >
            <div className={'font-bold text-xs tracking-wider'}>{state.user}</div>
            {state.message && state.messages.length == 0 ? (
              <TypeAnimation
                key={state.message}
                cursor={true}
                sequence={[state.message]}
                speed={75}
                className={'custom-cursor'}
              />
            ) : null}

            {state.messages.length > 0 ? (
              <>
                {state.messages.map((item: any, i: number) => (
                  <RenderMarkdown key={i} text={item.message} />
                ))}
              </>
            ) : null}
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
