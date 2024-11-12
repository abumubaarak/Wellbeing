import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {AnimatedStyle} from 'react-native-reanimated';
import {Verified} from '../../assets/svgs';
import {moderateScale} from '../../utils';
import {AnimatedBox, Box} from '../Box';
import {Text} from '../Text';
import {$labelShadow} from './styles';

type CallerInfoProps = {
  doctorName: string;
  specialty: string;
  headerScreenStyle: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
};

export const CallerInfo = ({
  doctorName,
  specialty,
  headerScreenStyle,
}: CallerInfoProps) => {
  return (
    <AnimatedBox style={headerScreenStyle} alignItems="center">
      <Box gap="s" pt="m" flexDirection="row" alignItems="center">
        <Text
          style={$labelShadow}
          color="white"
          variant="mBold"
          numberOfLines={1}
          adjustsFontSizeToFit
          fontSize={moderateScale(16)}>
          {doctorName}
        </Text>
        <Verified />
      </Box>
      <Text
        style={$labelShadow}
        variant="mRegular"
        color="white"
        pt="m"
        fontSize={moderateScale(15)}>
        {specialty}
      </Text>
    </AnimatedBox>
  );
};
