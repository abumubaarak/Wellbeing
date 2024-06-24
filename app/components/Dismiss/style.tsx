import {ViewStyle} from 'react-native';
import {colors} from '../../theme/colors';
import {moderateScale, verticalScale} from '../../utils';

export const $container: ViewStyle = {
  marginTop: moderateScale(8),
  marginHorizontal: verticalScale(20),
  backgroundColor: colors.primary400,
  borderRadius: moderateScale(100),
};
export const $button: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: moderateScale(100),
};
export const $widthHeightStyle = (wnh: number) => ({
  width: moderateScale(wnh),
  height: moderateScale(wnh),
});
