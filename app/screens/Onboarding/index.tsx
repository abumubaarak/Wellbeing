import React from 'react';
import {
  OnboardingCarousel,
  OnboardingFooter,
  OnboardingHeader,
  Screen,
} from '../../components';
import {useProgress} from '../../hooks';

export const OnboardingScreen = () => {
  const {onSnapToItem, scrollIndex} = useProgress();
  return (
    <Screen>
      <OnboardingHeader width={scrollIndex} />
      <OnboardingCarousel onSnapToItem={onSnapToItem} />
      <OnboardingFooter />
    </Screen>
  );
};
