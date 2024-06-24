import React from 'react';
import {useTranslation} from 'react-i18next';
import {moderateScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';
import {$lower} from './style';

type HeaderProps = {
  titleKey: string;
  summaryKey: string;
};
export const Header = ({summaryKey, titleKey}: HeaderProps) => {
  const {t} = useTranslation();

  return (
    <Box style={$lower}>
      <Text variant="header" fontSize={moderateScale(32)}>
        {t(summaryKey)}
      </Text>
      <Text variant="regular" paddingTop="s">
        {t(titleKey)}
      </Text>
    </Box>
  );
};
