import {useCallback, useState} from 'react';
import {isRTL} from '../utils';

export const useProgress = () => {
  const [scrollIndex, setScrollIndex] = useState<number>(25);

  const onSnapToItem = useCallback((index: number) => {
    const rtlIndex =
      index === 1 ? 3 : index === 0 ? 4 : index === 3 ? 1 : index;
    const ii = isRTL ? rtlIndex : index + 1;

    setScrollIndex(Math.round(ii) * 25);
  }, []);

  return {scrollIndex, onSnapToItem};
};
