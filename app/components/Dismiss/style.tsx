import {ViewStyle} from 'react-native';
import {colors} from '../../theme/colors';
import {moderateScale} from '../../utils';

export const $container: ViewStyle = {
  marginTop: moderateScale(8),
  backgroundColor: colors.primary300,
  borderRadius: moderateScale(100),
  borderColor: colors.primary600,
};
export const $border: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.greyLight,
  backgroundColor: colors.primary,
};

export const $button: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: moderateScale(100),
};
export const $widthHeightStyle = (wnh: number = 40) => ({
  width: moderateScale(wnh),
  height: moderateScale(wnh),
});
