import {ViewStyle} from 'react-native';
import {ImageStyle} from 'react-native-fast-image';
import {spacing} from '../../theme/spacing';

export const $fastImage: ImageStyle = {
  width: 40,
  height: 40,
  borderRadius: spacing.borderRadius,
};

export const $item: ViewStyle = {
  flex: 1,
  marginTop: spacing.xs,
  marginLeft: spacing.n,
};
