import {TextStyle, ViewStyle} from 'react-native';
import {colors} from '../../theme/colors';
import {horizontalScale, verticalScale} from '../../utils';

export const $container: ViewStyle = {
  marginHorizontal: horizontalScale(25),
  marginBottom: verticalScale(10),
};

export const $button: ViewStyle = {
  height: verticalScale(55),
  backgroundColor: colors.primary300,
  justifyContent: 'center',
  alignItems: 'center',
};

export const $labelLogin: TextStyle = {
  marginTop: verticalScale(20),
  textAlign: 'center',
};
