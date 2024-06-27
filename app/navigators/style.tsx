import {TextStyle, ViewStyle} from 'react-native';
import {colors} from '../theme/colors';
import {fonts} from '../theme/typography';
import {isAndroid} from '../utils';

export const $tabLabel: TextStyle = {
  fontFamily: fonts.workSans.medium,
};

export const $tabBar: ViewStyle = {
  backgroundColor: colors.primary,
  elevation: 3,
  height: isAndroid ? 57 : 79,
  paddingBottom: isAndroid ? 7 : 30,
  paddingTop: isAndroid ? 4 : 0,
};
