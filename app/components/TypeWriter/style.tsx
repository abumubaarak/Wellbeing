import {TextStyle} from 'react-native';
import {colors} from '../../theme/colors';
import {moderateScale} from '../../utils';

export const $content: TextStyle = {
  color: colors.black,
  lineHeight: 28,
  fontSize: moderateScale(17),
  fontFamily: 'WorkSans-Regular',
};
export const $lottie: TextStyle = {
  width: 40,
  height: 40,
  marginLeft: -10,
};
