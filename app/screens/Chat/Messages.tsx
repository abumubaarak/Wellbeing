import {withObservables} from '@nozbe/watermelondb/react';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  StatusBar,
  TextInput,
} from 'react-native';
import {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {Attachment, Send} from '../../assets/svgs';
import {AnimatedBox, Box, MessageHeader, Screen} from '../../components';
import {colors} from '../../theme';

import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {
  observeMessage,
  observeUnreadCount,
  sendMessage,
  updateAllDeliveryStatus,
  updateDeliveryStatus,
} from '../../db/helper';

import {EnhancedMessageItem} from '../../components/Chat';
import {$input} from '../../components/Chat/styles';
import {$localStreamContainer} from '../../components/VideoCall/styles';
import MessagesModel from '../../db/messagesModel';
import {useUser} from '../../hooks';
import {AppStackParamList} from '../../navigators';
import socket from '../../services/socket';
import {spacing} from '../../theme/spacing';
import {isAndroid} from '../../utils';

type MessagesProps = {
  messages: MessagesModel[];
  unread: MessagesModel[];
};
export const Messages = ({messages, unread}: MessagesProps) => {
  const {uid: UID} = useUser();
  const {params} = useRoute<RouteProp<AppStackParamList, 'Messages'>>();
  const {channelName, doctorID, channelSelfie} = params;
  const [messageInput, setMessageInput] = useState<string>('');
  const flashListRef = useRef<FlashList<MessagesModel>>(null);
  const onLoadListener = useCallback(({elapsedTimeInMs}) => {
    // eslint-disable-next-line no-console
    console.log('load time', elapsedTimeInMs);
  }, []);

  const sendStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: messageInput.length > 0 ? withSpring(1.27) : withSpring(0),
        },
      ],
    };
  });

  const onPress = async () => {
    if (messageInput.length > 0) {
      flashListRef.current?.scrollToIndex({
        animated: true,
        index: messages.length - 1,
        viewOffset: 100,
      });
      const msgPayload = {
        doctor: doctorID,
        message: messageInput,
        patient: UID!,
        sender: UID!,
        deliveryStatus: 'pending',
      };
      const message = await sendMessage(msgPayload);
      emitMessage(msgPayload, message?.id!);
    }
  };

  const emitMessage = (msgPayload: any, id: string) => {
    socket.volatile.emit(
      'message',
      {...msgPayload, messageID: id},
      async (response: any) => {
        //Waiting for a status from the server not from the receiver.
        const {deliveryStatus, messageID} = response;
        await updateDeliveryStatus(deliveryStatus, messageID);
      },
    );
    setMessageInput('');
  };

  useEffect(() => {
    (async () => {
      await updateAllDeliveryStatus('read', doctorID, 'doctor');
    })();
    if (unread.length > 0) {
      socket.emit('read', {
        deliveryStatus: 'read',
        doctor: doctorID,
        patient: UID,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unread]);

  useFocusEffect(
    React.useCallback(() => {
      if (isAndroid) {
        StatusBar.setBackgroundColor(colors.chatInput);
      }
    }, []),
  );
  return (
    <Screen useTopPadding={false}>
      <KeyboardAvoidingView
        style={$localStreamContainer}
        behavior={!isAndroid ? 'padding' : undefined}>
        <Box flex={1}>
          {/* HEADER */}
          <MessageHeader
            doctorID={doctorID}
            channelName={channelName}
            channelSelfie={channelSelfie}
          />
          <Box flex={1} flexGrow={6} paddingHorizontal="l">
            <FlashList
              ref={flashListRef}
              data={messages}
              showsVerticalScrollIndicator={false}
              estimatedItemSize={messages.length}
              onContentSizeChange={() => {
                if (messages.length > 10) {
                  flashListRef?.current?.scrollToEnd({animated: true});
                }
              }}
              // onLayout={() =>
              //   messages.length > 10 &&
              //   flashListRef?.current?.scrollToEnd({animated: true})
              // }

              keyExtractor={item => item.id}
              onLoad={onLoadListener}
              getItemType={item => {
                return item.sender === UID ? 'patient' : 'doctor';
              }}
              renderItem={({item}) => (
                <EnhancedMessageItem item={item} UID={UID} />
              )}
            />
          </Box>

          <Box justifyContent="center" flexGrow={0.1}>
            <Box
              alignItems="center"
              paddingHorizontal="l"
              gap="n"
              flexDirection="row">
              <Box
                borderWidth={1}
                height={45}
                width={45}
                alignItems="center"
                backgroundColor="chatInput"
                justifyContent="center"
                borderRadius={spacing.borderRadius}
                borderColor="header">
                <Attachment />
              </Box>
              <AnimatedBox flex={1} borderRadius={spacing.borderRadius}>
                <TextInput
                  style={$input}
                  multiline={true}
                  value={messageInput}
                  keyboardType="default"
                  placeholder=" Type Something!"
                  placeholderTextColor={colors.black}
                  onChangeText={value => {
                    setMessageInput(value);
                  }}
                />
              </AnimatedBox>
              {messageInput.length > 0 && (
                <AnimatedBox style={sendStyle}>
                  <Pressable hitSlop={40} onPress={onPress}>
                    <Send />
                  </Pressable>
                </AnimatedBox>
              )}
            </Box>
          </Box>
        </Box>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const enhance = withObservables(['route'], ({route}) => ({
  messages: observeMessage(),
  unread: observeUnreadCount(route?.params?.doctorID),
}));

export const EnhancedMessages = enhance(Messages);
