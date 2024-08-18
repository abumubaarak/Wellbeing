import React from 'react';
import {MicCircle} from '../../assets/svgs';
import {Box, Dismiss, Line, PermissionHeader, Screen} from '../../components';

export const Symptoms = () => {
  //const {t} = useTranslation();

  return (
    <Screen>
      <Box paddingHorizontal="l">
        <Dismiss />
      </Box>
      <PermissionHeader i18nKey="symptoms" />
      <Box flex={1} alignItems="center" justifyContent="flex-end">
        <Line />
        <MicCircle width={80} height={80} />
      </Box>
    </Screen>
  );
};
