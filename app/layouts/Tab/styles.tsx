import {StatusBar, ViewStyle} from 'react-native';

export const $container: ViewStyle = {
  paddingTop: StatusBar.currentHeight,
};
export const $line: ViewStyle = {
  marginTop: -2.51,
  overflow: 'hidden',
};
export const $pressable: ViewStyle = {
  zIndex: 10,
};
