import {t} from 'i18next';
import React from 'react';
import {MicCircle} from '../../assets/svgs';
import {Box} from '../Box';
import {Text} from '../Text';
import {PermissionHeader} from './PermissionHeader';
import {$container, $summary} from './style';

export const PermissionContent = () => {
  return (
    <Box flex={1} alignItems="center" style={$container}>
      <MicCircle />
      <PermissionHeader i18nKey="enableMic" />
      <Text variant="regular" textAlign="center" style={$summary}>
        {t('enableMicSummary')}
      </Text>
    </Box>
  );
};
