import React from 'react';
import {useMMKVString} from 'react-native-mmkv';
import {moderateScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';

export const Greetings = () => {
  const [userObject, _] = useMMKVString('user');
  const user = userObject && JSON.parse(userObject!);
  return (
    <Box
      mt="n"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center">
      <Box>
        <Text color="grey">Hello 👋🏼,</Text>
        <Text pt="s" variant="mSemiBold" fontSize={moderateScale(15)}>
          {user.fullName}
        </Text>
      </Box>
    </Box>
  );
};
