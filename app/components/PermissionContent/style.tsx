import {TextStyle, ViewStyle} from 'react-native';
import {verticalScale} from '../../utils';

export const $header: TextStyle = {
  marginTop: verticalScale(35),
  textAlign: 'center',
};
export const $summary: ViewStyle = {
  marginTop: verticalScale(9),
  flexWrap: 'wrap',
};
export const $container: ViewStyle = {
  marginTop: verticalScale(70),
};
