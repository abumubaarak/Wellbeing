import {TextStyle, ViewStyle} from 'react-native';

export const $localStreamContainer: ViewStyle = {
  flex: 1,
};

export const $labelShadow: TextStyle = {
  textShadowColor: 'rgba(0, 0, 0, 0.5)',
  textShadowOffset: {width: 1, height: 1},
  textShadowRadius: 5,
};
export const $toggleContainer: TextStyle = {
  // backgroundColor: colors.darkLight,
  backgroundColor: 'transparent',

  position: 'absolute',
  width: '100%',
  zIndex: 10,
  height: '100%',
};
export const $remoteStream: TextStyle = {
  position: 'absolute',
  height: 220,
  bottom: 10,
  borderRadius: 10,
  right: 10,
  width: 140,
};
