import React, {useEffect} from 'react';
import {useFirestore} from '../../hooks';
import {moderateScale} from '../../utils';
import {Box} from '../Box';
import {DoctorList} from '../DoctorList';
import {Text} from '../Text';

export const Recommended = () => {
  const {isLoading, recommendedDoctors, data} = useFirestore();

  useEffect(() => {
    (async () => {
      await recommendedDoctors();
    })();
  }, [recommendedDoctors]);
  return (
    <Box mt="ll" mb="n">
      <Text variant="medium" fontSize={moderateScale(13)}>
        Recommended
      </Text>

      <DoctorList data={data} isLoading={isLoading} />
    </Box>
  );
};
