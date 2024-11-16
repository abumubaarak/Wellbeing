import React, {memo, useEffect, useState} from 'react';
import {Text} from '../Text';
import {$labelShadow} from './styles';

type TimerProps = {
  callStatus: string;
};
export const Timer = memo(({callStatus}: TimerProps) => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (callStatus !== 'connected') {return;}

    const startTime = Date.now();

    const timerInterval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      setTimeElapsed(elapsed);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [callStatus]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };
  return (
    <Text color="white" style={$labelShadow}>
      {callStatus === 'connected' ? formatTime(timeElapsed) : callStatus}
    </Text>
  );
});
