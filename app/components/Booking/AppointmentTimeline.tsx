import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {FlashList} from '@shopify/flash-list';
import moment from 'moment';
import React, {useMemo, useRef, useState} from 'react';
import {CFill, ChatRight, TimeFill, Users, VideoOn} from '../../assets/svgs';
import {useUser} from '../../hooks';
import {formatDate, moderateScale, startEndTime} from '../../utils';
import {$indicator} from '../AuthModal/style';
import {Avatar} from '../Avatar';
import {Box} from '../Box';
import {Button} from '../Button';
import {Dismiss} from '../Dismiss';
import {Header} from '../Header';
import {Text} from '../Text';
import {TimelineItem} from './TimelineItem';
import {$bottomView, $container} from './styles';

type AppointmentTimeline = {
  appointments: any[];
};
export const AppointmentTimeline = ({appointments}: AppointmentTimeline) => {
  const snapPoints = useMemo(() => ['1', '100%'], []);
  const {fullName} = useUser();
  // const navigation = useNavigation<StackNavigation>();
  const [doctor, setDoctor] = useState<any>();

  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);

  const closeModal = () => {
    bottomSheetModalRef.current?.close();
  };
  const NOW = new Date().toString();
  //I observed some issue with moment()
  const Today = moment(NOW);
  const timelineItemPress = (
    selfie: string,
    doctorID: string,
    doctorName: string,
    specialty: string,
    appointmentTime: string,
    appointmentDate: string,
  ) => {
    const fn = doctorName.split(' ')[0];
    setDoctor({
      selfie,
      doctorID,
      fn,
      doctorName,
      specialty,
      appointmentDate,
      appointmentTime,
    });
    bottomSheetModalRef.current?.present();
  };

  return (
    <>
      <FlashList
        data={appointments}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <TimelineItem item={item} onPress={timelineItemPress} />
        )}
        estimatedItemSize={200}
      />
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
                  summaryKey={`Consultation with\n${doctor?.fn}.`}
                  titleKey={`Your appointment with a ${doctor?.specialty} specialist.`}
                />
              </Box>
              <Box mt="ll">
                <Box flexDirection="row" gap="n" alignItems="center">
                  <CFill />
                  <Text
                    fontSize={moderateScale(13)}
                    variant="medium"
                    color="black">
                    {formatDate(doctor?.appointmentDate)}
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
                    {doctor?.appointmentTime[0].startTime &&
                      startEndTime(
                        doctor?.appointmentTime[0].startTime,
                        doctor?.appointmentTime[0].endTime,
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
                    <Avatar uri={doctor?.selfie} />
                    <Box gap="s">
                      <Text variant="medium">{doctor?.doctorName}</Text>
                      <Text color="grey">{doctor?.specialty}</Text>
                    </Box>
                  </Box>

                  <Box gap="n" alignItems="center" flexDirection="row">
                    <Avatar />
                    <Box gap="s">
                      <Text variant="medium">{fullName}</Text>
                      <Text color="grey">Patient</Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            {Today.isSameOrBefore(doctor?.appointmentTime[0].startTime) && (
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
    </>
  );
};
