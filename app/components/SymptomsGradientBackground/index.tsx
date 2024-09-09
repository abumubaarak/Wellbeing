import React from 'react';
import {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {GradientBackground} from '../../assets/svgs';
import {AnimatedBox} from '../Box';
import {$container} from './style';

type SymptomsGradientBackground = {
  opacity: number;
};
export const SymptomsGradientBackground = ({
  opacity,
}: SymptomsGradientBackground) => {
  const gradientStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity, {duration: 5000}),
    };
  });
  return (
    <AnimatedBox style={[gradientStyle, $container]}>
      <GradientBackground />
    </AnimatedBox>
  );
};
