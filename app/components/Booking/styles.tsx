import {ViewStyle} from 'react-native';
import {ImageStyle} from 'react-native-fast-image';
import {colors} from '../../theme';
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
export const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.primary,
};
export const $bottomView: ViewStyle = {
  flex: 1,
  paddingTop: 20,
};
