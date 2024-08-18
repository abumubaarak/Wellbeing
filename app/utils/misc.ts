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
