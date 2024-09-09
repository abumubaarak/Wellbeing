import {TextStyle, ViewStyle} from 'react-native';
import {colors} from '../../theme/colors';
import {isAndroid, moderateScale, verticalScale} from '../../utils';

export const $container: ViewStyle = {
  flex: 1,
  marginTop: 10,
};
export const $textInput: TextStyle = {
  fontFamily: 'WorkSans-Regular',
  lineHeight: moderateScale(32),
  color: colors.black,
  fontSize: moderateScale(19),
};
export const $footer: ViewStyle = {
  paddingTop: verticalScale(10),
  marginBottom: isAndroid ? 10 : 0,
};
