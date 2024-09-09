import {useIsFocused} from '@react-navigation/native';
import {Buffer} from 'buffer';
import React, {useEffect, useState} from 'react';
import {Vibration} from 'react-native';
import LiveAudioStream from 'react-native-live-audio-stream';
import {useMMKVString} from 'react-native-mmkv';
import {useSharedValue} from 'react-native-reanimated';
import {
  Box,
  Dismiss,
  PermissionHeader,
  Screen,
  SymptomsFooter,
  SymptomsGradientBackground,
  TypeWriter,
} from '../../components';
import {AUDIO_CONFIG} from '../../utils';

const ws = new WebSocket('https://d75d-197-211-58-119.ngrok-free.app/ws');

export const Symptoms = () => {
  //const {t} = useTranslation();
  const options = useSharedValue(false);
  const [symptomsPref] = useMMKVString('symptoms');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const recording = useSharedValue(false);
  const [previousLength, setPreviousLength] = useState<number>(0);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [typingEffect, setTypingEffect] = useState<boolean>(true);
  const [chunks, setChunks] = useState<Uint8Array[]>([]);
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus && symptomsPref?.length !== 0) {
      setSymptoms([symptomsPref!]);
      setTypingEffect(false);
    }
  }, [isFocus, symptomsPref]);

  LiveAudioStream.init(AUDIO_CONFIG);

  ws.onopen = () => {
    //Do something here/IF not connected retry.
  };
  ws.onmessage = (e: WebSocketMessageEvent) => {
    if (symptoms.length === 0) {
      setPreviousLength(0);
    } else {
      setPreviousLength(symptoms.join('').length - 1);
    }
    setTypingEffect(true);
    setSymptoms([...symptoms, e.data]);
  };

  LiveAudioStream.on('data', data => {
    const bufferChunk = Buffer.from(data, 'base64');
    setChunks([...chunks, bufferChunk]);
    if (chunks.length >= 25) {
      const joined_buffer = Buffer.concat(chunks);
      ws.send(joined_buffer);
      setChunks([]);
    }
  });

  const startRecording = async () => {
    recording.value = !recording.value;
    setIsRecording(!isRecording);
    options.value = !options.value;
    if (isRecording) {
      LiveAudioStream.stop();
    } else {
      Vibration.vibrate([500]);
      LiveAudioStream.start();
    }
  };

  const clearSymptoms = () => {
    setSymptoms([]);
  };

  return (
    <Screen>
      <Box paddingHorizontal="l">
        <Dismiss />
      </Box>
      <SymptomsGradientBackground
        opacity={isRecording || symptoms.length > 0 ? 1 : 0}
      />
      <PermissionHeader i18nKey="symptoms" />

      {symptoms && (
        <Box marginTop="l" paddingHorizontal="l">
          <TypeWriter
            addEffect={typingEffect}
            previousLength={previousLength}
            content={symptoms?.join('')}
          />
        </Box>
      )}
      <SymptomsFooter
        clearSymptoms={clearSymptoms}
        isRecording={isRecording}
        options={options}
        recording={recording}
        startRecording={startRecording}
        symptoms={symptoms}
      />
    </Screen>
  );
};
