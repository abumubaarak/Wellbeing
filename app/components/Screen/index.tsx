import React, {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isAndroid} from '../../utils';
import {Box} from '../Box';
import {$container} from './style';
type ScreenProps = {
  children: ReactNode;
  useAlignment?: boolean;
  styles?: StyleProp<ViewStyle>;
  useBottomPadding?: boolean;
};
export const Screen = ({
  children,
  styles,
  useAlignment,
  useBottomPadding = true,
}: ScreenProps) => {
  const insets = useSafeAreaInsets();
  const PADDING_TOP = isAndroid ? 16 : insets.top;
  const PADDING_BOTTOM = isAndroid ? 16 : insets.bottom;
  const DEFAULT_PADDING_BOTTOM = 0;
  return (
    <Box
      backgroundColor="primary"
      flex={1}
      style={[
        styles,
        useAlignment && $container,
        {
          paddingTop: PADDING_TOP,
          paddingBottom: useBottomPadding
            ? PADDING_BOTTOM
            : DEFAULT_PADDING_BOTTOM,
        },
      ]}>
      {children}
    </Box>
  );
};
