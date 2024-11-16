import {spacing} from '../../theme/spacing';
import {moderateScale} from '../../utils';

export const $widthHeightStyle = (wnh: number = 40) => ({
  width: moderateScale(wnh),
  height: moderateScale(wnh),
  borderRadius: spacing.borderRadius,
});
