import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useMMKVString} from 'react-native-mmkv';
import {
  SharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {CheckRound, Circle, Edit, Mic, Restart, Stop} from '../../assets/svgs';
import {StackNavigation} from '../../navigators';
import {AnimatedBox, Box} from '../Box';
import {$circle, $circleButtonContainer} from './style';

type SymptomsFooter = {
  isRecording: boolean;
  symptoms: string[];
  options: SharedValue<boolean>;
  clearSymptoms: () => void;
  startRecording: () => Promise<void>;
};
export const SymptomsFooter = ({
  isRecording,
  symptoms,
  clearSymptoms,
  options,
  startRecording,
}: SymptomsFooter) => {
  const navigation = useNavigation<StackNavigation>();
  const [_, setSymptomsPref] = useMMKVString('symptoms');

  const analyse = () => {
    navigation.navigate('Analyse', {symptoms: symptoms.join('')});
    clearSymptoms();
    setSymptomsPref('');
  };

  const editSymptoms = () => {
    symptoms.length > 0 &&
      navigation.navigate('EditSymptoms', {
        symptoms: symptoms.join(''),
      });
  };

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

  const recordingStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(options.value ? 0 : 1),
      transform: [{scale: withSpring(options.value ? 0 : 1)}],
    };
  });

  return (
    <Box flex={1} alignItems="center" justifyContent="flex-end">
      <Box
        flexDirection="row"
        alignItems="center"
        style={$circleButtonContainer}>
        <RectButton onPress={editSymptoms}>
          <AnimatedBox style={optionStyle}>
            <Edit />
          </AnimatedBox>
        </RectButton>

        <Pressable onPress={startRecording}>
          <Box flexDirection="row" justifyContent="center">
            <Circle width={65} height={65} onPress={startRecording} />
            <Box alignSelf="center" style={$circle}>
              {symptoms.length > 0 && !isRecording ? (
                <>
                  <Pressable onPress={analyse}>
                    <AnimatedBox style={optionStyle}>
                      <CheckRound />
                    </AnimatedBox>
                  </Pressable>
                </>
              ) : isRecording ? (
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
        <Pressable onPress={clearSymptoms}>
          <AnimatedBox style={optionStyle}>
            <Restart />
          </AnimatedBox>
        </Pressable>
      </Box>
    </Box>
  );
};
