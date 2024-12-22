import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {PermissionStatus, request} from 'react-native-permissions';
import {Button, Dismiss, PermissionContent, Screen} from '../../components';
import {StackNavigation} from '../../navigators';
import {MICROPHONE_PERMISSION} from '../../utils';
//remove in-line style

export const Permission = () => {
  const navigation = useNavigation<StackNavigation>();

  const microphonePermission = () => {
    request(MICROPHONE_PERMISSION).then((result: PermissionStatus) => {
      //handle other case later.Insha Allah
      if (result === 'granted') {
        navigation.goBack();
        navigation.navigate('Symptoms');
      }
    });
  };
  return (
    <Screen useAlignment>
      <Dismiss />
      <PermissionContent />
      <Button onPress={microphonePermission} label="allow" />
    </Screen>
  );
};
