import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {Alert, Pressable} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ArrowLeft, Back, VideoCall} from '../../../assets/svgs';
import {StackNavigation} from '../../../navigators';
import {StackTabNavigation} from '../../../navigators/TabParamList';
import {isAndroid, moderateScale} from '../../../utils';
import {Avatar} from '../../Avatar';
import {Box} from '../../Box';
import {$button, $widthHeightStyle} from '../../Dismiss/style';
import {Text} from '../../Text';
import {$back} from './styles';

type MessageHeaderProps = {
  channelSelfie: string;
  channelName: string;
  doctorID: string;
};
export const MessageHeader = memo(
  ({channelName, channelSelfie, doctorID}: MessageHeaderProps) => {
    const navigation = useNavigation<StackTabNavigation>();
    const insets = useSafeAreaInsets();
    const {isConnected} = useNetInfo();

    const mainNavigation = useNavigation<StackNavigation>();
    const onPress = () => {
      navigation.navigate('Chat');
    };
    const videoCallOnPress = () => {
      if (isConnected) {
        mainNavigation.navigate('VideoCall', {
          doctorName: channelName,
          doctorID,
          incomingCall: false,
          avatar: channelSelfie,
        });
      } else {
        Alert.alert(
          "We're unable to establish a connection. Please connect to the internet to proceed with the video call.",
        );
      }
    };

    return (
      <>
        <Box
          backgroundColor="chatInput"
          flexDirection="row"
          pr="l"
          pb="nn"
          style={{paddingTop: insets.top + 6}}
          alignItems="center"
          justifyContent="space-between">
          <Box flex={1} flexDirection="row" alignItems="center">
            <Box>
              <RectButton
                hitSlop={50}
                onPress={onPress}
                style={[$button, $widthHeightStyle(), $back]}>
                {!isAndroid ? <ArrowLeft /> : <Back />}
              </RectButton>
            </Box>
            <Box alignItems="center" flexDirection="row" gap="n">
              <Avatar uri={channelSelfie} doctorID={doctorID} />

              <Box gap="s">
                <Text
                  fontSize={moderateScale(14)}
                  numberOfLines={1}
                  variant="buttonLabel"
                  color="black"
                  ellipsizeMode="tail">
                  {channelName}
                </Text>
                <Text
                  color="primary700"
                  variant="regular"
                  fontSize={moderateScale(13)}>
                  Doctor
                </Text>
              </Box>
            </Box>
          </Box>
          <Pressable hitSlop={70} onPress={videoCallOnPress}>
            <Box>
              <VideoCall />
            </Box>
          </Pressable>
        </Box>
        {/* LINE */}
      </>
    );
  },
);
