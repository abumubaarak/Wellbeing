import React, {ReactNode} from 'react';
import {moderateScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';

type DoctorInfoCardProps = {
  icon: ReactNode;
  title: string;
  summary: string;
};
export const DoctorInfoCard = ({icon, summary, title}: DoctorInfoCardProps) => {
  return (
    <Box alignItems="center">
      <Box
        backgroundColor="primaryLight"
        height={50}
        justifyContent="center"
        alignItems="center"
        width={50}
        borderRadius={moderateScale(100)}>
        {icon}
      </Box>
      <Text paddingVertical="s" variant="buttonLabel">
        {title}
      </Text>
      <Text variant="regular" lineHeight={moderateScale(16)} fontSize={13}>
        {summary}
      </Text>
    </Box>
  );
};
