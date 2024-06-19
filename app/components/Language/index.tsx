import React from 'react';
import {useTranslation} from 'react-i18next';
import {I18nManager} from 'react-native';
import {useMMKVListener, useMMKVString} from 'react-native-mmkv';
import {LinearTransition} from 'react-native-reanimated';
import RNRestart from 'react-native-restart';
import {storage} from '../../data';
import {AnimatedBox} from '../Box';
import {LanguageItem} from './LanguageItem';
import {$selectionContainer} from './style';

export const Language = () => {
  const [language] = useMMKVString('language');
  const {i18n} = useTranslation();

  useMMKVListener(key => {
    const newValue = storage.getString(key);
    if (language === newValue) {
      return;
    }
    i18n.changeLanguage(newValue);
    if (newValue === 'ar' || language === 'ar') {
      I18nManager.forceRTL(newValue === 'ar');
      I18nManager.allowRTL(newValue === 'ar');
      RNRestart.restart();
    }
  });

  return (
    <AnimatedBox style={$selectionContainer} layout={LinearTransition}>
      <LanguageItem lngCode="en" lngTitle="English" lngSummary="English" />
      <LanguageItem lngCode="ar" lngTitle="Arabic" lngSummary="العربية" />
      <LanguageItem lngCode="es" lngTitle="Spanish" lngSummary="Español" />
    </AnimatedBox>
  );
};
