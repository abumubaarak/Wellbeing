import React from 'react';
import {useTranslation} from 'react-i18next';
import {moderateScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';
import {$lower} from './style';

type HeaderProps = {
  titleKey: string;
  summaryKey: string;
  useDefault?: boolean;
};
export const Header = ({
  summaryKey,
  titleKey,
  useDefault = true,
}: HeaderProps) => {
  const {t} = useTranslation();

  return (
    <Box style={useDefault && $lower}>
      <Text lineHeight={42} variant="header" fontSize={moderateScale(32)}>
        {t(summaryKey)}
      </Text>
      <Text variant="regular" paddingTop="s">
        {t(titleKey)}
      </Text>
    </Box>
  );
};
