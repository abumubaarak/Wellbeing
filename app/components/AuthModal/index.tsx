import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Config} from 'react-native-config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GetStartedCircle, LoginCircle} from '../../assets/svgs';
import {appleSignIn, googleSignIn} from '../../services';
import {horizontalScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';

import {SocialButton} from './SocialButton';
import {
  $bottomSheetContainer,
  $buttonGroup,
  $container,
  $indicator,
} from './style';

GoogleSignin.configure({
  scopes: ['profile', 'email'],
  webClientId: Config.CLIENT_ID,
});

type AuthModalProps = {
  type: 'getStarted' | 'login';
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
};
export const AuthModal = ({type, bottomSheetModalRef}: AuthModalProps) => {
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const snapPoints = useMemo(() => ['1', '41%'], []);
  const [_, setLoading] = useState<boolean>(false);

  const continueWithApple = () => {
    setLoading(true);
    appleSignIn()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };
  const continueWithGoogle = () => {
    setLoading(true);
    googleSignIn()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      backgroundStyle={$container}
      handleIndicatorStyle={$indicator}
      backdropComponent={BottomSheetBackdrop}
      snapPoints={snapPoints}>
      <BottomSheetView
        style={[$bottomSheetContainer, {paddingBottom: insets.bottom}]}>
        <Box pt="s" justifyContent="center" alignItems="center">
          {type === 'getStarted' ? <GetStartedCircle /> : <LoginCircle />}
        </Box>
        <Text
          style={{paddingHorizontal: horizontalScale(25)}}
          paddingVertical="m"
          variant="regular"
          numberOfLines={3}
          textAlign="center">
          {t('authMessage')}
        </Text>
        <Box justifyContent="center" style={$buttonGroup}>
          <SocialButton type="google" onPress={continueWithGoogle} />
          <SocialButton type="apple" onPress={continueWithApple} />
        </Box>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
