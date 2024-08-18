import {t} from 'i18next';
import React from 'react';
import {MicCircle} from '../../assets/svgs';
import {moderateScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';
import {$container, $header, $summary} from './style';

export const PermissionContent = () => {
  return (
    <Box flex={1} alignItems="center" style={$container}>
      <MicCircle />
      <Text variant="header" fontSize={moderateScale(25)} style={$header}>
        {t('enableMic')}
      </Text>
      <Text variant="regular" textAlign="center" style={$summary}>
        {t('enableMicSummary')}
      </Text>
    </Box>
  );
};
