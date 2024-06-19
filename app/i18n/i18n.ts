import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLanguage} from '../data';
import ar from './ar';
import en from './en';
import es from './es';

i18next.use(initReactI18next).init({
  resources: {
    en: {translation: en},
    ar: {translation: ar},
    es: {translation: es},
  },
  lng: getLanguage(),
  fallbackLng: 'en',

  interpolation: {escapeValue: false},
});
