import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Pressable} from 'react-native';
import {Appointment, Time, Video} from '../../assets/svgs';
import {useFirestore, useUser} from '../../hooks';
import {StackTabNavigation} from '../../navigators/TabParamList';
import {spacing} from '../../theme/spacing';
import {formatDate, formatTiming, moderateScale} from '../../utils';
import {Avatar} from '../Avatar';
import {AppointmentDetails, NoAppointment} from '../Booking';
import {Box} from '../Box';
import {CircularLoader} from '../Loader';
import {Text} from '../Text';

export const Upcoming = () => {
  const navigation = useNavigation<StackTabNavigation>();
  const {upcoming, data, getUser, isLoading} = useFirestore();
  // const Today = new Date().toString();
  const upcomingAppointment = data[0];
  const {fullName} = useUser();
  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);

  const [doctorInfo, setDoctorInfo] =
    useState<FirebaseFirestoreTypes.DocumentData>();
  useEffect(() => {
    upcoming();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (data.length === 0) {return;}
    (async () => {
      const user = await getUser(upcomingAppointment.doctorID);
      setDoctorInfo(user);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const openModal = () => {
    bottomSheetModalRef.current?.present();
  };
  const seeAll = () => {
    navigation.navigate('Bookings');
  };
  return (
    <Box borderRadius={spacing.m} mt="ml" backgroundColor="primary300">
      <Box
        paddingHorizontal="n"
        flexDirection="row"
        paddingVertical="l"
        alignItems="center"
        justifyContent="space-between">
        <Text variant="medium" fontSize={moderateScale(13)}>
          Upcoming Schedule
        </Text>
        <Pressable onPress={seeAll}>
          <Text variant="regular" color="black">
            See All
          </Text>
        </Pressable>
      </Box>

      <Box
        borderRadius={spacing.m}
        paddingHorizontal="n"
        pb="l"
        backgroundColor="white">
        {isLoading ? (
          <Box flex={1} justifyContent="center" alignItems="center">
            <CircularLoader isLoading={isLoading} />
          </Box>
        ) : data.length === 0 ? (
          <Box flex={1} pt="ll">
            <NoAppointment title="You don’t have any upcoming appointments scheduled." />
          </Box>
        ) : (
          <>
            <Pressable onPress={openModal}>
              <Box gap="n" paddingVertical="m">
                <Box gap="s" flexDirection="row" alignItems="center">
                  <Appointment />
                  <Text
                    variant="regular"
                    fontSize={moderateScale(13)}
                    color="black">
                    {formatDate(data[0]?.appointmentDate)}
                   </Text>
                </Box>
                <Box gap="s" flexDirection="row" alignItems="center">
                  <Time />
                  <Text
                    variant="regular"
                    fontSize={moderateScale(13)}
                    color="black">
                    {formatTiming(
                      data[0]?.appointmentTime[0].startTime,
                      data[0]?.appointmentTime[0].endTime,
                    ).toUpperCase()}
                   </Text>
                </Box>
              </Box>
              <Box height={0.5} backgroundColor="greyLight2" />
              <Box
                pt="m"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between">
                <Box
                  gap="n"
                  flex={1}
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between">
                  <Box gap="n" flexDirection="row" alignItems="center">
                    <Avatar wnh={50} uri={doctorInfo?.selfie} />

                    <Box gap="s">
                      <Text variant="regular" fontSize={moderateScale(13)}>
                        {doctorInfo?.specialty}
                      </Text>
                      <Text variant="buttonLabel" fontSize={moderateScale(13)}>
                        {doctorInfo?.fullName}
                      </Text>
                    </Box>
                  </Box>
                  {/*onPress: Show a notification that the time for the appointment has not reached */}
                  <Box
                    backgroundColor="blueLight"
                    height={40}
                    width={40}
                    justifyContent="center"
                    alignItems="center"
                    borderRadius={moderateScale(100)}>
                    <Video />
                  </Box>
                </Box>
              </Box>
            </Pressable>
          </>
        )}
      </Box>

      {doctorInfo?.selfie && (
        <AppointmentDetails
          appointmentTime={data[0]?.appointmentTime}
          doctorName={doctorInfo?.fullName}
          doctorSelfie={doctorInfo?.selfie}
          patientName={fullName!}
          specialty={doctorInfo?.specialty}
          appointmentDate={data[0]?.appointmentDate}
          bottomSheetModalRef={bottomSheetModalRef}
        />
      )}
    </Box>
  );
};
