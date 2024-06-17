import React from 'react';
import {ViewStyle} from 'react-native';
import {Translate} from '../../assets';
import {Box} from '../Box';
import {Icon} from '../Icon';
import {ProgressBar} from '../ProgressBar';
import {$container} from './style';

type OnboardingHeader = {
  widthStyle: ViewStyle;
};

export const OnboardingHeader = ({widthStyle}: OnboardingHeader) => {
  return (
    <Box flexGrow={0.03} style={$container}>
      <ProgressBar widthStyle={widthStyle} />
      <Icon>
        <Translate />
      </Icon>
    </Box>
  );
};
