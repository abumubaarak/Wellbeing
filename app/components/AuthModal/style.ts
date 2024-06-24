import {ViewStyle} from 'react-native';
import {colors} from '../../theme/colors';
import {horizontalScale} from '../../utils';

export const $container: ViewStyle = {
  borderRadius: 30,
  backgroundColor: colors.primary,
};

export const $indicator: ViewStyle = {
  backgroundColor: colors.primary100,
};
export const $bottomSheetContainer: ViewStyle = {
  flex: 1,
};
export const $border: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.line,
};
export const $buttonGroup: ViewStyle = {
  marginHorizontal: horizontalScale(25),
};
