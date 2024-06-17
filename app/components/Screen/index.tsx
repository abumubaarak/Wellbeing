import React, {ReactNode} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Box} from '../Box';
type ScreenProps = {
  children: ReactNode;
};
export const Screen = ({children}: ScreenProps) => {
  const insets = useSafeAreaInsets();
  return (
    <Box
      backgroundColor="primary"
      flex={1}
      style={{paddingTop: insets.top, paddingBottom: insets.bottom}}>
      {children}
    </Box>
  );
};
