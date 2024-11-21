import React, {ReactNode} from 'react';
import {Clipboard} from '../../assets/svgs';
import {moderateScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';

type NoAppointmentProps = {
  title?: string;
  icon?: ReactNode;
};
export const NoAppointment = ({
  title = 'You don’t have any appointments scheduled for this day.',
  icon,
}: NoAppointmentProps) => {
  return (
    <Box gap="s" flex={1} justifyContent="center" alignItems="center">
      {icon ? icon : <Clipboard width={50} height={50} />}
      <Text
        paddingHorizontal="l"
        fontSize={moderateScale(14)}
        color="grey"
        lineHeight={moderateScale(25)}
        textAlign="center">
        {title}
      </Text>
    </Box>
  );
};
