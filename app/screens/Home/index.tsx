import React from 'react';

import {Brain} from '../../assets/svgs';
import {Box, Screen} from '../../components';
import {moderateScale} from '../../utils';

export const Home = () => {
  return (
    <Screen useAlignment>
      <Box alignItems="flex-end">
        <Box
          alignItems="center"
          backgroundColor="primary400"
          justifyContent="center"
          borderRadius={moderateScale(100)}
          width={moderateScale(40)}
          height={moderateScale(40)}>
          <Brain width={25} height={25} />
        </Box>
      </Box>
    </Screen>
  );
};
