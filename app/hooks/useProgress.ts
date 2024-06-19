import {useCallback} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {isRTL} from '../utils';

export const useProgress = () => {
  const scrollIndex = useSharedValue<number>(25);

  const onSnapToItem = useCallback(
    (index: number) => {
      const rtlIndex =
        index === 1 ? 3 : index === 0 ? 4 : index === 3 ? 1 : index;
      const ii = isRTL ? rtlIndex : index + 1;

      scrollIndex.value = Math.round(ii) * 25;
    },
    [scrollIndex],
  );

  const widthStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${scrollIndex.value}%`),
    };
  });
  return {onSnapToItem, widthStyle};
};
