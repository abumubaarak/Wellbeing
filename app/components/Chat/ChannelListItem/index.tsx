import {withObservables} from '@nozbe/watermelondb/react';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable} from 'react-native';
import ChannelModel from '../../../db/channelModel';
import {observeUnreadCount} from '../../../db/helper';
import MessagesModel from '../../../db/messagesModel';
import {useUser} from '../../../hooks';
import {StackNavigation} from '../../../navigators';
import {formatAMPM, moderateScale} from '../../../utils';
import {Avatar} from '../../Avatar';
import {Box} from '../../Box';
import {Text} from '../../Text';
import {DeliveryStatus} from '../DeliveryStatus';

type ChannelListItemProps = {
  channel: ChannelModel;
  unread: MessagesModel[];
};

const ChannelListItem = ({channel, unread}: ChannelListItemProps) => {
  const {uid: UID} = useUser();
  const navigation = useNavigation<StackNavigation>();

  const onPress = () => {
    navigation.navigate('Messages', {
      doctorID: channel.doctor,
      channelName: channel.channelName,
      channelSelfie: channel.channelSelfie,
    });
  };
  return (
    <>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [pressed ? {opacity: 0.4} : {}]}>
        <Box flexDirection="row" gap="n" pb="ll">
          <Avatar
            uri={channel.channelSelfie}
            wnh={50}
            doctorID={channel.doctor}
          />
          <Box gap="s" flex={1}>
            <Box flex={1} flexDirection="row" justifyContent="space-between">
              <Text
                color="black"
                variant="buttonLabel"
                fontSize={moderateScale(15)}>
                {channel.channelName}
              </Text>
              <Box justifyContent="space-between">
                <Text color="black" fontSize={moderateScale(12)}>
                  {formatAMPM(channel.updatedAt)}
                </Text>
              </Box>
            </Box>
            <Box
              flex={1}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center">
              <Box flex={2}>
                <Text
                  variant={unread.length > 0 ? 'medium' : 'regular'}
                  numberOfLines={1}
                  fontSize={moderateScale(14.5)}>
                  {channel.lastMessage}
                </Text>
              </Box>

              <Box flex={0.3} alignItems="flex-end">
                {channel.sender === UID ? (
                  <DeliveryStatus status={channel.deliverStatus} />
                ) : (
                  <>
                    {unread.length > 0 && (
                      <Box
                        borderRadius={100}
                        height={25}
                        width={25}
                        alignItems="center"
                        justifyContent="center"
                        backgroundColor="primary300">
                        <Text
                          color="black"
                          variant="mSemiBold"
                          fontSize={moderateScale(12)}>
                          {unread.length}
                        </Text>
                      </Box>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Pressable>
    </>
  );
};

const enhance = withObservables(['channel'], ({channel}) => ({
  unread: observeUnreadCount(channel?.doctor),
}));

export const EnhancedChannelList = enhance(ChannelListItem);
