import {TextStyle, ViewStyle} from 'react-native';
import {colors} from '../../theme';
import {fonts} from '../../theme/typography';

export const $dateNameStyle: TextStyle = {
  color: colors.grey,
  fontFamily: fonts.workSans.medium,
  fontSize: 12,
};
export const $dateNumberStyle: TextStyle = {
  color: colors.black,
  fontFamily: fonts.workSans.medium,
  fontSize: 14,
};

export const $calendarStrip: ViewStyle = {height: 71, marginBottom: 15};
export const $container: ViewStyle = {flex: 1};
