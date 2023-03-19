import useDataState from '@/hooks/use-data-state';
import { Mic, MicOff } from 'lucide-react';

let recognition: any = null;

const SpeechToText = ({ setState, onSpeechFinish }: any) => {
  const [localState, setLocalState] = useDataState({
    isMicEnabled: false,
    transcript: null,
  });

  const onClickMic = () => {
    const isMicEnabled = localState.isMicEnabled ? false : true;

    if (!recognition) recognition = new window.webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'x-US';

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');

      setLocalState({ transcript });
    };

    if (!localState.isMicEnabled) {
      recognition.start();
    } else {
      recognition.stop();
      setState({ user: 'YOU', message: localState.transcript });
      onSpeechFinish(localState.transcript);
    }

    setLocalState({ isMicEnabled });
  };

  return (
    <div className={'cursor-pointer'} onClick={onClickMic}>
      {localState.isMicEnabled ? <Mic size={18} className={'animate-pulse'} /> : <MicOff size={18} />}
    </div>
  );
};

export default SpeechToText;
