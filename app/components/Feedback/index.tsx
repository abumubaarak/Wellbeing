import React from 'react';
import {Error} from '../../assets/svgs';
import {horizontalScale, moderateScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';
import {$container, $errorContainer} from './style';

type FeedbackProps = {
  type: 'CAUTION!' | 'success';
  message: string;
};
export const Feedback = ({message, type}: FeedbackProps) => {
  return (
    <Box style={$container}>
      <Error width={'100%'} style={$errorContainer} />
      <Box
        style={{
          marginHorizontal: horizontalScale(15),
        }}>
        <Box flexDirection="row" gap="xs" overflow="hidden" alignItems="center">
          <Box height={20} width={20} backgroundColor="error" borderRadius={5}>
            <Text textAlign="center" variant="mBold" color="white">
              !
            </Text>
          </Box>
          <Text variant="mBold" fontSize={moderateScale(12)}>
            {type}
          </Text>
        </Box>
        <Box pt="s">
          <Text lineHeight={moderateScale(21)}>{message}</Text>
        </Box>
      </Box>
    </Box>
  );
};
