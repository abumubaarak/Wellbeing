import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useCallback, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {BorderlessButton, RectButton} from 'react-native-gesture-handler';
import {AuthModal} from '../AuthModal';
import {Box} from '../Box';
import {Text} from '../Text';
import {
  $button,
  $buttonContainer,
  $container,
  $label,
  $labelLogin,
} from './style';

export const OnboardingFooter = () => {
  const {t} = useTranslation();
  const getStartedModalRef = useRef<BottomSheetModal>(null);
  const loginModalRef = useRef<BottomSheetModal>(null);

  const openGetStartedModal = useCallback(() => {
    getStartedModalRef.current?.present();
  }, []);
  const loginModal = useCallback(() => {
    loginModalRef.current?.present();
  }, []);

  return (
    <>
      <Box style={$container} flexGrow={0.05} overflow="hidden">
        <Box style={$buttonContainer} overflow="hidden">
          <RectButton style={$button} onPress={openGetStartedModal}>
            <Text style={$label} variant="buttonLabel">
              {t('getStarted')}
            </Text>
          </RectButton>
        </Box>
        <BorderlessButton rippleRadius={0} onPress={loginModal}>
          <Text variant="buttonLabel" style={[$label, $labelLogin]}>
            {t('login')}
          </Text>
        </BorderlessButton>
      </Box>
      <AuthModal type="getStarted" bottomSheetModalRef={getStartedModalRef} />
      <AuthModal type="login" bottomSheetModalRef={loginModalRef} />
    </>
  );
};
