import {isRTL, moderateScale} from '../utils';

export const textVariants = {
  header: {
    fontFamily: 'MontserratAlternates-SemiBold',
  },
  regular: {
    fontFamily: 'WorkSans-Regular',
    color: 'grey',
    fontSize: moderateScale(15),
  },
  regularBold: {
    fontFamily: 'WorkSans-SemiBold',
  },
  buttonLabel: {
    fontFamily: 'WorkSans-SemiBold',
  },
  special: {
    fontFamily: 'MontserratAlternates-SemiBold',
  },

  defaults: {
    writingDirection: isRTL ? 'rtl' : 'ltr',
    color: 'black',
    fontFamily: 'WorkSans-Regular',
  },
};
