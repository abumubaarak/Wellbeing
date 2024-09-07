//Modified version of react-native-typewriter-effect
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {Vibration} from 'react-native';
import {isAndroid, moderateScale} from '../../utils';
import {AnimatedText} from '../Text';

const DEFAULT_MAX_DELAY = 100;
const DEFAULT_MIN_DELAY = 8;
type TypeWriterProps = {
  content: string;
  previousLength: number;
  vibration?: boolean;
};
export const TypeWriter = memo(
  ({content, vibration, previousLength}: TypeWriterProps) => {
    const [currentCharIndex, setCurrentCharIndex] = useState(previousLength);
    const timeoutId = useRef<any>(null);
    const delta = 1;

    const startTypeWriter = useCallback(
      (ms: number) => {
        timeoutId.current = setTimeout(() => {
          setCurrentCharIndex(currentCharIndex + delta);
          if (vibration && isAndroid) {
            Vibration.vibrate(1);
          }
        }, ms);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [currentCharIndex],
    );
    const clear = () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
    };
    useEffect(() => {
      setCurrentCharIndex(previousLength);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content]);
    useEffect(() => {
      clear();

      startTypeWriter(
        Math.round(
          Math.random() * (DEFAULT_MAX_DELAY - DEFAULT_MIN_DELAY) +
            DEFAULT_MIN_DELAY,
        ),
      );
    }, [startTypeWriter, content]);
    return (
      <AnimatedText
        variant="regular"
        color="black"
        textAlign="center"
        lineHeight={28}
        fontSize={moderateScale(19)}>
        {content.substring(0, currentCharIndex + 1)}
      </AnimatedText>
    );
  },
);
