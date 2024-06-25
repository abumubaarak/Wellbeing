import React from 'react';
import {useTranslation} from 'react-i18next';
import {RectButton} from 'react-native-gesture-handler';
import {Apple, Google} from '../../../assets/svgs';
import {colors} from '../../../theme/colors';
import {Box} from '../../Box';
import {$button, $buttonContainer, $label} from '../../OnboardingFooter/style';
import {Text} from '../../Text';
import {$border} from '../style';

type SocialButton = {
  type: 'google' | 'apple';
  onPress?: () => void;
};
export const SocialButton = ({type, onPress}: SocialButton) => {
  const {t} = useTranslation();
  const title = type === 'google' ? t('withGoogle') : t('withApple');
  return (
    <Box mb="xs" style={[$buttonContainer, $border]} overflow="hidden">
      <RectButton
        style={[$button, {backgroundColor: colors.white}]}
        onPress={onPress}>
        <Box flexDirection="row" alignItems="center">
          {type === 'google' ? <Google /> : <Apple />}
          <Text pl="s" style={$label} variant="buttonLabel">
            {title}
          </Text>
        </Box>
      </RectButton>
    </Box>
  );
};
