import React from 'react';
import {useUser} from '../../hooks';
import {moderateScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';

export const Greetings = () => {
  const {fullName} = useUser();

  return (
    <Box
      mt="n"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center">
      <Box>
        <Text color="grey">Hello 👋🏼,</Text>
        <Text pt="s" variant="mSemiBold" fontSize={moderateScale(15)}>
          {fullName}
        </Text>
      </Box>
    </Box>
  );
};
