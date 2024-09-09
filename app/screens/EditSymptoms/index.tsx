import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {Dismiss, EditSymptomsContent, Screen} from '../../components';
import {AppStackParamList} from '../../navigators';

export const EditSymptoms = ({}) => {
  const {params} = useRoute<RouteProp<AppStackParamList, 'EditSymptoms'>>();

  return (
    <Screen useAlignment>
      <Dismiss />
      <EditSymptomsContent symptoms={params.symptoms} />
    </Screen>
  );
};
