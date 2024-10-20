import LottieView from 'lottie-react-native';
import React from 'react';
import {
  Gesture,
  GestureDetector,
  RectButton,
  RectButtonProps,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Loader} from '../../assets/lottie';
import {Box} from '../Box';
import {Text} from '../Text';
import {$button, $buttonContainer, $label, $skottie} from './styles';

type ButtonProps = RectButtonProps & {
  onPress?: () => void;
  label: string;
  isLoading?: boolean;
};
export const AnimatedButton = Animated.createAnimatedComponent(RectButton);

export const Button = ({onPress, isLoading, label, ...props}: ButtonProps) => {
  const scaleDown = useSharedValue<boolean>(false);

  const isButtonEnabled =
    props.enabled === undefined ? false : props.enabled ? false : true;
  const longPressGesture = Gesture.LongPress()
    .onBegin(() => {
      scaleDown.value = true;
    })
    .onFinalize(() => {
      scaleDown.value = false;
    });
  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleDown.value
            ? withTiming(0.9, {duration: 250})
            : withTiming(1, {duration: 250}),
        },
      ],
      opacity:
        scaleDown.value || isButtonEnabled
          ? withTiming(isButtonEnabled ? 0.2 : 0.9, {duration: 250})
          : withTiming(1, {duration: 250}),

      borderRadius: 100,
      overflow: 'hidden',
    };
  });
  return (
    <Box style={$buttonContainer} overflow="hidden">
      <GestureDetector gesture={longPressGesture}>
        <AnimatedButton
          {...props}
          style={[$button, buttonStyle]}
          onPress={onPress}>
          {isLoading ? (
            <LottieView
              style={$skottie}
              resizeMode="cover"
              source={Loader}
              autoPlay={true}
              loop={true}
            />
          ) : (
            <Text style={$label} variant="buttonLabel">
              {label}
            </Text>
          )}
        </AnimatedButton>
      </GestureDetector>
    </Box>
  );
};
