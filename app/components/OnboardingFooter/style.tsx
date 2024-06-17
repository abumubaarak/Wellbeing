import {TextStyle, ViewStyle} from 'react-native';
import {horizontalScale, moderateScale, verticalScale} from '../../utils';

export const $container: ViewStyle = {
  marginHorizontal: horizontalScale(25),
  paddingTop: verticalScale(10),
};
export const $getStartedContainer: ViewStyle = {
  borderRadius: moderateScale(100),
};
export const $button: ViewStyle = {
  height: verticalScale(55),
};
export const $label: TextStyle = {
  fontSize: moderateScale(16),
};
export const $labelLogin: TextStyle = {
  marginTop: verticalScale(20),
  textAlign: 'center',
};
