import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Empty} from '../../assets/svgs';
import {Dismiss, DoctorList, NoAppointment, Screen} from '../../components';
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
    <Screen useAlignment isLoading={isLoading}>
      <Dismiss title={params.area} />
      {data.length !== 0 ? (
        <DoctorList data={data} isLoading={isLoading} />
      ) : (
        <NoAppointment
          icon={<Empty />}
          title="We're sorry, no specialties are available at the moment."
        />
      )}
    </Screen>
  );
};
