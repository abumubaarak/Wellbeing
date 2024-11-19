import React from 'react';
import {Pressable, StyleProp, ViewStyle} from 'react-native';
import {AnimatedStyle} from 'react-native-reanimated';
import {MediaStream, RTCView} from 'react-native-webrtc';
import {
  CallDown,
  MicOff,
  MicOn,
  Rotate,
  SpeakerOff,
  SpeakerOn,
  Verified,
  VideoOff,
  VideoOn,
} from '../../assets/svgs';
import {spacing} from '../../theme/spacing';
import {moderateScale} from '../../utils';
import {AnimatedBox, Box} from '../Box';
import {Text} from '../Text';
import {
  $labelShadow,
  $localStreamContainer,
  $remoteStream,
  $toggleContainer,
} from './styles';
import {Timer} from './Timer';

type CallProps = {
  localStreamVideo: MediaStream;
  remoteStreamVideo: MediaStream;
  toggleFullScreen: () => void;
  doctorName: string;
  callStatus: string;
  specialty: string;
  headerScreenStyle: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  cameraViewStyle: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  footerScreenStyle: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  changeCameraView: () => void;
  handleSpeaker: () => void;
  endCall: () => void;
  handleCam: () => void;
  handleMic: () => void;
  isMicOn: boolean;
  isCamOn: boolean;
  isSpeakerOn: boolean;
};
export const Call = ({
  localStreamVideo,
  isMicOn,
  remoteStreamVideo,
  handleSpeaker,
  isSpeakerOn,
  isCamOn,
  handleMic,
  toggleFullScreen,
  endCall,
  doctorName,
  handleCam,
  callStatus,
  changeCameraView,
  specialty,
  footerScreenStyle,
  headerScreenStyle,
  cameraViewStyle,
}: CallProps) => {
  return (
    <>
      <Box flex={1} backgroundColor="primary100">
        <RTCView
          objectFit={'cover'}
          mirror
          style={$localStreamContainer}
          streamURL={remoteStreamVideo?.toURL()}
        />
      </Box>
      <Pressable onPress={toggleFullScreen} style={$toggleContainer} />

      <Box position="absolute" width={'100%'} height={'100%'}>
        <Box flex={1} marginVertical="xl">
          <Box flex={1}>
            <AnimatedBox style={headerScreenStyle} alignItems="center">
              <Box gap="s" pt="l" flexDirection="row" alignItems="center">
                <Text
                  style={$labelShadow}
                  color="white"
                  variant="mBold"
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  fontSize={moderateScale(16)}>
                  {doctorName}
                </Text>
                <Verified />
              </Box>
              <Text
                style={$labelShadow}
                variant="mRegular"
                color="white"
                pt="m"
                fontSize={moderateScale(15)}>
                {specialty}
              </Text>
            </AnimatedBox>
            <Pressable style={$localStreamContainer}>
              <AnimatedBox borderRadius={10} flex={1} style={cameraViewStyle}>
                <RTCView
                  mirror
                  zOrder={0}
                  style={$remoteStream}
                  streamURL={localStreamVideo?.toURL()}
                />
              </AnimatedBox>
            </Pressable>
          </Box>
          <AnimatedBox
            pb="l"
            ml="ml"
            style={footerScreenStyle}
            flexDirection="row"
            alignItems="center"
            gap="s">
            {callStatus === 'connected' && (
              <Box
                height={8}
                width={8}
                backgroundColor="error"
                borderRadius={100}
              />
            )}

            <Timer callStatus={callStatus} />
          </AnimatedBox>
          <AnimatedBox
            style={footerScreenStyle}
            flex={0.075}
            zIndex={10}
            gap="m"
            justifyContent="center"
            flexDirection="row">
            <Pressable onPress={changeCameraView}>
              <Box
                borderRadius={spacing.borderRadius}
                width={55}
                height={55}
                justifyContent="center"
                backgroundColor="white"
                alignItems="center">
                <Rotate />
              </Box>
            </Pressable>
            <Pressable onPress={handleSpeaker}>
              <Box
                borderRadius={spacing.borderRadius}
                width={55}
                height={55}
                justifyContent="center"
                alignItems="center"
                backgroundColor="white">
                {!isSpeakerOn ? <SpeakerOn /> : <SpeakerOff />}
              </Box>
            </Pressable>
            <Pressable onPress={endCall}>
              <Box
                height={55}
                width={55}
                justifyContent="center"
                alignItems="center"
                backgroundColor="error"
                borderRadius={spacing.borderRadius}>
                <CallDown />
              </Box>
            </Pressable>
            <Pressable onPress={handleCam}>
              <Box
                borderRadius={spacing.borderRadius}
                width={55}
                height={55}
                justifyContent="center"
                alignItems="center"
                backgroundColor="white">
                {isCamOn ? <VideoOn fill="#000" /> : <VideoOff />}
              </Box>
            </Pressable>
            <Pressable onPress={handleMic}>
              <Box
                borderRadius={spacing.borderRadius}
                width={55}
                justifyContent="center"
                alignItems="center"
                height={55}
                backgroundColor="white">
                {isMicOn ? <MicOn /> : <MicOff />}
              </Box>
            </Pressable>
          </AnimatedBox>
        </Box>
      </Box>
    </>
  );
};

export default Call;
