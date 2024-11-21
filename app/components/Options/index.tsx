import React from 'react';
import {Box, Text} from '..';
import {CheckMark} from '../../assets/svgs';
import {moderateScale} from '../../utils';

type MarkCheck = {
  isActive: boolean;
  label: string;
};
export const Option = ({isActive, label}: MarkCheck) => {
  return (
    <Box
      px="m"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center">
      <Text
        color="black"
        paddingVertical="m"
        variant={isActive ? 'buttonLabel' : 'regular'}
        fontSize={moderateScale(15)}>
        {label}
      </Text>
      {isActive && <CheckMark />}
    </Box>
  );
};
