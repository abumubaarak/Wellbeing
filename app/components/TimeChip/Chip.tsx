import React from 'react';
import {Box, Text} from '..';
import {moderateScale, startEndTime} from '../../utils';

type ChipProps = {
  item: any;
  active: boolean;
};
export const Chip = ({item, active}: ChipProps) => {
  return (
    <Box
      backgroundColor={active ? 'primary300' : 'primary'}
      height={45}
      paddingHorizontal="n"
      justifyContent="center"
      borderWidth={1}
      borderRadius={100}
      borderColor="border">
      <Text
        variant={active ? 'mSemiBold' : 'medium'}
        color="black"
        fontSize={moderateScale(14)}>
        {startEndTime(item?.startTime, item.endTime)}
      </Text>
    </Box>
  );
};
