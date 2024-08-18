import React from 'react';
import {Box} from '../Box';
import {$box} from './style';

export const Line = () => {
  return (
    <Box style={$box} height={4} width={'100%'} backgroundColor="primary300" />
  );
};
