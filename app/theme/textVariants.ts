import {isRTL, moderateScale} from '../utils';

export const textVariants = {
  header: {
    fontFamily: 'MontserratAlternates-SemiBold',
  },
  regular: {
    fontFamily: 'WorkSans-Regular',
    color: 'grey',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(22),
  },
  regularBold: {
    fontFamily: 'WorkSans-SemiBold',
  },
  buttonLabel: {
    fontFamily: 'WorkSans-SemiBold',
  },
  mSemiBold: {
    fontFamily: 'MontserratAlternates-SemiBold',
  },
  mBold: {
    fontFamily: 'MontserratAlternates-Bold',
  },

  defaults: {
    writingDirection: isRTL ? 'rtl' : 'ltr',
    color: 'black',
    fontFamily: 'WorkSans-Regular',
    fontSize: moderateScale(14),
  },
};
