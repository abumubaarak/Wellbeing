import {withObservables} from '@nozbe/watermelondb/react';
import {useFocusEffect} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {StatusBar} from 'react-native';
import {Box, Screen, Text} from '../../components';
import {EnhancedChannelList} from '../../components/Chat';
import ChannelModel from '../../db/channelModel';
import {observeChannels} from '../../db/helper';
import {colors} from '../../theme';
import {isAndroid, moderateScale} from '../../utils';

type ChatProps = {
  channels: ChannelModel[];
};

export const ChatList = ({channels}: ChatProps) => {
  //const {uid} = useUser();
  useFocusEffect(
    React.useCallback(() => {
      if (isAndroid) {
        StatusBar.setBackgroundColor(colors.primary);
      }
    }, []),
  );
  return (
    <Screen useAlignment>
      <Text
        pt="l"
        color="black"
        variant="mSemiBold"
        fontSize={moderateScale(27)}>
        Chats
      </Text>
      <Box flex={1} mt="ll">
        <FlashList
          data={channels}
          estimatedItemSize={200}
          renderItem={({item}) => <EnhancedChannelList channel={item} />}
        />
      </Box>
    </Screen>
  );
};
const enhance = withObservables([], () => ({
  channels: observeChannels(),
}));

export const EnhancedChat = enhance(ChatList);
