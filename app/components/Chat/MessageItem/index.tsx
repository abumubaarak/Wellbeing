import {withObservables} from '@nozbe/watermelondb/react';
import React from 'react';
import {observeDeliveryStatus} from '../../../db/helper';
import MessagesModel from '../../../db/messagesModel';
import {spacing} from '../../../theme/spacing';
import {formatAMPM, moderateScale} from '../../../utils';
import {Box} from '../../Box';
import {Text} from '../../Text';
import {DeliveryStatus} from '../DeliveryStatus';

type MessageItemProps = {
  item: MessagesModel;
  UID: string;
  status?: MessagesModel[];
};
//TODO: Refactor chat item.
const MessageItem = ({item, UID}: MessageItemProps) => {
  if (item.sender === UID) {
    return (
      <Box maxWidth={'85%'} alignSelf={'flex-end'}>
        <Box
          backgroundColor={'primary300'}
          marginVertical="s"
          flexWrap="wrap"
          flexDirection="row"
          paddingHorizontal="n"
          paddingVertical="xs"
          overflow="hidden"
          borderRadius={spacing.l}>
          <Text
            variant="regular"
            color="black"
            pr="xs"
            pb="ii"
            fontSize={moderateScale(16)}>
            {item.message}
          </Text>
          <Box
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            flexGrow={1}>
            <Text fontSize={moderateScale(12)} color="greyL">
              {formatAMPM(item.createdAt)}
            </Text>
            <Box pl="ii" alignItems="flex-end">
              <DeliveryStatus status={item.deliveryStatus} />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box maxWidth={'85%'} alignSelf={'flex-start'}>
        <Box
          backgroundColor={'greyLight2'}
          marginVertical="s"
          flexWrap="wrap"
          flexDirection="row"
          paddingHorizontal="n"
          paddingVertical="xs"
          overflow="hidden"
          borderRadius={spacing.l}>
          <Text
            variant="regular"
            color="black"
            pr="xs"
            pb="ii"
            fontSize={moderateScale(16)}>
            {item.message}
          </Text>
          <Box
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            flexGrow={1}>
            <Text fontSize={moderateScale(12)} color="greyL">
              {formatAMPM(item.createdAt)}
            </Text>
          </Box>
        </Box>
      </Box>
    );
  }
};

const enhance = withObservables([], () => ({
  status: observeDeliveryStatus(),
}));
export const EnhancedMessageItem = enhance(MessageItem);
