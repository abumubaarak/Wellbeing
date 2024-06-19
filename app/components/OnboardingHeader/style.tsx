import {ViewStyle} from 'react-native';
import {horizontalScale} from '../../utils';

export const $container: ViewStyle = {
  paddingHorizontal: horizontalScale(25),
};
export const $icon: ViewStyle = {
  alignItems: 'flex-end',
  paddingTop: horizontalScale(19),
  paddingBottom: horizontalScale(10),
};
