/* eslint-disable curly */
import {I18nManager, Platform} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';

export const isAndroid = Platform.OS === 'android' ? true : false;
export const MICROPHONE_PERMISSION = isAndroid
  ? PERMISSIONS.ANDROID.RECORD_AUDIO
  : PERMISSIONS.IOS.MICROPHONE;
export const isRTL = I18nManager.isRTL ? true : false;
export const UUID = () => {
  return Math.floor(Math.random() * Date.now());
};

export const doctorReview = (review: number) => {
  if (review === 0 || !review) return '0 Review';
  if (review > 1) return `${review} Reviews`;
};
