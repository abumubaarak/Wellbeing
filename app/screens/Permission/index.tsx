import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {RectButton} from 'react-native-gesture-handler';
import {PermissionStatus, request} from 'react-native-permissions';
import {Box, Dismiss, PermissionContent, Screen, Text} from '../../components';
import {
  $button,
  $buttonContainer,
  $label,
} from '../../components/OnboardingFooter/style';
import {Translations} from '../../i18n';
import {StackNavigation} from '../../navigators';
import {MICROPHONE_PERMISSION} from '../../utils';
//remove in-line style

export const Permission = () => {
  const {t} = useTranslation<keyof Translations>();
  const navigation = useNavigation<StackNavigation>();

  const microphonePermission = () => {
    request(MICROPHONE_PERMISSION).then((result: PermissionStatus) => {
      //handle other case later.Insha Allah
      if (result === 'granted') {
        navigation.navigate('Symptoms');
      }
    });
  };
  return (
    <Screen useAlignment>
      <Dismiss />
      <PermissionContent />
      <Box style={[$buttonContainer]} overflow="hidden">
        <RectButton style={$button} onPress={microphonePermission}>
          <Text style={$label} variant="buttonLabel">
            {t('allow')}
          </Text>
        </RectButton>
      </Box>
    </Screen>
  );
};
