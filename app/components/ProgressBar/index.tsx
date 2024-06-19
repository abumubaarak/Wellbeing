import React from 'react';
import {ViewStyle} from 'react-native';
import {AnimatedBox, Box} from '../Box';

type ProgressBarProps = {
  widthStyle: ViewStyle;
};
export const ProgressBar = ({widthStyle}: ProgressBarProps) => {
  return (
    <Box backgroundColor="primary200" height={5} borderRadius={100}>
      <AnimatedBox
        backgroundColor="primary500"
        borderRadius={100}
        height={'100%'}
        style={widthStyle}
      />
    </Box>
  );
};
