import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  cleanup,
  eventListener,
  startTranscription,
  stopTranscription,
} from 'react-native-live-transcription';
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

export const Symptoms = () => {
  //const {t} = useTranslation();
  const options = useSharedValue(false);
  const [symptomsPref] = useMMKVString('symptoms');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [previousLength, setPreviousLength] = useState<number>(0);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [typingEffect, setTypingEffect] = useState<boolean>(true);
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus && symptomsPref?.length !== 0) {
      setSymptoms([symptomsPref!]);
      setTypingEffect(false);
    }
  }, [isFocus, symptomsPref]);

  eventListener('onMessage', data => {
    if (symptoms.length === 0) {
      setPreviousLength(0);
    } else {
      setPreviousLength(symptoms.join('').length - 1);
    }
    setTypingEffect(true);
    setSymptoms([...symptoms, data]);
  });

  eventListener('silenceTimeout', data => {
    setIsRecording(!data);
    options.value = !data;
    setSymptoms([]);
  });

  useEffect(() => {
    return () => {
      cleanup('onMessage');
      cleanup('silenceTimeout');
    };
  }, []);

  const startRecording = async () => {
    setIsRecording(!isRecording);
    options.value = !isRecording;
    if (isRecording) {
      stopTranscription();
    } else {
      startTranscription();
    }
  };

  const clearSymptoms = () => {
    setSymptoms([]);
  };

  return (
    <Screen useAlignment>
      <Dismiss />

      <SymptomsGradientBackground
        opacity={isRecording || symptoms.length > 0 ? 1 : 0}
        dynamic={isRecording}
      />
      <PermissionHeader i18nKey="symptoms" />

      {symptoms && (
        <Box marginTop="l">
          <TypeWriter
            loading={isRecording}
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
        startRecording={startRecording}
        symptoms={symptoms}
      />
    </Screen>
  );
};
