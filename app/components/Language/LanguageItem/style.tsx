import {ViewStyle} from 'react-native';
import {
  horizontalScale,
  isAndroid,
  moderateScale,
  verticalScale,
} from '../../../utils';

export const $container: ViewStyle = {
  paddingVertical: verticalScale(15),
  overflow: 'hidden',
  borderRadius: moderateScale(100),
};
export const $line: ViewStyle = {
  marginLeft: isAndroid ? 0 : horizontalScale(65),
};
