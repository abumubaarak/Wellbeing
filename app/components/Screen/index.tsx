import React, {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isAndroid} from '../../utils';
import {Box} from '../Box';
import {CircularLoader} from '../Loader';
import {$container} from './style';
type ScreenProps = {
  children: ReactNode;
  useAlignment?: boolean;
  isLoading?: boolean;
  styles?: StyleProp<ViewStyle>;
  useBottomPadding?: boolean;
  useTopPadding?: boolean;
};
export const Screen = ({
  children,
  styles,
  isLoading = false,
  useAlignment,
  useBottomPadding = true,
  useTopPadding = true,
}: ScreenProps) => {
  const insets = useSafeAreaInsets();
  const PADDING_TOP = isAndroid ? 0 : insets.top;
  const PADDING_BOTTOM = isAndroid ? 10 : insets.bottom;
  const DEFAULT_PADDING_BOTTOM = 0;
  return (
    <Box
      backgroundColor="primary"
      flex={1}
      style={[
        styles,
        useAlignment && $container,
        {
          paddingTop: useTopPadding ? PADDING_TOP : DEFAULT_PADDING_BOTTOM,
          paddingBottom: useBottomPadding
            ? PADDING_BOTTOM
            : DEFAULT_PADDING_BOTTOM,
        },
      ]}>
      {isLoading ? (
        <Box flex={1} alignItems="center" justifyContent="center">
          <CircularLoader isLoading={isLoading} />
        </Box>
      ) : (
        children
      )}
    </Box>
  );
};
