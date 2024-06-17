import React, {ReactNode} from 'react';
import {Box} from '../Box';
import {$container} from './style';

type IconProp = {
  children: ReactNode;
};
export const Icon = ({children}: IconProp) => {
  return (
    <Box alignItems="flex-end" style={$container}>
      {children}
    </Box>
  );
};
