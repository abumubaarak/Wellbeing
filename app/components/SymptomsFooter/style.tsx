import {ViewStyle} from 'react-native';
import {moderateScale, verticalScale} from '../../utils';

export const $container: ViewStyle = {
  position: 'absolute',
  top: verticalScale(96),
};
export const $skottie: ViewStyle = {
  height: 50,
  width: '100%',
  marginBottom: 80,
};
export const $circle: ViewStyle = {
  position: 'absolute',
};
export const $circleButtonContainer: ViewStyle = {
  gap: moderateScale(25),
  marginBottom: moderateScale(5),
};
