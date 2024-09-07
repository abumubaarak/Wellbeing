import {Buffer} from 'buffer';
import React, {useState} from 'react';
import {Pressable} from 'react-native';
import LiveAudioStream from 'react-native-live-audio-stream';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Skottie} from 'react-native-skottie';
import {
  Circle,
  EditTranscription,
  GradientBackground,
  Mic,
  Restart,
  Stop,
} from '../../assets/svgs';
import {
  AnimatedBox,
  Box,
  Dismiss,
  PermissionHeader,
  Screen,
  TypeWriter,
} from '../../components';
import {verticalScale} from '../../utils';

const ws = new WebSocket('https://d75d-197-211-58-119.ngrok-free.app/ws');

export const Symptoms = () => {
  //const {t} = useTranslation();
  const options = useSharedValue(false);
  const [isRecording, setIsRecording] = useState(false);
  const recording = useSharedValue(false);
  const [previousLength, setPreviousLength] = useState<number>(0);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [chunks, setChunks] = useState<Uint8Array[]>([]);

  const config = {
    sampleRate: 16000, // default is 44100 but 32000 is adequate for accurate voice recognition
    channels: 1, // 1 or 2, default 1
    bitsPerSample: 16, // 8 or 16, default 16
    audioSource: 6, // android only (see below)
    bufferSize: 4096, // default is 2048
  };
  LiveAudioStream.init(config);

  ws.onopen = () => {
    //Do something here/IF not connected retry.
  };
  ws.onmessage = (e: WebSocketMessageEvent) => {
    if (symptoms.length === 0) {
      setPreviousLength(0);
    } else {
      setPreviousLength(symptoms.join('').length - 1);
    }
    setSymptoms([...symptoms, e.data]);
  };

  const startRecording = async () => {
    if (isRecording) {
      LiveAudioStream.stop();
    } else {
      LiveAudioStream.start();
    }
    recording.value = !recording.value;
    setIsRecording(!isRecording);
    options.value = !options.value;
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

  const optionStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(options.value || symptoms.length > 0 ? 1 : 0, {
        duration: 300,
      }),
      transform: [
        {
          scale: withTiming(options.value || symptoms.length > 0 ? 1 : 0, {
            duration: 300,
          }),
        },
      ],
    };
  });

  const gradientStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(1, {duration: 500}),
    };
  });
  const recordingStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(recording.value ? 0 : 1),
      transform: [{scale: withSpring(recording.value ? 0 : 1)}],
    };
  });
  return (
    <Screen>
      <Box paddingHorizontal="l">
        <Dismiss />
      </Box>
      <AnimatedBox
        style={[gradientStyle, {position: 'absolute', top: verticalScale(96)}]}>
        <GradientBackground />
      </AnimatedBox>

      <PermissionHeader i18nKey="symptoms" />
      {symptoms && (
        <Box marginTop="xl" paddingHorizontal="l">
          <TypeWriter
            previousLength={previousLength}
            content={symptoms?.join('')}
          />
        </Box>
      )}

      <Box flex={1} alignItems="center" justifyContent="flex-end">
        {isRecording && (
          <Skottie
            style={[{height: 50, width: '100%', marginBottom: 80}]}
            source={require('../../assets/lottie/wav.json')}
            loop
            autoPlay
          />
        )}
        <Box flexDirection="row" alignItems="center" gap="l">
          <AnimatedBox style={optionStyle}>
            <EditTranscription />
          </AnimatedBox>

          <Pressable onPress={startRecording}>
            <Box flexDirection="row" justifyContent="center">
              <Circle width={70} height={70} onPress={startRecording} />
              <Box alignSelf="center" style={{position: 'absolute'}}>
                {isRecording ? (
                  <AnimatedBox style={optionStyle}>
                    <Stop height={23} width={23} />
                  </AnimatedBox>
                ) : (
                  <AnimatedBox style={recordingStyle}>
                    <Mic height={23} width={23} />
                  </AnimatedBox>
                )}
              </Box>
            </Box>
          </Pressable>
          <AnimatedBox style={optionStyle}>
            <Restart />
          </AnimatedBox>
        </Box>
      </Box>
    </Screen>
  );
};
