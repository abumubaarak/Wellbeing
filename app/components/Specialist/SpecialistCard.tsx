import React, {ReactNode} from 'react';
import {moderateScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';

type ISpecialistCard = {
  icon: ReactNode;
  title: string;
  wnh: number;
  index?: number;
};
export const SpecialistCard = ({icon, title, wnh, index}: ISpecialistCard) => {
  return (
    <Box alignItems="center">
      <Box
        backgroundColor={index !== 11 ? 'primaryLight' : 'primary'}
        width={moderateScale(wnh)}
        justifyContent="center"
        alignItems="center"
        height={moderateScale(wnh)}
        borderRadius={moderateScale(100)}>
        {icon}
      </Box>
      <Text pt="n" fontSize={moderateScale(13)}>
        {title}
      </Text>
    </Box>
  );
};
