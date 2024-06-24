import {TextStyle, ViewStyle} from 'react-native';
import {colors} from '../../theme/colors';
import {horizontalScale, moderateScale, verticalScale} from '../../utils';

export const $container: ViewStyle = {
  marginHorizontal: horizontalScale(25),
  paddingTop: verticalScale(10),
};
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
  fontSize: moderateScale(15),
};
export const $labelLogin: TextStyle = {
  marginTop: verticalScale(20),
  textAlign: 'center',
};
