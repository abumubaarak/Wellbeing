import React from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {Box} from '../Box';
import {Text} from '../Text';
import {
  $button,
  $container,
  $getStartedContainer,
  $label,
  $labelLogin,
} from './style';

export const OnboardingFooter = () => {
  const {t} = useTranslation();

  return (
    <Box style={$container} flexGrow={0.05} overflow="hidden">
      <Box style={$getStartedContainer} overflow="hidden">
        <RectButton style={$button}>
          <Text style={$label} variant="buttonLabel">
            {t('getStarted')}
          </Text>
        </RectButton>
      </Box>
      <Pressable>
        <Text variant="buttonLabel" style={[$label, $labelLogin]}>
          {t('login')}
        </Text>
      </Pressable>
    </Box>
  );
};
