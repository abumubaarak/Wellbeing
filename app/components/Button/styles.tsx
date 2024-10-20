import {TextStyle, ViewStyle} from 'react-native';
import {colors} from '../../theme';
import {moderateScale, verticalScale} from '../../utils';

export const $buttonContainer: ViewStyle = {
  borderRadius: moderateScale(100),
};
export const $button: ViewStyle = {
  height: verticalScale(55),
  backgroundColor: colors.primary300,
  justifyContent: 'center',
  alignItems: 'center',
};
export const $label: TextStyle = {
  fontSize: moderateScale(16),
  letterSpacing: 1,
};
export const $skottie: TextStyle = {
  height: 60,
  width: 60,
};
