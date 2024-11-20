import React from 'react';
import {useTranslation} from 'react-i18next';
import {Translations} from '../../i18n';
import {moderateScale} from '../../utils';
import {Text} from '../Text';
import {$header} from './style';

type PermissionHeaderProps = {
  i18nKey: keyof Translations;
};
export const PermissionHeader = ({i18nKey}: PermissionHeaderProps) => {
  const {t} = useTranslation<keyof Translations>();

  return (
    <Text variant="header" lineHeight={32} fontSize={moderateScale(25)} style={$header}>
      {t(i18nKey)}
    </Text>
  );
};
