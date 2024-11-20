//Modified version of react-native-typewriter-effect
import LottieView from 'lottie-react-native';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {Loader} from '../../assets/lottie';
import {moderateScale} from '../../utils';
import {Box} from '../Box';
import {AnimatedText} from '../Text';
import {$lottie} from './style';

// const DEFAULT_MAX_DELAY = 100;
// const DEFAULT_MIN_DELAY = 8;
type TypeWriterProps = {
  content: string;
  previousLength: number;
  addEffect: boolean;
  loading: boolean;
};
export const TypeWriter = memo(
  ({content, previousLength, addEffect, loading}: TypeWriterProps) => {
    const [currentCharIndex, setCurrentCharIndex] = useState(previousLength);
    const timeoutId = useRef<any>(null);
    const delta = 1;

    const startTypeWriter = useCallback(
      (ms: number) => {
        timeoutId.current = setTimeout(() => {
          setCurrentCharIndex(currentCharIndex + delta);
        }, ms);
      },
      [currentCharIndex],
    );
    const clear = () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
    };
    useEffect(() => {
      if (addEffect) {
        setCurrentCharIndex(previousLength);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content]);
    useEffect(() => {
      clear();

      // startTypeWriter(
      //   Math.round(
      //     Math.random() * (DEFAULT_MAX_DELAY - DEFAULT_MIN_DELAY) +
      //       DEFAULT_MIN_DELAY,
      //   ),
      // );
      startTypeWriter(100);
    }, [startTypeWriter, content]);
    return (
      <Box flexDirection="row" alignItems="center" flexWrap="wrap">
        <AnimatedText
          variant="regular"
          color="black"
          lineHeight={28}
          fontSize={moderateScale(17)}>
          {content}
          {/* {content.substring(0, currentCharIndex + 1)} */}
        </AnimatedText>
        {loading && (
          <LottieView
            style={$lottie}
            resizeMode="cover"
            source={Loader}
            autoPlay={true}
            loop={true}
          />
        )}
      </Box>
    );
  },
);
