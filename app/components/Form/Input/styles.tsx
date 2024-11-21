import {TextStyle} from 'react-native';
import {colors} from '../../../theme';
import {spacing} from '../../../theme/spacing';
import {fonts} from '../../../theme/typography';

export const $textInput: TextStyle = {
  marginTop: 10,
  borderRadius: spacing.borderRadius,
  height: 50,
  borderWidth: 1,
  borderColor: colors.inputStroke,
  padding: 10,
  paddingLeft: 15,
  fontFamily: fonts.workSans.regular,
};
export const $textArea: TextStyle = {
  height: 200,
  textAlignVertical: 'top',
};
