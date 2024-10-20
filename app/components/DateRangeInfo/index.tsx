import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../theme';
import {availabilityInfo, moderateScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';
import {$container} from './styles';

type DateRangeInfoProps = {
  dateRange: string;
  doctorsName: string;
};
export const DateRangeInfo = ({dateRange, doctorsName}: DateRangeInfoProps) => {
  return (
    <LinearGradient
      style={$container}
      useAngle={true}
      angle={-190}
      angleCenter={{x: 1, y: 0.66}}
      colors={[colors.primary300, colors.primary]}>
      <Box borderRadius={10} paddingHorizontal="n" paddingVertical="m">
        <Box paddingHorizontal="n">
          <Text variant="buttonLabel" color="black">
            🗓️ {dateRange.includes('/') ? 'Custom Availability' : dateRange}
          </Text>
          <Text
            pt="s"
            textAlign="left"
            color="black"
            variant="regular"
            fontSize={moderateScale(14)}>
            {availabilityInfo(dateRange, doctorsName)}
          </Text>
        </Box>
      </Box>
    </LinearGradient>
  );
};
