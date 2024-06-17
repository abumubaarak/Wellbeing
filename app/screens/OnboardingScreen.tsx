import React, {useCallback} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  OnboardingCarousel,
  OnboardingFooter,
  OnboardingHeader,
  Screen,
} from '../components/';

export const OnboardingScreen = () => {
  const scrollIndex = useSharedValue<number>(25);

  const onSnapToItem = useCallback(
    (index: number) => {
      scrollIndex.value = Math.round(index + 1) * 25;
    },
    [scrollIndex],
  );

  const widthStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${scrollIndex.value}%`),
    };
  });
  return (
    <Screen>
      <OnboardingHeader widthStyle={widthStyle} />
      <OnboardingCarousel onSnapToItem={onSnapToItem} />
      <OnboardingFooter />
    </Screen>
  );
};
