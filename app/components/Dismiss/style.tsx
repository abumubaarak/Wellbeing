import {ViewStyle} from 'react-native';
import {colors} from '../../theme/colors';
import {moderateScale, verticalScale} from '../../utils';

export const $container: ViewStyle = {
  width: moderateScale(40),
  height: moderateScale(40),
  marginTop: moderateScale(8),
  marginHorizontal: verticalScale(20),
  backgroundColor: colors.primary400,
  borderRadius: moderateScale(100),
};
export const $button: ViewStyle = {
  height: moderateScale(40),
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: moderateScale(100),
  width: moderateScale(40),
};
