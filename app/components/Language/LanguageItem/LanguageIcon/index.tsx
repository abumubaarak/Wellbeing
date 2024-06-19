import React from 'react';
import {Arabic, English, Spanish} from '../../../../assets/svgs';
import {LNGCODE} from '../../../../i18n';

type LanguageIconProps = {
  lngCode: LNGCODE;
};
export const LanguageIcon = ({lngCode}: LanguageIconProps) => {
  if (lngCode === 'en') {
    return <English />;
  }
  if (lngCode === 'ar') {
    return <Arabic />;
  }
  if (lngCode === 'es') {
    return <Spanish />;
  }
};
