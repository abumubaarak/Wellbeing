import React from 'react';
import {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {Colors} from '../../theme';
import {AnimatedBox, Box} from '../Box';

type ProgressBarProps = {
  widthSize: number;
  containerHeight: number;
  containerBackgroundColor: keyof Colors;
  backgroundColor: keyof Colors;
};

export const ProgressBar = ({
  widthSize,
  containerBackgroundColor,
  backgroundColor,
  containerHeight,
}: ProgressBarProps) => {
  const widthStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${widthSize}%`),
    };
  });

  return (
    <Box
      backgroundColor={containerBackgroundColor}
      height={containerHeight}
      width={'100%'}
      borderRadius={100}>
      <AnimatedBox
        backgroundColor={backgroundColor}
        borderRadius={100}
        height={'100%'}
        style={widthStyle}
      />
    </Box>
  );
};
