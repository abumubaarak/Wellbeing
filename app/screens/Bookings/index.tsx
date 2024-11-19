import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import {Box, CircularLoader, Header, Screen} from '../../components';
import {AppointmentTimeline, NoAppointment} from '../../components/Booking';
import {useFirestore} from '../../hooks';
import {
  $calendarStrip,
  $dateNameStyle,
  $dateNumberStyle,
} from '../../layouts/ScheduleTab/styles';
import {colors} from '../../theme';
import {fonts} from '../../theme/typography';
import {DAYS, formatDate} from '../../utils';

export const Bookings = () => {
  const day = new Date().getDay();
  const calendarStripRef = useRef<CalendarStrip>(null);
  const TODAY = new Date();
  const [selectedDate, setSelectedDate] = useState<string>();
  const [appointments, setAppointments] = useState<any[]>([]);

  const {appointmentTiming, data, getUser, isLoading} = useFirestore();
  const onDateSelected = (date: moment.Moment) => {
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
  };

  useEffect(() => {
    if (selectedDate) {
      appointmentTiming(selectedDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  useEffect(() => {
    if (data.length === 0) {
      setAppointments([]);
    } else {
      data.reduce(async (acc, item) => {
        const time = moment(item.appointmentTime[0].startTime).format('h:mm a');
        const user = await getUser(item.doctorID);
        item.doctorName = user?.fullName;
        item.specialty = user?.specialty;
        item.selfie = user?.selfie;

        const existingGroup = acc.find((group: any) => group.time === time);
        if (existingGroup) {
          setAppointments([{...appointments, ...{item}}]);
        } else {
          setAppointments([{...appointments, ...{time, data: [item]}}]);
        }
      }, []);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    (async () => {
      await appointmentTiming(moment().format('YYYY-MM-DD'));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Screen useAlignment>
      <Box mt="l" pb="m">
        <Header
          useDefault={false}
          summaryKey={DAYS[day]}
          titleKey={formatDate(new Date()).toString()}
        />
      </Box>
      <CalendarStrip
        ref={calendarStripRef}
        calendarAnimation={undefined}
        scrollerPaging={false}
        scrollable
        disabledDateOpacity={0.27}
        highlightDateNameStyle={{
          fontFamily: fonts.montserratAlternates.Bold,
        }}
        highlightDateNumberStyle={{
          fontFamily: fonts.montserratAlternates.semiBold,
        }}
        startingDate={TODAY}
        // minDate={TODAY}
        selectedDate={TODAY}
        daySelectionAnimation={{
          type: 'background',
          duration: 200,
          highlightColor: colors.primary300,
        }}
        onDateSelected={onDateSelected}
        style={$calendarStrip}
        dateNumberStyle={$dateNumberStyle}
        dateNameStyle={$dateNameStyle}
      />
      {isLoading ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <CircularLoader isLoading={isLoading} />
        </Box>
      ) : (
        <Box flex={1}>
          {appointments.length === 0 ? (
            <NoAppointment />
          ) : (
            <>
              <AppointmentTimeline appointments={appointments} />
            </>
          )}
        </Box>
      )}
    </Screen>
  );
};
