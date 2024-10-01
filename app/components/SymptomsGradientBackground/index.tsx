import React, {useEffect} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {GradientBackground} from '../../assets/svgs';
import {AnimatedBox} from '../Box';
import {$container} from './style';

type SymptomsGradientBackground = {
  opacity: number;
  dynamic: boolean;
};
export const SymptomsGradientBackground = ({
  opacity,
  dynamic,
}: SymptomsGradientBackground) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gradientStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity, {duration: 1000}),
      transform: dynamic
        ? [{translateX: translateX.value}, {translateY: translateY.value}]
        : [],
    };
  });

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(100, {duration: 1000}),
        withTiming(-0, {duration: 1000}),
      ),
      -1,
      true,
    );
    translateX.value = withRepeat(
      withSequence(
        withTiming(50, {duration: 900}),
        withTiming(-100, {duration: 900}),
      ),
      -1,
      true,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatedBox style={[gradientStyle, $container]}>
      <GradientBackground />
    </AnimatedBox>
  );
};
