import React from 'react';
import {DimensionValue} from 'react-native';
import {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {Colors} from '../../theme';
import {AnimatedBox, Box} from '../Box';

type ProgressBarProps = {
  widthSize: number;
  containerWidth?: DimensionValue;
  containerHeight: number;
  containerBackgroundColor: keyof Colors;
  backgroundColor: keyof Colors;
};

export const ProgressBar = ({
  widthSize,
  containerBackgroundColor,
  backgroundColor,
  containerWidth = '100%',
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
      width={containerWidth}
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
