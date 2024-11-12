import React from 'react';
import {Pressable, StyleProp, ViewStyle} from 'react-native';
import {AnimatedStyle} from 'react-native-reanimated';
import {MediaStream, RTCView} from 'react-native-webrtc';
import {CallDown, CamOn} from '../../assets/svgs';
import {spacing} from '../../theme/spacing';
import {Avatar} from '../Avatar';
import {Box} from '../Box';
import {Text} from '../Text';
import {CallerInfo} from './CallerInfo';
import {$localStreamContainer} from './styles';

type IncomingCallProps = {
  localStreamVideo: MediaStream;
  avatar: string;
  doctorName: string;
  specialty: string;
  endCall: () => void;
  processAnswer: () => void;
  headerScreenStyle: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
};
export const IncomingCall = ({
  localStreamVideo,
  avatar,
  doctorName,
  specialty,
  endCall,
  headerScreenStyle,
  processAnswer,
}: IncomingCallProps) => {
  return (
    <>
      <RTCView
        objectFit={'cover'}
        mirror
        zOrder={100}
        style={$localStreamContainer}
        streamURL={localStreamVideo?.toURL()}
      />
      <Box position="absolute" width={'100%'} height={'100%'}>
        <Box flex={1}>
          <Box flex={1} alignItems="center" paddingTop="borderRadius">
            <Box mt="s">
              <Avatar uri={avatar} wnh={90} />
            </Box>

            <CallerInfo
              headerScreenStyle={headerScreenStyle}
              doctorName={doctorName}
              specialty={specialty}
            />
          </Box>
          <Box
            pb="ll"
            flex={0.2}
            flexDirection="row"
            paddingHorizontal="xl"
            justifyContent="space-between">
            <Pressable onPress={endCall}>
              <Box gap="m" alignItems="center">
                <Box
                  height={60}
                  width={60}
                  justifyContent="center"
                  alignItems="center"
                  backgroundColor="error"
                  borderRadius={spacing.borderRadius}>
                  <CallDown />
                </Box>
                <Text color="white">Decline</Text>
              </Box>
            </Pressable>
            <Pressable onPress={processAnswer}>
              <Box gap="m" alignItems="center">
                <Box
                  height={60}
                  width={60}
                  justifyContent="center"
                  alignItems="center"
                  backgroundColor="primary500"
                  borderRadius={spacing.borderRadius}>
                  <CamOn />
                </Box>
                <Text color="white">Accept</Text>
              </Box>
            </Pressable>
          </Box>
        </Box>
      </Box>
    </>
  );
};
