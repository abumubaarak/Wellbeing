import LottieView from 'lottie-react-native';
import React, {ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
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
import {colors} from '../../theme';
import {Box} from '../Box';
import {Text} from '../Text';
import {$button, $buttonContainer, $label, $skottie} from './styles';

type ButtonProps = RectButtonProps & {
  onPress?: () => void;
  label: string;
  isLoading?: boolean;
  useSecondary?: boolean;
  leftIcon?: ReactNode;
  buttonLabelStyle?: StyleProp<TextStyle>;
  buttonCustomStyle?: StyleProp<ViewStyle>;
};
export const AnimatedButton = Animated.createAnimatedComponent(RectButton);

export const Button = ({
  onPress,
  useSecondary = false,
  isLoading,
  leftIcon,
  buttonCustomStyle,
  label,
  buttonLabelStyle,
  ...props
}: ButtonProps) => {
  const scaleDown = useSharedValue<boolean>(false);
  const {t} = useTranslation();

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
    <Box flex={leftIcon ? 1 : 0} style={$buttonContainer} overflow="hidden">
      <GestureDetector gesture={longPressGesture}>
        <AnimatedButton
          {...props}
          style={[
            $button,
            buttonStyle,
            buttonCustomStyle,
            useSecondary && {backgroundColor: colors.blueLight},
          ]}
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
            <Box flexDirection="row" gap="n" alignItems="center">
              {leftIcon}
              <Text
                style={[
                  $label,
                  buttonLabelStyle,
                  useSecondary && {color: colors.white},
                ]}
                variant="buttonLabel">
                {t(label)}
              </Text>
            </Box>
          )}
        </AnimatedButton>
      </GestureDetector>
    </Box>
  );
};
