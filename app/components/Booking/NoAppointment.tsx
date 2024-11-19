import React from 'react';
import {Clipboard} from '../../assets/svgs';
import {moderateScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';

export const NoAppointment = () => {
  return (
    <Box mb="ll" gap="s" flex={1} justifyContent="center" alignItems="center">
      <Clipboard />
      <Text
        paddingHorizontal="l"
        fontSize={moderateScale(14)}
        color="grey"
        lineHeight={moderateScale(25)}
        textAlign="center">
        You don’t have any appointments scheduled for this day.
      </Text>
    </Box>
  );
};
