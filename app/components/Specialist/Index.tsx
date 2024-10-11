import React from 'react';
import {moderateScale, SPECIALISTS} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';

export const SpecialistCategory = () => {
  return (
    <Box mt="ml">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Text variant="medium" fontSize={moderateScale(13)}>
          Find your doctor
        </Text>
        <Text variant="regular" color="black">
          See All
        </Text>
      </Box>
      <Box pt="l" flexDirection="row" justifyContent="space-between">
        {SPECIALISTS.map(({icon, name}) => (
          <Box alignItems="center">
            <Box
              backgroundColor="primaryLight"
              width={moderateScale(55)}
              justifyContent="center"
              alignItems="center"
              height={moderateScale(55)}
              borderRadius={moderateScale(100)}>
              {icon}
            </Box>
            <Text pt="n" fontSize={moderateScale(13)}>
              {name}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
