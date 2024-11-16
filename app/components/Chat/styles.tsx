import {TextStyle} from 'react-native';
import {colors} from '../../theme';
import {fonts} from '../../theme/typography';
import {isAndroid, moderateScale} from '../../utils';

export const $input: TextStyle = {
  paddingVertical: isAndroid ? 13 : 16,
  paddingHorizontal: 13,
  borderRadius: 20,
  fontSize: moderateScale(14),
  backgroundColor: colors.chatInput,
  fontFamily: fonts.workSans.regular,
  maxHeight: 100,
};
