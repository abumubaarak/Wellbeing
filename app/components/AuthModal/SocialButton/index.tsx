import LottieView from 'lottie-react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {RectButton} from 'react-native-gesture-handler';
import {Loader} from '../../../assets/lottie';
import {Apple, Google} from '../../../assets/svgs';
import {Translations} from '../../../i18n';
import {colors} from '../../../theme/colors';
import {Box} from '../../Box';
import {$buttonContainer, $label} from '../../Button/styles';
import {$button} from '../../OnboardingFooter/style';
import {Text} from '../../Text';
import {$border} from '../style';
import {$skottie} from './style';

type SocialButton = {
  type: 'google' | 'apple';
  onPress?: () => void;
  isLoading?: boolean;
};
export const SocialButton = ({type, onPress, isLoading}: SocialButton) => {
  const {t} = useTranslation<keyof Translations>();
  const title = type === 'google' ? t('withGoogle') : t('withApple');
  return (
    <Box mb="xs" style={[$buttonContainer, $border]} overflow="hidden">
      <RectButton
        enabled={!isLoading}
        style={[$button, {backgroundColor: colors.white}]}
        onPress={onPress}>
        <Box flexDirection="row" alignItems="center">
          {isLoading ? (
            <LottieView
              style={$skottie}
              resizeMode="cover"
              source={Loader}
              autoPlay={true}
              loop={true}
            />
          ) : (
            <>
              {type === 'google' ? <Google /> : <Apple />}
              <Text pl="s" style={$label} variant="buttonLabel">
                {title}
              </Text>
            </>
          )}
        </Box>
      </RectButton>
    </Box>
  );
};
