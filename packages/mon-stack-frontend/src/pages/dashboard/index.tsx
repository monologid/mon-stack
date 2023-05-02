import { Button } from '@/components/shared';
import useDataState from '@/hooks/use-data-state';
import { privateGetServerSideProps } from '@/utils/page';
import { Mic, Pencil, Siren } from 'lucide-react';
import Head from 'next/head';
import { useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { isLastWord, removeLastWord } from '@/utils/string';
import { fetchApi } from '@/utils/fetch-api';

// TODO: split text and check if last word is "send"

export const getServerSideProps = privateGetServerSideProps;

export default function Dashboard(props: any) {
  const [state, setState] = useDataState({
    isSpeechRecognitionSupported: false,
    isChrome: false,
    isLoading: false,
    showText: false,
    showVoice: false,
    text: null,
  });

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const onClickIconPlaceholder = (kind: string) => {
    switch (kind) {
      case 'text':
        setState({ showText: true, showVoice: false });
        break;
      case 'voice':
        setState({ showVoice: true, showText: false });
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
        break;
      default:
        break;
    }
  };

  const onChangeInputText = (event: any) => {
    const text: string = event.target.value;
    setState({ text });
  };

  const onClickSubmit = async (transcript: any) => {
    setState({ isLoading: true });

    let text: string | null = null;
    if (transcript) text = transcript;
    else text = state.text;

    try {
      const url: string = '/api/v1/backend';
      const body = {
        method: 'POST',
        api: '/api/v1/cortex/talk',
        payload: {
          prompt: text,
        },
      };

      console.dir(body);

      const result = await fetchApi({ url, method: 'POST', data: body });
      console.dir(result)
    } catch (e: any) {
      alert('Something went wrong. Please try again later.');
    } finally {
      setTimeout(() => {
        setState({
          isLoading: false,
          showText: false,
          showVoice: false,
          text: null,
        });
      }, 1000);
    }
  };

  useEffect(() => {
    setState({ isSpeechRecognitionSupported: browserSupportsSpeechRecognition });
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (transcript.length != 0 && isLastWord(transcript, 'reset')) resetTranscript();
    if (transcript.length != 0 && isLastWord(transcript, 'stop')) SpeechRecognition.stopListening();
    if (transcript.length != 0 && isLastWord(transcript, 'send')) {
      onClickSubmit(removeLastWord(transcript));
      SpeechRecognition.stopListening();
    }
  }, [transcript]);

  if (state.isLoading) {
    return (
      <>
        <Head>
          <title>Please wait ...</title>
        </Head>

        <div className={'w-full h-screen flex justify-center items-center'}>
          <div className={'animate-bounce'}>
            <Siren size={45} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>EDITH</title>
      </Head>

      <main>
        <div className={'w-full h-screen flex justify-center items-center'}>
          <div>
            {state.showText ? (
              <div className={'flex flex-col items-start space-y-5'}>
                <textarea
                  className={
                    'w-[500px] custom-cursor border-none text-4xl border-transparent focus:border-transparent focus:ring-0 !outline-none h-32 resize-none'
                  }
                  placeholder={'Enter your prompt ...'}
                  onChange={onChangeInputText}
                />
                <div className={'pl-3 space-x-2'}>
                  <Button onClick={onClickSubmit}>Submit</Button>
                  <Button
                    variant={'none'}
                    onClick={() => {
                      setState({
                        isLoading: false,
                        showText: false,
                        showVoice: false,
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : null}

            {state.showVoice ? (
              <div className={'space-y-2'}>
                <div className={'text-xs font-semibold'}>
                  {listening ? `I'm listening to you ... :)` : null}
                  {!listening ? (
                    <Button
                      size={'xs'}
                      onClick={() => SpeechRecognition.startListening({ continuous: true })}
                    >
                      Start Listening
                    </Button>
                  ) : null}
                </div>
                <div className={'w-[420px] text-4xl'}>{transcript}</div>
              </div>
            ) : null}

            {!state.showText && !state.showVoice ? (
              <>
                <div className={'w-[420px] text-4xl mb-5'}>
                  <TypeAnimation
                    cursor={true}
                    sequence={['Hello, do you wanna have a text-chat or talk to me? :)']}
                    speed={75}
                    className={'custom-cursor'}
                  />
                </div>
                <div className={'flex space-x-3'}>
                  <IconPlaceholder onClick={() => onClickIconPlaceholder('text')}>
                    <Pencil size={20} />
                  </IconPlaceholder>
                  {state.isSpeechRecognitionSupported ? (
                    <IconPlaceholder onClick={() => onClickIconPlaceholder('voice')}>
                      <Mic size={20} />
                    </IconPlaceholder>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
}

const IconPlaceholder = ({ onClick, children }: any) => {
  return (
    <div
      className={'rounded-full border border-black p-5 cursor-pointer hover:bg-black hover:text-white'}
      onClick={onClick || null}
    >
      {children}
    </div>
  );
};
