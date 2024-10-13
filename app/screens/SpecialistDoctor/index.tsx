import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Dismiss, DoctorList, Screen} from '../../components';
import {useFirestore} from '../../hooks';
import {AppStackParamList} from '../../navigators';

export const SpecialistDoctor = () => {
  const {params} = useRoute<RouteProp<AppStackParamList, 'SpecialistDoctor'>>();
  const {isLoading, specialistDoctors, data} = useFirestore();

  useEffect(() => {
    (async () => {
      await specialistDoctors(params.area);
    })();
  }, [specialistDoctors, params.area]);
  return (
    <Screen useAlignment>
      <Dismiss title={params.area} />
      <DoctorList data={data} isLoading={isLoading} />
    </Screen>
  );
};
