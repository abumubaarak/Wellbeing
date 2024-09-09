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
export const AUDIO_CONFIG = {
  sampleRate: 16000, // default is 44100 but 32000 is adequate for accurate voice recognition
  channels: 1, // 1 or 2, default 1
  bitsPerSample: 16, // 8 or 16, default 16
  audioSource: 6, // android only (see below)
  bufferSize: 4096, // default is 2048
};
