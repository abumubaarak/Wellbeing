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
import {appleSign, googleSignIn} from '../../services';
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
  //WebclientID not android client id
  webClientId: Config.WEB_CLIENT_ID,
  iosClientId: Config.CLIENT_ID_IOS,
});

type AuthModalProps = {
  type: 'getStarted' | 'login';
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
};
export const AuthModal = ({type, bottomSheetModalRef}: AuthModalProps) => {
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const snapPoints = useMemo(() => ['1', '41%'], []);
  const [auth, setAuth] = useState<'google' | 'apple' | undefined>(undefined);

  const continueWithApple = () => {
    setAuth('apple');
    appleSign()
      .then(() => setAuth(undefined))
      .catch(() => setAuth(undefined));
  };
  const continueWithGoogle = () => {
    setAuth('google');
    googleSignIn()
      .then(() => setAuth(undefined))
      .catch(() => setAuth(undefined));
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
          <SocialButton
            type="google"
            onPress={continueWithGoogle}
            isLoading={auth === 'google' ? true : false}
          />
          <SocialButton
            type="apple"
            onPress={continueWithApple}
            isLoading={auth === 'apple' ? true : false}
          />
        </Box>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
