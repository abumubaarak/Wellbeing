import React from 'react';
import {useTranslation} from 'react-i18next';
import {RectButton} from 'react-native-gesture-handler';
import {MicCircle} from '../../assets/svgs';
import {Box, Dismiss, Screen, Text} from '../../components';
import {
  $button,
  $buttonContainer,
  $label,
} from '../../components/OnboardingFooter/style';
import {horizontalScale, moderateScale, verticalScale} from '../../utils';

export const AI = () => {
  const {t} = useTranslation();
  return (
    <Screen>
      <Dismiss />
      <Box flex={1} alignItems="center" style={{marginTop: verticalScale(70)}}>
        <MicCircle />
        <Text
          variant="header"
          fontSize={moderateScale(25)}
          style={{marginTop: verticalScale(35)}}>
          {t('enableMic')}
        </Text>
        <Text
          variant="regular"
          textAlign="center"
          style={{marginTop: verticalScale(9)}}>
          {t('enableMicSummary')}
        </Text>
      </Box>

      <Box
        style={[$buttonContainer, {marginHorizontal: horizontalScale(25)}]}
        overflow="hidden">
        <RectButton style={$button}>
          <Text style={$label} variant="buttonLabel">
            {t('allow')}
          </Text>
        </RectButton>
      </Box>
    </Screen>
  );
};
