import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {RectButton} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Apple, GetStartedCircle, Google, LoginCircle} from '../../assets/svgs';
import {colors} from '../../theme/colors';
import {horizontalScale} from '../../utils';
import {Box} from '../Box';
import {$button, $buttonContainer, $label} from '../OnboardingFooter/style';
import {Text} from '../Text';
import {
  $border,
  $bottomSheetContainer,
  $buttonGroup,
  $container,
  $indicator,
} from './style';

type AuthModalProps = {
  type: 'getStarted' | 'login';
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
};
export const AuthModal = ({type, bottomSheetModalRef}: AuthModalProps) => {
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const snapPoints = useMemo(() => ['1', '41%'], []);
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
          <Box style={[$buttonContainer, $border]} overflow="hidden">
            <RectButton style={[$button, {backgroundColor: colors.white}]}>
              <Box flexDirection="row" alignItems="center">
                <Google />
                <Text pl="s" style={$label} variant="buttonLabel">
                  Continue with Google
                </Text>
              </Box>
            </RectButton>
          </Box>
          <Box mt="xs" style={[$buttonContainer, $border]} overflow="hidden">
            <RectButton style={[$button, {backgroundColor: colors.white}]}>
              <Box flexDirection="row" alignItems="center">
                <Apple />
                <Text pl="s" style={$label} variant="buttonLabel">
                  Continue with Apple
                </Text>
              </Box>
            </RectButton>
          </Box>
        </Box>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
