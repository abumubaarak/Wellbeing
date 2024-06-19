import React, {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Box} from '../Box';
import {$container} from './style';
type ScreenProps = {
  children: ReactNode;
  useAlignment?: boolean;
  styles?: StyleProp<ViewStyle>;
};
export const Screen = ({children, styles, useAlignment}: ScreenProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Box
      backgroundColor="primary"
      flex={1}
      style={[
        styles,
        useAlignment && $container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      {children}
    </Box>
  );
};
