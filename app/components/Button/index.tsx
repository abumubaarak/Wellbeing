import React from 'react';
import {useTranslation} from 'react-i18next';
import {RectButton} from 'react-native-gesture-handler';
import {Translations} from '../../i18n';
import {Box} from '../Box';
import {Text} from '../Text';
import {$button, $buttonContainer, $label} from './styles';

type ButtonProps = {
  onPress: () => void;
  label: keyof Translations;
};

export const Button = ({onPress, label}: ButtonProps) => {
  const {t} = useTranslation<keyof Translations>();

  return (
    <Box style={$buttonContainer} overflow="hidden">
      <RectButton style={$button} onPress={onPress}>
        <Text style={$label} variant="buttonLabel">
          {t(label)}
        </Text>
      </RectButton>
    </Box>
  );
};
