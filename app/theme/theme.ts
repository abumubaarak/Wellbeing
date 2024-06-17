import {createTheme} from '@shopify/restyle';
import {buttonVariants} from './buttonVariants.ts';
import {colors} from './colors.ts';
import {spacing} from './spacing.ts';
import {textVariants} from './textVariants.ts';

const theme = createTheme({
  colors,
  spacing,
  textVariants,
  buttonVariants,
});

export type Theme = typeof theme;

export {theme};
