import React from 'react';
import {
  OnboardingCarousel,
  OnboardingFooter,
  OnboardingHeader,
  Screen,
} from '../../components';
import {useProgress} from '../../hooks/';

export const OnboardingScreen = () => {
  const {onSnapToItem, widthStyle} = useProgress();
  return (
    <Screen>
      <OnboardingHeader widthStyle={widthStyle} />
      <OnboardingCarousel onSnapToItem={onSnapToItem} />
      <OnboardingFooter />
    </Screen>
  );
};
