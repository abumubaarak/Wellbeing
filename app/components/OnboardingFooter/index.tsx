import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useCallback, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {BorderlessButton} from 'react-native-gesture-handler';
import {Translations} from '../../i18n';
import {AuthModal} from '../AuthModal';
import {Box} from '../Box';
import {Button} from '../Button';
import {Text} from '../Text';
import {$container, $labelLogin} from './style';
import { $label } from '../Button/styles';

export const OnboardingFooter = () => {
  const {t} = useTranslation<keyof Translations>();
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
      <Box style={$container}  overflow="hidden">
        <Button onPress={openGetStartedModal} label="getStarted" />
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
