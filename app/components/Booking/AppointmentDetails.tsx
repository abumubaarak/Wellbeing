import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import moment from 'moment';
import React, {useMemo} from 'react';
import {CFill, ChatRight, TimeFill, Users, VideoOn} from '../../assets/svgs';
import {formatDate, formatTiming, moderateScale} from '../../utils';
import {$indicator} from '../AuthModal/style';
import {Avatar} from '../Avatar';
import {Box} from '../Box';
import {Button} from '../Button';
import {Dismiss} from '../Dismiss';
import {Header} from '../Header';
import {Text} from '../Text';
import {$bottomView, $container} from './styles';

type AppointmentDetailsProps = {
  specialty: string;
  appointmentDate: Date;
  appointmentTime: any;
  doctorSelfie: string;
  doctorName: string;
  patientName: string;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
};
export const AppointmentDetails = ({
  specialty,
  appointmentDate,
  appointmentTime,
  doctorSelfie,
  doctorName,
  patientName,
  bottomSheetModalRef,
}: AppointmentDetailsProps) => {
  const snapPoints = useMemo(() => ['1', '100%'], []);
  const closeModal = () => {
    bottomSheetModalRef.current?.close();
  };
  const fn = doctorName?.split(' ')[0];

  const NOW = new Date().toString();
  //I observed some issue with moment()
  const Today = moment(NOW);
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      backgroundStyle={$container}
      handleIndicatorStyle={$indicator}
      backdropComponent={BottomSheetBackdrop}
      snapPoints={snapPoints}>
      <BottomSheetView style={$bottomView}>
        <Box flex={1}>
          <Box flex={1} paddingHorizontal="l">
            <Dismiss isModal={true} modalOnPress={closeModal} />
            <Box marginTop="ll">
              <Header
                useDefault={false}
                summaryKey={`Consultation with\n${fn}.`}
                titleKey={`Your appointment with a ${specialty} specialist.`}
              />
            </Box>
            <Box mt="ll">
              <Box flexDirection="row" gap="n" alignItems="center">
                <CFill />
                <Text
                  fontSize={moderateScale(13)}
                  variant="medium"
                  color="black">
                  {formatDate(appointmentDate)}
                </Text>
              </Box>
              <Box
                marginVertical="s"
                ml="xs"
                height={40}
                width={1}
                backgroundColor="greyLight"
              />
              <Box flexDirection="row" gap="n" alignItems="center">
                <TimeFill />
                <Text
                  fontSize={moderateScale(13)}
                  variant="medium"
                  color="black">
                  {formatTiming(
                    appointmentTime[0].startTime,
                    appointmentTime[0].endTime,
                  ).toUpperCase()}
                  {/* 9:30 AM - 10:30 AM */}
                </Text>
              </Box>
              <Box
                marginVertical="s"
                ml="xs"
                height={40}
                width={1}
                backgroundColor="greyLight"
              />
              <Box flexDirection="row" gap="n" alignItems="center">
                <Users />
                <Text
                  fontSize={moderateScale(13)}
                  variant="medium"
                  color="black">
                  Attendee
                </Text>
              </Box>
              <Box mt="l" ml="ll" gap="ml">
                <Box gap="n" alignItems="center" flexDirection="row">
                  <Avatar uri={doctorSelfie} />
                  <Box gap="s">
                    <Text variant="medium">{doctorName}</Text>
                    <Text color="grey">{specialty}</Text>
                  </Box>
                </Box>

                <Box gap="n" alignItems="center" flexDirection="row">
                  <Avatar />
                  <Box gap="s">
                    <Text variant="medium">{patientName}</Text>
                    <Text color="grey">Patient</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          {Today.isSameOrBefore(appointmentTime[0].startTime) && (
            <Box alignItems="center" pb="ll" pt="l" paddingHorizontal="l">
              <Box gap="l" flexDirection="row">
                <Button label="Chat" leftIcon={<ChatRight />} />
                <Button
                  label="Video Call"
                  useSecondary={true}
                  leftIcon={<VideoOn fill="#fff" />}
                />
              </Box>
            </Box>
          )}
        </Box>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
