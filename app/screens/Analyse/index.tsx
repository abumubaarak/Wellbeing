import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {Dismiss, PermissionHeader, Screen, Text} from '../../components';
import {AppStackParamList} from '../../navigators';

export const Analyse = () => {
  const {params} = useRoute<RouteProp<AppStackParamList, 'Analyse'>>();

  return (
    <Screen useAlignment>
      <Dismiss />
      <PermissionHeader i18nKey="analysing" />

      <Text>{params.symptoms}</Text>
    </Screen>
  );
};
